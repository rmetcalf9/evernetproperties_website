<template>
  <div class="callassist">
    <div v-if="!prepared">Call assist not prepared</div>
    <CallAssistCall
      ref="CallAssistCall"
      :current_lead="current_lead"
      :calltemplate="calltemplate"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CallAssistCall from './CallAssistCall.vue'
import utils from '../../components/utils.js'

export default defineComponent({
  name: 'CallAssist',
  components: {
    CallAssistCall
  },
  data () {
    return {
      prepared: false,
      calltemplate: undefined,
      remaining_leads: undefined,
      total_leads: undefined
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
    }
  },
  methods: {
    prepare (calltemplate, leads) {
      const TTT = this
      this.calltemplate = JSON.parse(JSON.stringify(calltemplate))

      let review_stage = {
        id: utils.uuidv4(),
        name: 'Prepare for call',
        items: [{ type: 'ShowCallAim'}, { type: 'ShowStages'}, { type: 'ShowLead'}]
      }
      let new_stages = {}
      new_stages[review_stage.id] = review_stage
      this.calltemplate.ordered_stages = []
      this.calltemplate.ordered_stages.push(review_stage)
      this.calltemplate.stages.map(function (x) {
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
