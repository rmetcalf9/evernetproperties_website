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
          :batchdata="batchdata"
          :calldata="call_data"
          @update_item_data="update_item_data"
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
    <q-btn
      v-if="current_stage_id !== calltemplate.initial_stage_id"
      label="Reset script to start"
      @click="reset_script"
    />
    <div class="CallAssistCallItems">
      <div v-for="item in current_stage.post_action_items" :key='item.id'>
        <CallAssistCallItems
          :current_lead="current_lead"
          :current_stage="current_stage"
          :calltemplate="calltemplate"
          :item="item"
          :batchdata="batchdata"
          :calldata="call_data"
          @update_item_data="update_item_data"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

import CallAssistCallItems from './CallAssistCallItems.vue'
import {getDefaultItemData} from './CallAssistCallItems.vue'

function get_initial_call_data (calltemplate) {
  let item_data_vals = {}
  if (typeof (calltemplate) !== 'undefined') {
    function process_item(item) {
      if (typeof (item.unique_id) !== 'undefined') {
        item_data_vals[item.unique_id] = getDefaultItemData(item.type)
      }
    }

    Object.keys(calltemplate.stages).map(function (stageidx) {
      calltemplate.stages[stageidx].items.map(process_item)

      calltemplate.stages[stageidx].post_action_items.map(process_item)
    })
  }
  return {
    notes: '',
    item_data_vals: item_data_vals  //The key is always the unique id provided in call description
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
    },
    batchdata: {
      type: Object
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
    update_item_data (props) {
      this.call_data.item_data_vals[props.item_id] = props.item_data
    },
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
      this.call_data = get_initial_call_data(this.calltemplate)
    },
    reset_script () {
      this.set_stage(this.calltemplate.initial_stage_id)
    }
  }
})
</script>

<style>
.CallAssistCall-actionbutton {
  margin-right: 10px;
}
</style>
