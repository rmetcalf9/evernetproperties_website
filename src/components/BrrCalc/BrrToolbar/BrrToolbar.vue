<template>
  <div class="row brrcalctoolbar">
    <SaveButton
      ref="SaveToolbar"
      @saveproject="$emit('saveproject')"
      :reason_project_not_savable="reason_project_not_savable"
    />
    <CallSellingAgent
      @activity_log="(obj) => $emit('activity_log',obj)"
    />
    <ResearchCall
      @activity_log="(obj) => $emit('activity_log',obj)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CallSellingAgent from './CallSellingAgent.vue'
import ResearchCall from './ResearchCall.vue'
import SaveButton from './SaveButton.vue'

export default defineComponent({
  name: 'BrrCalcToolbar',
  props: ['reason_project_not_savable'],
  emits: ['activity_log', 'saveproject'],
  components: {
    CallSellingAgent,
    ResearchCall,
    SaveButton
  },
  data () {
    return {
    }
  },
  computed: {
    ever_saved () {
      return this.$refs.SaveToolbar.ever_saved
    }
  },
  methods: {
    set_changed_true () {
      this.$refs.SaveToolbar.set_changed_true()
    },
    save_project_complete_notification (params) {
      this.$refs.SaveToolbar.save_project_complete_notification(params)
    },
    serializer_load_data (data_to_load) {
      this.$refs.SaveToolbar.serializer_load_data(data_to_load)
    }
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
</style>
