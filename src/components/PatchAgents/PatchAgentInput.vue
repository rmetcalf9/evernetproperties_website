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
    <q-dialog v-model="edit_dialog.visible">
      <q-card class="patchagentinput-qcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Selling Agent Notes</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="full-width">
          <div class="row full-width">
            <PatchAgentNotes
              ref="PatchAgentNotes"
            />
          </div>
          <q-card-actions align="right" class="text-primary full-width">
            <q-btn icon="link_off" @click="unlinkfromagentnotesbtnclick" />
            <q-btn label="Cancel" @click="this.edit_dialog.visible = false" />
            <q-btn color="primary" label="Save" @click="editdialogsavebtnclick" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'
import PatchAgentNotes from './PatchAgentNotes.vue'

import { uuidv4 } from 'node-common-library'

export default defineComponent({
  name: 'PatchAgentInput',
  props: ['ever_saved', 'loaded_project_id', 'patch_id', 'selling_agent', 'selling_agent_id'],
  emits: ['update:selling_agent', 'update:selling_agent_id'],
  components: {
    PatchAgentNotes
  },
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
      edit_dialog: {
        visible: false
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
      const TTT = this
      if (!this.ever_saved) {
        return // can not connect to notes if not saved
      }
      if (this.selling_agent_id === '') {
        this.add_dialog.agent_name = this.selling_agent
        this.add_dialog.visible = true
      } else {
        this.edit_dialog.visible = true
        setTimeout(function () {
          const selected_agent = TTT.patchagents_data.agents[TTT.selling_agent_id]
          // console.log('aa', selected_agent)
          TTT.$refs.PatchAgentNotes.init(
            selected_agent.agent_name,
            selected_agent.agent_notes,
            selected_agent.projects,
            TTT.loaded_project_id
          )
        }, 100)
      }
    },
    createbtnclick () {
      const TTT = this
      if (this.add_dialog.agent_name === '') {
        return
      }
      const update_agent_callback = {
        ok: TTT.createbtnclick_create_saveagentpatches_success,
        error: TTT.createbtnclick_create_saveagentpatches_fail
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
        TTT.dataCachesStore.save({
          backend_connection_store: TTT.backend_connection_store,
          object_type: 'patchagents',
          object_data: TTT.patchagents_data,
          callback: update_agent_callback
        })
      } else {
        this.updateSellingAgentId(this.add_dialog_linking_item.id)
        this.updateSellingAgent('')
        if (this.patchagents_data.agents[this.add_dialog_linking_item.id].projects.includes(this.loaded_project_id)) {
          // Project already in this agent no need to add
          this.add_dialog.visible = false
          this.edit_dialog.visible = true
          setTimeout(function () {
            const selected_agent = TTT.patchagents_data.agents[TTT.selling_agent_id]
            TTT.$refs.PatchAgentNotes.init(
              selected_agent.agent_name,
              selected_agent.agent_notes,
              selected_agent.projects,
              TTT.loaded_project_id
            )
          }, 100)
          return
        }
        TTT.patchagents_data.agents[this.add_dialog_linking_item.id].projects.push(TTT.loaded_project_id)
        TTT.dataCachesStore.save({
          backend_connection_store: TTT.backend_connection_store,
          object_type: 'patchagents',
          object_data: TTT.patchagents_data,
          callback: update_agent_callback
        })
      }
    },
    createbtnclick_create_saveagentpatches_fail (response) {
      console.log('ss', response)
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
    createbtnclick_create_saveagentpatches_success (response) {
      const TTT = this
      this.patchagents_data = response.data
      this.add_dialog.visible = false
      this.edit_dialog.visible = true
      setTimeout(function () {
        const selected_agent = TTT.patchagents_data.agents[TTT.selling_agent_id]
        TTT.$refs.PatchAgentNotes.init(
          selected_agent.agent_name,
          selected_agent.agent_notes,
          selected_agent.projects,
          TTT.loaded_project_id
        )
      }, 100)
    },
    editdialogsavebtnclick () {
      const changed_agent_data = this.$refs.PatchAgentNotes.get_agent_data()
      this.patchagents_data.agents[this.selling_agent_id]['agent_name'] = changed_agent_data['agent_name']
      this.patchagents_data.agents[this.selling_agent_id]['agent_notes'] = changed_agent_data['agent_notes']

      const update_agent_callback = {
        ok: this.createbtnclick_create_editagentpatches_success,
        error: this.createbtnclick_create_saveagentpatches_fail
      }
      this.dataCachesStore.save({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patchagents',
        object_data: this.patchagents_data,
        callback: update_agent_callback
      })
    },
    createbtnclick_create_editagentpatches_success (response) {
      this.patchagents_data = response.data
      this.edit_dialog.visible = false
    },
    unlinkfromagentnotesbtnclick () {
      const TTT = this
      const cur_project = TTT.dataCachesStore.get_direct_from_cache({
        object_type: 'projects',
        object_id: this.loaded_project_id
      })
      var cur_project_name = ''
      if (typeof (cur_project.project_name) !== 'undefined') {
        cur_project_name = cur_project.project_name
      }
      this.$q.dialog({
        title: 'Unlink agent notes',
        message: 'This will unlink these notes from the project "' + cur_project_name + '". Are you sure?',
        html: false,
        ok: {
          push: true,
          label: 'Unlink',
          color: 'red'
        },
        cancel: {
          push: true,
          label: 'Cancel',
          color: 'primary'
        },
      }).onOk((data) => {
        TTT.unlinkfromagentnotesbtn()
      })
    },
    unlinkfromagentnotesbtn () {
      const TTT = this
      this.patchagents_data.agents[this.selling_agent_id]['projects'] = this.patchagents_data.agents[this.selling_agent_id]['projects'].filter(function (x) {
        return x !== TTT.loaded_project_id
      })
      this.updateSellingAgentId('')
      const update_agent_callback = {
        ok: this.createbtnclick_create_editagentpatches_success,
        error: this.createbtnclick_create_saveagentpatches_fail
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
.patchagentinput-qcard {
  min-width: 70vw;
}
</style>
