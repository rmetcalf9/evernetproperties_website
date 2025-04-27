<template>
  <div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'
import { Notify } from 'quasar'


export default defineComponent({
  name: 'ProjectSerializer',
  emits: ['saveprojectcomplete'],
  props: {
    project_type: {
      type: String,
      default: 'Unknown'
    },
    success_message: {
      type: String,
      default: 'Project Saved'
    },
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
      loaded_project_id: undefined,
      proj_summary_data: {
        metadata: undefined,
        timestamp_first_entered: undefined
      },
      passthroughdata: undefined
    }
  },
  methods: {
    serializer_load_data (data_to_load) {
      this.loaded_project_id  = data_to_load.id
      this.proj_summary_data.timestamp_first_entered  = data_to_load.timestamp_first_entered
      this.proj_summary_data.metadata = data_to_load.metadata
    },
    save_project ({dict_of_card_info, activity_log, workflow, patch_id, passthroughdata}) {
      this.passthroughdata = passthroughdata
      const sub_section_details = {}
      for (const card_name_idx in Object.keys(dict_of_card_info)) {
        const card_name = Object.keys(dict_of_card_info)[card_name_idx]
        sub_section_details[card_name] = JSON.parse(JSON.stringify(dict_of_card_info[card_name]))
      }

      const project_data = {
        user_id: this.backend_connection_store.user_profile.id,
        patch_id: patch_id,
        timestamp_first_entered: this.proj_summary_data.timestamp_first_entered,
        initial_phase: {
          total_money_in: 0,
          start_value: 0,
          end_value: 0,
          flip_roi: 0
        },
        reoccurring_phase: [],
        location: {},
        workflow: workflow,
        activity_log: activity_log,
        sub_section_details: sub_section_details,
        tags: [],
        risks: [],
        type: this.project_type
      }

      if (typeof (this.loaded_project_id) !== 'undefined') {
        project_data.id = this.loaded_project_id
        project_data.metadata = this.proj_summary_data.metadata
      } else {
        // no id. First save we are creating
        project_data.timestamp_first_entered = (new Date()).toISOString()
      }

      const TTT = this
      const callback = {
        ok: TTT.save_api_call_success,
        error: TTT.save_api_call_fail
      }
      this.dataCachesStore.save({
        backend_connection_store: this.backend_connection_store,
        object_type: 'projects',
        object_data: project_data,
        callback: callback
      })
    },
    save_api_call_success (response) {
      this.$emit('saveprojectcomplete', {success: true, response: response, passthroughdata: this.passthroughdata})
      this.serializer_load_data(response.data)
      Notify.create({
        color: 'positive',
        message: this.success_message,
        timeout: 2000
      })
    },
    save_api_call_fail (response) {
      this.$emit('saveprojectcomplete', {success: false, response: response, passthroughdata: this.passthroughdata})
      Notify.create({
        color: 'negative',
        message: 'Save failed - ' + response.response.data.message,
        timeout: 2000
      })
    }
  },
  mounted (){
  }
})

</script>

<style>
</style>
