<template>
  <q-page class="patchpageclass">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <h1 v-if="tab !== 'workflow'">{{ patch_data.name }}</h1>
      <q-tabs
        v-if="tab !== 'workflow'"
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="projects" label="Buy Projects" />
        <q-tab name="rent_projects" label="Rent Projects" />
        <q-tab name="todos" label="Todos" />
      </q-tabs>
      <div v-if="tab === 'projects'">
        <h2>
          Buy Projects <q-btn label="Pick from workflow" color="primary" @click="btn_click_workflow" class="float-right" />
        </h2>
        <div>
          <ProjectTable
            ref="BuyProjectTableRef"
            :projects="buy_filtered_loaded_projects"
            :prefiltered="true"
            :cumulatively_loaded_stages="buy_cumulatively_loaded_stages"
            :cumulatively_loaded_agents="buy_cumulatively_loaded_agents"
            :cumulatively_loaded_sources="buy_cumulatively_loaded_sources"
            @filterchanged="buy_projecttablefilterchanged"
          />
        </div>
        <q-btn color="primary" label="Add Project" @click="clicknewproject" />
      </div>
      <div v-if="tab === 'rent_projects'">
        <h2>
          Rent Projects <q-btn label="Pick from workflow TODO" color="primary" @click="btn_click_workflow" class="float-right" />
        </h2>
        <div>
        </div>
      </div>
      <div v-if="tab === 'todos'">
        <TodoDisplay
          :patch_id="patch_data.id"
        />
      </div>
      <div v-if="tab === 'workflow'">
        <WrokflowChart
          :patch_data="patch_data"
          @onclickstage="onchartclickstage"
        />
      </div>
    </div>
    <ProjectData
      ref="buyProjectData"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'

import ProjectData from '../../../components/ProjectData.vue'
import ProjectTable from '../../../components/ProjectTable.vue'
import WrokflowChart from '../../../components/Workflow/Chart.vue'

import Workflow_main from '../../../components/Workflow/Workflow_main.js'
import TodoDisplay from '../../../components/TodoDisplay.vue'
import utils from '../../../components/utils.js'


export default defineComponent({
  name: 'ToolsCansavePatchePage',
  components: {
    ProjectTable, WrokflowChart, TodoDisplay, ProjectData
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
      project_filter: {
        filter_stages: true,
        selected_stages: [],
        filter_agents: true,
        selected_agents: [],
        filter_sources: true,
        selected_sources: []
      },
      tab: 'projects'
    }
  },
  computed: {
    buy_filtered_loaded_projects () {
      return this.$refs.buyProjectData.filtered_loaded_projects
    },
    buy_cumulatively_loaded_stages () {
      return this.$refs.buyProjectData.cumulatively_loaded_stages
    },
    buy_cumulatively_loaded_sources () {
      return this.$refs.buyProjectData.cumulatively_loaded_sources
    },
    buy_cumulatively_loaded_agents () {
      return this.$refs.buyProjectData.cumulatively_loaded_agents
    },
    selectedStageText () {
      return Workflow_main.workflows[this.selected_stage.workflow_id].stages[this.selected_stage.stage_id].name
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    btn_click_workflow () {
      this.tab = 'workflow'
    },
    buy_projecttablefilterchanged (newfilter) {
      this.$refs.buyProjectData.projecttablefilterchanged(newfilter)
    },
    onchartclickstage (workflow_id, stage_id, stage_data) {
      const TTT=this
      this.tab = 'projects'
      setTimeout(function () {
        const stagekey = Workflow_main.get_workflow_stage_key(workflow_id, stage_id)
        TTT.$refs.BuyProjectTableRef.set_selected_stages([stagekey])
      }, 5)
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
    get_buy_current_project_filter () {
      return this.$refs.BuyProjectTableRef.get_current_filter()
    },
    refresh_success (response) {
      this.patch_data = response.data
      this.$refs.buyProjectData.refresh({
        project_ids_to_load: this.patch_data.projects.map(function (x) {
          return x
        }),
        patch_id: this.patch_data.id,
        get_cur_filter_fn: this.get_buy_current_project_filter
      })
      this.loaded = true
    },
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
