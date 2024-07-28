<template>
  <q-card inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Activity Log</div>
      <div>Book a viewing<q-btn icon="event" size="200%"/></div>
      <div>Hold a viewing<q-btn icon="visibility" size="200%"/></div>
      <div>Call with selling agent<q-btn icon="call" size="200%"/></div>
      <div>Move to different workflow stage<q-btn icon="donut_large" size="200%"/></div>
      <div>Make an offer<q-btn icon="attach_money" size="200%"/></div>
      <div>Offer rejected<q-btn icon="money_off" size="200%"/></div>
      <div>Offer accepted<q-btn icon="paid" size="200%"/></div>

      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          label="Sunday, 19th"
        />
        <q-chat-message
          name="NAME1"
          :text="['hey, how are you?']"
          sent
          stamp="1 minute ago"
          avatar="src/assets/main_logo.svg"
        />
        <q-chat-message
          name="NAME2"
          :text="['doing fine, how r you?']"
          stamp="2 minutes ago"
          avatar="src/assets/main_logo.svg"
        />
        <q-chat-message
          label="Sunday, 18th"
        />
        <q-chat-message
          name="NAME1"
          :text="['hey, how are you?']"
          sent
          stamp="1 minute ago"
          avatar="src/assets/main_logo.svg"
        />
        <q-chat-message
          name="NAME2"
          :text="['doing fine, how r you?']"
          stamp="2 minutes ago"
          avatar="src/assets/main_logo.svg"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

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
