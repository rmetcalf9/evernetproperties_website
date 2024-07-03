<template>
  <div>
    <div class="q-pa-md">
      <q-table
        flat bordered
        title="Projects"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="address" :props="props">
              {{ props.row.address }}
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
            <div v-if="rows.length === 0">
              No projects in this patch - use the BRR calculator to create one
              <CommonBRRToolLink />
            </div>
            <div v-if="rows.length !== 0">
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
  props: ['patch_data_projects'],
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
      rows: [],
      filter: '',
      columns: [
        {
          name: 'address',
          required: true,
          label: 'Address',
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
    recursive_load_project_details () {
      const items_to_load = this.rows.filter(function (x) {
        return x.loaded === false
      })
      if (items_to_load.length === 0) {
        return
      }
      const item_to_load = items_to_load[0]

      const TTT = this
      const callback = {
        ok: function (response) {
          item_to_load.loaded=true
          item_to_load.address=response.data.sub_section_details.dealbasicinfo.address
          TTT.recursive_load_project_details()
        },
        error: function (response) {
          item_to_load.loaded=true
          item_to_load.address='TODO LOAD FAIL'
          TTT.recursive_load_project_details()
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects/' + item_to_load.id,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    }
  },
  mounted () {
    this.rows = this.patch_data_projects.map(function (x) {
      return {
        id: x,
        loaded: false,
        address: 'loading...'
      }
    })
    this.recursive_load_project_details()
  }
})
</script>

<style>
</style>
