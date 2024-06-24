<template>
  <q-page class="flex flex-center">
    <div rows>
      <div class="verify_block" v-if="show_verify_block">
        <h1>Verify PIMS member</h1>
        <div>Name: </div>
        <div>PIMS Number: </div>
        <div>Does this match? (search <a href="https://www.thepims.co.uk/members/" target="_new">https://www.thepims.co.uk/members/</a>)</div>
      </div>
      <div>
        <div>Extra features avaialible to Samueel Leeds acemedy members</div>
        <LoginButton />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useRoute } from 'vue-router'

import LoginButton from '../components/LoginButton.vue'

export default defineComponent({
  name: 'VerifyPimsPage',
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
      show_verify_block: false
    }
  },
  computed: {
    isAdmin () {
      return this.backend_connection_store.hasRole({role: 'admin'})
    }
  },
  watch: {
    isAdmin: function (val) {
      this.refresh()
    }
  },
  methods: {
    refresh () {
      if (this.isAdmin) {
        console.log('TODOxx', this.route.params.verifycode, this.route.params.pimsnumber)
        this.show_verify_block = true
      }
    }
  },
  mounted () {
    this.refresh()
  }
})
</script>

<style>
.verify_block {
  border: 2px;
  border-color: black;
  border-style: solid;
  margin: 10px;
  padding: 5px;
}
</style>
