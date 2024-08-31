<template>
  <div :class="getMainStyle">
    <div>
      <div id="g_id_onload"
           :data-client_id="googleclientid"
           data-context="signin"
           data-ux_mode="popup"
           :data-login_uri="login_url"
           data-itp_support="true">
      </div>
      <div class="g_id_signin"
        ref="g_id_signin"
        :style="googlebuttonstyle"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_blue"
        data-text="signin"
        data-size="large"
        data-logo_alignment="left"
      >
      </div>
    </div>
    <div v-if="isConnected && !isLoggedin && !isLogininprogress && showOldStyle">
      <q-btn
        @click="autoriseWithGoogle"
        color="primary"
        :label="googleloginbuttonlabel"
        class = "q-ml-xs"
      ></q-btn>
    </div>
    <div v-if="isConnected && !isLoggedin">
      <q-btn round dense flat icon="question_mark" @click="help" />
    </div>
    <div v-if="isLoggedin">
      <q-btn
        @click="clickProfile"
        color="primary"
        label="User Profile"
        class = "q-ml-xs"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

import { useBackendConnectionStore } from 'stores/backend_connection'


export default defineComponent({
  name: 'LoginButtonComponent',
  props: {
    floating: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
    }
  },
  computed: {
    getMainStyle () {
      if (this.floating) {
        return 'float-right row'
      }
      return 'row'
    },
    showOldStyle () {
      return false
    },
    isConnected () {
      return this.backend_connection_store.isConnected
    },
    isLogininprogress () {
      return this.backend_connection_store.isLogininprogress
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    googleclientid () {
      return this.$rjmgclientid
    },
    login_url () {
      const url = window.location.origin + '/googleloginredirect'

      return url
    },
    googleloginbuttonlabel () {
      return 'Login for extra features'
    },
    googlebuttonstyle () {
      if (this.isConnected && !this.isLoggedin && !this.isLogininprogress) {
        return ''
      }
      return "visibility: hidden;"
    }
  },
  methods: {
    autoriseWithGoogle () {
      const login_callback = {
        ok: function (response) {
        },
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: response,
            timeout: 2000
          })
        }
      }
      this.backend_connection_store.login(login_callback, this.$rjmgclientid)
    },
    clickProfile () {
      this.$router.push("/profile")
    },
    help () {
      this.$q.dialog({
        title: 'Problems logging in',
        message: 'If you are having problems logging in check your browser settings to make sure you have got third party sign in enabled.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    },
    renderbutton () {
      var TTT = this
      function localcallback(tokenResponse) {
        TTT.backend_connection_store.login_from_google_provided_button(tokenResponse, TTT.login_callback)
      }
      window.google.accounts.id.initialize({
        client_id: this.$rjmgclientid,
        callback: localcallback
      });
      window.google.accounts.id.renderButton(this.$refs.g_id_signin, {
          theme: 'filled_blue',
          size: 'large',
          type: 'standard',
          text: 'signin',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '120',
      });
    }
  },
  mounted (){
    this.renderbutton()
  }
})
</script>

<style>
</style>
