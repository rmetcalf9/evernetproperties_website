<template>
  <div class="CallAssistCallItemShowCallAim-main">
    <h1>Script Prompt</h1>
    <ul>
      <li
        v-for="line in item.lines" :key="line"
      >{{ line }}</li>
    </ul>
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
    }
  },
  data () {
    return {
    }
  }
})
</script>

<style>
.CallAssistCallItemShowCallAim-main li {
  font-size: 1.2rem;
}
</style>
