<template>
  <div class="callassist">
    <div v-if="!prepared">Call assist not prepared</div>
    <CallAssistCall
      ref="CallAssistCall"
      :current_lead="current_lead"
      :calltemplate="calltemplate"
      :title_text="calltitletext"
      :batchdata="batchdata"
      @outcome="outcome"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CallAssistCall from './CallAssistCall.vue'
import utils from '../../components/utils.js'
import { Notify } from 'quasar'
import { uuidv4 } from 'node-common-library'

// See README.md for action types and outcomes

const standard_actions = {
  skip_call_action: {
    type: 'Outcome',
    id: 'skip_call',
    button_label: 'Skip and return to later',
    button_color: 'white',
    button_text_color: 'black'
  }
}

export default defineComponent({
  name: 'CallAssist',
  emits: ['outcome', 'fully_complete'],
  components: {
    CallAssistCall
  },
  data () {
    return {
      prepared: false,
      calltemplate: undefined,
      remaining_leads: undefined,
      total_leads: undefined,
      batchdata: undefined
    }
  },
  computed: {
    current_lead () {
      if (typeof (this.remaining_leads) === 'undefined') {
        return undefined
      }
      if (this.remaining_leads.length < 1) {
        return undefined
      }
      return this.remaining_leads[0]
    },
    calltitletext () {
      if (typeof (this.total_leads) === 'undefined') {
        return ''
      }
      return '(' + this.remaining_leads.length.toString() + ' leads remaining)'
    }
  },
  methods: {
    prepare (calltemplate, leads, batchdata) {
      const TTT = this
      this.calltemplate = JSON.parse(JSON.stringify(calltemplate))
      this.batchdata = batchdata

      let review_stage = {
        id: uuidv4(),
        name: 'Prepare for call',
        items: [{ type: 'ShowCallAim'}, { type: 'ShowStages'}, { type: 'ShowLead'}],
        actions: [
          standard_actions.skip_call_action,
          {
            type: 'Next_Stage',
            next_stage_id: this.calltemplate.initial_stage_id,
            id: 'Make_call',
            button_label: 'Ready to Dial...'
          }
        ],
        post_action_items: []
      }
      let new_stages = {}
      new_stages[review_stage.id] = review_stage
      this.calltemplate.ordered_stages = []
      this.calltemplate.ordered_stages.push(review_stage)
      this.calltemplate.stages.map(function (x) {
        if (typeof (x.hide_from_plan) === 'undefined') {
          x.hide_from_plan = false
        }
        let new_actions = []
        new_actions.push(standard_actions.skip_call_action)
        x.actions.map(function (action) {
          new_actions.push(action)
        })
        TTT.calltemplate.common_actions.map(function (common_action) {
          new_actions.push(JSON.parse(JSON.stringify(common_action)))
        })
        x.actions = new_actions
        new_stages[x.id] = x
        TTT.calltemplate.ordered_stages.push(x)
      })
      this.calltemplate.stages = new_stages
      this.calltemplate.initial_stage_id = review_stage.id

      // Assign all items id's
      Object.keys(TTT.calltemplate.stages).map(function (stageidx) {
        let stage = TTT.calltemplate.stages[stageidx]
        stage.items = stage.items.map(function (item) {
          item.id=uuidv4()
          return item
        })
        stage.post_action_items = stage.post_action_items.map(function (item) {
          item.id=uuidv4()
          return item
        })
      })

      this.remaining_leads = leads
      this.total_leads = leads.length

      this.$refs.CallAssistCall.set_stage(this.calltemplate.initial_stage_id)

      setTimeout(function () {
        TTT.$refs.CallAssistCall.reset_call_data()
      }, 50)

      this.prepared = true
    },
    outcome (props) {
      const emit_object = {
        outcome_id: props.outcome_id,
        call_data: props.call_data,
        current_lead: this.current_lead,
        batchdata: this.batchdata
      }

      // Give items a chance to update batch data
      Object.keys(props.call_data.item_data_vals).map(function (x) {
        if (typeof (props.call_data.item_data_vals[x].outcome_callback) !== 'undefined') {
          props.call_data.item_data_vals[x].outcome_callback(props.call_data.item_data_vals[x], emit_object)
        }
      })

      this.$emit('outcome', JSON.parse(JSON.stringify(emit_object)))
      if (this.remaining_leads.length > 1) {
        this.remaining_leads.shift()
        this.$refs.CallAssistCall.reset_call_data()
        this.$refs.CallAssistCall.set_stage(this.calltemplate.initial_stage_id)
        return
      }
      this.$emit('fully_complete')
    }
  }
})
</script>

<style>
.callassist > div h1 {
  font-size: 2rem;
  line-height: unset;
  letter-spacing: unset;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  border: 0px;
}
.callassist > div h2 {
  font-size: 1.7rem;
  line-height: unset;
  letter-spacing: unset;
  font-weight: 400;
  margin: 0px;
  padding: 0px;
  border: 0px;
}
</style>
