<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Finance</div>
      <div class="text-subtitle2">.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Total Expenditure</div>
      {{ format_currency(totalexpenditure.min) }} - {{ format_currency(totalexpenditure.max) }}
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Cash</div>
      Cash is the money the investors put into the deal. It is free money as there is no interest payments for this money.
      <div>This calculation will assume that all money not privided for loans or bridges will be provided by investors as cash.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Loans</div>
      TODO
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Bridge + Refinance</div>
      <q-checkbox v-model="bridge.usebridge" label="Use a bridge" />
      <div v-if="bridge.usebridge">
        <div>Start cost/End Cost: {{ bridge.startcost * 100 }}%/{{ bridge.endcost * 100 }}%</div>
        <div>Monthly cost: {{ bridge.monthlycost * 100 }}%</div>
        <div>Months cost paid upfront: {{ bridgemontghsupfront.min }} - {{ bridgemontghsupfront.max }}</div>
        <div class="row">
          <div class="bridgeamountdiv">
            <div>Worst bridge amount</div>
            <q-slider label v-model="bridge.amount.worst" :min="0" :max="purchaserange.max" :step="5000"/>
            <div>Amount: {{ format_currency(bridge.amount.worst) }}</div>
            <div>Cost: {{ format_currency(bridgecost.worst) }}</div>
          </div>
          <div class="bridgeamountdiv">
            <div>max bridging 60/70% value of money</div>
            <div>Best bridge amount</div>
            <q-slider label v-model="bridge.amount.best" :min="0" :max="purchaserange.min" :step="5000"/>
            <div>Amount: {{ format_currency(bridge.amount.best) }}</div>
            <div>Cost: {{ format_currency(bridgecost.best) }}</div>
          </div>
        </div>
      </div>

    </q-card-section>
    <q-card-section>
      <div class="text-h6">Money needed</div>
      {{ format_currency(totalmoneyneeded.min) }} - {{ format_currency(totalmoneyneeded.max) }}
    </q-card-section>
  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcFinance',
  props: ['purchaserange', 'refurb_cost_total', 'stampduty_total', 'othercosts_total', 'refurbmonths'],
  data () {
    return {
      bridge: {
        usebridge: false,
        startcost: 0.01,
        endcost: 0.01,
        monthlycost: 0.01,
        amount: {
          worst: 1,
          best: 1
        }
      }
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
    bridgecost () {
      if (!this.bridge.usebridge) {
        return {
          best: 0,
          worst: 0
        }
      }
      var best = this.bridge.amount.best * (this.bridge.startcost + this.bridge.endcost + (this.bridge.monthlycost * this.refurbmonths.best))
      var worst = this.bridge.amount.worst * (this.bridge.startcost + this.bridge.endcost + (this.bridge.monthlycost * this.refurbmonths.worst))
      return {
        best: best,
        worst: worst
      }
    },
    bridgemontghsupfront () {
      var min = 12
      if (this.refurbmonths.best > 12) {
        min = this.refurbmonths.best
      }
      var max = 12
      if (this.refurbmonths.worst > 12) {
        max = this.refurbmonths.worst
      }
      return {
        min: min,
        max: max
      }
    },
    totalexpenditure () {
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
    totalmoneyneeded () {
      // TODO Add finance costs
      return this.totalexpenditure
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

<style>
.bridgeamountdiv {
  padding: 10px;
}
</style>
