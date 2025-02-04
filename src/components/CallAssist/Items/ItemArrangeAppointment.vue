<template>
  <div>
    <h1>Arrange Appointment</h1>
    {{ get_output_text(item.prompt_text) }}
    <div>
      <div>TODO CHOSE OPT 1</div>
      <div>TODO CHOSE OPT 2</div>
      <div>TODO Chose other - need big picture of ALL days</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
      return this.option1.text
    },
    option2_text () {
      return this.option2.text
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
      let slots = mustach_utils.evalsinglemustach(
        '{{' + this.item.slot_var + '}}',{
          current_lead: this.current_lead,
          current_stage: this.current_stage,
          calltemplate: this.calltemplate,
          item: this.item,
          batchdata: this.batchdata,
          option1: this.option1_text,
          option2: this.option2_text,
      })
      const this_slot_idx = getRandomInt(0, slots.items.length)
      const ret_val = slots.items[this_slot_idx]
      let new_arr = []
      for (let a=0; a<slots.items.length; a++) {
        if (a !== this_slot_idx) {
          new_arr.push(slots.items[a])
        }
      }
      slots.items = new_arr
      return ret_val
    }
  },
  mounted () {
    this.option1 = this.generate_option()
    this.option2 = this.generate_option()
  }
})
</script>

<style>
</style>
