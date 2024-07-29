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
    },
    activity_log_display () {
      let ret_var = []
      ret_var = ret_var.concat([{
        id: '011234',
        label: 'LABEL'
      }])
      ret_var = ret_var.concat(this.tests.map(function (x) {
        return {
          id: x.t,
          label: undefined,
          name: 'TODO',
          text: x.a,
          sent: true,
          stamp: '1 minute ago',
          avatar: 'src/assets/activity_log_icon_' + x.t + '.png'
        }
      }))
      console.log('aaa', ret_var)
      return ret_var
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
