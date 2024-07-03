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
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
    }
  },
  methods: {
    save_project ({dict_of_card_info}) {

      // TODO Load this from cards
      const sub_section_details = {}
      for (const card_name_idx in Object.keys(dict_of_card_info)) {
        const card_name = Object.keys(dict_of_card_info)[card_name_idx]
        sub_section_details[card_name] = JSON.parse(JSON.stringify(dict_of_card_info[card_name]))
      }

      const project_data = {
        user_id: this.backend_connection_store.user_profile.id,
        patch_id: dict_of_card_info.dealbasicinfo.patch_id,
        timestamp_first_entered: 'TODO',
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

      console.log('data_to_send', project_data)


      Notify.create({
        color: 'positive',
        message: 'Project Serializer - TODO Implement save',
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
