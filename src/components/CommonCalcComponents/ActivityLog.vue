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

function get_new_activity_item (type, text, head_notes) {
  return {
    id: uuidv4(),
    type: type,
    timestamp: (new Date()).toISOString(),
    text: text,
    head_notes: head_notes
  }
}

export default defineComponent({
  name: 'BrrCalcActivityJob',
  emits: ['projectchanged'],
  data () {
    return {
      activity_log: [],
      emit_project_change_notification: true
    }
  },
  computed: {
    serializer_card_data () {
      // Can only be an array
      return this.activity_log
    },
    activity_log_display () {
      let ret_var = []

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
      this.activity_log.forEach(function (ite) {
        const timestamp = new Date(ite.timestamp)
        const date_string = timestamp.toDateString()
        const time_String = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        if (prev_data_string !== date_string) {
          prev_data_string = date_string
          ret_var = ret_var.concat([{
            id: uuidv4(),
            label: prev_data_string
          }])
        }
        let name = type_data_map[ite.type].name
        if (typeof (ite.head_notes) !== 'undefined') {
          name = name + ' (' + ite.head_notes + ')'
        }
        ret_var = ret_var.concat({
          id: ite.t,
          label: undefined,
          name: name,
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
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged')
      }
    }
  },
  methods: {
    log_activity (obj) {
      this.activity_log.push({
        id: uuidv4(),
        type: obj.type,
        timestamp: (new Date()).toISOString(),
        text: obj.text,
        head_notes: obj.head_notes
      })
      this.$emit('projectchanged')
    },
    serializer_load_data (activity_log) {
      this.emit_project_change_notification = false

      this.activity_log = activity_log

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  }
})
</script>
