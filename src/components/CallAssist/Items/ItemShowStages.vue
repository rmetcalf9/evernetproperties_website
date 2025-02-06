<template>
  <div>
    <h1>Call Plan</h1>
    <div v-for="stage in calltemplate.ordered_stages" :key='stage.id' class="row">
      <div v-if="!stage.hide_from_plan">
        {{ stage.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CallAssistCallItemShowStages',
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
