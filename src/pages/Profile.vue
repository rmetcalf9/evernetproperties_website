<template>
  <q-page class="flex flex-center">
    <div rows>
      <h3 style="margin: 0px;">User Profile</h3>
      <h4>Details</h4>
      <div class="section">
        <div>User: {{ user_profile.name }}</div>
        <div>Email: {{ user_profile.email }}</div>
        <div>Roles:
          <ul>
          <div v-for="role in user_profile.roles" :key=role><li>{{ role }}</li></div>
          </ul>
        </div>
      </div>
      <div class="section">
        <h4>PIMS Membership <q-btn round dense flat icon="info" @click="pimsinfo" /></h4>
        <div v-if="user_profile.pims.state === 'NOTENTERED'">
         <div>PIMS Membership details not entered - Extra site features are available to Academy/PIMS members.</div>
         <div align="center">
          <q-btn label="Enter PIMS information" color="primary"  />
          </div>
         <div>Verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'WAITINGVERIFICATION'">
          <div>PIMS details entered but not verified. To verify please send a message in the Samuel Leeds Academy chat with the following text:</div>

          <div class="pimstext" @click="clickcopypimsverfiylink"><div v-html="pimsverfiylink"></div>&nbsp;
          <q-icon class="float-right" name="content_copy" size="16px" />
          </div>
          <div>Verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'VERIFIED'">
          <div><h5>PIMS member</h5></div>
          <div>{{ user_profile.pims.first_name }} {{ user_profile.pims.last_name }} - PIMS number {{ user_profile.pims.number }}</div>
          <div>Verified: <q-icon name="check_box" color="green" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'VERIFICATIONFAILED'">
          <div>Extra site features are available to Academy/PIMS members. PIMS Membership details verification failed</div>
          <div align="center">
           <q-btn label="Retry entering PIMS information" color="primary" @click="clickenterpimsinformation" />
          </div>
          <div>Verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
      </div>
      <div class="bottom-buttons">
        <q-btn
          class="bottom-button"
          @click="logout"
          color="secondary"
          label="Logout"
        ></q-btn>
        <q-btn
          class="bottom-button"
          @click="deleteaccount"
          color="red"
          label="Delete my account"
        ></q-btn>
      </div>
    </div>
    <q-dialog v-model="enterpimsdialog.visible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Your PIMS membership details</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>Details must match what appears on the  <a href="https://www.thepims.co.uk/members/" target="_new">PIMS website</a>.</div>
          <q-input v-model="enterpimsdialog.number" label="PIMS Number"
            :rules="[ val => val.trim().length > 4 || 'Minimum 5 characters', val => val.trim().match(/^\d+$/) !== null || 'Numeric characters only']"
            ref="numberref"
          />
          <q-input v-model="enterpimsdialog.first_name" label="First Name"
            :rules="[ val => val.trim().length > 1 || 'Minimum 2 characters']"
            ref="first_nameref"
          />
          <q-input v-model="enterpimsdialog.last_name" label="Last Name"
            :rules="[ val => val.trim().length > 1 || 'Minimum 2 characters']"
            ref="last_nameref"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit for Verification" color="secondary" @click="enterpimsdialogclick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import utils from '../utils.js'


export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  components: {
  },
  data () {
    return {
      enterpimsdialog: {
        visible: false,
        number: '',
        first_name: '',
        last_name: ''
      }
    }
  },
  computed: {
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    },
    pimsverfiylink () {
      const url = 'https://evernetproperties.com/#/v/' + this.user_profile.pims.verify_code + '/' + this.user_profile.pims.number

      return 'Robert - Please verify my PIMS ' + this.user_profile.pims.first_name + '/' + this.user_profile.pims.last_name + ' (' + this.user_profile.pims.number + ') <a href="' + url + '" target="_new">' + url + '</a>'
    }
  },
  methods: {
    clickcopypimsverfiylink () {
      const callback = {
        ok: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Copied text to clipboard' + this.pimsverfiylink,
            timeout: 2000
          })
        },
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Copy to clipboard failed',
            timeout: 2000
          })
        }
      }
      utils.copyTextToClipboard2(this.pimsverfiylink, callback)
    },
    logout () {
      this.backend_connection_store.logout()
      this.$router.push("/tools")
    },
    clickenterpimsinformation () {
      this.enterpimsdialog.number = ''
      this.enterpimsdialog.first_name = ''
      this.enterpimsdialog.last_name = ''
      this.enterpimsdialog.visible = true
    },
    pimsinfo () {
      const TTT = this
      let ok_prompt = 'Enter PIMS details'
      if (this.user_profile.pims.state==='WAITINGVERIFICATION') {
        ok_prompt = 'Change PIMS details'
      }
      this.$q.dialog({
        title: 'PIMS Membership Details',
        message: 'Extra site features are available to users who have a verified PIMS membership.',
        html: true,
        ok: {
          push: true,
          label: ok_prompt,
          color: 'secondary'
        },
        cancel: {
          push: true,
          label: 'Close',
          color: 'primary'
        }
      }).onOk(() => {
        TTT.clickenterpimsinformation()
      })
    },
    enterpimsdialogclick () {
      const fields = ['numberref', 'first_nameref', 'last_nameref']
      for (const i of fields) {
        this.$refs[i].validate()
      }
      for (const i of fields) {
        if (this.$refs[i].hasError) {
          return
        }
      }
      const data = {
        number: this.enterpimsdialog.number,
        first_name: this.enterpimsdialog.first_name,
        last_name: this.enterpimsdialog.last_name,
      }
      const callback = {
        ok: this.submitpimsinfo_success,
        error: this.submitpimsinfo_fail
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/me/pimsdetails',
        method: 'POST',
        data: data,
        callback: callback
      })
      this.enterpimsdialog.visible = false
    },
    submitpimsinfo_success (response) {
      this.backend_connection_store.update_user_profile({user_profile: response.data})
      Notify.create({
        color: 'bg-grey-2',
        message: 'New PIMS details saved - Please request Verification',
        timeout: 2000
      })

    },
    submitpimsinfo_fail (response) {
      console.log('ERROR failed to update PIMS information ', response)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Failed to update PIMS information ' + response,
        timeout: 2000
      })
    },
    deleteaccount () {
      const TTT = this
      this.$q.dialog({
        title: 'Delete Account',
        message: 'Deleting your account will wipe all your user data from our system. This inclues all saved properties. Are you sure? (Type DELETE below to confirm)',
        html: false,
        ok: {
          push: true,
          label: 'Delete',
          color: 'red'
        },
        cancel: {
          push: true,
          label: 'Cancel',
          color: 'primary'
        },
        prompt: {
          model: '',
          type: 'text' // optional
        },
      }).onOk((data) => {
        if (data.trim() !== 'DELETE') {
          Notify.create({
            color: 'red',
            message: 'Failed - You must type DELETE in the text box',
            timeout: 2000
          })
          return
        }
        const callback = {
          ok: function (response) {
            TTT.logout()
            Notify.create({
              color: 'bg-grey-2',
              message: 'User account deleted',
              timeout: 2000
            })
          },
          error: function (response) {
            Notify.create({
              color: 'bg-grey-2',
              message: 'Account deletion failed ' + response,
              timeout: 2000
            })
          }
        }
        this.backend_connection_store.call_api({
          apiprefix: 'privateUserAPIPrefix',
          url: '/me/delete',
          method: 'POST',
          data: data,
          callback: callback
        })
      })
    }
  },
  mounted () {
    if (!this.isLoggedin) {
      this.$router.push("/tools")
    }
  }
})
</script>

<style>
h4 {
  margin-top: 35px;
  margin-bottom: 0px;
}
h5 {
  margin-top: 0px;
  margin-bottom: 0px;
}
.section {
  margin-bottom: 20px;
}
.bottom-buttons {
  margin-bottom: 20px;
}
.bottom-button {
  margin-left: 5px;
  margin-right: 5px;
}
.pimstext {
  border: 1px;
  border-color: black;
  border-style: dashed;
  padding: 5px;
  background: lightgrey;
  margin: 10px;
}
</style>
