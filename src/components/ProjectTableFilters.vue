<template>
  <div class="row project_table_filters_any_filter">
    <div>Stage:</div>
    <div v-for="stage in stages" :key="stage.workflow_stage_id">
      <q-checkbox
        v-model="stage.selected" :label="stage.stage.name"
        @click="emit_filter_changed_signal"
      />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select all" @click="click_stages_select_all" />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select none" @click="click_stages_select_none" />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select active" @click="click_stages_select_active" />
    </div>
  </div>
  <div class="row project_table_filters_any_filter">
    <div>Agent:</div>
    <div v-for="agent in agents" :key="agent.name">
      <q-checkbox
        v-model="agent.selected" :label="agent.name"
        @click="emit_filter_changed_signal"
      />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select all" @click="click_agents_select_all" />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select none" @click="click_agents_select_none" />
    </div>
  </div>
  <div class="row project_table_filters_any_filter">
    <div>Source:</div>
    <div v-for="source in sources" :key="source.name">
      <q-checkbox
        v-model="source.selected" :label="source.name"
        @click="emit_filter_changed_signal"
      />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select all" @click="click_sources_select_all" />
    </div>
    <div class="project_table_filters_any_filter_button">
      <q-btn color="primary" label="Select none" @click="click_sources_select_none" />
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
  props: ['projects', 'cumulatively_loaded_stages', 'cumulatively_loaded_agents', 'cumulatively_loaded_sources'],
  emits: ['filterchanged'],
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
    }
  },
  computed: {
    stages () {
      const TTT = this
      let retval = []
      Object.keys(TTT.cumulatively_loaded_stages).forEach(function (x) {
        retval.push(TTT.cumulatively_loaded_stages[x])
      })
      return retval
    },
    agents () {
      const TTT = this
      let retval = []
      Object.keys(TTT.cumulatively_loaded_agents).forEach(function (x) {
        retval.push(TTT.cumulatively_loaded_agents[x])
      })
      return retval
    },
    sources () {
      const TTT = this
      let retval = []
      Object.keys(TTT.cumulatively_loaded_sources).forEach(function (x) {
        retval.push(TTT.cumulatively_loaded_sources[x])
      })
      return retval
    },
    filter_stages_options () {
      return [
        {label: 'Call Agent', value: 'agent'},
        {label: 'Call Sourcer', value: 'sourcer'},
        {label: 'Other', value: 'other'}
      ]
    },
    isStageSelected (stage) {
      return true
    }
  },
  methods: {
    set_selected_stages (new_stages) {
      this.stages.forEach(function (x) {
        if (new_stages.includes(x.workflow_stage_id)) {
          x.selected = true
        } else {
          x.selected = false
        }
      })
      this.emit_filter_changed_signal()
    },
    emit_filter_changed_signal () {
      let selected_stages = []
      this.stages.forEach(function (x) {
        if (x.selected) {
          selected_stages.push(x.workflow_stage_id)
        }
      })
      let selected_agents = []
      this.agents.forEach(function (x) {
        if (x.selected) {
          selected_agents.push(x.name)
        }
      })
      let selected_sources = []
      this.sources.forEach(function (x) {
        if (x.selected) {
          selected_sources.push(x.name)
        }
      })
      this.$emit('filterchanged', {
        selected_stages: selected_stages,
        selected_agents: selected_agents,
        selected_sources: selected_sources
      })
    },
    click_stages_select_none () {
      this.stages.forEach(function (x) {
        x.selected = false
      })
      this.emit_filter_changed_signal()
    },
    click_stages_select_all () {
      this.stages.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
    },
    click_agents_select_none () {
      this.agents.forEach(function (x) {
        x.selected = false
      })
      this.emit_filter_changed_signal()
    },
    click_agents_select_all () {
      this.agents.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
    },
    click_sources_select_none () {
      this.sources.forEach(function (x) {
        x.selected = false
      })
      this.emit_filter_changed_signal()
    },
    click_sources_select_all () {
      this.sources.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
    },
    click_stages_select_active () {
      this.stages.forEach(function (x) {
        let sel = false
        if (typeof (x.stage.active) !== 'undefined') {
          sel=x.stage.active
        }
        x.selected = sel
      })
      this.emit_filter_changed_signal()
    }
  },
  mounted () {
  }
})
</script>

<style>
.project_table_filters_any_filter {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 5px;
}
.project_table_filters_any_filter_button {
  padding: 5px;
}
</style>
