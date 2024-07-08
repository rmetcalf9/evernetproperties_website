<template>
  <div>
    <div v-if="isConnected && !isLoggedin && !isLogininprogress">
      <q-btn
        @click="autoriseWithGoogle"
        color="primary"
        label="Login for extra features"
        class = "float-right q-ml-xs"
      ></q-btn>
    </div>
    <div v-if="isLoggedin">
      <q-btn
        @click="clickProfile"
        color="primary"
        label="User Profile"
        class = "float-right q-ml-xs"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

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
        }
      }
      this.backend_connection_store.login(login_callback, this.$rjmgclientid)
    },
    clickProfile () {
      this.$router.push("/profile")
    }
  }
})
</script>

<style>
</style>
