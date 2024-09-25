<template>
  <q-page class="todopageclass">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <div>TODO</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'ToolsCansaveTodoPage',
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
      loaded: false
    }
  },
  computed: {
  },
  methods: {
    refresh () {
      const TTT = this
      const callback = {
        ok: TTT.refresh_success,
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Failed to load todos',
            timeout: 2000
          })
          TTT.$router.push('/tools')
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/patchesxxx/' + TTT.$route.params.patchid,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    },
    refresh_success (response) {
      Notify.create({
        color: 'negative',
        message: 'Not implemented',
        timeout: 2000
      })
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
.todopageclass {
  margin-left: 5%;
  margin-right: 5%;
}
.todopageclass h1 {
  font-size: 4rem;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
}
.todopageclass h2 {
  font-size: 3rem;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
