import { defineStore } from 'pinia'

function blank_patch_record (patch_id) {
  return {
    cumulatively_loaded_stages: {}
  }
}

export const usePatchLocalSettingsStore = defineStore('cumulatively_loaded_stages', {
  state: () => ({
    value: {}
  }),

  getters: {
    none (state) {
      console.log('SSS')
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
      return this.value[patch_id].cumulatively_loaded_stages
    },
    reportFoundStage ({patch_id, workflow_stage_id, workflow_id, stage_id, stage, selected}) {
      this._createPatchRecordIfRequired(patch_id)
      if (!(workflow_stage_id in this.value[patch_id].cumulatively_loaded_stages)) {
        this.value[patch_id].cumulatively_loaded_stages[workflow_stage_id] = {
          workflow_stage_id: workflow_stage_id,
          workflow_id: workflow_id,
          stage_id: stage_id,
          stage: stage,
          selected: selected
        }
      }
    }
  }
})
