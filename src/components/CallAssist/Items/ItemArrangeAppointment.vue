<template>
  <div>
    <h1>Arrange Appointment</h1>
    {{ get_output_text(item.prompt_text) }}
    <div>
      <div class="itemarrangeapointment-button-line">
        <q-btn :label="option1_text" @click="click_select_opt1()" />
        <q-btn :label="option2_text" @click="click_select_opt2()" />
      </div>
      <div class="row">
        <q-select
          class="itemarrangeapointment-selection-day"
          v-model="selection_day"
          :options="selection_day_options"
          label="Day"
          emit-value
          option-label="name"
        />
        <q-input
          class="itemarrangeapointment-selection-day"
          filled v-model="selection_time"
          mask="time"
          :rules="['time']"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="selection_time">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="col">
          <div>Busy Times:</div>
          <div v-for="slot in busy_slots" :key="slot">
            {{ slot }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'

export function getDefaultItemDataArrangeAppointment() {
  return {
    mounted: false,
    option1: 'SETONMOUNT',
    option2: 'SETONMOUNT',
    selection_day: '',
    selection_time: '09:00'
  }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function two_digit_string(num) {
  if (num<10) {
    return '0' + num.toString()
  } else {
    return num.toString()
  }
}

function get_time_str(time_obj) {
  let hours = -1
  let minutes = -1
  if (typeof (time_obj) === 'string') {
    let tmp = new Date(time_obj)
    hours = tmp.getHours()
    minutes = tmp.getMinutes()
  } else {
    hours = time_obj.getHours()
    minutes = time_obj.getMinutes()
  }
  return two_digit_string(hours) + ":" + two_digit_string(minutes)
}

export default defineComponent({
  name: 'CallAssistCallItemArrangeAppointment',
  emits: ['update_item_data'],
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
    return {}
  },
  computed: {
    selection_day: {
      get() {
        return this.calldata.item_data_vals[this.item.unique_id].selection_day
      },
      set(value) {
        let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
        item_data.selection_day = value
        this.$emit('update_item_data',{
          item_id: this.item.unique_id,
          item_data: item_data
        })
      },
    },
    selection_time: {
      get() {
        return this.calldata.item_data_vals[this.item.unique_id].selection_time
      },
      set(value) {
        let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
        item_data.selection_time = value
        this.$emit('update_item_data',{
          item_id: this.item.unique_id,
          item_data: item_data
        })
      },
    },
    busy_slots () {
      if (typeof (this.unique_days[this.selection_day.id]) === 'undefined') {
        return []
      }
      let ret_val = []
      this.unique_days[this.selection_day.id].reserved_slots.map(function (x) {
        ret_val.push(x.start + ' - ' + x.end)
      })
      return ret_val
    },
    option1_text () {
      return this.calldata.item_data_vals[this.item.unique_id].option1.text
    },
    option2_text () {
      return this.calldata.item_data_vals[this.item.unique_id].option2.text
    },
    unique_days () {
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
      let unique_days = {}
      slots.items.map(function (slot) {
        unique_days[slot.day.id] = slot.day
      })
      return unique_days
    },
    selection_day_options () {
      const TTT = this
      return Object.keys(TTT.unique_days).map(function (dayidx) {
        return {
          id: dayidx,
          name: TTT.unique_days[dayidx].text
        }
      })
    }
  },
  methods: {
    click_select_opt1 () {
      this.click_select_opt(this.calldata.item_data_vals[this.item.unique_id].option1)
    },
    click_select_opt2 () {
      this.click_select_opt(this.calldata.item_data_vals[this.item.unique_id].option2)
    },
    click_select_opt (option) {
      let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
      item_data.selection_time = get_time_str(option.start_js_day_obj)
      item_data.selection_day = this.selection_day_options.filter(function (x) {
        return (x.id === option.day.id)
      })[0]
      this.$emit('update_item_data',{
        item_id: this.item.unique_id,
        item_data: item_data
      })
    },
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
    if (!this.calldata.item_data_vals[this.item.unique_id].mounted) {
      let option1 = this.generate_option()
      let item_data = {
        mounted: true,
        option1: option1,
        option2: this.generate_option(),
        selection_day: this.selection_day_options.filter(function (x) {
          return (x.id === option1.day.id)
        })[0],
        selection_time: get_time_str(option1.start_js_day_obj)
      }
      this.$emit('update_item_data',{
        item_id: this.item.unique_id,
        item_data: item_data
      })
    }
  }
})
</script>

<style>
.itemarrangeapointment-button-line button {
  margin: 5px;
}
.itemarrangeapointment-selection-day {
  margin: 5px;
}
.itemarrangeapointment-selection-time {
  margin: 5px;
}
</style>
