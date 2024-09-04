<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Your PIMS membership details to sign up for Early Access</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>Details must match what appears on the  <a href="https://www.thepims.co.uk/members/" target="_new">PIMS website</a>.</div>
        <q-input v-model="enterpimsdialog.number" label="PIMS Number"
          :rules="[ val => val.trim().length > 0 || 'Minimum 1 character', val => val.trim().match(/^\d+$/) !== null || 'Numeric characters only']"
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
        <div class="row">
          <q-input v-model="enterpimsdialog.phone" label="Phone"
            :rules="[ val => val.trim().length > 0 || 'Minimum 1 character']"
            ref="phoneref" class="col-grow"
          />
          <q-btn round dense flat icon="info" @click="notify_why('phone')" />
        </div>
        <div class="row">
          <q-input v-model="enterpimsdialog.email" label="Email"
            :rules="[ val => val.trim().length > 7 || 'Minimum 8 characters']"
            ref="emailref" class="col-grow"
          />
          <q-btn round dense flat icon="info" @click="notify_why('email')" />
        </div>
        <q-input v-model="enterpimsdialog.company_name" label="Company Name"
          ref="companyref"
        />
        <q-checkbox
          v-model="enterpimsdialog.agreetoc"
          label="Agree to Early Access terms and conditions"
        />
        <br/>
        <q-btn label="View Terms" @click="show_toc"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="!supresscancelbutton"
          flat
          label="Cancel"
          @click="enterpimsdialogclickcancel"
        />
        <q-btn flat
          label="Submit for Verification"
          color="secondary"
          @click="enterpimsdialogclick"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import axios from 'axios'

import toc from '../termsandconditions/main.js'

const infotext = {
  email: 'We collect your email address so that we can contact you with updates on the service.',
  phone: 'We collect your phone number as we may call you to find out how you are getting on.'
}

// The different values based on the forms
const bigin_form_values = {
  orig: {
    xnQsjsdp: '89e18b1e88ffaffedbeef0c32091b44516c268788a1971f957ab3e29b6e6e670',
    xmIwtLD: '5cda33fce5eaeaa7ca374dff23d1501c751fd3395004fbff2c04c9a8e9c4fa2b0672ff88667c9f8e63ae8860514dcb5b',
    pipeline: 'PPB Early Access Signup Standard',
    stage: 'Signup Requested'
  },
  second_default: {
    xnQsjsdp: 'bbc11a9d1fe3d3d285778688a13184d602d86b48122e8c9860c08b2a6c55c521',
    xmIwtLD: 'e3c3402a45569ecc302648f0365d953e3e6e2b7b4cb0a8e557654c22f7da2b3c06dbe76105b211e7803e5207a8f296b8',
    pipeline: 'Sales Pipeline Standard',
    stage: 'Signup Requested2'
  }
}


export default defineComponent({
  name: 'ProfilePimsDetailFormComponent',
  props: {
    supresscancelbutton: {
      type: Boolean,
      default: false
    }
  },
  emits: ['process_done', 'click_cancel'],
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      enterpimsdialog: {
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
    enterpimsdialogclickcancel () {
      this.$emit('click_cancel')
    },
    notify_why (type) {
      this.$q.dialog({
        title: undefined,
        message: infotext[type],
        html: false,
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    show_toc () {
      this.$q.dialog({
        title: toc.early_access.title,
        message: '<div class="toc_dialog">' + toc.early_access.html + '</div>',
        html: true,
        fullWidth: true
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    blank_data () {
      this.enterpimsdialog.number = ''
      this.enterpimsdialog.first_name = ''
      this.enterpimsdialog.last_name = ''
      this.enterpimsdialog.phone = ''
      this.enterpimsdialog.email = ''
      this.enterpimsdialog.company_name = ''
      this.enterpimsdialog.agreetoc = false
    },
    enterpimsdialogclick () {
      const TTT = this
      const fields = ['numberref', 'first_nameref', 'last_nameref', 'phoneref', 'emailref']
      for (const i of fields) {
        this.$refs[i].validate()
      }
      for (const i of fields) {
        if (this.$refs[i].hasError) {
          return
        }
      }

      if (this.enterpimsdialog.agreetoc) {
        TTT.enterpimsdialogclick_afteragree()
      } else {
        TTT.$q.dialog({
          title: 'Agree to terms and conditions',
          message: 'You must agree to the terms and conditions of the early access program to continue.',
          html: true,
          ok: {
            push: true,
            label: 'Agree',
            color: 'primary'
          },
          cancel: {
            push: true,
            label: 'Cancel'
          },
        }).onOk((data) => {
          TTT.enterpimsdialogclick_afteragree()
        })
      }
    },
    enterpimsdialogclick_afteragree () {
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
      this.backend_connection_store.update_user_profile({user_profile: response.data})

      // next line duplicated in Profile and ProfilePimsDetaiForm and in SignUpToEarlyAccess
      const url = window.location.origin + '/#/v/' + response.data.pims.verify_code + '/' + response.data.pims.number

      //const form_vals = bigin_form_values.orig
      const form_vals = bigin_form_values.second_default

      var bodyFormData = new FormData()
      bodyFormData.append('xnQsjsdp', form_vals.xnQsjsdp);
      bodyFormData.append('zc_gad', '');
      bodyFormData.append('xmIwtLD', form_vals.xmIwtLD);
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
      bodyFormData.append('Pipeline', form_vals.pipeline);
      bodyFormData.append('Stage', form_vals.stage);

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
      this.$emit('process_done', {success: true})
    },
    submitpimsinfo_fail (response) {
      console.log('ERROR failed to update PIMS information ', response)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Failed to update PIMS information ' + response,
        timeout: 2000
      })
      this.$emit('process_done', {success: false})
    }
  },
})
</script>

<style>
.toc_dialog {
}
.toc_dialog h1 {
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
}
.toc_dialog p {
  margin: 0px;
}
</style>
