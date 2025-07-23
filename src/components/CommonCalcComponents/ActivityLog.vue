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
              text-html
              :sent="item.sent"
              :stamp="item.stamp"
              :avatar="item.avatar"
            >
              <template v-slot:avatar>
                <img
                  class="q-message-avatar q-message-avatar--sent"
                  alt="Avatar"
                  :src="'/' + item.avatar"
                >
              </template>
            </q-chat-message>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { uuidv4 } from 'node-common-library'

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
        research_call: { sent: true, name: 'Research Call' },
        wf_move: { sent: false, name: 'Workflow' },
        admin: { sent: false, name: 'Admin action' },
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
          avatar: 'activity_log_icon_' + ite.type + '.png'
        })
      })

      return ret_var
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'ActivityLog:serializer')
      }
    }
  },
  methods: {
    log_activity (obj) {
      const TTT = this
      var new_act_log = this.activity_log.filter(function (x) {
        return true
      })
      new_act_log.push({
        id: uuidv4(),
        type: obj.type,
        timestamp: (new Date()).toISOString(),
        text: obj.text,
        head_notes: obj.head_notes
      })
      this.activity_log = new_act_log
      this.emit_project_change_notification = false
      if ((typeof (obj.immediate_save_after_log) !== 'undefined') && (obj.immediate_save_after_log)) {
        this.$emit('projectchanged', 'ActivityLog:log_activity:forcesave')
      } else {
        this.$emit('projectchanged', 'ActivityLog:log_activity')
      }
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
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
