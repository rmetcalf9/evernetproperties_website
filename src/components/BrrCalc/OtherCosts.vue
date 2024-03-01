<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Other Costs</div>
      <div class="text-subtitle2">Other costs to be considered</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Fees: {{ format_currency(fees.min) }} - {{ format_currency(fees.max) }}</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcOtherCosts',
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
    fees () {
      return {
        min: this.purchaserange.min * 0.04,
        max: this.purchaserange.max * 0.04
      }
    },
    total () {
      // only one cost so far. In future all costs are added
      var total = {
        min: this.fees.min,
        max: this.fees.max
      }
      return total
    }
  }
})
</script>
