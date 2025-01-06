<template>
  <div>
    <h1>TODO SHOW LEAD</h1>
    {{ current_lead }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CallAssistCallItemShowCallAim',
  props: {
    current_lead: {
      type: Object
    },
    current_stage: {
      type: Object
    },
    calltemplate: {
      type: Object
    },
    item: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
})
</script>

<style>
</style>
