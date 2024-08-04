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
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CallSellingAgent from './CallSellingAgent.vue'
import SaveButton from './SaveButton.vue'

export default defineComponent({
  name: 'BrrCalcToolbar',
  props: ['reason_project_not_savable'],
  emits: ['activity_log', 'saveproject'],
  components: {
    CallSellingAgent,
    SaveButton
  },
  data () {
    return {
    }
  },
  methods: {
    set_changed_true () {
      this.$refs.SaveToolbar.set_changed_true()
    },
    save_project_complete_notification (params) {
      this.$refs.SaveToolbar.save_project_complete_notification(params)
    }
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
</style>
