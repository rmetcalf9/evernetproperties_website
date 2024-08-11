<template>
  <div class="projecttablecontainer">
    <div class="projecttablestyle">
      <q-table
        flat bordered
        title="Projects"
        :rows="projects"
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        row-key="name"
      >
        <template v-slot:body-cell-address="props">
          <q-td @click="onRowClick(props.row)">
            <div v-if="!props.row.loaded">
              Loading...
            </div>
            <div v-if="props.row.loaded">
              {{ props.row.item.sub_section_details.dealbasicinfo.address }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-workflowstage="props">
          <q-td @click="onRowClick(props.row)">
            <div v-if="props.row.loaded">
              <div v-if="typeof (props.row.item.workflow) !== 'undefined'">
                {{ getWorkflowStage(props.row.item.workflow).name }}
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-visionandnotes="props">
          <q-td @click="onRowClick(props.row)">
            <div v-if="props.row.loaded">
              <div class="projecttablehead">{{ props.row.item.sub_section_details.vision.devplan }}</div>
              <div v-if="typeof (props.row.item.sub_section_details.dealbasicinfo.notes) !== 'undefined'">
                <div v-for="line_item in props.row.item.sub_section_details.dealbasicinfo.notes.split('\n')" :key='line_item'>
                  {{ line_item }}
                </div>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-source="props">
          <q-td @click="onRowClick(props.row)">
            <div v-if="props.row.loaded">
              <div>{{ get_source_text(props.row) }}</div>
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
          field: 'address',
          sortable: true
        },
        {
          name: 'visionandnotes',
          required: true,
          label: 'Vision and Notes',
          align: 'left',
          field: 'address',
          sortable: true
          },
          {
            name: 'source',
            required: true,
            label: 'Source',
            align: 'left',
            field: 'address',
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
