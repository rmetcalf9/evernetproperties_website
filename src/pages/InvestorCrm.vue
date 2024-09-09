<template>
<q-page class="flex flex-center">
  <div class="main-page fit row wrap justify-center items-center content-center">
    <h2>Calling all Deal Sourcers!</h2>
    <div class="investorcrm-flex-break"></div>
    <div class="flex row first-section">
      <div>
        <img
          alt="Profile Picture"
          src="~assets/profile-pic.png"
          class="investorcrm-profile-picture"
        >
      </div>
      <div class="flex column" style="max-width: 500px;">
        <div class="investorcrm-para">Are you simply running a mailing list or are you actually <b>managing the relationship</b> you have with investors?</div>

        <div class="investorcrm-para">I have years of experience working on CRM systems and I would like to share this with you. I am running webinar sessions to show you how to use a CRM system to supercharge  your business.</div>

        <div v-for="feature in features" :key="feature" class="investorcrm-list-item"><q-icon name="check_box" color="green" size="32px" />{{ feature }}</div>
      </div>
    </div>
    <div class="investorcrm-flex-break"></div>
    <div class="investorcrm-para-title">Sign up for our Deal Sourcer CRM webinar</div>
    <div class="investorcrm-flex-break"></div>
    <div class="investorcrm-para">Fill out the form below to secure your spot in the next session!</div>
    <div class="investorcrm-flex-break"></div>
    <div v-if="!submitted">
      <q-input v-model="form_data.first_name" label="First Name"
        :rules="[ val => val.trim().length > 1 || 'Minimum 2 characters']"
        ref="first_nameref"
      />
      <q-input v-model="form_data.last_name" label="Last Name"
        :rules="[ val => val.trim().length > 1 || 'Minimum 2 characters']"
        ref="last_nameref"
      />
      <div class="row">
        <q-input v-model="form_data.phone" label="Phone"
          :rules="[ val => val.trim().length > 0 || 'Minimum 1 character']"
          ref="phoneref" class="col-grow"
        />
      </div>
      <div class="row">
        <q-input v-model="form_data.email" label="Email"
          :rules="[ val => val.trim().length > 7 || 'Minimum 8 characters']"
          ref="emailref" class="col-grow"
        />
      </div>
      <q-btn
        label="Submit"
        color="secondary"
        @click="submit_info"
      />
    </div>
    <div v-if="submitted">
      <div class="investorcrm-para-title">Thank you - we will be in touch</div>
    </div>
  </div>
</q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import axios from 'axios'

const bigin_form_values = {
  orig: {
    xnQsjsdp: 'bd43a2093c2314b47f4b9de486d85207d54b805ad6322b5455c8159001d9eab5',
    xmIwtLD: '0ae12d7f69d3c7ea9f0497a159c39bd039032c4df1824bbb5178afa1e53cfe9dd15b6402dab2f9df9c73c98b82b2ddb8',
    pipeline: 'Sourcers met at Networking Standard',
    stage: 'Met'
  }
}


export default defineComponent({
  name: 'InvestorCrmPage',
  components: {
  },
  data () {
    return {
      submitted: false,
      features: [
        'Collect investor contacts in person',
        'Follow up!',
        'Build process to train investors how to buy a deal',
        'Do this again and again',
        'Avoid drowning in admin',
        'Succeed by design, not by accident'
      ],
      form_data: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      }
    }
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  computed: {
    frontendInstance () {
      return this.backend_connection_store.frontendInstance
    },
  },
  methods: {
    submit_info () {
      const TTT = this
      const form_vals = bigin_form_values.orig

      // Potential Name LOOKS wrong but I think Bigin uses the master pipeline field name always
      var bodyFormData = new FormData()
      bodyFormData.append('xnQsjsdp', form_vals.xnQsjsdp);
      bodyFormData.append('zc_gad', '');
      bodyFormData.append('xmIwtLD', form_vals.xmIwtLD);
      bodyFormData.append('actionType', 'UG90ZW50aWFscw==');
      bodyFormData.append('returnURL', undefined);
      bodyFormData.append(
        'Potential Name', TTT.frontendInstance + ' Website InvestorCRM' + TTT.form_data.last_name
      );
      bodyFormData.append('Contacts.First Name', TTT.form_data.first_name);
      bodyFormData.append('Contacts.Last Name', TTT.form_data.last_name);
      bodyFormData.append('Contacts.Phone', TTT.form_data.phone);
      bodyFormData.append('Contacts.Email', TTT.form_data.email);
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
        TTT.submitted = true
      })
      .catch(function (response) {
        //handle error
        console.log('Failed to register on CRM')
        console.log(response);
      })
    }
  }
})
</script>

<style>
.investorcrm-para {
  padding-bottom: 10px;
  font-size: 1.2rem;
}
.investorcrm-list-item {
  font-size: 1.2rem;
}
.investorcrm-para-title {
  font-size: 3rem;
  font-weight: 600;
}
.investorcrm-profile-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
}
.investorcrm-flex-break {
  flex: 1 0 100%
}
</style>
