<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Other Costs</div>
      <div class="text-subtitle2">Other costs to be considered</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Fees: {{ format_currency(fees.min) }} - {{ format_currency(fees.max) }}</div>
      <div>40% of purchase price to cover solicitors fees, arrangement etc.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Auction</div>
      <div><q-checkbox v-model="auction" label="Buying at auction" /></div>
      <div v-if="auction">
        <div>£{{ consts.auction_survey }} to get a survey</div>
        <div>£{{ consts.auction_legal_review }} to get a review of legal pack</div>
        <div>Note survey and legal pack review costs may greater as they may have been done multiple times for auctions not won</div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Total: {{ format_currency(total.min) }} - {{ format_currency(total.max) }}</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcOtherCosts',
  props: ['purchaserange'],
  data () {
    return {
      auction: false,
      consts: {
        auction_survey: 300,
        auction_legal_review: 150
      }
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
    fees () {
      return {
        min: this.purchaserange.min * 0.04,
        max: this.purchaserange.max * 0.04
      }
    },
    total () {
      // only one cost so far. In future all costs are added
      let auction_costs = 0
      if (this.auction) {
        auction_costs = this.consts.auction_survey + this.consts.auction_legal_review
      }
      var total = {
        min: this.fees.min + auction_costs,
        max: this.fees.max + auction_costs
      }
      return total
    },
    othercosts_items () {
      let ret_val = []
      ret_val.push({name: 'Other Costs', worst: -1 * this.total.max, best: -1 * this.total.min})
      return ret_val
    }
  }
})
</script>
