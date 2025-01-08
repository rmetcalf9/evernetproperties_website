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
  emits: ['outcome'],
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
        id: utils.uuidv4(),
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
        ]
      }
      let new_stages = {}
      new_stages[review_stage.id] = review_stage
      this.calltemplate.ordered_stages = []
      this.calltemplate.ordered_stages.push(review_stage)
      this.calltemplate.stages.map(function (x) {
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

      // console.log('xxx', this.calltemplate)

      this.remaining_leads = leads
      this.total_leads = leads.length

      this.$refs.CallAssistCall.set_stage(this.calltemplate.initial_stage_id)

      this.prepared = true
    },
    outcome (props) {
      console.log('TODO deal with outcome', props)
      const emit_object = {
        outcome_id: props.outcome_id,
        call_data: props.call_data,
        current_lead: this.current_lead
      }
      this.$emit('outcome', JSON.parse(JSON.stringify(emit_object)))
      this.remaining_leads.shift()

      if (this.remaining_leads.length > 0) {
        this.$refs.CallAssistCall.reset_call_data()
        this.$refs.CallAssistCall.set_stage(this.calltemplate.initial_stage_id)
        return
      }
      Notify.create({
        color: 'positive',
        message: 'Batch Complete',
        timeout: 2000
      })
      // TODO may want to push to better place
      this.$router.push('/tools')
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
