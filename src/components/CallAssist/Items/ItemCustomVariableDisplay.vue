<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <div v-for="line in body.split('\n')" :key="line">
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'


export default defineComponent({
  name: 'CallAssistCallItemCustomVariableDisplay',
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
  },
  computed: {
    title () {
      return mustach_utils.evalmustachstragainstcontext(this.item.title, {
        current_lead: this.current_lead,
        current_stage: this.current_stage,
        calltemplate: this.calltemplate,
        item: this.item,
        batchdata: this.batchdata
      })
    },
    body () {
      return mustach_utils.evalmustachstragainstcontext(this.item.body, {
        current_lead: this.current_lead,
        calltemplate: this.calltemplate,
        current_stage: this.current_stage,
        item: this.item,
        batchdata: this.batchdata
      })
    }
  }
})
</script>

<style>
</style>
