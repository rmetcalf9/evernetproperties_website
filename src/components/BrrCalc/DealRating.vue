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
            <td class="text-left">Cash at end</td>
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
            <th class="text-left">ROI<br>(Over project duration)</th>
            <th class="text-right worstcasetablecell totaltablecell">{{ roi.worst.toFixed(1) }}%</th>
            <th class="text-right totaltablecell">{{ roi.best.toFixed(1) }}%</th>
          </tr>
          <tr>
            <th class="text-left">Annual ROI<br>(12 month ROI for comparison)</th>
            <th class="text-right worstcasetablecell totaltablecell">{{ annualroi.worst.toFixed(1) }}%<br>({{this.refurbmonths.worst}} months)</th>
            <th class="text-right totaltablecell">{{ annualroi.best.toFixed(1) }}%<br>({{this.refurbmonths.best}} months)</th>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Deal Features</div>
      <div class="featuretable">
        <div v-for="feature in features" :key="feature">
          <q-icon v-if="feature.positive" name="check_box" color="green" size="32px" />
          <q-icon v-if="!feature.positive" name="cancel" color="red" size="32px" />
          {{ feature.text }}
        </div>
      </div>
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
    features () {
      let ret_val = []


      var min_money_out = Math.min(this.cash_out_of_deal_minus_cash_in.best, this.cash_out_of_deal_minus_cash_in.worst)
      if (min_money_out > 0) {
        ret_val.push({
          positive: true,
          text: 'All money out deal! - All initial investment returned plus at least ' + this.format_currency(min_money_out)
        })
      } else {
        ret_val.push({
          positive: false,
          text: 'Not all money out deal! - Might leave ' + this.format_currency(-1 * min_money_out) + ' in.'
        })
      }

      var min_profit = Math.min(this.profit.best, this.profit.worst)
      if (min_profit < 0) {
        ret_val.push({
          positive: false,
          text: 'Deal makes a loss! - End value might be ' + this.format_currency(-1 * min_profit) + ' less than investment.'
        })
      } else {
        if (min_profit < (this.gdv_total.min * 0.25)) {
          ret_val.push({
            positive: false,
            text: 'Low amount of profit! - Low profit ' + this.format_currency(min_profit) + ' less than 25% of gdv.'
          })
        } else {
          ret_val.push({
            positive: true,
            text: 'Profit making deal! - Profit of ' + this.format_currency(min_profit) + '!'
          })
        }
      }

      var min_anual_roi = Math.min(this.annualroi.worst, this.annualroi.best)
      if (min_anual_roi < 3) {
        ret_val.push({
          positive: false,
          text: 'Very low ROI! ' + min_anual_roi.toFixed(1) + '%'
        })
      } else if (min_anual_roi > 10) {
        ret_val.push({
          positive: true,
          text: 'Good ROI! ' + min_anual_roi.toFixed(1) + '%'
        })
      }

      return ret_val
    },
    cash_out_of_deal_minus_cash_in () {
      return {
        best: this.deal_summary_final_bal.best - this.finance_totalmoneyneeded.best,
        worst: this.deal_summary_final_bal.worst - this.finance_totalmoneyneeded.worst
      }
    },
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
        worst: (this.roi.worst * (12 / this.refurbmonths.worst)),
        best: (this.roi.best * (12 / this.refurbmonths.best))
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
.featuretable {
  background-color: white;
  color: black;
  font-weight: 700;
}

</style>
