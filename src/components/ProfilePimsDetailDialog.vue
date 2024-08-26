<template>
  <div>
    <q-dialog v-model="enterpimsdialog.visible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Your PIMS membership detailsXXXX</div>
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
          <q-input v-model="enterpimsdialog.phone" label="Phone"
            :rules="[ val => val.trim().length > 1 || 'Minimum 6 characters']"
            ref="phoneref"
          />
          <q-input v-model="enterpimsdialog.email" label="Email"
            :rules="[ val => val.trim().length > 1 || 'Minimum 8 characters']"
            ref="emailref"
          />
          <q-input v-model="enterpimsdialog.company_name" label="Company Name"
            ref="companyref"
          />
          <q-toggle
            v-model="enterpimsdialog.agreetoc"
          />Agree to <a href="#" @click="show_toc">Early Access terms and conditions</a>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat
            label="Submit for Verification"
            color="secondary"
            @click="enterpimsdialogclick"
            :disabled="!enterpimsdialog.agreetoc"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import axios from 'axios'

export default defineComponent({
  name: 'ProfilePimsDetailDialogComponent',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      enterpimsdialog: {
        visible: false,
        number: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        company_name: '',
        agreetoc: false
      }
    }
  },
  methods: {
    show_toc () {
      Notify.create({
        color: 'negative',
        message: 'TODO',
        timeout: 2000
      })
    },
    launch_dialog () {
      this.enterpimsdialog.number = ''
      this.enterpimsdialog.first_name = ''
      this.enterpimsdialog.last_name = ''
      this.enterpimsdialog.phone = ''
      this.enterpimsdialog.email = ''
      this.enterpimsdialog.company_name = ''
      this.enterpimsdialog.agreetoc = false
      this.enterpimsdialog.visible = true
    },
    enterpimsdialogclick () {
      if (!this.enterpimsdialog.agreetoc) {
        return
      }
      const fields = ['numberref', 'first_nameref', 'last_nameref', 'phoneref', 'emailref']
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

      // duplicated in Profile and ProfilePimsDetailDialog
      const url = window.location.origin + '/v/' + response.data.pims.verify_code + '/' + response.data.pims.number

      var bodyFormData = new FormData()
      bodyFormData.append('xnQsjsdp', '89e18b1e88ffaffedbeef0c32091b44516c268788a1971f957ab3e29b6e6e670');
      bodyFormData.append('zc_gad', '');
      bodyFormData.append('xmIwtLD', '5cda33fce5eaeaa7ca374dff23d1501c751fd3395004fbff2c04c9a8e9c4fa2b0672ff88667c9f8e63ae8860514dcb5b');
      bodyFormData.append('actionType', 'UG90ZW50aWFscw==');
      bodyFormData.append('returnURL', undefined);
      bodyFormData.append('Potential Name', response.data.frontend_instance + ' Website ' + response.data.pims.last_name);
      bodyFormData.append('Contacts.First Name', response.data.pims.first_name);
      bodyFormData.append('Contacts.Last Name', response.data.pims.last_name);
      bodyFormData.append('Contacts.Phone', this.enterpimsdialog.phone);
      bodyFormData.append('Contacts.Email', this.enterpimsdialog.email);
      bodyFormData.append('Contacts.CONTACTCF3', response.data.email); // SOC Email
      bodyFormData.append('Accounts.Account Name', '');
      bodyFormData.append('Contacts.CONTACTCF1', response.data.pims.number); // PIMS
      bodyFormData.append('Contacts.CONTACTCF2', response.data.id); // userID
      bodyFormData.append('POTENTIALCF3', url); // verifyURL
      bodyFormData.append('Pipeline', 'PPB Early Access Signup Standard');
      bodyFormData.append('Stage', 'Signup Requested');

      axios({
        method: "post",
        url: "https://bigin.zoho.eu/crm/WebForm",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        //handle success
      })
      .catch(function (response) {
        //handle error
        console.log('Failed to register on CRM')
        console.log(response);
      })

      Notify.create({
        color: 'bg-grey-2',
        message: 'New PIMS details saved - Please request Verification by sending Whatsapp message on the academy group',
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
    }
  },
})
</script>

<style>
</style>
