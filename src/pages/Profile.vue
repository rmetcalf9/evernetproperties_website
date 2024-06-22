<template>
  <q-page class="flex flex-center">
    <div rows>
      <h3 style="margin: 0px;">User Profile</h3>
      <h4>Basic</h4>
      <div class="section">
        <div>User: {{ user_profile.name }}</div>
        <div>Email: {{ user_profile.email }}</div>
      </div>
      <div class="section">
        <h4>PIMS Membership <q-btn round dense flat icon="info" @click="pimsinfo" /></h4>
        <div v-if="user_profile.pims.state === 'NOTENTERED'">
         <div>PIMS Membership details not entered - Extra site features are available to Academy/PIMS members.</div>
         <div align="center">
          <q-btn label="Enter PIMS information" color="primary" @click="clickenterpimsinformation" />
          </div>
         <div>Verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
        <div v-if="user_profile.pims.state === 'WAITINGVERIFICATION'">
          <div>First Name: {{ user_profile.email }}</div>
          <div>Last Name: {{ user_profile.email }}</div>
          <div>PIMS Number: {{ user_profile.email }}</div>
          <div>Verified: <q-icon name="check_box" color="green" size="32px" /></div>
        </div>
      </div>
      <q-btn
        @click="logout"
        color="secondary"
        label="Logout"
      ></q-btn>
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
    }
  },
  methods: {
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
      this.$q.dialog({
        title: 'PIMS Membership Details',
        message: 'Extra site features are available to users who have a verified PIMS membership.',
        html: true,
        ok: {
          push: true,
          label: 'Enter PIMS details',
          color: 'secondary'
        },
        cancel: {
          push: true,
          label: 'Close',
          color: 'primary'
        }
      }).onOk(() => {
        TTT.enterpimsdialog.visible = true
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
    },
    submitpimsinfo_success (response) {
      console.log('TODO success', response)
    },
    submitpimsinfo_fail (response) {
      console.log('TODO fail', response)
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
.section {
  margin-bottom: 20px;
}
</style>
