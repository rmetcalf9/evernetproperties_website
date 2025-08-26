<template>
  <div class="brrcalctoolbar">
    <q-btn color="primary" icon="call" label="Selling agent" @click="open_dialog" />
    <q-dialog v-model="dialog_visible">
      <q-card class="callsellingagent-qcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Log call with selling agent</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div>
            <q-input
              filled clearable v-model="spoke_to" label="Spoke to"
              :rules="[val => val.length>2 || 'Too short']"
            />
            </div>
          <div>
            <q-input
              filled
              autogrow
              v-model="notes"
              label="Notes"
              :rules="[val => val.length>2 || 'Too short']"
            />
          </div>
          <div v-if="show_selling_agent_notes" class="callsellingagent-agentnotessection">
            <div class="callsellingagent-agentnotessection-title">Agent Notes</div>
            <PatchAgentNotes
              ref="PatchAgentNotes"
            />
            <q-btn
              v-if="show_selling_agent_notes" color="secondary" icon="call" label="Save Agent Notes Only" @click="save_notes_and_close"
              size="sm"
            />
          </div>
          <q-card-actions align="right" class="text-primary">
            <q-btn label="Cancel" @click="this.dialog_visible = false" />
            <q-btn color="primary" icon="call" label="Save" @click="click_selling_agent_btn" :disable="isDisabled" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'
import PatchAgentNotes from '../../../components/PatchAgents/PatchAgentNotes.vue'

export default defineComponent({
  name: 'BrrCalcToolbarCallSellingAgent',
  emits: ['activity_log'],
  components: { PatchAgentNotes },
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
      dialog_visible: ref(false),
      spoke_to: '',
      notes: '',
      // We only show the selling agent notes if both of the following are set:
      project_id: '',
      patch_id: '',
      selling_agent_id: ''
    }
  },
  computed: {
    patchagents_data () {
      if (this.patch_id === '') {
        return undefined
      }
      return this.dataCachesStore.get_direct_from_cache({ object_type: 'patchagents', object_id: this.patch_id })
    },
    show_selling_agent_notes () {
      if (typeof (this.patchagents_data) === 'undefined') {
        return false
      }
      if (typeof(this.project_id) === 'undefined') {
        return false
      }
      if (this.project_id === '') {
        return false
      }
      if (this.patch_id === '') {
        return false
      }
      if (this.selling_agent_id === '') {
        return false
      }
      return true
    },
    isDisabled () {
      if (this.spoke_to.length < 1) {
        return true
      }
      if (this.notes < 3) {
        return true
      }
      return false
    }
  },
  methods: {
    set_project_id (project_id) {
      this.project_id = project_id
    },
    set_patch_id (patch_id) {
      this.patch_id = patch_id
    },
    set_selling_agent_id(selling_agent_id) {
      this.selling_agent_id = selling_agent_id
    },
    open_dialog () {
      const TTT = this
      this.dialog_visible = true
      this.spoke_to = ''
      this.notes = ''
      setTimeout(function () {
        const selected_agent = TTT.patchagents_data.agents[TTT.selling_agent_id]
        // console.log('aa', selected_agent)
        TTT.$refs.PatchAgentNotes.init(
          selected_agent.agent_name,
          selected_agent.agent_notes,
          selected_agent.projects,
          TTT.project_id
        )
      }, 100)

    },
    click_selling_agent_btn () {
      const obj = {
        type: 'call_agent',
        text: 'Called selling agent spoke to (' + this.spoke_to + ') - ' + this.notes,
        head_notes: undefined
      }
      this.save_notes()
      this.$emit('activity_log', obj)
      this.dialog_visible = false
    },
    save_notes_and_close () {
      this.save_notes()
      this.dialog_visible = false
    },
    save_notes () {
      if (!this.show_selling_agent_notes) {
        return
      }
      const changed_agent_data = this.$refs.PatchAgentNotes.get_agent_data()
      this.patchagents_data.agents[this.selling_agent_id]['agent_name'] = changed_agent_data['agent_name']
      this.patchagents_data.agents[this.selling_agent_id]['agent_notes'] = changed_agent_data['agent_notes']
      const update_agent_callback = {
        ok: function (response) {},
        error: this.save_notes_fail
      }
      this.dataCachesStore.save({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patchagents',
        object_data: this.patchagents_data,
        callback: update_agent_callback
      })
    },
    save_notes_fail (response) {
      console.log('save_notes_fail', response)
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
    }
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
.callsellingagent-agentnotessection {
  background: #FFE1B3;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  padding: 5px;
}
.callsellingagent-agentnotessection-title {
  font-weight: 600;
}
.callsellingagent-qcard {
  min-width: 70vw;
}
</style>
