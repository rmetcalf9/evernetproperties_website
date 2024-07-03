<template>
  <div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'


export default defineComponent({
  name: 'ProjectSerializer',
  emits: ['saveprojectcomplete'],
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      loaded_project_id: undefined,
      proj_summary_data: {
        metadata: undefined,
        timestamp_first_entered: undefined
      }
    }
  },
  methods: {
    save_project ({dict_of_card_info}) {

      const sub_section_details = {}
      for (const card_name_idx in Object.keys(dict_of_card_info)) {
        const card_name = Object.keys(dict_of_card_info)[card_name_idx]
        sub_section_details[card_name] = JSON.parse(JSON.stringify(dict_of_card_info[card_name]))
      }

      const project_data = {
        user_id: this.backend_connection_store.user_profile.id,
        patch_id: dict_of_card_info.dealbasicinfo.patch_id,
        timestamp_first_entered: this.proj_summary_data.timestamp_first_entered,
        initial_phase: {
          total_money_in: 0,
          start_value: 0,
          end_value: 0,
          flip_roi: 0
        },
        reoccurring_phase: [],
        location: {},
        workflow: {},
        activity_log: [],
        sub_section_details: sub_section_details,
        tags: [],
        risks: []
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
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects',
        method: 'POST',
        data: project_data,
        callback: callback
      })
    },
    save_api_call_success (response) {
      this.$emit('saveprojectcomplete', {success: true, response: response})
      this.loaded_project_id  = response.data.id
      this.proj_summary_data.timestamp_first_entered  = response.data.timestamp_first_entered
      this.proj_summary_data.metadata = response.data.metadata
      Notify.create({
        color: 'positive',
        message: 'Project Saved',
        timeout: 2000
      })
    },
    save_api_call_fail (response) {
      this.$emit('saveprojectcomplete', {success: false, response: response})
      Notify.create({
        color: 'negative',
        message: 'Save failed - ' + response.response.data.message,
        timeout: 2000
      })
    }
  },
  mounted (){
    console.log('ProjectSerializer mounted')
  }
})

</script>

<style>
</style>
