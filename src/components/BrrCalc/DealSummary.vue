<template>
  <q-card inline class="q-ma-sm card-style maincard">
    <q-card-section>
      <div class="text-h6">Cashflow Summary</div>
      <div class="text-subtitle2">This section gives a break down of money in and out of the deal. It is broken down twice, for best and worst case figures.</div>
    </q-card-section>
    <q-card-section>
      <div class="col-grow ">
        <table border=2>
        <tr><th></th><th colspan=3>Worst Case</th><th colspan=3>Best Case</th></tr>
        <tr><th>Item</th><th>In</th><th>Out</th><th>Balance</th><th>In</th><th>Out</th><th>Balance</th></tr>
        <tr v-for="item in items" :key="item.key">
          <th v-if="item.type === 'ledger'">{{ item.name }}</th>
          <td v-if="item.type === 'ledger'">{{ item.worst.in }}</td>
          <td v-if="item.type === 'ledger'">{{ item.worst.out }}</td>
          <td v-if="item.type === 'ledger'">{{ item.worst.bal }}</td>
          <td v-if="item.type === 'ledger'">{{ item.best.in }}</td>
          <td v-if="item.type === 'ledger'">{{ item.best.out }}</td>
          <td v-if="item.type === 'ledger'">{{ item.best.bal }}</td>
          <th v-if="item.type === 'blank'" colspan=7>&nbsp;</th>
          <th v-if="item.type === 'title'" colspan=7>{{ item.name }}</th>
        </tr>
        </table>
        &nbsp;
      </div>
      <div>

      <DealSummaryExitSell
        :money_in="money_in"
        :final_bal="final_bal"
        :gdv_total="gdv_total"
        :refurbmonths="refurbmonths"
      />

      </div>
    </q-card-section>
  </q-card>
</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'
import DealSummaryExitSell from './DealSummaryExitSell.vue'


function add_item_title(items, title) {
  items.push({
    type: 'blank',
    key: items.length
  })
  items.push({
    type: 'title',
    key: items.length,
    name: title
  })
}

function add_item(items, name, worstamt, bestamt) {
  var lastitemdetailworst = undefined
  var lastitemdetailbest = undefined
  if (items.length>0) {
    lastitemdetailworst = items[items.length - 1].worst
    lastitemdetailbest = items[items.length - 1].best
  }
  function get_item_detail(lastitemdetail, amt) {
    var bal = 0
    if (typeof (lastitemdetail) !== 'undefined') {
      bal = lastitemdetail.bal
    }
    var inn=''
    var out=''
    if (amt > 0) {
      inn=amt
    } else {
      out=amt
    }
    return {
      in: inn,
      out: out,
      bal: bal + amt
    }
  }

  items.push({
    type: 'ledger',
    key: items.length,
    name: name,
    worst: get_item_detail(lastitemdetailworst, worstamt),
    best: get_item_detail(lastitemdetailbest, bestamt)
  })
}

export default defineComponent({
  name: 'BrrCalcDealSummary',
  props: ['purchaserange', 'finance_in_items', 'purchase_items', 'stampduty_items', 'othercosts_items', 'refurb_cost_items', 'gdv_total', 'refurbmonths', 'finance_out_items'],
  components: {
    DealSummaryExitSell
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
    final_bal () {
      if (this.items.length === 0) {
        return {
          worst: 0,
          best: 0
        }
      }
      return {
        worst: this.items[this.items.length - 1].worst.bal,
        best: this.items[this.items.length - 1].best.bal
      }
    },
    money_in () {
      // TODO This is wrong. MONEY IN IS NOT FINANCE IN
      //   bridge IN is not money in
      var worst = this.finance_in_items.reduce((acc, value) => {
          return acc + value.worst
      }, 0);
      var best = this.finance_in_items.reduce((acc, value) => {
          return acc + value.best
      }, 0);
      return {
        worst: worst,
        best: best
      }
    },
    items () {
      var items = []
      if (typeof (this.finance_in_items) !== 'undefined') {
        this.finance_in_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.purchase_items) !== 'undefined') {
        this.purchase_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.stampduty_items) !== 'undefined') {
        this.stampduty_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.othercosts_items) !== 'undefined') {
        this.othercosts_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.refurb_cost_items) !== 'undefined') {
        this.refurb_cost_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.finance_out_items) !== 'undefined') {
        if (this.finance_out_items.length > 0) {
          add_item_title(items,'Exit finance')
        }
        this.finance_out_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }

      // add_item_title(items,'Exit - Sell Property')
      // add_item(items, 'Sell for GDV', this.gdv_total.min, this.gdv_total.max)
      return items
    }
  }
})
</script>

<style>
.maincard {
  color: white;
  background-color: grey;
}
</style>
