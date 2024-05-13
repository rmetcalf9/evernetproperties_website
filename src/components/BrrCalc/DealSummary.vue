<template>
  <q-card inline class="q-ma-sm card-style maincard col-grow">
    <q-card-section>
      <div class="text-h6">Cashflow Summary</div>
      <div class="text-subtitle2">This section gives a break down of money in and out of the deal. It is broken down twice, for best and worst case figures.</div>
    </q-card-section>
    <q-card-section>
      <InvalidMessage
        :is_valid_input="is_valid_input"
      />
      <div>
        <q-table
          :columns="table.columns"
          :rows="items"
          hide-bottom
          v-model:pagination="pagination"
          :rows-per-page-options="[100]"
        >
          <template v-slot:header="props">
            <q-tr>
              <q-th></q-th>
              <q-th colspan=3 class="worstcasetablecell">Worst Case</q-th>
              <q-th colspan=3>Best Case</q-th>
            </q-tr>
            <q-tr :props="props">
              <q-th>
                Item
              </q-th>
              <q-th class="worstcasetablecell">
                In
              </q-th>
              <q-th class="worstcasetablecell">
                Out
              </q-th>
              <q-th class="worstcasetablecell">
                Balance
              </q-th>
              <q-th>
                In
              </q-th>
              <q-th>
                Out
              </q-th>
              <q-th>
                Balance
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
             <q-tr v-if="props.row.type === 'ledger'">
               <q-td class="tablerowcell">
                 {{ props.row.name }}
               </q-td>
               <q-td class="worstcasetablecell valuetablecell tablerowcell">
                 {{ format_currency(props.row.worst.in) }}
               </q-td>
               <q-td class="worstcasetablecell valuetablecell tablerowcell">
                 {{ format_currency(props.row.worst.out) }}
               </q-td>
               <q-td class="worstcasetablecell valuetablecell tablerowcell">
                 {{ format_currency(props.row.worst.bal) }}
               </q-td>
               <q-td class="valuetablecell tablerowcell">
                 {{ format_currency(props.row.best.in) }}
               </q-td>
               <q-td class="valuetablecell tablerowcell">
                 {{ format_currency(props.row.best.out) }}
               </q-td>
               <q-td class="valuetablecell tablerowcell">
                 {{ format_currency(props.row.best.bal) }}
               </q-td>
             </q-tr>
             <q-tr v-if="props.row.type === 'blank'">
              <q-th colspan=7>&nbsp;</q-th>
             </q-tr>
             <q-tr v-if="props.row.type === 'title'">
              <q-th colspan=7>{{ props.row.name }}</q-th>
             </q-tr>
          </template>
        </q-table>
      </div>
      <div>
      &nbsp;
      </div>
    </q-card-section>
  </q-card>
</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'
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

function add_item(items, name, worstamt, bestamt) {
  let only_ledger_items = get_ledger_items(items)

  var lastitemdetailworst = undefined
  var lastitemdetailbest = undefined
  if (only_ledger_items.length>0) {
    lastitemdetailworst = only_ledger_items[only_ledger_items.length - 1].worst
    lastitemdetailbest = only_ledger_items[only_ledger_items.length - 1].best
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
  props: ['is_valid_input', 'purchaserange', 'finance_in_items', 'purchase_items', 'stampduty_items', 'othercosts_items', 'refurb_cost_items', 'gdv_total', 'refurbmonths', 'finance_out_items', 'refinance_out_items', 'finance_during_items'],
  components: {
    InvalidMessage
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
      add_item_title(items,'During Project')
      if (typeof (this.finance_during_items) !== 'undefined') {
        this.finance_during_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.refurb_cost_items) !== 'undefined') {
        this.refurb_cost_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      let heading_set = false
      if (typeof (this.refinance_out_items) !== 'undefined') {
        if (this.refinance_out_items.length > 0) {
          heading_set = true
          add_item_title(items,'Exit finance')
        }
        this.refinance_out_items.map(function (x) {
          add_item(items, x.name, x.worst, x.best)
        })
      }
      if (typeof (this.finance_out_items) !== 'undefined') {
        if (this.finance_out_items.length > 0) {
          if (!heading_set) {
            add_item_title(items,'Exit finance')
          }
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
</style>
