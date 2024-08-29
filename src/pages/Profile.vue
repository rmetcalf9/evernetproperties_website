<template>
  <q-page class="flex flex-center">
    <div rows>
      <h3 style="margin: 0px;">User Profile</h3>
      <div class="notice" v-if="user_profile.pims.state !== 'VERIFIED'"><q-icon name="info" size="md" color="green"/> Enter and verify your PIMS membership details to activate Property Pipeline Builder early access.</div>
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
          <q-btn label="Enter PIMS information" color="primary" @click="clickenterpimsinformation" />
          </div>
         <div>PIMS Membership verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'WAITINGVERIFICATION'">
          <div>PIMS details entered but not verified. To verify please send a message in the Samuel Leeds Academy chat with the following text:</div>

          <div class="pimstext" @click="clickcopypimsverfiylink"><div v-html="pimsverfiylink"></div>&nbsp;
          <q-icon class="float-right" name="content_copy" size="16px" />
          </div>
          <div>PIMS Membership verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'VERIFIED'">
          <div><h5>PIMS member</h5></div>
          <div>{{ user_profile.pims.first_name }} {{ user_profile.pims.last_name }} - PIMS number {{ user_profile.pims.number }}</div>
          <div>PIMS Membership verified: <q-icon name="check_box" color="green" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'VERIFICATIONFAILED'">
          <div>Extra site features are available to Academy/PIMS members. PIMS Membership details verification failed</div>
          <div align="center">
           <q-btn label="Retry entering PIMS information" color="primary" @click="clickenterpimsinformation" />
          </div>
          <div>PIMS Membership verified: <q-icon name="cancel" color="red" size="32px" /></div>
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
    <ProfilePimsDetailDialog
      ref="ProfilePimsDetailDialog"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import utils from '../utils.js'

import ProfilePimsDetailDialog from '../components/ProfilePimsDetailDialog.vue'


export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  components: {
    ProfilePimsDetailDialog
  },
  data () {
    return {
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
      // duplicated in Profile and ProfilePimsDetailDialog
      const url = window.location.origin + '/#/v/' + this.user_profile.pims.verify_code + '/' + this.user_profile.pims.number

      return 'Robert - Please verify my PIMS ' + this.user_profile.pims.first_name + '/' + this.user_profile.pims.last_name + ' (' + this.user_profile.pims.number + ') <a href="' + url + '" target="_new">' + url + '</a>'
    }
  },
  methods: {
    clickcopypimsverfiylink () {
      const TTT = this
      const callback = {
        ok: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Copied text to clipboard ' + TTT.pimsverfiylink,
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
      this.$refs.ProfilePimsDetailDialog.launch_dialog()
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
          method: 'GET',
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
.notice {
  border: 2px;
  border-color: black;
  border-style: solid;
  margin: 10px;
  padding: 5px;
  background: antiquewhite;
}
</style>
