<!--
  Component to load project data
  No display. value property updated
-->
<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import { usePatchLocalSettingsStore } from 'stores/patch_local_settings'
import Workflow_main from '../components/Workflow/Workflow_main.js'
import utils from '../components/utils.js'
import commonProjectValues from '../components/commonProjectValues.js'

const get_source_text_fn = function (project) {
  return commonProjectValues.dealsource(project)
}
const get_agent_text_fn = function (project, dataCachesStore) {
  return commonProjectValues.sellingAgent(project, dataCachesStore)
}

export default defineComponent({
  name: 'ProjectData',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const patch_local_settings_store = usePatchLocalSettingsStore()
    const dataCachesStore = useDataCachesStore()
    return {
      backend_connection_store,
      patch_local_settings_store,
      dataCachesStore
    }
  },
  props: ['project_type'],
  data () {
    return {
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
      patch_id: undefined,
      get_cur_filter_fn: undefined,
      get_source_text_fn: get_source_text_fn,
      get_agent_text_fn: get_agent_text_fn
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
        return this.patch_local_settings_store.findPatchRecord(this.patch_id)[this.project_type].cumulatively_loaded_stages
      }
    },
    cumulatively_loaded_sources: {
      get() {
        return this.patch_local_settings_store.findPatchRecord(this.patch_id)[this.project_type].cumulatively_loaded_sources
      }
    },
    cumulatively_loaded_agents: {
      get() {
        return this.patch_local_settings_store.findPatchRecord(this.patch_id)[this.project_type].cumulatively_loaded_agents
      }
    }
  },
  methods: {
    projecttablefilterchanged (newfilter) {
      if (typeof (newfilter) === 'undefined') {
        this.project_filter.filter_stages = false
        this.project_filter.selected_stages = []
        this.project_filter.filter_agents = false
        this.project_filter.selected_agents = []
        this.project_filter.filter_sources = false
        this.project_filter.selected_sources = []
      } else {
        this.project_filter.filter_stages = true
        this.project_filter.selected_stages = newfilter.selected_stages
        this.project_filter.filter_agents = true
        this.project_filter.selected_agents = newfilter.selected_agents
        this.project_filter.filter_sources = true
        this.project_filter.selected_sources = newfilter.selected_sources
      }
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
      const agent = this.get_agent_text_fn(x.item, this.dataCachesStore)
      if (!this.project_filter.selected_agents.includes(agent)) {
        return false
      }
      return true
    },
    _recompute_filtered_projects_source_filter (x) {
      if (!this.project_filter.filter_sources) {
        return true
      }
      const source = this.get_source_text_fn(x.item)
      // TODO DEL const source = utils.get_source_text(x.item.sub_section_details.dealbasicinfo.deal_source)
      if (!this.project_filter.selected_sources.includes(source)) {
        return false
      }
      return true
    },
    is_project_included_in_current_filters(project) {
      if (!this._recompute_filtered_projects_stage_filter(project)) {
        return false
      }
      if (!project.loaded) {
        return true // Rest of filters require data from loaded projects
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
        return TTT.is_project_included_in_current_filters(x)
      })
    },
    refresh ({project_info_to_load, patch_id, get_cur_filter_fn}) {
      const TTT = this
      this.get_cur_filter_fn = get_cur_filter_fn
      this.patch_id = patch_id
      this.loaded_projects = project_info_to_load.map(function (x) {
        const workflow_stage_id = Workflow_main.get_workflow_stage_key(x.workflow_id, x.stage_id)

        TTT.patch_local_settings_store.reportFoundStage({
          type: TTT.project_type,
          patch_id: TTT.patch_id,
          workflow_stage_id: workflow_stage_id,
          workflow_id: x.workflow_id,
          stage_id: x.stage_id,
          stage:  Workflow_main.getWorkflowStage(x.workflow_id, x.stage_id),
          stage_selected: utils.boolean_undefined_to_false(Workflow_main.workflow2(TTT.backend_connection_store, TTT.dataCachesStore)[x.workflow_id].stages[x.stage_id].active)
        })
        return {
          id: x.project_id,
          loaded: false,
          item: {
            workflow: {
              workflow_used_id: x.workflow_id,
              current_stage: x.stage_id
            }
          }
        }
      })
      // console.log('TEMP disable loading')
      const callback_patchagents = {
        ok: function (response) {
          // console.log('patch agents GOT', response)
          // Not bothering to store it - will do a cache only lookup when needed
          TTT.recursive_load_project_details()
        },
        error: function (response) {
          console.log('Error when getting agent data for patch')
        }
      }
      TTT.dataCachesStore.get({
        backend_connection_store: this.backend_connection_store,
        object_type: 'patchagents',
        object_id: patch_id,
        skip_cache: false,
        callback: callback_patchagents
      })
    },
    _get_next_item_to_load () {
      const TTT = this
      const visible_items_to_load = this.loaded_projects.filter(function (x) {
        if (x.loaded) {
          return false
        }
        return TTT.is_project_included_in_current_filters(x)
      })
      if (visible_items_to_load.length !== 0) {
        return visible_items_to_load[0]
      }
      const items_to_load = this.loaded_projects.filter(function (x) {
        return x.loaded !== true
      })
      if (items_to_load.length !== 0) {
        return items_to_load[0]
      }
      return undefined
    },
    recursive_load_project_details () {
      const item_to_load = this._get_next_item_to_load()
      if (typeof (item_to_load) === 'undefined') {
        return
      }

      const TTT = this
      const callback = {
        ok: function (response) {
          item_to_load.loaded=true
          item_to_load.item=response.data
          TTT.add_to_cumulatively_loaded(response.data)
          TTT.projecttablefilterchanged(TTT.get_cur_filter_fn())
          TTT.recompute_filtered_projects()
          TTT.recursive_load_project_details()
        },
        error: function (response) {
          item_to_load.loaded=true
          item_to_load.address='TODO LOAD FAIL'
          TTT.recursive_load_project_details()
        }
      }
      this.dataCachesStore.get({
        backend_connection_store: this.backend_connection_store,
        object_type: 'projects',
        object_id: item_to_load.id,
        skip_cache: false,
        callback: callback
      })
    },
    add_to_cumulatively_loaded (project) {
      // called from load project - so always loaded at this point
      const workflow_stage_id = Workflow_main.get_workflow_stage_key(project.workflow.workflow_used_id, project.workflow.current_stage)

      const source = this.get_source_text_fn(project)

      const agent = this.get_agent_text_fn(project, this.dataCachesStore)

      this.patch_local_settings_store.reportFoundProject({
        type: this.project_type,
        patch_id: this.patch_id,
        workflow_stage_id: workflow_stage_id,
        workflow_id: project.workflow.workflow_used_id,
        stage_id: project.workflow.current_stage,
        stage: Workflow_main.getWorkflowStage(project.workflow.workflow_used_id, project.workflow.current_stage),
        stage_selected: utils.boolean_undefined_to_false(Workflow_main.workflow2(this.backend_connection_store, this.dataCachesStore)[project.workflow.workflow_used_id].stages[project.workflow.current_stage].active),
        source: source,
        source_selected: true,
        agent: agent,
        agent_selected: true
      })
    }
  }
})


</script>

<style>
</style>
