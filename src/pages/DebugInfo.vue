<template>
  <q-page class="flex flex-center column main-page">
    <div class="heading">Debug</div>
    <q-item>
       <q-item-section>
       <q-item-label>Make browser clear all caches for this app</q-item-label>
       <q-btn color="primary" label="Force Reload" @click="forcereload" >
       </q-btn>
       </q-item-section>
     </q-item>
     <q-item>
      codebasever: {{ codebasever }}
      <br/>
      isConnected: {{ isConnected }}
      <br/>
      isLoggedIn: {{ isLoggedin }}
    </q-item>
    <div :v-if="isConnected">
      serverInfo: {{ serverInfo }}
    </div>
    <div :v-if="isLoggedin">
      <q-item>
       userID: {{ user_profile.id }}
       <br/>
       userpofile_frontend_instance: {{ user_profile.frontend_instance }}
     </q-item>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify, Cookies } from 'quasar'
import { useBackendConnectionStore } from 'stores/backend_connection'
import rjmversion from '../rjmversion'

export default defineComponent({
  name: 'DebugPage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      codebasever: rjmversion.codebasever
    }
  },
  computed: {
    isConnected () {
      return this.backend_connection_store.isConnected
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    },
    serverInfo () {
      return this.backend_connection_store.server_info
    }
  },
  methods: {
    forcereload () {
      let cookies_for_this_site = []
      Object.keys(Cookies.getAll()).map(function (x) {
        cookies_for_this_site.push(x)
      })
      cookies_for_this_site.map(function (x) {
        Cookies.remove(x)
      })
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => registration.update())
        })
      }
      this.backend_connection_store.logout()
      window.location.reload(true)
    }
  }
})
</script>

<style>
.heading {
  font-size: xxx-large;
  font-weight: 600;
}
</style>
