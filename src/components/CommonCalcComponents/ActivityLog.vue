<template>
  <q-card inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Activity Log</div>
      <div style="width: 100%; max-width: 400px">
        <div v-for="item in activity_log_display" :key="item.id">
          <div v-if="typeof (item.label) === 'string'">
            <q-chat-message
              :label="item.label"
            />
          </div>
          <div v-if="typeof (item.label) === 'undefined'">
            <q-chat-message
              :name=item.name
              :text="[item.text]"
              :sent="item.sent"
              :stamp="item.stamp"
              :avatar="item.avatar"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function get_new_activity_item (type, text) {
  return {
    id: uuidv4(),
    type: type,
    timestamp: (new Date()).toISOString(),
    text: text
  }
}

function tmp_get_example_activity_log_data () {
  let ret_var = []

  ret_var.push(get_new_activity_item('book_viewing', 'This is some text for the book_viewing'))
  ret_var.push(get_new_activity_item('hold_viewing', 'This is some text for the hold_viewing'))
  ret_var.push(get_new_activity_item('call_agent', 'This is some text for the call agent'))
  ret_var.push(get_new_activity_item('wf_move', 'Moved Stage'))
  ret_var.push(get_new_activity_item('offer_made', 'Offer made'))
  ret_var.push(get_new_activity_item('offer_rejected', 'Offer rejected'))
  ret_var.push(get_new_activity_item('offer_accepted', 'Offer accepted'))

  return ret_var
}

export default defineComponent({
  name: 'BrrCalcActivityJob',
  data () {
    return {
    }
  },
  computed: {
    serializer_card_data () {
      return {
        devplan: this.devplan
      }
    },
    activity_log_display () {
      let ret_var = []
      let activity_log = tmp_get_example_activity_log_data()

      const type_data_map = {
        book_viewing: { sent: true, name: 'Viewing booked' },
        hold_viewing: { sent: false, name: 'Viewing' },
        call_agent: { sent: true, name: 'Call to agent' },
        wf_move: { sent: false, name: 'Workflow' },
        offer_made: { sent: true, name: 'Offer made' },
        offer_rejected: { sent: false, name: 'Offer rejected' },
        offer_accepted: {sent: false, name: 'Offer accepted' },
      }

      let prev_data_string = ""
      activity_log.forEach(function (ite) {
        const timestamp = new Date(ite.timestamp)
        const date_string = timestamp.toDateString()
        const time_String = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        if (prev_data_string !== date_string) {
          prev_data_string = date_string
          ret_var = ret_var.concat([{
            id: '011234',
            label: prev_data_string
          }])
        }
        ret_var = ret_var.concat({
          id: ite.t,
          label: undefined,
          name: type_data_map[ite.type].name,
          text: ite.text,
          sent: type_data_map[ite.type].sent,
          stamp: time_String,
          avatar: 'src/assets/activity_log_icon_' + ite.type + '.png'
        })
      })

      return ret_var
    }
  },
  watch: {
    serializer_card_data(val) {
    }
  },
  methods: {
    serializer_load_data (data_to_load) {
    }
  }
})
</script>
