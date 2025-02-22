<template>
<q-page class="flex ">
  <div class="rentcalc-page fit col wrap justify-center items-center content-center">
    <div>
      <h1>Rent Project</h1>
    </div>
  </div>
</q-page>
</template>

<script>
import { defineComponent } from 'vue'

import { useBackendConnectionStore } from 'stores/backend_connection'

export default defineComponent({
  name: 'CalcBrrToFlip',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      tab: 'main',
      isMounted: false,
      loaded_project_id: ''
    }
  },
  computed: {
  },
  methods: {
  },
  mounted (){
    const TTT = this
    if (typeof (TTT.$route.query.projectid) === 'undefined') {
      // No project ID so go to tools
      this.$router.push('/tools')
      return
    }
    // May not have processed autologin from token yet. Give time for this to happen
    setTimeout(function () {
      console.log('TODO load')
      // TTT.call_load_api()
    }, 1000)
  }
})
</script>

<style>
.rentcalc-page h1 {
  font-size: 3rem;
  line-height: 3rem;
  margin: 0px;
}
.rentcalc-page {
  margin: 10px;
  padding: 0px;
}

</style>
