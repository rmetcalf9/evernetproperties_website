<template>
  <div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'


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
  methods: {
    save_project ({list_of_cards}) {
      Notify.create({
        color: 'positive',
        message: 'Project Serializer - TODO Implement save',
        timeout: 2000
      })
    }
  },
  mounted (){
    console.log('ProjectSerializer mounted')
  }
})

</script>

<style>
</style>
