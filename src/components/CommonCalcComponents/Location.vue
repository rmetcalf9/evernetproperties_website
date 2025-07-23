<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Location</div>
      <div class="row">
        <q-input v-model="coords.lat" label="Latitude" class="" readonly />
        <q-input v-model="coords.long" label="Longitude" class="" readonly />
        <q-input v-model="entry_mode" label="Entered mode" class="" readonly />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

// entry_mode values:
//   '' not entered
//   'right_move' auto from rightmove
//   'post_code' auto from full postcode
//   'user' user entered - never change


export default defineComponent({
  name: 'CommonCalcLocation',
  emits: ['projectchanged'],
  data () {
    return {
      coords: {
        lat: '',
        long: ''
      },
      entry_mode: ''
    }
  },
  computed: {
    serializer_card_data () {
      return {
        coords: this.coords,
        entry_mode: this.entry_mode
      }
    }
  },
  watch: {
    serializer_card_data(val) {
      this.setchanged()
    }
  },
  methods: {
    setchanged () {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'Location')
      }
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.coords = {
        lat: '',
        long: ''
      }
      this.entry_mode = ''
      if (typeof (data_to_load.coords) !== 'undefined') {
        this.coords = data_to_load.coords
      }
      if (typeof (data_to_load.entry_mode) !== 'undefined') {
        this.entry_mode = data_to_load.entry_mode
      }
      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  }
})
</script>
