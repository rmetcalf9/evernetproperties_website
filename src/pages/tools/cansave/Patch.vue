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
        <q-tab name="projects" label="Projects" />
        <q-tab name="todos" label="Todos" />
      </q-tabs>
      <div v-if="tab === 'projects'">
        <h2>
          Projects <q-btn label="Pick from workflow" color="primary" @click="btn_click_workflow" class="float-right" />
        </h2>
        <div>
          <ProjectTable
            ref="ProjectTableRef"
            :projects="filtered_loaded_projects"
            :prefiltered="true"
            :cumulatively_loaded_stages="cumulatively_loaded_stages"
            :cumulatively_loaded_agents="cumulatively_loaded_agents"
            :cumulatively_loaded_sources="cumulatively_loaded_sources"
            @filterchanged="projecttablefilterchanged"
          />
        </div>
        <q-btn color="primary" label="Add Project" @click="clicknewproject" />
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
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { usePatchLocalSettingsStore } from 'stores/patch_local_settings'
import { Notify } from 'quasar'

import ProjectTable from '../../../components/ProjectTable.vue'
import WrokflowChart from '../../../components/Workflow/Chart.vue'

import Workflow_main from '../../../components/Workflow/Workflow_main.js'
import TodoDisplay from '../../../components/TodoDisplay.vue'
import utils from '../../../components/utils.js'


export default defineComponent({
  name: 'ToolsCansavePatchePage',
  components: {
    ProjectTable, WrokflowChart, TodoDisplay
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const patch_local_settings_store = usePatchLocalSettingsStore()
    return {
      backend_connection_store,
      patch_local_settings_store
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
  watch: {
    loaded_projects(val) {
      // console.log('watch loaded projects', val)
      this.recompute_filtered_projects()
    }
  },
  computed: {
    cumulatively_loaded_stages: {
      get() {
        return this.patch_local_settings_store.findPatchRecord(this.patch_data.id).cumulatively_loaded_stages
      }
    },
    cumulatively_loaded_sources: {
      get() {
        return this.patch_local_settings_store.findPatchRecord(this.patch_data.id).cumulatively_loaded_sources
      }
    },
    cumulatively_loaded_agents: {
      get() {
        return this.patch_local_settings_store.findPatchRecord(this.patch_data.id).cumulatively_loaded_agents
      }
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
    projecttablefilterchanged (newfilter) {
      this.project_filter.filter_stages = true
      this.project_filter.selected_stages = newfilter.selected_stages
      this.project_filter.filter_agents = true
      this.project_filter.selected_agents = newfilter.selected_agents
      this.project_filter.filter_sources = true
      this.project_filter.selected_sources = newfilter.selected_sources
      this.recompute_filtered_projects()
    },
    _recompute_filtered_projects_stage_filter (x) {
      if (!this.project_filter.filter_stages) {
        return true
      }
      const curproject_stagekey = Workflow_main.get_workflow_stage_key(x.item.workflow.workflow_used_id, x.item.workflow.current_stage)
      if (!this.project_filter.selected_stages.includes(curproject_stagekey)) {
        return false
      }
      return true
    },
    _recompute_filtered_projects_agent_filter (x) {
      if (!this.project_filter.filter_agents) {
        return true
      }
      const agent = utils.get_agent_text(x.item.sub_section_details.dealbasicinfo.selling_agent)
      if (!this.project_filter.selected_agents.includes(agent)) {
        return false
      }
      return true
    },
    _recompute_filtered_projects_source_filter (x) {
      if (!this.project_filter.filter_sources) {
        return true
      }
      const source = utils.get_source_text(x.item.sub_section_details.dealbasicinfo.deal_source)
      if (!this.project_filter.selected_sources.includes(source)) {
        return false
      }
      return true
    },
    is_project_included_in_current_filters(project) {
      if (!this._recompute_filtered_projects_stage_filter(project)) {
        return false
      }
      if (!this._recompute_filtered_projects_agent_filter(project)) {
        return false
      }
      if (!this._recompute_filtered_projects_source_filter(project)) {
        return false
      }
      return true
    },
    recompute_filtered_projects () {
      const TTT = this
      this.filtered_loaded_projects = this.loaded_projects.filter(function (x) {
        if (!x.loaded) {
          return true
        }
        return TTT.is_project_included_in_current_filters(x)
      })
    },
    onchartclickstage (workflow_id, stage_id, stage_data) {
      const TTT=this
      this.tab = 'projects'
      setTimeout(function () {
        const stagekey = Workflow_main.get_workflow_stage_key(workflow_id, stage_id)
        TTT.$refs.ProjectTableRef.set_selected_stages([stagekey])
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
          TTT.add_to_cumulatively_loaded(response.data)
          TTT.projecttablefilterchanged(TTT.$refs.ProjectTableRef.get_current_filter())
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
    },
    add_to_cumulatively_loaded (project) {
      // called from load project - so always loaded at this point
      const workflow_stage_id = Workflow_main.get_workflow_stage_key(project.workflow.workflow_used_id, project.workflow.current_stage)
      const source = utils.get_source_text(project.sub_section_details.dealbasicinfo.deal_source)
      const agent = utils.get_agent_text(project.sub_section_details.dealbasicinfo.selling_agent)

      this.patch_local_settings_store.reportFoundProject({
        patch_id: this.patch_data.id,
        workflow_stage_id: workflow_stage_id,
        workflow_id: project.workflow.workflow_used_id,
        stage_id: project.workflow.current_stage,
        stage: Workflow_main.getWorkflowStage(project.workflow.workflow_used_id, project.workflow.current_stage),
        stage_selected: utils.boolean_undefined_to_false(Workflow_main.workflows[project.workflow.workflow_used_id].stages[project.workflow.current_stage].active),
        source: source,
        source_selected: true,
        agent: agent,
        agent_selected: true
      })

      if (!(source in this.cumulatively_loaded_sources)) {
        this.cumulatively_loaded_sources[source] = {
          name: source,
          selected: true
        }
      }

      if (!(agent in this.cumulatively_loaded_agents)) {
        this.cumulatively_loaded_agents[agent] = {
          name: agent,
          selected: true
        }
      }

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
