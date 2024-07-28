<template>
  <div>
    <div class="q-pa-md">
      <q-table
        flat bordered
        title="Projects"
        :rows="projects"
        :columns="columns"
        :filter="filter"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr class="projecttablerow" :props="props" @click="onRowClick(props.row)">
            <q-td key="address" :props="props">
              <div v-if="!props.row.loaded">
                Loading...
              </div>
              <div v-if="props.row.loaded">
                {{ props.row.item.dealbasicinfo.address }}
              </div>
            </q-td>
            <q-td key="visionandnotes" :props="props">
              <div v-if="props.row.loaded">
                <div class="projecttablehead">{{ props.row.item.vision.devplan }}</div>
                <div v-if="typeof (props.row.item.dealbasicinfo.notes) !== 'undefined'">
                  <div v-for="line_item in props.row.item.dealbasicinfo.notes.split(' ')" :key='line_item'>
                    {{ line_item }}
                  </div>
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>


        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" clearable placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:no-data="{}">
          <div>
            <div v-if="projects.length === 0">
              No projects in this patch - use the BRR calculator to create one
              <CommonBRRToolLink />
            </div>
            <div v-if="projects.length !== 0">
              No projects match the filter
            </div>
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

export default defineComponent({
  name: 'ToolsCansavePatchePage',
  props: ['projects'],
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
          name: 'visionandnotes',
          required: true,
          label: 'Vision and Notes',
          align: 'left',
          field: 'address',
          sortable: true
        }
      ]
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    onRowClick (table_row) {
      this.$router.push('/tools/brrcalc?projectid=' + table_row.id)
    },
  },
  mounted () {
  }
})
</script>

<style>
.projecttablehead {
  font-weight: 800;
}
.projecttablerow td {
  vertical-align: top;
}
</style>
