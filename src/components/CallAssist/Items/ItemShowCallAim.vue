<template>
  <div>
    <h1>Aim of this Call</h1>
    {{ get_mustach_text(calltemplate.aim) }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'

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
  },
  methods: {
    get_mustach_text (prompt_text) {
      return mustach_utils.evalmustachstragainstcontext(prompt_text, {
        current_lead: this.current_lead,
        current_stage: this.current_stage,
        calltemplate: this.calltemplate,
        item: this.item,
        batchdata: this.batchdata
      })
    },
  }
})
</script>

<style>
</style>
