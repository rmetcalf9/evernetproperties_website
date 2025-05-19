<template>
  <q-page class="flex flex-center locationpage-main">
    <div class="cols">
      <h1>Location Scanner</h1>
      <table>
        <tr>
          <td>Status:</td>
          <td>{{ status_text }}</td>
          <td><q-btn round  color="primary" icon="refresh" /></td>
        </tr>
        <tr v-if="status > 2">
          <td>Location:</td>
          <td>{{ cur_location.coords.latitude }}, {{ cur_location.coords.longitude }}</td>
          <td></td>
        </tr>
      </table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import locationFns from './locationFns.js'
import { Notify } from 'quasar'


export default defineComponent({
  name: 'ToolsLocationPage',
  components: {
  },
  data () {
    return {
      status: 0, // See status_text
      error_message: '',
      cur_location: {}
    }
  },
  computed: {
    status_text () {
      if (this.status===0) {
        return 'Initial'
      }
      if (this.status===1) {
        return 'Finding Location...'
      }
      if (this.status===2) {
        return 'Failed to find location - ' + this.error_message
      }
      if (this.status===3) {
        return 'Location Found'
      }
      if (this.status===4) {
        return 'Postcode Found'
      }
      return 'Unknown'
    }
  },
  methods: {
    rescan () {
      this.status = 1
      var bestAttemptSoFar = {
        coords: {
          accuracy: 99999
        }
      }
      var callback = {
        ok: this.rescan_positive,
        error: this.rescan_negative
      }
      locationFns.getLocation({
        attemptsRemaining: 4,
        bestAttemptSoFar: bestAttemptSoFar,
        callback: callback,
        allowLowAccuracy: false
      })

    },
    rescan_positive (response) {
      this.status = 3
      this.cur_location = response
      console.log('positive response', response)
    },
    rescan_negative (response) {
      this.status = 2
      this.error_message = response.message
      console.log('rescan_negative', response)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Failed to access location services',
        timeout: 2000,
        color: 'negative'
      })
    }
  },
  mounted () {
    this.rescan()
  }
})
</script>

<style>
.locationpage-main h1 {
  margin-top: 0px;
  margin-bottom: 10px;
}
</style>
