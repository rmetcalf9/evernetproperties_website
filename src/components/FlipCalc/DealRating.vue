<template>
  <q-card inline class="q-ma-sm card-style maincard col-grow">
    <q-card-section>
      <div class="text-h6">Flip Deal Rating</div>
      <div class="text-subtitle2">This section gives a rating for this flip deal.</div>
    </q-card-section>
    <q-card-section>
      <div>
        <InvalidMessage
          :is_valid_input="is_valid_input"
        />
        <table class="sumtable">
          <thead>
            <tr>
              <th class="text-left sumtablecell"></th>
              <th class="text-center sumtablecell worstcasetablecell">Worst case</th>
              <th class="text-center sumtablecell">Best case</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="item in itemized_summary.items" :key='item.id'>
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
        <div class="text-h6">Flip Project Features</div>
        <FeatureTable
          v-model:features="features"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'
import FeatureTable from '../CommonCalcComponents/FeatureTable.vue'
import InvalidMessage from '../InvalidMessage.vue'

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
  name: 'FlipCalcDealRating',
  props: ['is_valid_input', 'purchaserange', 'finance_in_items_without_cash', 'purchase_items', 'stampduty_items', 'othercosts_items', 'refurb_cost_items', 'gdv_total', 'refurbmonths', 'finance_out_items', 'finance_during_items'],
  components: {
    FeatureTable,
    InvalidMessage
  },
  data () {
    return {
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
    finance_costs () {
      var total = {worst: 0, best: 0}
      function add_to_total(total, ite) {
        total.worst += ite.worst
        total.best += ite.best
      }
      if (typeof (this.finance_in_items_without_cash) !== 'undefined') {
        this.finance_in_items_without_cash.map(function (x) {
          add_to_total(total, x)
        })
      }
      if (typeof (this.finance_during_items) !== 'undefined') {
        this.finance_during_items.map(function (x) {
          add_to_total(total, x)
        })
      }
      if (typeof (this.finance_out_items) !== 'undefined') {
        this.finance_out_items.map(function (x) {
          add_to_total(total, x)
        })
      }
      return {
        worst: total.worst,
        best: total.best
      }
    },
    itemized_summary () {
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

      add_item(items, 'Finance Costs', -this.finance_costs.worst, -this.finance_costs.best)
      add_to_total(total, this.finance_costs)


      add_item_total(items, 'Total Money In', -total.worst, -total.best)

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
      return {
        items: items,
        percentage: percentage
      }
    },
    features () {
      var ret_val = []
      var min_percentage = Math.min(this.itemized_summary.percentage.best, this.itemized_summary.percentage.worst)
      if (min_percentage < 20) {
       ret_val.push({
         type: 'negative',
         text: 'Less than 20% uplift. To justify the work in doing the flip we need the deal to make at least 20%'
       })
      } else {
        if (min_percentage < 23) {
         ret_val.push({
           type: 'neutral',
           text: 'Between 20% and 23% uplift. This is borderline. To justify the work and account for risk we would prefer at least 23%'
         })
        } else {
          ret_val.push({
            type: 'positive',
            text: 'Above 23% uplift. This project has enough uplift to justify the effort and risk.'
          })
        }
      }
      return ret_val
    }
  },
})
</script>

<style>
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
