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
              <div v-for="item in workflow_model.stages[workflow_data.current_stage].progression.success" :key="item.next_stage">
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

import Workflow_main from '../Workflow/Workflow_main.js'

function get_default_workflow_data () {
  return {
    workflow_used_id: Workflow_main.default_workflow_id,
    current_stage: Workflow_main.workflows[Workflow_main.default_workflow_id].initial_stage
  }
}

export default defineComponent({
  name: 'BrrCalcWorkflow',
  emits: ['projectchanged', 'activity_log'],
  data () {
    return {
      workflow_data: get_default_workflow_data(),
      emit_project_change_notification: true
    }
  },
  computed: {
    serializer_card_data () {
      return this.workflow_data
    },
    workflow_model () {
      return Workflow_main.workflows[this.workflow_data.workflow_used_id]
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
      const obj = {
        type: 'wf_move',
        text: 'From ' + this.workflow_model.stages[this.workflow_data.current_stage].name + ' to ' + this.workflow_model.stages[next_stage_id].name,
        head_notes: 'Progressed through workflow'
      }
      this.workflow_data.current_stage = next_stage_id
      this.$emit('activity_log', obj)
      // this.$emit('projectchanged') NOT NEEDED - activity log does this
    },
    serializer_load_data (workflow_data) {
      this.emit_project_change_notification = false
      if (typeof (workflow_data.workflow_used_id) === 'undefined') {
        this.workflow_data = get_default_workflow_data()
      } else {
        this.workflow_data = workflow_data
      }

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  }
})
</script>

<style>
.resetbuttondiv {
  padding: 10px;
}
</style>
