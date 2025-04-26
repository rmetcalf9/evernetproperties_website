import { defineStore } from 'pinia'

function blank_patch_record (patch_id) {
  return {
    purchase: {
      cumulatively_loaded_stages: {},
      cumulatively_loaded_sources: {},
      cumulatively_loaded_agents: {}
    },
    rent: {
      cumulatively_loaded_stages: {},
      cumulatively_loaded_sources: {},
      cumulatively_loaded_agents: {}
    }
  }
}

export const usePatchLocalSettingsStore = defineStore('cumulatively_loaded_stages', {
  state: () => ({
    value: {}
  }),

  getters: {
    none (state) {
    }
  },

  actions: {
    _createPatchRecordIfRequired (patch_id) {
      if (!Object.keys(this.value).includes(patch_id)) {
        this.value[patch_id] = blank_patch_record(patch_id)
      }
    },
    findPatchRecord (patch_id) {
      this._createPatchRecordIfRequired(patch_id)
      return this.value[patch_id]
    },
    reportFoundStage ({
      type, // purchase or rent
      patch_id,
      workflow_stage_id,
      workflow_id,
      stage_id,
      stage,
      stage_selected
    }) {
      //workflow_stage_id is the combined ID of workflow and stage
      this._createPatchRecordIfRequired(patch_id)
      if (!(workflow_stage_id in this.value[patch_id][type].cumulatively_loaded_stages)) {
        this.value[patch_id][type].cumulatively_loaded_stages[workflow_stage_id] = {
          workflow_stage_id: workflow_stage_id,
          workflow_id: workflow_id,
          stage_id: stage_id,
          stage: stage,
          selected: stage_selected
        }
      }
    },
    reportFoundProject ({
      type, // purchase or rent
      patch_id,
      workflow_stage_id,
      workflow_id,
      stage_id,
      stage,
      stage_selected,
      source,
      source_selected,
      agent,
      agent_selected
    }) {
      this.reportFoundStage({
        type: type,
        patch_id: patch_id,
        workflow_stage_id: workflow_stage_id,
        workflow_id: workflow_id,
        stage_id: stage_id,
        stage: stage,
        stage_selected: stage_selected
      })
      if (!(source in this.value[patch_id][type].cumulatively_loaded_sources)) {
        this.value[patch_id][type].cumulatively_loaded_sources[source] = {
          name: source,
          selected: source_selected
        }
      }

      if (!(agent in this.value[patch_id][type].cumulatively_loaded_agents)) {
        this.value[patch_id][type].cumulatively_loaded_agents[agent] = {
          name: agent,
          selected: agent_selected
        }
      }
    }
  }
})
