<template>
  <q-card inline class="q-ma-sm card-style col-grow">
    <q-card-section>
     {{ current_workflow_position }}
     {{ workflow_stage_data }}
      <div class="text-h6">Viewing</div>
      <div v-if="!isViewingArranged">
        No viewing has been arranged.
      </div>
      <div v-if="isViewingArranged">
        <div v-if="!isViewingHeld">
          Viewing arranged TODO Info change
        </div>
        <div v-if="isViewingHeld">
          Viewing has been held
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
  props: ['isViewingArranged', 'isViewingHeld'],
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
      current_workflow_position: {
        workflow_used_id: -1,
        current_stage: -1
      }
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        // this.$emit('projectchanged', 'LeadInformation:serializer')
      }
    }
  },
  computed: {
    serializer_card_data () {
      return {
        // patch_id: this.patch.id,
      }
    },
    workflow_stage_data () {
      console.log('calc workflow_stage_data')
      if (this.current_workflow_position.workflow_used_id === -1) {
        return default_workflow_stage_data()
      }
      if (this.current_workflow_position.current_stage === -1) {
        return default_workflow_stage_data()
      }
      console.log('calc workflow_stage_data 222')
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

      // this.address = data_to_load.address

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
</style>
