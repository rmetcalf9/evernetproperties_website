<template>
  <q-card inline class="q-ma-sm card-style col-grow">
    <q-card-section>
      <div class="text-h6">Viewing</div>
      <div v-if="!workflow_stage_data.isViewingArranged">
        No viewing has been arranged.
      </div>
      <div v-if="workflow_stage_data.isViewingArranged">
        <div v-if="!workflow_stage_data.isViewingHeld" class="row viewinginfo-datetime-controls">
          <div>
            Date: <q-input filled v-model="dateOnly" readonly>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dateOnly" mask="dddd, MMM D, YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div>
            Time: <q-input filled v-model="timeOnly" mask="time" :rules="['time']" readonly>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeOnly">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
          </div>
        </div>
        <div v-if="workflow_stage_data.isViewingHeld">
          <div>Viewing held {{dateOnly}} at {{ timeOnly }}</div>
          TODO result record
        </div>
        </div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import utils from '../../utils.js'
import { useBackendConnectionStore } from 'stores/backend_connection'

import Workflow_main from '../../components/Workflow/Workflow_main.js'

function default_workflow_stage_data () {
  return {
    isViewingArranged: false,
    isViewingHeld: false
  }
}

export default defineComponent({
  name: 'ViewingInformationCard',
  // emits: ['projectchanged'],
  components: {
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      emit_project_change_notification: true,
      current_workflow_position: {
        workflow_used_id: -1,
        current_stage: -1
      },
      // Actual format will be 2025-04-19T10:50:44.066Z
      viewing_timestamp: '2025-04-19T10:50:44.066Z'
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'ViewingInformation:serializer')
      }
    }
  },
  computed: {
    dateOnly: {
      get() {
        const date = new Date(this.viewing_timestamp)
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      },
      set(newFormattedDate) {
        // Example input: "Thursday, Apr 10, 2025"
        const parsed = new Date(newFormattedDate)
        if (isNaN(parsed)) return // guard against invalid date

        const original = new Date(this.viewing_timestamp)
        parsed.setHours(original.getHours())
        parsed.setMinutes(original.getMinutes())
        parsed.setSeconds(0)
        parsed.setMilliseconds(0)

        this.viewing_timestamp = parsed.toISOString()
      }
    },
    timeOnly: {
      get() {
        const date = new Date(this.viewing_timestamp)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
      },
      set(newTime) {
        const [hours, minutes] = newTime.split(':').map(Number)
        const date = new Date(this.viewing_timestamp)
        date.setHours(hours)
        date.setMinutes(minutes)
        date.setSeconds(0)
        date.setMilliseconds(0)
        this.viewing_timestamp = date.toISOString()
      }
    },
    serializer_card_data () {
      return {
        viewing_timestamp: this.viewing_timestamp,
      }
    },
    workflow_stage_data () {
      if (this.current_workflow_position.workflow_used_id === -1) {
        return default_workflow_stage_data()
      }
      if (this.current_workflow_position.current_stage === -1) {
        return default_workflow_stage_data()
      }
      return Workflow_main.workflows[this.current_workflow_position.workflow_used_id]._stage_calc_fn(this.current_workflow_position.current_stage)
    }
  },
  methods: {
    reset_data() {
      console.log('RESET DATA CALL')
      this.emit_project_change_notification = false

      // this.patch = {id: 'notset', name: 'Not Set'}

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)

    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false

      this.viewing_timestamp = data_to_load.viewing_timestamp

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    },
    setWorkflowInfo ({workflow_used_id, current_stage}) {
      console.log('setWorkflowInfo')
      this.current_workflow_position.workflow_used_id = workflow_used_id
      this.current_workflow_position.current_stage = current_stage
    }
  }
})

</script>

<style>
.viewinginfo-datetime-controls > div {
  padding: 10px;
}
</style>
