<template>
<q-expansion-item
  expand-separator
  label="Alternative summary format"
>
  <div>
    This is another way of viewing the same numbers that is commonly used. I have included this for comparison.
    <table class="alternativetable">
      <thead>
        <tr>
          <th class="text-left alternativetablecell"></th>
          <th class="text-center alternativetablecell worstcasetablecell">Worst case</th>
          <th class="text-center alternativetablecell">Best case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left alternativetablecell">Price offered</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(purchaserange.max) }}</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(purchaserange.min) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Mortgage %</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ mortgage_rate_display.worst }}</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ mortgage_rate_display.best }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Mortgage</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(mortgage.worst) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(mortgage.best) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Deposit</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(deposit.worst) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(deposit.best) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Stamp Duty</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(stampduty_total.max) }}</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(stampduty_total.min) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Other costs (Legals, etc)</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(othercosts_total.max) }}</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(othercosts_total.min) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Total Refurb Costs</td>
          <td class="text-right alternativetablecell bluetablecell totaltablecell">{{ format_currency(refurb_cost_total.max) }}</td>
          <td class="text-right alternativetablecell bluetablecell totaltablecell">{{ format_currency(refurb_cost_total.min) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Total Money In</td>
          <th class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(total_money_in.worst) }}</th>
          <th class="text-right alternativetablecell totaltablecell">{{ format_currency(total_money_in.best) }}</th>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td class="worstcasetablecell"></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">End Value</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(11) }}</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">{{ format_currency(11) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">New Mortgage Amount</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(11) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(11) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Money Pulled Out</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(11) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(11) }}</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td class="worstcasetablecell"></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Profit</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(11) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(11) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Money Left In</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(11) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(11) }}</td>
        </tr>
      </tbody>
    </table>
    Note: The profit amounts may not match because this method does not take into account finance costs.
  </div>
</q-expansion-item>
</template>

<script>
import { defineComponent } from 'vue'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcDealRatingAlternativeSummary',
  props: ['purchaserange', 'finance_refinance', 'stampduty_total', 'othercosts_total', 'refurb_cost_total'],
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
    mortgage_rate_display () {
      if (!this.finance_refinance.userefinance) {
        return {
          best: 'N/A',
          worst: 'N/A'
        }
      }
      return {
        best: this.finance_refinance.ltv.max + '%',
        worst: this.finance_refinance.ltv.min + '%'
      }
    },
    mortgage () {
      if (!this.finance_refinance.userefinance) {
        return {
          best: 0,
          worst: 0
        }
      }
      return {
        best: (this.finance_refinance.ltv.max/100) * this.purchaserange.min,
        worst: (this.finance_refinance.ltv.min/100) * this.purchaserange.max
      }
    },
    deposit () {
      return {
        best: this.purchaserange.min -  this.mortgage.best,
        worst: this.purchaserange.max -  this.mortgage.worst
      }
    },
    total_money_in () {
      return {
        best: this.mortgage.best
          + this.deposit.best
          + this.stampduty_total.min
          + this.othercosts_total.min
          + this.refurb_cost_total.min,
        worst: this.mortgage.worst
          + this.deposit.worst
          + this.stampduty_total.max
          + this.othercosts_total.max
          + this.refurb_cost_total.max
      }
    }
  }
})
</script>

<style>
.worstcasetablecell {
  background-color: lightgrey;
}
table.alternativetable {
  background-color: white;
  color: black;
  padding: 2px;
  border-spacing: 0px;
}
.alternativetablecell {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
}
td.yellowtablecell {
  background-color: yellow;
}
td.bluetablecell {
  background-color: lightblue;
}
th.totaltablecell {
  font-size: 15px
}
</style>
