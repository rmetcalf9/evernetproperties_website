<template>
  <div class="projecttablecontainer">
    <div class="projecttablestyle">
      <div class="row">
        <div class="col-grow">
          <ProjectTableFilters
            ref="ProjectTableFilters"
            :projects="projects"
            :cumulatively_loaded_stages="cumulatively_loaded_stages"
            :cumulatively_loaded_agents="cumulatively_loaded_agents"
            :cumulatively_loaded_sources="cumulatively_loaded_sources"
            @filterchanged="(obj) => $emit('filterchanged',obj)"
          />
        </div>
        <q-btn icon="refresh" flat round dense @click="() => $emit('refresh_button')"/>
      </div>
      <q-table
        flat bordered
        title="Projects"
        :rows="table_content"
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        row-key="name"
        @row-click="(evt, row, index) => $emit('onRowClick', {table_row: row, new_tab: false})"
      >
        <template v-slot:header-cell-todo="">
          <th align="left">Todo<br>due/total (done)</th>
        </template>

        <template v-slot:body-cell-address="props">
          <q-td>
            <q-popup-proxy context-menu>
              <q-banner>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="() => $emit('onRowClick', {table_row: props.row, new_tab: true})">
                    <q-item-section>Open in new tab...</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Cancel</q-item-section>
                  </q-item>
                </q-list>
              </q-banner>
            </q-popup-proxy>
            {{ props.row.address }}
          </q-td>
        </template>

        <template v-slot:body-cell-visionandnotes="props">
          <q-td>
            <div v-if="props.row.loaded">
              <div v-if="typeof (props.row.devplan) !== 'undefined'">
                <div v-for="line_item in props.row.devplan.split('\n')" :key='line_item' class="projecttablehead">
                  {{ line_item }}
                </div>
              </div>
              <div v-if="typeof (props.row.notes) !== 'undefined'">
                <div v-for="line_item in props.row.notes.split('\n')" :key='line_item'>
                  {{ line_item }}
                </div>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" clearable placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:no-data="{}">
          <div v-if="!prefiltered">
            <div v-if="projects.length === 0">
              No projects in this patch - use the BRR calculator to create one
              <CommonBRRToolLink />
            </div>
            <div v-if="projects.length !== 0">
              No projects match the filter
            </div>
          </div>
          <div v-if="prefiltered">
              No projects match the filter
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import { Notify } from 'quasar'
import CommonBRRToolLink from '../components/CommonBRRToolLink.vue'
import ProjectTableFilters from '../components/ProjectTableFilters.vue'
import commonProjectValues from './commonProjectValues.js'

import Workflow_main from '../components/Workflow/Workflow_main.js'

export default defineComponent({
  name: 'ToolsCansavePatchePage',
  props: ['projects', 'prefiltered', 'cumulatively_loaded_stages', 'cumulatively_loaded_agents', 'cumulatively_loaded_sources'],
  emits: ['filterchanged', 'onRowClick', 'refresh_button'],
  components: {
    CommonBRRToolLink,
    ProjectTableFilters
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
      filter: '',
      columns: [
        {
          name: 'address',
          required: true,
          label: 'Address',
          align: 'left',
          field: 'address',
          sortable: true
        },
        {
          name: 'workflowstage',
          required: true,
          label: 'Stage',
          align: 'left',
          field: 'stage',
          sortable: true
        },
        {
          name: 'visionandnotes',
          required: true,
          label: 'Vision and Notes',
          align: 'left',
          field: 'vandnotes',
          sortable: false
        },
        {
          name: 'source',
          required: true,
          label: 'Source',
          align: 'left',
          field: 'source',
          sortable: true
        },
        {
          name: 'agent',
          required: true,
          label: 'Agent',
          align: 'left',
          field: 'selling_agent',
          sortable: true
        },
        {
          name: 'todo',
          required: true,
          label: 'Todos',
          align: 'left',
          field: 'todo',
          sortable: false
        }
      ],
      initialPagination: {
        // sortBy: 'desc',
        // descending: false,
        // page: 2,
        rowsPerPage: 50
      }
    }
  },
  computed: {
    filter_stages_options () {
      return [
        {label: 'Call Agent', value: 'agent'},
        {label: 'Call Sourcer', value: 'sourcer'},
        {label: 'Other', value: 'other'}
      ]
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    },
    table_content () {
      const TTT = this
      return this.projects.map(function (project) {
        if (!project.loaded) {
          return {
            id: project.id,
            loaded: false,
            address: 'Loading...',
            source: '',
            selling_agent: '',
            vandnotes: '',
            devplan: '',
            notes: '',
            stage: TTT.getWorkflowStage(project.item.workflow).name,
            todo: ''
          }
        }
        return {
          id: project.id,
          loaded: project.loaded,
          address: commonProjectValues.address(project.item),
          source: TTT.get_source_text(project.item),
          selling_agent: commonProjectValues.sellingAgent(project.item, TTT.dataCachesStore),
          vandnotes: 'NOT DISPLAYED',
          devplan: commonProjectValues.devplan(project.item),
          notes: commonProjectValues.notes(project.item),
          stage: TTT.getWorkflowStage(project.item.workflow).name,
          todo: TTT.get_todo_text(project)
        }
      })
    }
  },
  methods: {
    get_current_filter () {
      return this.$refs.ProjectTableFilters.get_current_filter()
    },
    set_selected_stages (stages) {
      this.$refs.ProjectTableFilters.set_selected_stages(stages)
    },
    get_todo_text (project) {
      let notdue = 0
      let due = 0
      let done = 0
      if (typeof (project.item.todos) !== 'undefined') {
        notdue = project.item.todos.filter(function (x) {
          return !x.done && !x.due
        }).length
        due = project.item.todos.filter(function (x) {
          return !x.done && x.due
        }).length
        done = project.item.todos.filter(function (x) {
          return x.done
        }).length
      }
      return due.toString() + '/' + (notdue + due).toString() + ' (' + done.toString() + ')'
    },
    get_source_text (row) {
      return commonProjectValues.dealsource(row)
    },
    getWorkflowStage ({workflow_used_id, current_stage}) {
      return Workflow_main.workflow2(this.backend_connection_store, this.dataCachesStore)[workflow_used_id].stages[current_stage]
    }
  },
  mounted () {
    this.$refs.ProjectTableFilters.emit_filter_changed_signal()
  }
})
</script>

<style>
.projecttablecontainer {
  width: 100%;
  padding-right: 10px;
}
.projecttablehead {
  font-weight: 800;
}
.projecttablestyle td {
  vertical-align: top;
}
</style>
