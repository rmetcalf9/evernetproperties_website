<template>
  <div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'


export default defineComponent({
  name: 'ProjectSerializer',
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
  mounted (){
    console.log('ProjectSerializer mounted')
  }
})

</script>

<style>
</style>
