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

export default defineComponent({
  name: 'SignUpToEarlyAccessPage',
  components: {
    LoginButton
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
      return 99
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
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

</style>
