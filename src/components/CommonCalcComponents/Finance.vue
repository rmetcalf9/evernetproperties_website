<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Finance</div>
      <div class="text-subtitle2">This section is to estimate the finance costs of the project.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Total Expenditure</div>
      {{ format_currency(totalexpenditure.max) }} - {{ format_currency(totalexpenditure.min) }} (Worst - best)
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Loans</div>
      <p>Loans that will be paid back at the refinance stage. Same loans are used for best and worst calculations</p>
      <div>
        <div v-for="loanitem in loans" :key='loanitem.id' class="row">
          <div> Loan {{ loanitem.id }}</div>
          <div>&nbsp;</div>
          <div> Rate: {{ loanitem.rate }}%
            <q-input
              v-model.number="loanitem.rate"
              type="number"
              filled
              style="max-width: 70px"
            />
          </div>
          <div class="col-grow"> Amount: {{ format_currency(loanitem.amount) }}<q-slider
            label
            :label-value="format_currency(loanitem.amount)"
            v-model="loanitem.amount"
            :min="0"
            :max="maxloan.worst"
            thumb-size="40px"
            :step="5000"
          /></div>
          <q-btn round icon="delete" @click="delloan(loanitem.id)" />
        </div>
      </div>
      <q-btn round  color="primary" icon="add" @click="addloan" />
      <p>Fixed return loans</p>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Mortgage</div>
      <q-checkbox v-model="mortgage.usemortgage" label="Buy with Mortgage" @update:model-value="updatemortgagetoggle" />
      <div v-if="mortgage.usemortgage">
        Rate: {{ mortgage.rate.min }}% - {{ mortgage.rate.max }}%<q-range
          v-model="mortgage.rate"
          :min="0"
          :max="10"
          :step="0.1"
          thumb-size="40px"
          drag-range
          label
          snap
          :left-label-value="'Best ' + mortgage.rate.min + '%'"
          :right-label-value="'Worst ' + mortgage.rate.max + '%'"
        />
        LTV: {{ mortgage.ltv.min }}% - {{ mortgage.ltv.max }}%<q-range
          v-model="mortgage.ltv"
          :min="0"
          :max="100"
          :step="1"
          thumb-size="40px"
          drag-range
          label
          snap
          :left-label-value="'Best ' + mortgage.ltv.min + '%'"
          :right-label-value="'Worst ' + mortgage.ltv.max + '%'"
        />
        This is based on a repayment mortgage.
        <div>Amount Borrowed: {{ format_currency(mortgage_amount_borrowed.worst) }} - {{ format_currency(mortgage_amount_borrowed.best) }}</div>
        <div>Monthly Repayments: {{ format_currency(mortgage_monthly_payment.worst) }} - {{ format_currency(mortgage_monthly_payment.best) }}</div>
        <div>Arrangement Fee: {{ format_currency(mortgage.arrangementfee) }}</div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Bridge</div>
      <q-checkbox v-model="bridge.usebridge" label="Use a bridge" @update:model-value="updatebridgetoggle" />
      <div v-if="bridge.usebridge">
        <div>Start cost/End Cost: {{ bridge.startcost * 100 }}%/{{ bridge.endcost * 100 }}%</div>
        <div>Monthly cost: {{ bridge.monthlycost * 100 }}%</div>
        <div>Months cost paid upfront: {{ bridgemontghsupfront.min }} - {{ bridgemontghsupfront.max }}</div>
        <div class="row">
          <div class="bridgeamountdiv">
            <div>Worst bridge amount</div>
            <q-slider label v-model="bridge.amount.worst" :min="0" :max="maxbridge.worst" :step="5000" thumb-size="40px"/>
            <div>Amount: {{ format_currency(bridge.amount.worst) }}</div>
            <div>Cost: {{ format_currency(bridgecost.worst) }}</div>
          </div>
          <div class="bridgeamountdiv">
            <div>max bridging 60/70% value of money</div>
            <div>Best bridge amount</div>
            <q-slider label v-model="bridge.amount.best" :min="0" :max="maxbridge.best" :step="5000" thumb-size="40px"/>
            <div>Amount: {{ format_currency(bridge.amount.best) }}</div>
            <div>Cost: {{ format_currency(bridgecost.best) }}</div>
          </div>
        </div>
    </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Cash</div>
      Cash is the money the investors put into the deal. It is free money as there is no interest payments for this money.
      <div>This calculation will assume that all money not provided for loans or bridges will be provided by investors as cash.</div>
      <div class="text-h6">
      {{ format_currency(totalmoneyneeded.worst) }} - {{ format_currency(totalmoneyneeded.best) }} (Worst - best)
      </div>
    </q-card-section>

  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'
import { Notify } from 'quasar'

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
        }
      },
      mortgage: {
        usemortgage: false,
        rate: {
          min: 5.5,
          max: 5.5
        },
        ltv: {
          min: 75,
          max: 75
        },
        arrangementfee: 1500
      },
      loans: []
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    addloan () {
      var last_id = 0
      if (this.loans.length > 0) {
        last_id = Math.max(...this.loans.map(o => o.id))
      }
      this.loans.push({
        id: last_id + 1,
        name: 'Loan ' + (last_id + 1).toString(),
        amount: 20000,
        rate: 10
      })
    },
    delloan (id) {
      if (this.loans.length < 1) {
        return
      }
      this.loans = this.loans.filter(function(el) { return el.id != id; });
    },
    updatemortgagetoggle () {
      if (this.bridge.usebridge) {
        if (this.mortgage.usemortgage) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Use mortgage or bridge but not both',
            timeout: 2000
          })
          this.mortgage.usemortgage = false
        }
      }
    },
    updatebridgetoggle () {
      if (this.bridge.usebridge) {
        if (this.mortgage.usemortgage) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Use mortgage or bridge but not both',
            timeout: 2000
          })
          this.bridge.usebridge = false
        }
      }
    }
  },
  computed: {
    mortgage_amount_borrowed () {
      return {
        best: this.purchaserange.min * (this.mortgage.ltv.min / 100),
        worst: this.purchaserange.max * (this.mortgage.ltv.max / 100)
      }
    },
    mortgage_monthly_payment () {
      return {
        best: this.mortgage_amount_borrowed.best * (this.mortgage.rate.min / 100) / 12,
        worst: this.mortgage_amount_borrowed.worst * (this.mortgage.rate.max / 100) / 12
      }
    },
    maxbridge () {
      return {
        best: this.purchaserange.min * 0.70,
        worst: this.purchaserange.max * 0.70
      }
    },
    maxloan () {
      // Note only worst is used
      return {
        best: this.totalexpenditure.min,
        worst: this.totalexpenditure.max,
      }
    },
    bridgecost () {
      if (!this.bridge.usebridge) {
        return {
          best: 0,
          worst: 0
        }
      }
      var best = this.bridge.amount.best * (this.bridge.startcost + this.bridge.endcost + (this.bridge.monthlycost * this.bridgemontghsupfront.min))
      var worst = this.bridge.amount.worst * (this.bridge.startcost + this.bridge.endcost + (this.bridge.monthlycost * this.bridgemontghsupfront.max))
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
      var total_loans = 0
      if (this.loans.length > 0) {
        total_loans = this.loans.reduce(function (acc, current) {
          return acc + current.amount
        }, 0)
      }
      if (this.mortgage.usemortgage) {
        return {
          worst: (this.totalexpenditure.max + this.mortgage_intrest_payment_total.worst + this.mortgage.arrangementfee) - (this.mortgage_amount_borrowed.worst + total_loans),
          best: (this.totalexpenditure.min + this.mortgage_intrest_payment_total.best + this.mortgage.arrangementfee) - (this.mortgage_amount_borrowed.best + total_loans)
        }
      }
      if (this.bridge.usebridge) {
        return {
          worst: this.totalexpenditure.max - total_loans - this.bridge.amount.worst + this.bridgecost.worst,
          best: this.totalexpenditure.min - total_loans - this.bridge.amount.best + this.bridgecost.best
        }
      }
      return {
        worst: this.totalexpenditure.max - total_loans,
        best: this.totalexpenditure.min - total_loans
      }
    },
    finance_in_items_without_cash () {
      let ret_val = []
      this.loans.map(function (l) {
        ret_val.push({
          name: l.name,
          worst: l.amount,
          best: l.amount
        })
      })
      if (this.mortgage.usemortgage) {
        ret_val.push({
          name: 'Mortgage Payment',
          worst: this.mortgage_amount_borrowed.worst,
          best: this.mortgage_amount_borrowed.best
        })
        ret_val.push({
          name: 'Mortgage Arrangement Fee',
          worst: -this.mortgage.arrangementfee,
          best: -this.mortgage.arrangementfee
        })
      }
      if (this.bridge.usebridge) {
        ret_val.push({
          name: 'Bridge Payment',
          worst: this.bridge.amount.worst - this.bridgecost.worst,
          best: this.bridge.amount.best - this.bridgecost.best
        })
      }
      return ret_val
    },
    finance_in_items () {
      let ret_val = []
      ret_val.push({name: 'Finance Cash', worst: this.totalmoneyneeded.worst, best: this.totalmoneyneeded.best})
      ret_val = ret_val.concat(this.finance_in_items_without_cash)
      return ret_val
    },
    mortgage_intrest_payment_total () {
      return {
        worst:  this.mortgage_monthly_payment.worst * this.refurbmonths.worst,
        best:  this.mortgage_monthly_payment.worst * this.refurbmonths.best
      }
    },
    finance_during_items () {
      let ret_val = []
      if (this.mortgage.usemortgage) {
        ret_val.push({
          name: 'Mortgage Intrest payments (x' + this.refurbmonths.worst + '/' + this.refurbmonths.best + ' months)',
          worst: -1 * this.mortgage_intrest_payment_total.worst,
          best: -1 * this.mortgage_intrest_payment_total.best
        })
      }
      return ret_val
    },
    finance_out_items () {
      let ret_val = []
      this.loans.map(function (l) {
        var repay_amount = -(l.amount + (l.amount * l.rate / 100))
        ret_val.push({
          name: 'Repay ' + l.name,
          worst: repay_amount,
          best: repay_amount
        })
      })
      if (this.mortgage.usemortgage) {
        ret_val.push({
          name: 'Payback Purchase Mortgage Capital',
          worst: -1 * this.mortgage_amount_borrowed.worst,
          best: -1 * this.mortgage_amount_borrowed.best
        })
      }
      if (this.bridge.usebridge) {
        ret_val.push({name: 'Bridge Payback', worst: this.bridge.amount.worst * -1, best: this.bridge.amount.best * -1})
        ret_val.push(
          {
            name: 'Bridge Interest Credit',
            worst: ((12 - this.refurbmonths.worst) * 0.01 * this.bridgecost.worst),
            best: ((12 - this.refurbmonths.best) * 0.01 * this.bridgecost.best)
          }
        )
      }
      return ret_val
    }
  }
})
</script>

<style>
.bridgeamountdiv {
  padding: 10px;
}
</style>
