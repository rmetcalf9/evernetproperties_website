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
        <q-tab
          v-if="featureflags.rent_to_rent_projects"
          name="rent_projects"
          label="Rent Projects"
        />
        <q-tab name="todos" label="Todos" />
      </q-tabs>
      <div v-if="tab === 'projects'">
        <h2>
          Buy Projects <q-btn label="Pick from workflow" color="primary" @click="btn_click_workflow('purchase')" class="float-right" />
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
            @onRowClick="buy_onRowClick"
            @refresh_button="refresh_button('purchase')"
          />
        </div>
        <div class="patch-button-bar">
          <q-btn color="primary" label="Add Project" icon="add" @click="clicknewproject" />
          <q-btn color="primary" label="Patch Agent Notes" icon="edit" @click="clickpatchagentnotes" />
        </div>
      </div>
      <div v-if="tab === 'rent_projects'">
        <h2>
          Rent Projects <q-btn label="Pick from workflow" color="primary" @click="btn_click_workflow('rent')" class="float-right" />
        </h2>
        <div>
          <ProjectTable
            ref="RentProjectTableRef"
            :projects="rent_filtered_loaded_projects"
            :prefiltered="true"
            :cumulatively_loaded_stages="rent_cumulatively_loaded_stages"
            :cumulatively_loaded_agents="rent_cumulatively_loaded_agents"
            :cumulatively_loaded_sources="rent_cumulatively_loaded_sources"
            @filterchanged="rent_projecttablefilterchanged"
            @onRowClick="rent_onRowClick"
            @refresh_button="refresh_button('rent')"
          />
          <div class="patch-button-bar">
            <q-btn color="primary" label="Add Lead" @click="$router.push('/tools/rentproject/enterlead?defaultpatch=' + patch_data.id)" />
            <q-btn color="primary" label="Call Leads" @click="$router.push('/tools/rentproject/batchcallleads?patchid=' + patch_data.id)" />
            <q-btn color="primary" label="Show Viewings" @click="$router.push('/tools/rentproject/showviewingsforpatch?patchid=' + patch_data.id)" />
          </div>
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
          :workflow_id="workflow_id"
          @onclickstage="onchartclickstage"
        />
      </div>
    </div>
    <ProjectData
      ref="BuyProjectData"
      project_type="purchase"
    />
    <ProjectData
      ref="RentProjectData"
      project_type="rent"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import { Notify } from 'quasar'

import ProjectData from '../../../components/ProjectData.vue'
import ProjectTable from '../../../components/ProjectTable.vue'
import WrokflowChart from '../../../components/Workflow/Chart.vue'

import Workflow_main from '../../../components/Workflow/Workflow_main.js'
import TodoDisplay from '../../../components/TodoDisplay.vue'
import utils from '../../../components/utils.js'

import featureflags from '../../../featureflags.js'


export default defineComponent({
  name: 'ToolsCansavePatchePage',
  components: {
    ProjectTable, WrokflowChart, TodoDisplay, ProjectData
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
      loaded: false,
      patch_data: {},
      tab: 'projects',
      workflow_id: Workflow_main.default_workflow_id,
      workflow_return_type: undefined
    }
  },
  computed: {
    featureflags () {
      return featureflags
    },
    buy_filtered_loaded_projects () {
      return this.$refs.BuyProjectData.filtered_loaded_projects
    },
    buy_cumulatively_loaded_stages () {
      return this.$refs.BuyProjectData.cumulatively_loaded_stages
    },
    buy_cumulatively_loaded_sources () {
      return this.$refs.BuyProjectData.cumulatively_loaded_sources
    },
    buy_cumulatively_loaded_agents () {
      return this.$refs.BuyProjectData.cumulatively_loaded_agents
    },
    rent_filtered_loaded_projects () {
      return this.$refs.RentProjectData.filtered_loaded_projects
    },
    rent_cumulatively_loaded_stages () {
      return this.$refs.RentProjectData.cumulatively_loaded_stages
    },
    rent_cumulatively_loaded_sources () {
      return this.$refs.RentProjectData.cumulatively_loaded_sources
    },
    rent_cumulatively_loaded_agents () {
      return this.$refs.RentProjectData.cumulatively_loaded_agents
    },
    selectedStageText () {
      return Workflow_main.workflows[this.selected_stage.workflow_id].stages[this.selected_stage.stage_id].name
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    refresh_button (project_type) {
      this.dataCachesStore.reset()
      this.refresh()
      // In furute may refresh only rent or purchase
      // if (project_type === 'rent') {
      //   TTT.$refs.RentProjectData.xxx
      //   console.log('refresh press rent')
      // } else {
      //   TTT.$refs.BuyProjectData.xxx
      //   console.log('refresh press')
      // }
    },
    buy_onRowClick ({table_row, new_tab}) {
      if (new_tab) {
        const route = this.$router.resolve('/tools/brrcalc');
        const absoluteURL = new URL(route.href, window.location.origin + window.location.pathname).href + '?projectid=' + table_row.id;
        var handle = window.open(absoluteURL);
        window.focus();
        return
      }
      this.$router.push('/tools/brrcalc?projectid=' + table_row.id)
    },
    rent_onRowClick ({table_row, new_tab}) {
      if (new_tab) {
        const route = this.$router.resolve('/tools/rentproject/rentcalc');
        const absoluteURL = new URL(route.href, window.location.origin + window.location.pathname).href + '?projectid=' + table_row.id;
        var handle = window.open(absoluteURL);
        window.focus();
        return
      }
      this.$router.push('/tools/rentproject/rentcalc?projectid=' + table_row.id)
    },
    btn_click_workflow (type) {
      if (type==='rent') {
        this.workflow_id = Workflow_main.default_rent_workflow_id
      } else {
        this.workflow_id = Workflow_main.default_workflow_id
      }
      this.workflow_return_type = type
      this.tab = 'workflow'
    },
    buy_projecttablefilterchanged (newfilter) {
      this.$refs.BuyProjectData.projecttablefilterchanged(newfilter)
    },
    rent_projecttablefilterchanged (newfilter) {
      this.$refs.RentProjectData.projecttablefilterchanged(newfilter)
    },
    onchartclickstage (workflow_id, stage_id, stage_data) {
      const TTT=this
      if (this.workflow_return_type==='rent') {
        this.tab = 'rent_projects'
        setTimeout(function () {
          const stagekey = Workflow_main.get_workflow_stage_key(workflow_id, stage_id)
          TTT.$refs.RentProjectTableRef.set_selected_stages([stagekey])
        }, 5)
        return
      }
      this.tab = 'projects'
      setTimeout(function () {
        const stagekey = Workflow_main.get_workflow_stage_key(workflow_id, stage_id)
        TTT.$refs.BuyProjectTableRef.set_selected_stages([stagekey])
      }, 5)
    },
    clicknewproject () {
      this.$router.push('/tools/brrcalc?patchid=' + this.$route.params.patchid)
    },
    clickpatchagentnotes () {
      this.$router.push('/tools/agents/' + this.$route.params.patchid)
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
      this.dataCachesStore.get({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patches',
        object_id: TTT.$route.params.patchid,
        skip_cache: false,
        callback: callback
      })
    },
    get_buy_current_project_filter () {
      if (typeof (this.$refs.BuyProjectTableRef) === 'undefined') {
        return undefined
      }
      if (this.$refs.BuyProjectTableRef === null) {
        return undefined
      }
      return this.$refs.BuyProjectTableRef.get_current_filter()
    },
    get_rent_current_project_filter () {
      if (typeof (this.$refs.RentProjectTableRef) === 'undefined') {
        return undefined
      }
      if (this.$refs.RentProjectTableRef === null) {
        return undefined
      }
      return this.$refs.RentProjectTableRef.get_current_filter()
    },
    refresh_success (response) {
      const TTT = this
      TTT.patch_data = response.data
      var project_info_to_load = []
      var rent_project_info_to_load = []
      Object.keys(TTT.patch_data.workflow_lookup).map(function (workflow_id) {
        Object.keys(TTT.patch_data.workflow_lookup[workflow_id]).map(function (stage_id) {
          TTT.patch_data.workflow_lookup[workflow_id][stage_id].map(function (project_id) {
            const isRentProject = function (project_id) {
              if (typeof (TTT.patch_data.typed_projects.rent) === 'undefined') {
                return false
              }
              return TTT.patch_data.typed_projects.rent.includes(project_id)
            }
            if (isRentProject(project_id)) {
              rent_project_info_to_load.push({
                workflow_id: workflow_id,
                stage_id: stage_id,
                project_id: project_id
              })
            } else {
              project_info_to_load.push({
                workflow_id: workflow_id,
                stage_id: stage_id,
                project_id: project_id
              })
            }
          })
        })
      })
      this.$refs.BuyProjectData.refresh({
        project_info_to_load: project_info_to_load,
        patch_id: this.patch_data.id,
        get_cur_filter_fn: this.get_buy_current_project_filter
      })
      this.$refs.RentProjectData.refresh({
        project_info_to_load: rent_project_info_to_load,
        patch_id: this.patch_data.id,
        get_cur_filter_fn: this.get_rent_current_project_filter
      })
      this.loaded = true
    },
  },
  mounted () {
    this.loaded = false
    if (typeof(this.$route.query.starttab) !== 'undefined') {
      this.tab = this.$route.query.starttab
    }
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
.patch-button-bar > button {
  margin: 10px;
}
</style>
