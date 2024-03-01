<template>
  <q-card inline class="q-ma-sm card-style maincard">
    <q-card-section>
      <div class="text-h6">Summary</div>
      <div class="text-subtitle2">This section gives a break down of money in and out of the deal. It is broken down twice, for best and worst case figures.</div>
    </q-card-section>
    <q-card-section>
      <div class="col-grow ">
        <table border=2>
        <tr><th></th><th colspan=3>Worst Case</th><th colspan=3>Best Case</th></tr>
        <tr><th>Item</th><th>In</th><th>Out</th><th>Balance</th><th>In</th><th>Out</th><th>Balance</th></tr>
        <tr v-for="item in items" :key="item.key">
          <th>{{ item.name }}</th>
          <th>{{ item.worst.in }}</th>
          <th>{{ item.worst.out }}</th>
          <th>{{ item.worst.bal }}</th>
          <th>{{ item.best.in }}</th>
          <th>{{ item.best.out }}</th>
          <th>{{ item.best.bal }}</th>
        </tr>
        </table>
        &nbsp;
      </div>
      <div class="text-h6">ccc: {{ format_currency(12355) }} - {{ format_currency(23430) }}</div>
    </q-card-section>
  </q-card>
</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

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
    key: items.length,
    name: name,
    worst: get_item_detail(lastitemdetailworst, worstamt),
    best: get_item_detail(lastitemdetailbest, bestamt)
  })
}

export default defineComponent({
  name: 'BrrCalcDealSummary',
  props: ['purchaserange', 'finance_in_items'],
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
    items () {
      var items = []
      if (typeof (this.finance_in_items) !== 'undefined') {
        this.finance_in_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      add_item(items, 'FIR', 4, 123)
      add_item(items, 'se', -7, -113)
      add_item(items, 'sdsd', 4, 133)
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
