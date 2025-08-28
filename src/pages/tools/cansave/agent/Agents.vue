<template>
<q-page class="flex flex-center">
  <div class="cols">
    <h1>Agent Notes</h1>
    <div v-if="!loaded">
      Loading...
    </div>
    <div v-if="loaded">
      <h2>{{ patch_data.name }}</h2>
      <p>Agents with notes:</p>
      <div>
        <q-list dense>
          <q-item
            v-for="(agent, key) in patchagents_data.agents" :key='key'
            clickable v-ripple
            @click="clickpatchagent(key)"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="edit" />
            </q-item-section>
            <q-item-section>
              {{ agent.agent_name }} ({{ agent.projects.length}})
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</q-page>

</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

export default defineComponent({
  name: 'AgentsPage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const dataCachesStore = useDataCachesStore()
    return {
      backend_connection_store,
      dataCachesStore
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    patch_data () {
      return this.dataCachesStore.get_direct_from_cache({ object_type: 'patches', object_id: this.$route.params.patchid })
    },
    patchagents_data () {
      return this.dataCachesStore.get_direct_from_cache({ object_type: 'patchagents', object_id: this.$route.params.patchid })
    }
  },
  methods: {
    refresh () {
      const TTT = this
      const callback = {
        ok: TTT.refresh_success,
        error: TTT.refresh_error
      }
      this.dataCachesStore.get({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patches',
        object_id: TTT.$route.params.patchid,
        skip_cache: false,
        callback: callback
      })
    },
    refresh_success (response) {
      // Ignore response - it was captured by the cache and the computed property will now read it
      const TTT = this
      const callback = {
        ok: TTT.refresh_success2,
        error: TTT.refresh_error
      }
      this.dataCachesStore.get({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patchagents',
        object_id: TTT.$route.params.patchid,
        skip_cache: false,
        callback: callback
      })
    },
    refresh_success2 (response) {
      // Ignore response - it was captured by the cache and the computed property will now read it
      this.loaded = true
    },
    refresh_error (response) {
      Notify.create({
        color: 'negative',
        message: 'Failed to find patch information',
        timeout: 2000
      })
      this.$router.push('/tools/cansave/patches')
    },
    clickpatchagent (selling_agent_id) {
      this.$router.push('/tools/agents/' + this.$route.params.patchid + '/' + selling_agent_id)
    },
  },
  mounted () {
    this.loaded = false
    this.refresh()
  }
})

</script>

<style>
</style>
