<template>
  <div class="row">
    <q-input
      v-if="selling_agent_id === ''"
      filled
      clearable
      :model-value="selling_agent"
      @update:model-value="updateSellingAgent"
      label="Selling Agent"
      class="col"
    />
    <q-input
      v-if="selling_agent_id !== ''"
      filled
      readonly
      :model-value="caculated_selling_agent"
      label="Selling Agent"
      class="col"
    />
    <q-btn
      v-if="ever_saved"
      :color="notesbtncolour"
      @click="notesbtnclick"
      class="patchagentinput-notesbutton"
      :icon="notesbtnicon"
    />
    <q-btn
      v-if="ever_saved && selling_agent_id !== ''"
      color="primary"
      @click="updateSellingAgentId('')"
      class="patchagentinput-notesbutton"
      label="tmpdis"
    />
    <q-dialog v-model="add_dialog.visible">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add notes to selling agent</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row">
            <q-input
              filled
              clearable
              v-model="add_dialog.agent_name"
              label="Agent Name"
              class="col"
            />
            <q-btn
              color="primary"
              @click="createbtnclick"
              :label="adddialogcreatebuttonlabel"
              class="patchagentinput-adddialogcreatebutton"
              :disable="createbtndisable"
            />
          </div>
          <div>
            <q-virtual-scroll
              style="height: 200px;"
              :items="known_agent_list"
              separator
              v-slot="{ item, index }"
            >
              <q-item
                :key="index"
                dense
              >
                <q-item-section @click="this.add_dialog.agent_name = item.label">
                  <q-item-label>
                    {{ item.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-virtual-scroll>
          </div>
          <q-card-actions align="right" class="text-primary">
            <q-btn label="Cancel" @click="this.add_dialog.visible = false" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import { uuidv4 } from 'node-common-library'

export default defineComponent({
  name: 'PatchAgentInput',
  props: ['ever_saved', 'loaded_project_id', 'patch_id', 'selling_agent', 'selling_agent_id'],
  emits: ['update:selling_agent', 'update:selling_agent_id'],
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
      add_dialog: {
        visible: false,
        agent_name: ''
      },
      loaded: false,
      patchagents_data: {}
    }
  },
  watch: {
    patch_id(newValue, oldValue) {
      this.loaded = false
      this.refresh()
    }
  },
  computed: {
    caculated_selling_agent () {
      if (typeof (this.patchagents_data.agents) === 'undefined') {
        return ''
      }
      if (typeof (this.selling_agent_id) === 'undefined') {
        return ''
      }
      if (this.selling_agent_id === '') {
        return ''
      }
      return this.patchagents_data.agents[this.selling_agent_id].agent_name
    },
    notesbtnicon () {
      if (this.selling_agent_id === '') {
        return 'note_add'
      }
      return 'edit_document'
    },
    notesbtncolour () {
      if (this.selling_agent_id === '') {
        return 'undefined'
      }
      return 'primary'
    },
    createbtndisable () {
      if (this.add_dialog.agent_name === '') {
        return true
      }
      return !this.loaded
    },
    add_dialog_linking_item () {
      const TTT = this
      const link_targets = this.known_agent_list_unfiltered.filter(function (x) {
        const agentName = TTT?.add_dialog?.agent_name
        if (agentName == null || agentName === '') {
          return false
        }
        return x.label.toLowerCase() === TTT.add_dialog.agent_name.toLowerCase()
      })
      if (link_targets.length === 0) {
        return {id: undefined, label: 'None'}
      }
      return link_targets[0]
    },
    adddialogcreatebuttonlabel () {
      if (typeof (this.add_dialog_linking_item.id) === 'undefined') {
        return 'Create'
      }
      return 'Link'
    },
    known_agent_list_unfiltered () {
      // for (let i = 0; i < 10; i++) {
      //  this.known_agent_list_unfiltered.push({
      //    id: i.toString(),
      //    label: 'Abce' + i.toString()
      //  })
      // }
      const TTT = this
      if (typeof (this.patchagents_data.agents) == 'undefined') {
        return []
      }
      var ret_val = []
      Object.keys(this.patchagents_data.agents).forEach(function (x) {
        // this.patchagents_data.agents
        ret_val.push({
          id: x,
          label: TTT.patchagents_data.agents[x].agent_name
        })
      })
      return ret_val
    },
    known_agent_list () {
      const TTT = this
      return this.known_agent_list_unfiltered.filter(function (x) {
        const agentName = TTT?.add_dialog?.agent_name
        if (agentName == null || agentName === '') {
          return true
        }
        return x.label.toLowerCase().includes(TTT.add_dialog.agent_name.toLowerCase())
      })
    }
  },
  methods: {
    refresh () {
      var TTT = this
      if (TTT.patch_id === 'notset') {
        console.log('Patch ID not set can not load')
        return
      }
      const callback = {
        ok: TTT.load_patchagents_api_success,
        error: TTT.load_patchagents_api_fail
      }
      TTT.dataCachesStore.get({
        backend_connection_store: TTT.backend_connection_store,
        object_type: 'patchagents',
        object_id: TTT.patch_id,
        skip_cache: false,
        callback: callback
      })
    },
    load_patchagents_api_fail (response) {
      console.log('patchagents load failed', response)
    },
    load_patchagents_api_success (response) {
      this.patchagents_data = response.data
      this.loaded = true
    },
    updateSellingAgent (value) {
      this.$emit('update:selling_agent', value)
    },
    updateSellingAgentId (value) {
      this.$emit('update:selling_agent_id', value)
    },
    notesbtnclick () {
      if (!this.ever_saved) {
        return // can not connect to notes if not saved
      }
      if (this.selling_agent_id === '') {
        this.add_dialog.agent_name = this.selling_agent
        this.add_dialog.visible = true
      } else {
        console.log('TODO show edit existing notes dialog')
        // this.updateSellingAgentId('')
        // this.updateSellingAgent('SET BLANK')
      }
    },
    createbtnclick () {
      const TTT = this
      if (this.add_dialog.agent_name === '') {
        return
      }
      if (typeof (this.add_dialog_linking_item.id) === 'undefined') {
        const new_agent_id = uuidv4()
        const new_agent = {
          agent_name: this.add_dialog.agent_name,
          agent_notes: '',
          projects: [this.loaded_project_id]
        }
        this.patchagents_data.agents[new_agent_id] = new_agent
        this.updateSellingAgentId(new_agent_id)
        this.updateSellingAgent('')
        const callback = {
          ok: TTT.createbtnclick_create_saveagentpatches_success,
          error: TTT.createbtnclick_create_saveagentpatches_fail
        }
        TTT.dataCachesStore.save({
          backend_connection_store: TTT.backend_connection_store,
          object_type: 'patchagents',
          object_data: TTT.patchagents_data,
          callback: callback
        })
      } else {
        this.updateSellingAgentId(this.add_dialog_linking_item.id)
        this.updateSellingAgent('')
        console.log('TODO add this project to the agent and save agent')
        // Add project to this agent
        // TODO Launch  view dialog
      }
    },
    createbtnclick_create_saveagentpatches_fail (response) {
      console.log('createbtnclick_create_saveagentpatches_fail')
    },
    createbtnclick_create_saveagentpatches_success (response) {
      this.patchagents_data = response.data

      // TODO Launch  view dialog
    }
  },
  mounted () {
    this.refresh()
  }
})

</script>

<style>
.patchagentinput-notesbutton {
  margin: 10px;
}
.patchagentinput-adddialogcreatebutton {
  margin: 10px;
}
</style>
