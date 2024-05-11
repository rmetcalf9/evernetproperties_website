<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Other Costs</div>
      <div class="text-subtitle2">Other costs to be considered</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Fees: {{ format_currency(fees.min) }} - {{ format_currency(fees.max) }}</div>
      <div>4% of purchase price to cover solicitors fees, arrangement etc.</div>
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
      <div class="text-h6">Sourcing</div>
      <div><q-checkbox v-model="sourcing.usesourcing" label="Found using a deal sourcer" /></div>
      <div v-if="sourcing.usesourcing">
        <q-option-group
          v-model="sourcing.type"
          :options="sourcing.typeoptions"
          inline
        />
        <div v-if="sourcing.type === 'custom'">
          <div class="col-grow"><q-slider
            label
            :label-value="format_currency(sourcing.custom)"
            v-model="sourcing.custom"
            :min="500"
            :max="10000"
            :step="500"
            thumb-size="40px"
          /></div>
        </div>
        Sourcing fee: {{ sourcingfeetext }}
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
      sourcing: {
        usesourcing: false,
        custom: 3000,
        type: 'threek',
        typeoptions: [
          {
            label: '£3,000',
            value: 'threek'
          },
          {
            label: '2% of purchase',
            value: 'twopercent'
          },
          {
            label: 'Custom',
            value: 'custom'
          },
        ]

      },
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
    sourcingfeetext () {
      if (this.sourcingfee.min === this.sourcingfee.max) {
        return this.format_currency(this.sourcingfee.min)
      }
      return this.format_currency(this.sourcingfee.min) + '-' + this.format_currency(this.sourcingfee.max)
    },
    sourcingfee () {
      if (!this.sourcing.usesourcing) {
        return {
          min: 0,
          max: 0
        }
      }
      if (this.sourcing.type === 'threek') {
        return {
          min: 3000,
          max: 3000
        }
      }
      if (this.sourcing.type === 'custom') {
        return {
          min: this.sourcing.custom,
          max: this.sourcing.custom
        }
      }
      return {
        min: this.purchaserange.min * 0.02,
        max: this.purchaserange.max * 0.02
      }
    },
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
        min: this.fees.min + auction_costs + this.sourcingfee.min,
        max: this.fees.max + auction_costs + this.sourcingfee.max
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
