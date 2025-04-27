<template>
  <div>
    <q-chip clickable @click="click_filter_chip('Stages')" :removable="isFiltered('Stages')" @remove="click_stages_select_all" color="primary" text-color="white" icon-remove="close">
      {{ filter_text('Stages') }}
    </q-chip>
    <q-chip clickable @click="click_filter_chip('Agents')" :removable="isFiltered('Agents')" @remove="click_agents_select_all" color="primary" text-color="white" icon-remove="close">
      {{ filter_text('Agents') }}
    </q-chip>
    <q-chip clickable @click="click_filter_chip('Sources')" :removable="isFiltered('Sources')" @remove="click_sources_select_all" color="primary" text-color="white" icon-remove="close">
      {{ filter_text('Sources') }}
    </q-chip>
    <q-dialog v-model="dialog_stages">
      <q-card class="todoitem-dialogcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Filter Stages</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="col project_table_filters_any_filter">
            <div class="row">
              <div v-for="stage in stages" :key="stage.workflow_stage_id">
                <q-checkbox
                  v-model="stage.selected" :label="stage.stage.name"
                  @click="emit_filter_changed_signal"
                />
              </div>
            </div>
            <div class="row">
              <div class="project_table_filters_any_filter_button">
                <q-btn color="primary" label="Select all" @click="click_stages_select_all" />
              </div>
              <div class="project_table_filters_any_filter_button">
                <q-btn color="primary" label="Select none" @click="click_stages_select_none" />
              </div>
              <div class="project_table_filters_any_filter_button">
                <q-btn color="primary" label="Select active" @click="click_stages_select_active" />
              </div>
              <div class="project_table_filters_any_filter_button">
                <q-btn color="secondary" label="Close" @click="close_all_dialogs"/>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_agents">
      <q-card class="todoitem-dialogcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Filter Agents</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="row project_table_filters_any_filter">
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
            <div class="project_table_filters_any_filter_button">
              <q-btn color="secondary" label="Close" @click="close_all_dialogs"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_sources">
      <q-card class="todoitem-dialogcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Filter Sources</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="row project_table_filters_any_filter">
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
            <div class="project_table_filters_any_filter_button">
              <q-btn color="secondary" label="Close" @click="close_all_dialogs"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
      dialog_stages: false,
      dialog_sources: false,
      dialog_agents: false
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
    close_all_dialogs () {
      this.dialog_stages=false
      this.dialog_agents=false
      this.dialog_sources=false
    },
    click_filter_chip (filter_type) {
      this.close_all_dialogs()
      if (filter_type === 'Stages') {
        this.dialog_stages = true
        return
      }
      if (filter_type === 'Agents') {
        this.dialog_agents = true
        return
      }
      this.dialog_sources=true
    },
    _isFiltered (calced) {
      let a = calced.filter(function (x) {
        return !x.selected
      })
      return a.length>0
    },
    isFiltered (filter_type) {
      if (filter_type === 'Stages') {
        return this._isFiltered(this.stages)
      }
      if (filter_type === 'Sources') {
        return this._isFiltered(this.sources)
      }
      return this._isFiltered(this.agents)
    },
    onlyActiveShowing () {
      let retVal = true
      this.stages.forEach(function (x) {
        if (x.stage.active) {
          if (!x.selected) {
            retVal = false
          }
        } else {
          // not an active stage
          if (x.selected) {
            retVal = false
          }
        }
      })

      return retVal
    },
    filter_text (filter_type) {
      if (filter_type === 'Stages') {
        if (this.onlyActiveShowing()) {
          return 'Filter: Active Stages'
        }
      }
      if (!this.isFiltered(filter_type)) {
        return 'Filter: ' + filter_type + ' - not filtered'
      }
      return 'Filter: ' + filter_type
    },
    set_selected_stages (new_stages) {
      this.stages.forEach(function (x) {
        if (new_stages.includes(x.workflow_stage_id)) {
          x.selected = true
        } else {
          x.selected = false
        }
      })
      this.agents.forEach(function (x) {
        x.selected = true
      })
      this.sources.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
    },
    get_current_filter () {
      // Added so I can read the filter without signal being emitted
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
      return {
        selected_stages: selected_stages,
        selected_agents: selected_agents,
        selected_sources: selected_sources
      }
    },
    emit_filter_changed_signal () {
      this.$emit('filterchanged', this.get_current_filter())
    },
    click_stages_select_none () {
      this.stages.forEach(function (x) {
        x.selected = false
      })
      this.emit_filter_changed_signal()
      // this.close_all_dialogs()
    },
    click_stages_select_all () {
      this.stages.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
      // this.close_all_dialogs()
    },
    click_agents_select_none () {
      this.agents.forEach(function (x) {
        x.selected = false
      })
      this.emit_filter_changed_signal()
      // this.close_all_dialogs()
    },
    click_agents_select_all () {
      this.agents.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
      // this.close_all_dialogs()
    },
    click_sources_select_none () {
      this.sources.forEach(function (x) {
        x.selected = false
      })
      this.emit_filter_changed_signal()
      // this.close_all_dialogs()
    },
    click_sources_select_all () {
      this.sources.forEach(function (x) {
        x.selected = true
      })
      this.emit_filter_changed_signal()
      // this.close_all_dialogs()
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
      // this.close_all_dialogs()
    }
  },
  mounted () {
  }
})
</script>

<style>
.project_table_filters_any_filter {
  background: white;
}
.project_table_filters_any_filter_button {
  padding: 5px;
}
</style>
