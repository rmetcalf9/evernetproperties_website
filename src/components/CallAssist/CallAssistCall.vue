<template>
  <div v-if="typeof (current_stage_id) !== 'undefined'">
    <h1>Call Lead {{ current_lead.name }}</h1>
    <h2>Stage {{ current_stage.name }}</h2>
    <div class="CallAssistCallItems">
      <div v-for="item in current_stage.items" :key='item.id'>
        <CallAssistCallItems
          :current_lead="current_lead"
          :current_stage="current_stage"
          :calltemplate="calltemplate"
          :item="item"
        />
      </div>
    </div>
    <h2>Debug stuff below</h2>
    {{ current_lead }}
    <h2>ddd</h2>
    {{ calltemplate }}
    <h2>Cur stage</h2>
    {{ current_stage }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CallAssistCallItems from './CallAssistCallItems.vue'


export default defineComponent({
  name: 'CallAssistCall',
  props: {
    current_lead: {
      type: Object
    },
    calltemplate: {
      type: Object
    }
  },
  components: {
    CallAssistCallItems
  },
  data () {
    return {
      current_stage_id: undefined
    }
  },
  computed: {
    current_stage () {
      if (typeof (this.current_stage_id) === 'undefined') {
        return undefined
      }
      return this.calltemplate.stages[this.current_stage_id]
    }
  },
  methods: {
    set_stage (stage_id) {
      this.current_stage_id = stage_id
    }
  }
})
</script>

<style>
</style>
