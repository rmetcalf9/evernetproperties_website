<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Finance</div>
      <div class="text-subtitle2">.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Money needed</div>
      {{ format_currency(totalmoneyneeded.min) }} - {{ format_currency(totalmoneyneeded.max) }}
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Cash</div>
      Cash is the money the investors put into the deal. It is free money as there is no intrest payments for this money.
      <div>100%</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Loans</div>
      TODO
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Bridge + Refinance</div>
      TODO
    </q-card-section>
  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcFinance',
  props: ['purchaserange', 'refurb_cost_total', 'stampduty_total', 'othercosts_total'],
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
    totalmoneyneeded () {
      // purchase price
      // refurb cost
      // stamp duty
      // other costs
      var retVal = {
        min: this.purchaserange.min + this.refurb_cost_total.min + this.stampduty_total.min + this.othercosts_total.min,
        max: this.purchaserange.max + this.refurb_cost_total.max + this.stampduty_total.max + this.othercosts_total.max
      }
      return retVal
    },
    finance_in_items () {
      // Currently hardcoded for 100% cash
      return [
        {name: 'Finance Cash', worst: this.totalmoneyneeded.max, best: this.totalmoneyneeded.min}
      ]
    }
  }
})
</script>
