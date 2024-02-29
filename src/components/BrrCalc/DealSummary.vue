<template>
  <q-card inline class="q-ma-sm card-style maincard">
    <q-card-section>
      <div class="text-h6">Summary</div>
      <div class="text-subtitle2">xxx</div>
    </q-card-section>
    <q-card-section>
      <div class="col-grow ">
        &nbsp;
      </div>
      <div class="text-h6">ccc: {{ format_currency(12355) }} - {{ format_currency(23430) }}</div>
    </q-card-section>
  </q-card>
</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcDealSummary',
  props: ['purchaserange'],
  data () {
    return {
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
  }
})
</script>

<style>
.maincard {
  color: white;
  background-color: grey;
}
</style>
