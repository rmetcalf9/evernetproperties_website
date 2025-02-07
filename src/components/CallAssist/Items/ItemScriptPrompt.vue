<template>
  <div class="CallAssistCallItemShowCallAim-main">
    <h1>Script Prompt</h1>
    <ul>
      <li
        v-for="line in item.lines" :key="line"
      >{{ get_line(line) }}</li>
    </ul>
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
    get_line (line) {
      return mustach_utils.evalmustachstragainstcontext(line, {
        current_lead: this.current_lead,
        current_stage: this.current_stage,
        calltemplate: this.calltemplate,
        item: this.item,
        batchdata: this.batchdata,
        calldata: this.calldata
      })
    }
  }
})
</script>

<style>
.CallAssistCallItemShowCallAim-main li {
  font-size: 1.2rem;
}
</style>
