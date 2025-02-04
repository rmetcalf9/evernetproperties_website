<template>
  <div>
    <h1>Arrange Appointment</h1>
    {{ get_output_text(item.prompt_text) }}

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'

export default defineComponent({
  name: 'CallAssistCallItemArrangeAppointment',
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
      option1: 'TODO',
      option2: 'TODO'
    }
  },
  computed: {
    option1_text () {
      return this.option1
    },
    option2_text () {
      return this.option2
    }
  },
  methods: {
    get_output_text (prompt_text) {
      return mustach_utils.evalmustachstragainstcontext(prompt_text, {
        current_lead: this.current_lead,
        current_stage: this.current_stage,
        calltemplate: this.calltemplate,
        item: this.item,
        batchdata: this.batchdata,
        option1: this.option1_text,
        option2: this.option2_text,
      })
    },
    generate_option () {
      console.log('SS', this.batchdata)
      return 'TODO gen option xx'
    }
  },
  mounted () {
    console.log('MOUNTING')
    this.option1 = this.generate_option()
    this.option2 = this.generate_option()
  }
})
</script>

<style>
</style>
