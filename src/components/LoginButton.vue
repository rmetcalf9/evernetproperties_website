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
        @click="logout"
        color="primary"
        label="Logout"
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
      this.backend_connection_store.login()
    },
    logout () {
      this.backend_connection_store.logout()
    }
  }
})
</script>

<style>
</style>
