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
import appointment_utils from '../../../components/CallAssist/appointment_utils.js'
import utils from '../../../components/utils.js'


function add_one_hour_to_time(time) {
  let hour = parseInt(time.substr(0,2)) + 1
  if (hour < 10) {
    hour = '0' + hour.toString()
  } else {
    hour = hour.toString()
  }
  return hour + time.substr(2)
}

function outcome_callback(item_data, outcome_obj, item) {
  if (!item_data.mounted) {
    return
  }
  let need_to_process = false
  item.success_outcome_ids.map(function (id) {
    if (outcome_obj.outcome_id === id) {
      need_to_process = true
    }
  })
  if (!need_to_process) {
    return
  }
  let viewing_day_to_update = outcome_obj.batchdata.viewing_days.items.filter(function (x) {
    return x.id===item_data.selection_day.id
  })[0]

  const reserved_slot_obj = {
    id: utils.uuidv4(),
    start: item_data.selection_time,
    end: add_one_hour_to_time(item_data.selection_time),
    text: outcome_obj.current_lead.name
  }
  viewing_day_to_update.reserved_slots.push(reserved_slot_obj)
}

export function getDefaultItemDataArrangeAppointment() {
  return {
    mounted: false,
    option1: 'SETONMOUNT',
    option2: 'SETONMOUNT',
    selection_day: '',
    selection_time: '09:00',
    slots: [],
    outcome_callback: undefined
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
    return {
      viewing_days: 'CACULATEDONMOUNT'
    }
  },
  computed: {
    selection_day: {
      get() {
        return this.calldata.item_data_vals[this.item.unique_id].selection_day
      },
      set(value) {
        // let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
        let item_data = this.calldata.item_data_vals[this.item.unique_id]
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
        // let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
        let item_data = this.calldata.item_data_vals[this.item.unique_id]
        item_data.selection_time = value
        this.$emit('update_item_data',{
          item_id: this.item.unique_id,
          item_data: item_data
        })
      },
    },
    busy_slots () {
      if (typeof (this.viewing_days.items) === 'undefined') {
        return []
      }
      let ret_val = []
      const TTT = this

      const reserved_slots = this.viewing_days.items.filter(function (x) {
        return x.id === TTT.selection_day.id
      })[0].reserved_slots

      reserved_slots.map(function (x) {
        ret_val.push(x.start + ' - ' + x.end + ' ' + x.text)
      })
      return ret_val
    },
    option1_text () {
      return this.calldata.item_data_vals[this.item.unique_id].option1.text
    },
    option2_text () {
      return this.calldata.item_data_vals[this.item.unique_id].option2.text
    },
    selection_day_options () {
      if (this.viewing_days === 'CACULATEDONMOUNT') {
        return []
      }
      return this.viewing_days.items.map(function (day) {
        return {
          id: day.id,
          name: day.text,
          day: day
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
      // let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
      let item_data = this.calldata.item_data_vals[this.item.unique_id]
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
    generate_option (slots) {
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
    this.viewing_days = mustach_utils.evalsinglemustach(
      '{{' + this.item.viewing_day_var + '}}',{
        current_lead: this.current_lead,
        current_stage: this.current_stage,
        calltemplate: this.calltemplate,
        item: this.item,
        batchdata: this.batchdata,
        option1: this.option1_text,
        option2: this.option2_text,
    })
    if (!this.calldata.item_data_vals[this.item.unique_id].mounted) {
      // Item data is reset every time a new lead is selected
      let slots = {
        items: appointment_utils.get_slots_from_viewing_days(this.viewing_days.items)
      }
      let option1 = this.generate_option(slots)
      const frozen_item = JSON.parse(JSON.stringify(this.item))
      let item_data = {
        mounted: true,
        option1: option1,
        option2: this.generate_option(slots),
        selection_day: this.selection_day_options.filter(function (x) {
          return (x.id === option1.day.id)
        })[0],
        selection_time: get_time_str(option1.start_js_day_obj),
        outcome_callback: function (item_data, outcome_obj) {
          return outcome_callback(item_data, outcome_obj, frozen_item)
        }
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
