<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Finance</div>
      <div class="text-subtitle2">.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Total Expenditure</div>
      {{ format_currency(totalexpenditure.max) }} - {{ format_currency(totalexpenditure.min) }} (Worst - best)
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
            <q-slider label v-model="bridge.amount.worst" :min="0" :max="maxbridge.worst" :step="5000"/>
            <div>Amount: {{ format_currency(bridge.amount.worst) }}</div>
            <div>Cost: {{ format_currency(bridgecost.worst) }}</div>
          </div>
          <div class="bridgeamountdiv">
            <div>max bridging 60/70% value of money</div>
            <div>Best bridge amount</div>
            <q-slider label v-model="bridge.amount.best" :min="0" :max="maxbridge.best" :step="5000"/>
            <div>Amount: {{ format_currency(bridge.amount.best) }}</div>
            <div>Cost: {{ format_currency(bridgecost.best) }}</div>
          </div>
        </div>
        Refinance LTV<q-range
          v-model="bridge.refinanceltv"
          :min="0"
          :max="100"
          :step="5"
          drag-range
          label
          :left-label-value="bridge.refinanceltv.min + '%'"
          :right-label-value="bridge.refinanceltv.max+ '%'"
        />
        <!--<div>Percentage: {{ bridge.refinanceltv.min }}% - {{ bridge.refinanceltv.max }}%</div>-->
        <div>Refinance amount: {{ format_currency(refinanceamount.worst) }} - {{ format_currency(refinanceamount.best) }}</div>
    </div>

    </q-card-section>
    <q-card-section>
      <div class="text-h6">Cash</div>
      Cash is the money the investors put into the deal. It is free money as there is no interest payments for this money.
      <div>This calculation will assume that all money not privided for loans or bridges will be provided by investors as cash.</div>
      <div class="text-h6">
      {{ format_currency(totalmoneyneeded.worst) }} - {{ format_currency(totalmoneyneeded.best) }} (Worst - best)
      </div>
    </q-card-section>

  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcFinance',
  props: ['purchaserange', 'refurb_cost_total', 'stampduty_total', 'othercosts_total', 'refurbmonths', 'gdv_total'],
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
        },
        refinanceltv: {
          min: 75,
          max: 75
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
    maxbridge () {
      return {
        best: this.purchaserange.min * 0.70,
        worst: this.purchaserange.max * 0.70
      }
    },
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
      if (this.bridge.usebridge) {
        return {
          worst: this.totalexpenditure.max - this.bridge.amount.worst + this.bridgecost.worst,
          best: this.totalexpenditure.min - this.bridge.amount.best + this.bridgecost.best
        }
      }
      return {
        worst: this.totalexpenditure.max,
        best: this.totalexpenditure.min
      }
    },
    refinanceamount () {
      return {
        worst: this.gdv_total.min * (this.bridge.refinanceltv.min / 100),
        best: this.gdv_total.max * (this.bridge.refinanceltv.max / 100)
      }
    },
    finance_in_items () {
      // Currently hardcoded for 100% cash
      if (this.bridge.usebridge) {
        return [
          {name: 'Finance Cash', worst: this.totalmoneyneeded.worst, best: this.totalmoneyneeded.best},
          {
            name: 'Bridge Payment',
            worst: this.bridge.amount.worst - this.bridgecost.worst,
            best: this.bridge.amount.best - this.bridgecost.best
          }
        ]
      }
      return [
        {name: 'Finance Cash', worst: this.totalmoneyneeded.worst, best: this.totalmoneyneeded.best}
      ]
    },
    finance_out_items () {
      if (!this.bridge.usebridge) {
        return []
      }
      return [
        {name: 'Mortgage Refinance', worst: this.refinanceamount.worst, best: this.refinanceamount.best},
        {name: 'Bridge Payback', worst: this.bridge.amount.worst * -1, best: this.bridge.amount.best * -1},
        {
          name: 'Bridge Interest Credit',
          worst: ((12 - this.refurbmonths.worst) * 0.01 * this.bridgecost.worst),
          best: ((12 - this.refurbmonths.best) * 0.01 * this.bridgecost.best)
        }
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
