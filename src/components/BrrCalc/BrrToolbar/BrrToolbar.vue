<template>
  <div class="brrcalctoolbar">
    <CallSellingAgent
      @activity_log="(obj) => $emit('activity_log',obj)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CallSellingAgent from './CallSellingAgent.vue'

export default defineComponent({
  name: 'BrrCalcToolbar',
  emits: ['activity_log'],
  components: {
    CallSellingAgent
  },
  data () {
    return {
    }
  },
  methods: {
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
</style>
