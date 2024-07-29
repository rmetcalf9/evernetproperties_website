<template>
  <q-card inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Activity Log</div>
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
        <div v-for="test in tests" :key="test.b">
          <q-chat-message
            name="NAME2"
            :text="['well then ' + test.a]"
            stamp="2 minutes ago"
            :avatar="'src/assets/activity_log_icon_' + test.t + '.png'"
          />
        </div>
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
      tests: [
        {t: 'book_viewing', a: 'Book a viewing', b: 'event'},
        {t: 'hold_viewing', a: 'Hold a viewing', b: 'visibility'},
        {t: 'call_agent', a: 'Call with selling agent', b: 'call'},
        {t: 'wf_move', a: 'Move to different workflow stage', b: 'donut_large'},
        {t: 'offer_made', a: 'Make an offer', b: 'attach_money'},
        {t: 'offer_rejected', a: 'Offer rejected', b: 'money_off'},
        {t: 'offer_accepted', a: 'Offer accepted', b: 'paid'},
      ]
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
