<template>
  <q-page class="patchpageclass">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <div v-if="table_view">
        <h1>{{ patch_data.name }}</h1>
        <h2>Projects <q-btn color="primary" icon="account_tree" label="Worlflow" @click="table_view = false" /></h2>
        <div
          v-if="isStageSelected"
          class="selected_stage"
        >
          Stage {{ selectedStageText }} <q-btn color="primary" icon="close" round @click="clearselectesstage" />
        </div>
        <div>
          <ProjectTable
            :projects="filtered_loaded_projects"
            :prefiltered="isStageSelected"
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

import Workflow_main from '../../../components/Workflow/Workflow_main.js'


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
      filtered_loaded_projects: [],
      selected_stage: {
        workflow_id: undefined,
        stage_id: undefined
      },
      table_view: true
    }
  },
  watch: {
    loaded_projects(val) {
      // console.log('watch loaded projects', val)
      this.recompute_filtered_projects()
    }
  },
  computed: {
    isStageSelected () {
      return typeof (this.selected_stage.workflow_id) !== 'undefined'
    },
    selectedStageText () {
      return Workflow_main.workflows[this.selected_stage.workflow_id].stages[this.selected_stage.stage_id].name
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    recompute_filtered_projects () {
      const TTT = this
      this.filtered_loaded_projects = this.loaded_projects.filter(function (x) {
        if (!TTT.isStageSelected) {
          return true
        }
        if (typeof ( TTT.patch_data.workflow_lookup[TTT.selected_stage.workflow_id]) === 'undefined') {
          return false
        }
        if (typeof ( TTT.patch_data.workflow_lookup[TTT.selected_stage.workflow_id][TTT.selected_stage.stage_id]) === 'undefined') {
          return false
        }
        return TTT.patch_data.workflow_lookup[TTT.selected_stage.workflow_id][TTT.selected_stage.stage_id].filter(function (y) {
          return x.id === y
        }).length > 0
      })
    },
    clearselectesstage () {
      this.selected_stage = {
        workflow_id: undefined,
        stage_id: undefined
      }
      this.recompute_filtered_projects()
    },
    onchartclickstage (workflow_id, stage_id, stage_data) {
      this.selected_stage = {
        workflow_id: workflow_id,
        stage_id: stage_id
      }
      this.recompute_filtered_projects()
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
          item: undefined
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
          item_to_load.item=response.data
          TTT.recompute_filtered_projects()
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
.patchpageclass {
  margin-left: 5%;
  margin-right: 5%;
}
.patchpageclass h1 {
  font-size: 4rem;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
}
.patchpageclass h2 {
  font-size: 3rem;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 10px;
}
.selected_stage {
  font-weight: 800;
  font-size: 26px;
}
</style>
