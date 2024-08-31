<template>
  <q-page class="flex justify-center signuptoearlyaccesspage">
    <div rows style="max-width: 800px;">
      <h2>Property Pipeline Builder!</h2>
      <h3>Early access program</h3>
      <h3>Sign up</h3>
      <div v-if="step === 1">
        <h4>Step 1</h4>
        <p>Sign into the website</p>
        <div width="100%" class="">
          <LoginButton
            :floating="false"
          />
        </div>
      </div>
      <div v-if="step === 2">
        <h4>Step 2</h4>
        <p>Our early access program is limited to members of the Samuel Leeds academy. To verify this we need to check your PIMS number. Please provide details below exactly as they appear on the  <a href="https://www.thepims.co.uk/members/" target="_new">PIMS website</a>.</p>
        <ProfilePimsDetailForm
          supresscancelbutton
        />
      </div>
      <div v-if="step === 3">
        <h4>Step 3</h4>
        <p>Your PIMS details have been submitted and you need to be verified. To verify your identity we confirm by verifying you from the academy whatsapp chat. Please add the following message into the chat:</p>
        <div class="pimstext" @click="clickcopypimsverfiylink"><div v-html="pimsverfiylink"></div>&nbsp;
          <q-icon class="float-right" name="content_copy" size="16px" />
        </div>
        <p>Once we have received the message we will verify you and grant you access. You will receive an email at the email address you provided.</p>
        <div>
          <q-btn
            color="positive"
            label="While you are waiting check out our training section"
            @click="click_training"
          />
        </div>
      </div>
      <div v-if="step === 50">
        <h4>Sign up Complete!!</h4>
        <p>Congratulations! Your PIMS details have been verified and you have granted access to the program.</p>
        <div style="margin-bottom: 10px;">
          <q-btn
            color="positive"
            label="Click here (or on “tools”) to get started"
            @click="click_get_started"
          />
        </div>
        <div>
          <q-btn
            label="Or here to access our training section"
            @click="click_training"
          />
        </div>
      </div>
      <div v-if="step ===51">
        <h4>Step 2</h4>
        <p>Our early access program is limited to members of the Samuel Leeds academy. To verify this we need to check your PIMS number. Please provide details below exactly as they appear on the  <a href="https://www.thepims.co.uk/members/" target="_new">PIMS website</a>.</p>
        <div class="signuptoearlyaccess_note">Verification failed. You can try re-entering your data and resubmitting.</div>
        <ProfilePimsDetailForm
          supresscancelbutton
        />
      </div>
      <div v-if="step === 99">
        NOT DONE - {{ user_profile.pims.state }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useRoute } from 'vue-router'
import { Notify } from 'quasar'
import LoginButton from '../components/LoginButton.vue'
import ProfilePimsDetailForm from '../components/ProfilePimsDetailForm.vue'
import utils from '../utils.js'

export default defineComponent({
  name: 'SignUpToEarlyAccessPage',
  components: {
    LoginButton,
    ProfilePimsDetailForm
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const route = useRoute()
    return {
      backend_connection_store,
      route
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    step () {
      if (!this.isLoggedin) {
        return 1
      }
      if (this.user_profile.pims.state === 'VERIFIED') {
        return 50
      }
      if (this.user_profile.pims.state === 'NOTENTERED') {
        return 2
      }
      if (this.user_profile.pims.state === 'WAITINGVERIFICATION') {
        return 3
      }
      if (this.user_profile.pims.state === 'VERIFICATIONFAILED') {
        return 51
      }
      return 99
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    },
    pimsverfiylink () {
      // next line duplicated in Profile and ProfilePimsDetaiForm and in SignUpToEarlyAccess
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
    click_get_started () {
      this.$router.push('/tools')
    },
    click_training () {
      this.$router.push('/tools/training')
    }
  }
})
</script>

<style>
.pimstext {
  border: 1px;
  border-color: black;
  border-style: dashed;
  padding: 5px;
  background: lightgrey;
  margin: 10px;
}
.signuptoearlyaccesspage h2 {
  margin-top: 50px;
  margin-bottom: 0px;
  text-align: center;
}
.signuptoearlyaccesspage h3 {
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: center;
}
.signuptoearlyaccesspage h4 {
}
.signuptoearlyaccesspage p {
  font-size: 1.2rem;
}
.signuptoearlyaccess_note {
  font-size: 1.2rem;
  margin: 20px;
  padding: 10px;
  border: 1px;
  border-color: black;
  border-style: dashed;
  background: #f1948a;

}

</style>
