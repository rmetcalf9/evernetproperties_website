<template>
  <q-page class="flex flex-center">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <h1>{{ patch_data.name }}</h1>
      <h2>Projects</h2>
      <div>{{ patch_data.projects }}</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'ToolsCansavePatchePage',
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
      loaded: false,
      patch_data: {}
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    },
    refresh () {
      const TTT = this
      const callback = {
        ok: TTT.refresh_success,
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Failed to find patch information',
            timeout: 2000
          })
          TTT.$router.push('/tools/cansave/patches')
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/patches/' + TTT.$route.params.patchid,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    },
    refresh_success (response) {
      this.patch_data = response.data
      this.loaded = true
    }
  },
  mounted () {
    this.loaded = false
    this.refresh()
  }
})
</script>

<style>

</style>
