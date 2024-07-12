<template>
  <q-page class="flex flex-center">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <div v-if="table_view">
        <h1>{{ patch_data.name }}</h1>
        <h2>Projects <q-btn color="primary" icon="account_tree" label="Worlflow" @click="table_view = false" /></h2>
        <div>
          <ProjectTable
            :projects="loaded_projects"
          />
        </div>
        <q-btn color="primary" label="Add Project" @click="clicknewproject" />
      </div>
      <div v-if="!table_view">
        <WrokflowChart
          :patch_data="patch_data"
          @onclickstage="onchartclickstage"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'

import ProjectTable from '../../../components/ProjectTable.vue'
import WrokflowChart from '../../../components/Workflow/Chart.vue'


export default defineComponent({
  name: 'ToolsCansavePatchePage',
  components: {
    ProjectTable, WrokflowChart
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      loaded: false,
      patch_data: {},
      loaded_projects: [],
      table_view: true
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    onchartclickstage (stage_id, stage_data) {
      console.log('clicked onchartclickstage', stage_id, stage_data)
      this.table_view = true
    },
    clicknewproject () {
      this.$router.push('/tools/brrcalc?patchid=' + this.$route.params.patchid)
    },
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    },
    refresh () {
      const TTT = this
      const callback = {
        ok: TTT.refresh_success,
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Failed to find patch information',
            timeout: 2000
          })
          TTT.$router.push('/tools/cansave/patches')
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/patches/' + TTT.$route.params.patchid,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    },
    refresh_success (response) {
      this.patch_data = response.data
      this.loaded_projects = this.patch_data.projects.map(function (x) {
        return {
          id: x,
          loaded: false,
          address: 'loading...'
        }
      })
      this.recursive_load_project_details()
      this.loaded = true
    },
    recursive_load_project_details () {
      const items_to_load = this.loaded_projects.filter(function (x) {
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
    this.loaded = false
    this.refresh()
  }
})
</script>

<style>

</style>
