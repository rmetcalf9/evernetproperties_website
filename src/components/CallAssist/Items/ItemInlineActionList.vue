<template>
  <div>
    <h1>{{ get_mustach_text(item.title) }}</h1>
    {{ get_mustach_text(item.body) }}
    <div class="row">
      <div v-for="action in item.actions" :key='action.id' class='CallAssistCall-inlineactionlist'>
        <q-btn
          :label="action.button_label"
          :color="get_action_button_color(action)"
          :text-color="get_action_button_text_color(action)"
          @click="click_action_button(action)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'

export default defineComponent({
  name: 'CallAssistCallItemInlineActionList',
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
  emits: ['click_action_button'],  
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
    get_action_button_color (action) {
      if (typeof (action.button_color) !== 'undefined') {
        return action.button_color
      }
      if (action.type === 'Outcome') {
        return 'secondary'
      }
      return 'primary'
    },
    get_action_button_text_color (action) {
      if (typeof (action.button_text_color) !== 'undefined') {
        return action.button_text_color
      }
      return undefined
    },
    click_action_button (action) {
      this.$emit('click_action_button', action)
    }
  }
})
</script>

<style>
.CallAssistCall-inlineactionlist {
  margin: 5px;

}
</style>
