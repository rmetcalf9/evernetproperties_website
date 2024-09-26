<template>
  <div class="projecttablecontainer">
    <div class="projecttablestyle">
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
        @row-click="(evt, row, index) => onRowClick(row)"
      >
        <template v-slot:body-cell-visionandnotes="props">
          <q-td>
            <div v-if="props.row.loaded">
              <div class="projecttablehead">{{ props.row.devplan }}</div>
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
import { Notify } from 'quasar'
import CommonBRRToolLink from '../components/CommonBRRToolLink.vue'

import Workflow_main from '../components/Workflow/Workflow_main.js'

export default defineComponent({
  name: 'ToolsCansavePatchePage',
  props: ['projects', 'prefiltered'],
  components: {
    CommonBRRToolLink
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
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
          sortable: false
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
            stage: ''
          }
        }
        return {
          id: project.id,
          loaded: project.loaded,
          address: project.item.sub_section_details.dealbasicinfo.address,
          source: TTT.get_source_text(project),
          selling_agent: project.item.sub_section_details.dealbasicinfo.selling_agent,
          vandnotes: 'NOT DISPLAYED',
          devplan: project.item.sub_section_details.vision.devplan,
          notes: project.item.sub_section_details.dealbasicinfo.notes,
          stage: TTT.getWorkflowStage(project.item.workflow).name
        }
      })
    }
  },
  methods: {
    get_source_text (row) {
      if (typeof (row.item.sub_section_details.dealbasicinfo.deal_source) === 'undefined') {
        return 'Self'
      }
      if (row.item.sub_section_details.dealbasicinfo.deal_source.type === 'self') {
        return 'Self'
      }
      return row.item.sub_section_details.dealbasicinfo.deal_source.value
    },
    getWorkflowStage ({workflow_used_id, current_stage}) {
      return Workflow_main.workflows[workflow_used_id].stages[current_stage]
    },
    onRowClick (table_row) {
      this.$router.push('/tools/brrcalc?projectid=' + table_row.id)
    },
  },
  mounted () {
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
