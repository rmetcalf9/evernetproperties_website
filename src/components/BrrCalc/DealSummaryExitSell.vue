<template>
  <div>
    <div class="text-h5">Exit - Sell Property</div>
    <div>This is calculated to compare rather than for acutal sale. For an actual sale captial gains tax will be due.</div> 
    <div>Money in: {{ format_currency(money_in.worst) }} - {{ format_currency(money_in.best) }}</div>
    <div>Money out: {{ format_currency(money_out.worst) }} - {{ format_currency(money_out.best) }}</div>
    <div class="text-h6">Profit: {{ format_currency(profit.worst) }} - {{ format_currency(profit.best) }}</div>
    <div>ROI: {{ roi.worst }}% - {{ roi.best }}%</div>
    <div>annual ROI: {{ annualroi.worst }}% - {{ annualroi.best }}%</div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcDealSummaryExitSell',
  props: ['money_in', 'final_bal', 'gdv_total', 'refurbmonths'],
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
    annualroi () {
      return {
        worst: (this.roi.worst * (this.refurbmonths.worst / 12)).toFixed(2),
        best: (this.roi.best * (this.refurbmonths.best / 12)).toFixed(2)
      }
    },
    roi () {
      return {
        worst: (100 * this.profit.worst / this.money_in.worst).toFixed(2),
        best: (100 * this.profit.best / this.money_in.best).toFixed(2)
      }
    },
    profit () {
      return {
        worst: this.money_out.worst - this.money_in.worst,
        best: this.money_out.best - this.money_in.best
      }
    },
    money_out () {
      return {
        worst: this.final_bal.worst + this.gdv_total.min,
        best: this.final_bal.best + this.gdv_total.max
      }
    }
  }
})
</script>
