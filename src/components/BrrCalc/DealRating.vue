<template>
  <q-card inline class="q-ma-sm card-style maincard col-grow">
    <q-card-section>
      <div class="text-h6">Project Rating</div>
      <div class="text-subtitle2">How good is this project?</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h5">Profit/Loss</div>
      <div>Compare what we have put into the deal vs what we get out of it. These calculations won't account for time invested or the risk taken on in the project</div>
      <div class="text-h5">Total cash in: {{ format_currency(finance_totalmoneyneeded.worst) }} - {{ format_currency(finance_totalmoneyneeded.best) }} Worst - Best</div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Value after Project</th>
            <th class="text-center worstcasetablecell">Worst case</th>
            <th class="text-center">Best case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Equity left in property</td>
            <td class="text-right worstcasetablecell">{{ format_currency(amount_equity_left_in.worst) }} ({{ percent_left_in.worst }}%)</td>
            <td class="text-right">{{ format_currency(amount_equity_left_in.best) }} ({{ percent_left_in.best }}%)</td>
          </tr>
          <tr>
            <td class="text-left">Money out</td>
            <td class="text-right worstcasetablecell">{{ format_currency(deal_summary_final_bal.worst) }}</td>
            <td class="text-right">{{ format_currency(deal_summary_final_bal.best) }}</td>
          </tr>
          <tr>
            <th class="text-left">Total End Value</th>
            <th class="text-right worstcasetablecell">{{ format_currency(total_end_value.worst) }}</th>
            <th class="text-right totaltablecell">{{ format_currency(total_end_value.best) }}</th>
          </tr>
        </tbody>
      </q-markup-table>
      &nbsp;
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-center worstcasetablecell">Worst case</th>
            <th class="text-center">Best case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="text-left">Profit</th>
            <th class="text-right worstcasetablecell totaltablecell">{{ format_currency(profit.worst) }}</th>
            <th class="text-right totaltablecell">{{ format_currency(profit.best) }}</th>
          </tr>
          <tr>
            <th class="text-left">ROI</th>
            <th class="text-right worstcasetablecell totaltablecell">{{ roi.worst.toFixed(0) }}%</th>
            <th class="text-right totaltablecell">{{ roi.best.toFixed(0) }}%</th>
          </tr>
          <tr>
            <th class="text-left">Annual ROI<br>(Based on project duration)</th>
            <th class="text-right worstcasetablecell totaltablecell">{{ annualroi.worst.toFixed(0) }}%<br>({{this.refurbmonths.worst}} months)</th>
            <th class="text-right totaltablecell">{{ annualroi.best.toFixed(0) }}%<br>({{this.refurbmonths.best}} months)</th>
          </tr>
        </tbody>
      </q-markup-table>
      <div>TODO What is best val {{ finance_refinance }} TODO FIX ANUJAL ROI</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">All money out?</div>
      A key element of BRRR is getting our money out of each project so we are able to invest in the next one. This section tells us if we are able to ‘snowball’ our investment and build a portfolio.
      TODO
    </q-card-section>

  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcDealRating',
  props: ['finance_totalmoneyneeded', 'deal_summary_final_bal', 'finance_refinance', 'gdv_total', 'refurbmonths'],
  components: {
  },
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
    percent_left_in () {
      if (!this.finance_refinance.userefinance) {
        return {
          best: 100,
          worst: 100
        }
      }
      return {
        best: 100 - this.finance_refinance.ltv.max,
        worst: 100 - this.finance_refinance.ltv.min
      }
    },
    amount_equity_left_in () {
      return {
        best: this.gdv_total.max * (this.percent_left_in.best / 100),
        worst: this.gdv_total.min * (this.percent_left_in.worst / 100)
      }
    },
    total_end_value () {
      return {
        best: this.amount_equity_left_in.best + this.deal_summary_final_bal.best,
        worst: this.amount_equity_left_in.worst + this.deal_summary_final_bal.worst
      }
    },
    profit () {
      return {
        best: this.total_end_value.best - this.finance_totalmoneyneeded.best,
        worst: this.total_end_value.worst - this.finance_totalmoneyneeded.worst
      }
    },
    roi () {
      return {
        best: (100 * this.profit.best) / this.finance_totalmoneyneeded.best,
        worst: (100 * this.profit.worst) / this.finance_totalmoneyneeded.worst
      }
    },
    annualroi () {
      return {
        worst: (this.roi.worst * (this.refurbmonths.worst / 12)),
        best: (this.roi.best * (this.refurbmonths.best / 12))
      }
    }
  }
})

</script>

<style>
.maincard {
  color: white;
  background-color: grey;
}
th.worstcasetablecell {
  background-color: lightgrey;
}
td.worstcasetablecell {
  background-color: lightgrey;
}
th.totaltablecell {
  font-size: 15px
}

</style>
