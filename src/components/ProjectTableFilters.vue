<template>
  <div class="row project_table_filters_stages_filter">
    <div>Stage:</div>
    <div v-for="stage in stages" :key="stage.workflow_stage_id">
      <q-checkbox
        v-model="stage.selected" :label="stage.stage.name + ' (' + stage.num_usages + ')'"
        @click="click_stage_checkbox(stage)"
      />
    </div>
    <div class="project_table_filters_stages_filter_button">
      <q-btn color="primary" label="Select all" @click="click_stages_select_all" />
    </div>
    <div class="project_table_filters_stages_filter_button">
      <q-btn color="primary" label="Select none" @click="click_stages_select_none" />
    </div>
    <div class="project_table_filters_stages_filter_button">
      <q-btn color="primary" label="Select active" @click="click_stages_select_active" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import Workflow_main from './Workflow/Workflow_main.js'

export default defineComponent({
  name: 'ProjectTableFilterComponent',
  props: ['projects'],
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
      selected_stages: []
    }
  },
  computed: {
    stages () {
      const TTT = this
      let persentStages = {}
      this.projects.forEach(function (x) {
        if (x.loaded) {
          const workflow_stage_id = Workflow_main.get_workflow_stage_key(x.item.workflow.workflow_used_id, x.item.workflow.current_stage)
          // console.log('persentStages', persentStages, persentStages[workflow_stage_id])
          if (workflow_stage_id in persentStages) {
            persentStages[workflow_stage_id].num_usages += 1
          } else {
            persentStages[workflow_stage_id] = {
              workflow_stage_id: workflow_stage_id,
              workflow_id: x.item.workflow.workflow_used_id,
              stage_id: x.item.workflow.current_stage,
              num_usages: 1,
              stage: Workflow_main.getWorkflowStage(x.item.workflow.workflow_used_id, x.item.workflow.current_stage),
              selected: TTT.selected_stages.includes(workflow_stage_id)
            }
          }
        }
      })
      let retval = []
      Object.keys(persentStages).forEach(function (x) {
        retval.push(persentStages[x])
      })
      return retval
    },
    filter_stages_options () {
      return [
        {label: 'Call Agent', value: 'agent'},
        {label: 'Call Sourcer', value: 'sourcer'},
        {label: 'Other', value: 'other'}
      ]
    }
  },
  methods: {
    click_stage_checkbox (stage) {
      if (this.selected_stages.includes(stage.workflow_stage_id)) {
        this.selected_stages = this.selected_stages.filter(e => e !== stage.workflow_stage_id)
      } else {
        this.selected_stages.push(stage.workflow_stage_id)
      }
    },
    click_stages_select_none () {
      this.selected_stages = []
    },
    click_stages_select_all () {
      let all_stages = []
      this.stages.forEach(function (x) {
        all_stages.push(x.workflow_stage_id)
      })
      this.selected_stages = all_stages
    },
    click_stages_select_active () {
      let all_stages = []
      this.stages.forEach(function (x) {
        if (typeof (x.stage.active) !== 'undefined') {
          if (x.stage.active) {
            all_stages.push(x.workflow_stage_id)
          }
        }
      })
      this.selected_stages = all_stages
    }
  },
  mounted () {
  }
})
</script>

<style>
.project_table_filters_stages_filter {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 5px;
}
.project_table_filters_stages_filter_button {
  padding: 5px;
}
</style>
