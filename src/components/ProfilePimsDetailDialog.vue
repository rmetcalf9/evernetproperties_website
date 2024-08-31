<template>
  <div>
    <q-dialog v-model="enterpimsdialog.visible" persistent>
      <ProfilePimsDetailForm
        ref="ProfilePimsDetailForm"
        @process_done="enterpimsdialogclick"
        @click_cancel="enterpimsdialogclick"
      />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProfilePimsDetailForm from './ProfilePimsDetailForm.vue'

export default defineComponent({
  name: 'ProfilePimsDetailDialogComponent',
  components: {
    ProfilePimsDetailForm
  },
  setup () {
  },
  data () {
    return {
      enterpimsdialog: {
        visible: false
      }
    }
  },
  methods: {
    launch_dialog () {
      this.enterpimsdialog.visible = true
      const TTT = this
      setTimeout(function () {
        TTT.$refs.ProfilePimsDetailForm.blank_data()
      }, 10)
    },
    enterpimsdialogclick () {
      this.enterpimsdialog.visible = false
    }
  },
})
</script>

<style>
</style>
