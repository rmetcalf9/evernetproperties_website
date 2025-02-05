<template>
  <div>
    <h1>Aim of this Call</h1>
    {{ calltemplate.aim }}
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
    },
    batchdata: {
      type: Object
    },
    calldata: {
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
