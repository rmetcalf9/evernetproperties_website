<template>
<q-page class="flex flex-center">
  <div class="cols">
    <div v-if="!loaded">
      Loading...
    </div>
    <div v-if="loaded">
      <h1>{{ patch_data.name }}</h1>
      <h2>Agent Notes for {{ selected_agent.agent_name }}</h2>
      <PatchAgentNotes
        ref="PatchAgentNotes"
        :openProjectInNewTab="false"
      />
    </div>
    <div class="agent-actionbuttons">
      <q-btn label="Cancel" @click="clickcancelbtn" />
      <q-btn color="primary" icon="save" label="Save" @click="clicksavebtn" />
      <q-btn
        v-if="(selected_agent.projects.length === 0)"
        color="negative" icon="delete" label="Delete" @click="clickdeletebtn"
      />
    </div>
  </div>
</q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import PatchAgentNotes from '../../../../components/PatchAgents/PatchAgentNotes.vue'


export default defineComponent({
  name: 'AgentPage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const dataCachesStore = useDataCachesStore()
    return {
      backend_connection_store,
      dataCachesStore
    }
  },
  components: {
    PatchAgentNotes
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
    },
    selected_agent () {
        return this.patchagents_data.agents[this.$route.params.sellingagentid]
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
      const TTT = this
      this.loaded = true
      setTimeout(function () {
        TTT.$refs.PatchAgentNotes.init(
          TTT.selected_agent.agent_name,
          TTT.selected_agent.agent_notes,
          TTT.selected_agent.projects,
          undefined
        )
      }, 100)

    },
    refresh_error (response) {
      Notify.create({
        color: 'negative',
        message: 'Failed to find patch information',
        timeout: 2000
      })
      this.$router.push('/tools/cansave/patches')
    },
    clickcancelbtn () {
      this.$router.push('/tools/agents/' + this.$route.params.patchid)
    },
    clicksavebtn () {
      const changed_agent_data = this.$refs.PatchAgentNotes.get_agent_data()
      this.patchagents_data.agents[this.$route.params.sellingagentid]['agent_name'] = changed_agent_data['agent_name']
      this.patchagents_data.agents[this.$route.params.sellingagentid]['agent_notes'] = changed_agent_data['agent_notes']

      const update_agent_callback = {
        ok: this.clicksavebtn_success,
        error: this.clicksavebtn_fail
      }
      this.dataCachesStore.save({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patchagents',
        object_data: this.patchagents_data,
        callback: update_agent_callback
      })
    },
    clicksavebtn_success (response) {
      this.$router.push('/tools/agents/' + this.$route.params.patchid)
    },
    clicksavebtn_fail (response) {
      console.log('clicksavebtn_fail', response)
      if (typeof (response.response) !== 'undefined') {
        if (typeof (response.response.data) !== 'undefined') {
          if (typeof (response.response.data.message) !== 'undefined') {
            Notify.create({
              color: 'bg-grey-2',
              message: response.response.data.message,
              timeout: 2000,
              color: 'negative'
            })
            return
          }
        }
      }
      Notify.create({
        color: 'bg-grey-2',
        message: response.message,
        timeout: 2000,
        color: 'negative'
      })
    },
    clickdeletebtn () {
      if (this.selected_agent.projects.length !== 0) {
        return
      }
      const TTT = this
      this.$q.dialog({
        title: 'Delete agent notes',
        message: 'This will delete the notes for this agent (' + this.selected_agent.agent_name + '). Are you sure?',
        html: false,
        ok: {
          push: true,
          label: 'Delete',
          color: 'red'
        },
        cancel: {
          push: true,
          label: 'Cancel',
          color: 'primary'
        },
      }).onOk((data) => {
        TTT.deleteagentconfirmed()
      })
    },
    deleteagentconfirmed () {
      delete this.patchagents_data.agents[this.$route.params.sellingagentid]
      const update_agent_callback = {
        ok: this.clicksavebtn_success,
        error: this.clicksavebtn_fail
      }
      this.dataCachesStore.save({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patchagents',
        object_data: this.patchagents_data,
        callback: update_agent_callback
      })
    }
  },
  mounted () {
    this.loaded = false
    this.refresh()
  }
})
</script>

<style>
.agent-actionbuttons > button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
