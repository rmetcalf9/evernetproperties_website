<template>
  <div class="float-right row">
    <div v-if="isConnected && !isLoggedin && !isLogininprogress">
      <q-btn
        @click="autoriseWithGoogle"
        color="primary"
        label="Login for extra features"
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
    isConnected () {
      return this.backend_connection_store.isConnected
    },
    isLogininprogress () {
      return this.backend_connection_store.isLogininprogress
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
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

  }
})
</script>

<style>
</style>
