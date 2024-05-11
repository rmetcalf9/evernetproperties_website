<template>
  <q-card inline class="q-ma-sm card-style maincard col-grow">
    <q-card-section>
      <div class="text-h6">Flip Deal Summary</div>
      <div class="text-subtitle2">This section gives a break down of money in and out of the deal. It is broken down twice, for best and worst case figures.</div>
    </q-card-section>
    <q-card-section>
      <div>
        <table class="sumtable">
          <thead>
            <tr>
              <th class="text-left sumtablecell"></th>
              <th class="text-center sumtablecell worstcasetablecell">Worst case</th>
              <th class="text-center sumtablecell">Best case</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="item in items" :key='item.id'>
                <td v-if="item.type=='blank'" class="text-left sumtablecell">&nbsp;</td>
                <td v-if="item.type=='blank'" class="text-left sumtablecell worstcasetablecell">&nbsp;</td>
                <td v-if="item.type=='blank'" class="text-left sumtablecell">&nbsp;</td>
                <td v-if="item.type=='title'" colspan=3 class="text-left sumtablecell sumtabletitlecell">{{ item.name }}</td>
                <td v-if="item.type=='ledger'" class="text-left sumtablecell">{{ item.name }}</td>
                <td v-if="item.type=='ledger'" class="text-right sumtablecell worstcasetablecell">{{ format_currency(item.worst) }}</td>
                <td v-if="item.type=='ledger'" class="text-right sumtablecell">{{ format_currency(item.best) }}</td>
                <th v-if="item.type=='total'" class="text-left sumtablecell">{{ item.name }}</th>
                <th v-if="item.type=='total'" class="text-right sumtablecell worstcasetablecell">{{ format_currency(item.worst) }}</th>
                <th v-if="item.type=='total'" class="text-right sumtablecell">{{ format_currency(item.best) }}</th>
                <th v-if="item.type=='headtext'" class="text-left sumtablecell">{{ item.name }}</th>
                <th v-if="item.type=='headtext'" class="text-right sumtablecell worstcasetablecell">{{ item.worst }}</th>
                <th v-if="item.type=='headtext'" class="text-right sumtablecell">{{ item.best }}</th>
              </tr>
          </tbody>
        </table>
        <div>Note: Corporation tax is assumed at 19%<q-btn round dense flat icon="info" @click="helpcorporation" /></div>
        <div>TODO GOOD/BAD/RUBBISH</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'

function get_ledger_items(items) {
  return items.filter(function (x) {
    return x.type === 'ledger'
  })
}

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

function add_item_headtext(items, title, worstamt, bestamt) {
  items.push({
    type: 'headtext',
    key: items.length,
    name: title,
    worst: worstamt,
    best: bestamt
  })
}

function add_item_total(items, title, worstamt, bestamt) {
  items.push({
    type: 'total',
    key: items.length,
    name: title,
    worst: worstamt,
    best: bestamt
  })
  items.push({
    type: 'blank',
    key: items.length
  })
}


function add_item(items, name, worstamt, bestamt) {
  let only_ledger_items = get_ledger_items(items)

  var lastitemdetailworst = undefined
  var lastitemdetailbest = undefined
  if (only_ledger_items.length>0) {
    lastitemdetailworst = only_ledger_items[only_ledger_items.length - 1].worst
    lastitemdetailbest = only_ledger_items[only_ledger_items.length - 1].best
  }

  items.push({
    type: 'ledger',
    key: items.length,
    name: name,
    worst: worstamt,
    best: bestamt
  })
}

export default defineComponent({
  name: 'FlipCalcDealSummary',
  props: ['purchaserange', 'finance_in_items', 'purchase_items', 'stampduty_items', 'othercosts_items', 'refurb_cost_items', 'gdv_total', 'refurbmonths', 'finance_out_items', 'finance_during_items'],
  components: {
  },
  data () {
    return {
      table: {
        columns: [
          { name: "item", label: 'Item', field: 'item'},
          { name: "win", label: 'In', field: 'win'},
          { name: "wout", label: 'Out', field: 'wout'},
          { name: "wbal", label: 'Balance', field: 'wbal'},
          { name: "bin", label: 'In', field: 'bin'},
          { name: "bout", label: 'Out', field: 'bout'},
          { name: "bbal", label: 'Balance', field: 'bbal'},
        ]
      }
    }
  },
  methods: {
    format_currency (num) {
      if (typeof(num) === 'string') {
        if (num === '') {
          return ''
        }
      }
      return utils.format_currency(num)
    },
    helpcorporation () {
      this.$q.dialog({
        title: 'Corporation Tax',
        message: 'Corporation tax will depend on if buying in a company or as an individual. It also depends on the total profit of the company (See <a href="https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax" target="_new">this website</a>). For this calculation we assume 19%.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    }
  },
  computed: {
    final_bal () {
      let only_ledger_items = get_ledger_items(this.items)
      if (only_ledger_items.length === 0) {
        return {
          worst: 0,
          best: 0
        }
      }
      return {
        worst: only_ledger_items[only_ledger_items.length - 1].worst.bal,
        best: only_ledger_items[only_ledger_items.length - 1].best.bal
      }
    },
    money_in () {
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
      var total = {worst: 0, best: 0}
      function add_to_total(total, ite) {
        total.worst += ite.worst
        total.best += ite.best
      }
      if (typeof (this.purchase_items) !== 'undefined') {
        this.purchase_items.map(function (x) {
          add_item(items, x.name, -x.worst, -x.best)
          add_to_total(total, x)
        })
      }
      if (typeof (this.stampduty_items) !== 'undefined') {
        this.stampduty_items.map(function (x) {
          add_item(items, x.name, -x.worst, -x.best)
          add_to_total(total, x)
        })
      }
      if (typeof (this.othercosts_items) !== 'undefined') {
        this.othercosts_items.map(function (x) {
          add_item(items, x.name, -x.worst, -x.best)
          add_to_total(total, x)
        })
      }
      if (typeof (this.refurb_cost_items) !== 'undefined') {
        this.refurb_cost_items.map(function (x) {
          add_item(items, x.name, -x.worst, -x.best)
          add_to_total(total, x)
        })
      }

      var finance_costs = {
        worst: 0,
        best: 0
      }
      add_item(items, 'TODO FINANCE COSTS', -finance_costs.worst, -finance_costs.best)
      add_to_total(total, finance_costs)


      add_item_total(items, 'Money In', -total.worst, -total.best)

      add_item(items, 'GDV', this.gdv_total.min, this.gdv_total.max)

      var sales_cost = {
        worst: this.gdv_total.min * 0.01,
        best: this.gdv_total.max * 0.01
      }
      add_item(items, 'Sale Costs (1%)', sales_cost.worst, sales_cost.best)

      var gross_profit = {
        worst: this.gdv_total.min - (-total.worst + sales_cost.worst),
        best: this.gdv_total.max - (-total.best + sales_cost.best)
      }

      add_item_total(items, 'Gross Profit', gross_profit.worst, gross_profit.best)

      var corporation_tax = {
        worst: gross_profit.worst * 0.19,
        best: gross_profit.best * 0.19
      }

      add_item(items, 'Corporation Tax', corporation_tax.worst, corporation_tax.best)

      var net_profit = {
        worst: gross_profit.worst - corporation_tax.worst,
        best: gross_profit.best - corporation_tax.best
      }

      add_item_total(items, 'Net Profit', net_profit.worst, net_profit.best)

      var percentage = {
        worst: net_profit.worst * 100 / (-total.worst),
        best: net_profit.best * 100 / (-total.best)
      }

      add_item_headtext(items, 'Percentage', percentage.worst.toFixed(2) + '%', percentage.best.toFixed(2) + '%')


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
th.worstcasetablecell {
  background-color: lightgrey;
}
td.worstcasetablecell {
  background-color: lightgrey;
}
td.valuetablecell {
  text-align: right;
}
td.tablerowcell {
  height: auto;
}

.worstcasetablecell {
  background-color: lightgrey;
}
table.sumtable {
  background-color: white;
  color: black;
  padding: 2px;
  border-spacing: 0px;
}
.sumtablecell {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
}
.sumtabletitlecell {
  font-weight: 600;
  text-align: center;
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
