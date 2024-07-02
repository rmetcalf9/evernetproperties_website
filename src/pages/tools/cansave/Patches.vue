<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Select Patch</h1>
      <div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'

export default defineComponent({
  name: 'ToolsCansavePatchesPage',
  components: {
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
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    }
  },
  mounted () {
  }
})
</script>

<style>
</style>
