<template>
  <div v-if="typeof (current_stage_id) !== 'undefined'">
    <h1>Call Lead {{ current_lead.name }} {{ title_text }}</h1>
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
    <h2>Call Free notes</h2>
    <div><q-input filled clearable v-model="call_data.notes" label="Notes from this call" autogrow/></div>
    <h2>Actions</h2>
    <div class="row">
      <div v-for="action in current_stage.actions" :key='action.id' class='CallAssistCall-actionbutton'>
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
import { Notify } from 'quasar'

import CallAssistCallItems from './CallAssistCallItems.vue'

function get_initial_call_data () {
  return {
    notes: ''
  }
}

export default defineComponent({
  name: 'CallAssistCall',
  props: {
    current_lead: {
      type: Object
    },
    calltemplate: {
      type: Object
    },
    title_text: {
      type: String,
      default: ''
    }
  },
  emits: ['outcome'],
  components: {
    CallAssistCallItems
  },
  data () {
    return {
      current_stage_id: undefined,
      call_data: get_initial_call_data()
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
      if (action.type === 'Outcome') {
        this.click_outcome_action_button(action)
      } else {
        this.click_next_stage_action_button(action)
      }
    },
    click_outcome_action_button (action) {
      this.$emit('outcome', {
        outcome_id: action.id,
        call_data: this.call_data
      })
    },
    click_next_stage_action_button (action) {
      if (typeof (this.calltemplate.stages[action.next_stage_id]) === 'undefined') {
        Notify.create({
          color: 'negative',
          message: 'Next stage not found',
          timeout: 2000
        })
        return
      }
      this.current_stage_id = action.next_stage_id
    },
    reset_call_data () {
      this.call_data = get_initial_call_data()
    }
  }
})
</script>

<style>
.CallAssistCall-actionbutton {
  margin-right: 10px;
}
</style>
