<template>
<q-card inline class="q-ma-sm card-style">
  <q-card-section>
    <div class="text-h6">Workflow - {{ workflow_model.name }}</div>
    <div class="col">
      <div>
        <h3>Stage: {{ workflow_model.stages[workflow_data.current_stage].name }}</h3>
      </div>
      <table v-if="typeof (workflow_model.stages[workflow_data.current_stage].progression) !== 'undefined'">
        <tbody>
          <tr>
            <td>
              <div class="workflow_success_progress_button_div" v-for="item in workflow_model.stages[workflow_data.current_stage].progression.success" :key="item.next_stage">
                <q-btn color="positive" icon="donut_large" :label="'Progress to next stage (' + workflow_model.stages[item.next_stage].name + ')'" @click="progress(item.next_stage)" />
              </div>
            </td>
            <td v-if="typeof (workflow_model.stages[workflow_data.current_stage].progression.failed) !== 'undefined'">
              <q-btn color="negative" icon="directions_off" :label="workflow_model.stages[workflow_model.stages[workflow_data.current_stage].progression.failed].name" @click="progress(workflow_model.stages[workflow_data.current_stage].progression.failed)" />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="resetbuttondiv"
        v-if="workflow_data.current_stage !== workflow_model.initial_stage"
      >
        <q-btn icon="donut_large" :label="'Reset workflow'" @click="progress(workflow_model.initial_stage)" />
      </div>
    </div>

  </q-card-section>
</q-card>
</template>

<script>
import { defineComponent } from 'vue'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import Workflow_main from '../Workflow/Workflow_main.js'

function get_default_workflow_data (default_workflow_id) {
  return {
    workflow_used_id: default_workflow_id,
    current_stage: Workflow_main.get_default_workflow_initial_stage(default_workflow_id)
  }
}

export default defineComponent({
  name: 'BrrCalcWorkflow',
  emits: ['projectchanged', 'activity_log', 'click_save_btn'],
  props: {
    default_workflow_id: {
      type: String,
      default: Workflow_main.default_workflow_id
    }
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
      workflow_data: get_default_workflow_data(Workflow_main.default_workflow_id),
      emit_project_change_notification: true
    }
  },
  computed: {
    serializer_card_data () {
      return this.workflow_data
    },
    workflow_model () {
      return Workflow_main.workflow2(this.backend_connection_store, this.dataCachesStore)[this.workflow_data.workflow_used_id]
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'Workflow')
      }
    }
  },
  methods: {
    progress (next_stage_id) {
      const TTT = this
      const obj = {
        type: 'wf_move',
        text: 'From ' + this.workflow_model.stages[this.workflow_data.current_stage].name + ' to ' + this.workflow_model.stages[next_stage_id].name,
        head_notes: 'Progressed through workflow',
        immediate_save_after_log: true
      }
      this.workflow_data.current_stage = next_stage_id
      this.$emit('activity_log', obj)
      // this.$emit('projectchanged') NOT NEEDED - activity log does this
    },
    serializer_load_data (workflow_data) {
      this.emit_project_change_notification = false
      if (typeof (workflow_data.workflow_used_id) === 'undefined') {
        this.workflow_data = get_default_workflow_data(this.default_workflow_id)
      } else {
        this.workflow_data = workflow_data
      }

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  },
  mounted () {
    this.workflow_data = get_default_workflow_data(this.default_workflow_id)
  }
})
</script>

<style>
.resetbuttondiv {
  padding: 10px;
}
.workflow_success_progress_button_div {
  padding: 5px;
}
</style>
