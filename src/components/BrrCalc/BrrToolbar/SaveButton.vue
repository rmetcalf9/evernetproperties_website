<template>
  <div class="brrcalctoolbar">
    <q-btn color="primary" icon="save" :label="save_btn_text" @click="click_btn" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

const default_autosave_Seconds = 2

export default defineComponent({
  name: 'BrrCalcToolbarSaveButton',
  props: ['reason_project_not_savable'],
  emits: ['saveproject'],
  data () {
    return {
      changed: false,
      autosave_seconds_left: 60,
      ever_saved: false,
      save_in_progress: false,
      save_monitor_function_running: false,
      pending_set_changed: false
    }
  },
  computed: {
    no_save_message () {
      // perform all validations and return message to display on save button
      // or empty string
      // TODO CHECK
      if (this.reason_project_not_savable !== '') {
        return this.reason_project_not_savable
      }
      if (this.save_in_progress) {
        return 'Saving...'
      }
      return ''
    },
    can_save () {
      if (this.save_in_progress) {
        return false
      }
      if (this.changed) {
        return true
      }
      return false
    },
    save_btn_text () {
      if (this.save_in_progress) {
        return 'Saving...'
      }
      if (this.no_save_message !== '') {
        return 'Not able to save (' + this.no_save_message + ')'
      }
      if (!this.changed) {
        if (this.ever_saved) {
          return 'Saved'
        }
        return 'Not able to save (No changes)'
      }
      if (this.autosave_seconds_left === -1) {
        return 'Save Now'
      }
      return 'Save now (auto save in ' + this.autosave_seconds_left + ')'
    },
    is_project_changed () {
      return this.changed
    }
  },
  methods: {
    serializer_load_data (data_to_load) {
      this.ever_saved = true
    },
    click_btn () {
      if (!this.changed) {
        return
      }
      if (this.no_save_message !== '') {
        this.$q.dialog({
          title: 'Not currently able to save',
          message: this.no_save_message,
          html: true
        })
        return
      }
      this.autosave_seconds_left = -1 // This causes save monitor to abort
      this.save_now()
    },
    set_changed_true(params) {
      if (this.pending_set_changed) {
        console.log('SaveButton.vue:set_changed_true - set changed called but there is already one pending')
        return
      }
      if (this.save_in_progress) {
        // if save is in progress, just try again in a second
        console.log('SaveButton.vue:set_changed_true - Delay set changed due to save in progress')
        const TTT = this
        setTimeout(function () {
          TTT.pending_set_changed = false
          TTT.set_changed_true()
        }, 1000)
        return
      }
      this.changed = true
      if (this.no_save_message !== '') {
        return
      }
      if ((typeof (params) !== 'undefined') && (typeof (params.autosave_seconds) !== 'undefined')) {
        this.autosave_seconds_left = params.autosave_seconds
      } else {
        this.autosave_seconds_left = default_autosave_Seconds
      }
      this.start_save_monitor_function()
    },
    start_save_monitor_function () {
      if (this.save_monitor_function_running) return
      this.save_monitor_function()
    },
    save_monitor_function () {
      this.save_monitor_function_running = true
      if (this.save_in_progress) {
        return
      }
      if (this.autosave_seconds_left === -1) {
        this.save_monitor_function_running = false
        return
      }
      const TTT = this
      TTT.autosave_seconds_left = TTT.autosave_seconds_left - 1
      if (TTT.autosave_seconds_left<1) {
        this.save_monitor_function_running = false
        this.save_now()
        return
      }
      setTimeout(TTT.save_monitor_function, 1000)
    },
    save_now () {
      if (!this.can_save) {
        return
      }
      this.save_in_progress = true
      this.$emit('saveproject')
    },
    save_project_complete_notification ({success, response}) {
      // Called from Toolbar when project seralised has completed saving
      console.log('SaveButton - Save completed notification recieved')
      this.save_in_progress = false
      if (success) {
        this.changed = false
        this.ever_saved = true
      } else {
        // Failed save stop any countdown
        this.autosave_seconds_left = -1
      }
    }
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
</style>
