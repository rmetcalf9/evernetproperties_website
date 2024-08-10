<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Other Costs</div>
      <div class="text-subtitle2">Other costs to be considered</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Solicitors Fees: {{ format_currency(fees.min) }} - {{ format_currency(fees.max) }}</div>
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
      <div class="text-h6">Survey<q-btn round dense flat icon="info" @click="helpsurvey" /></div>
      <div>If you’re getting a pre-purchase survey report on the building select the type.</div>
      <q-option-group
        v-model="survey.type"
        :options="survey.typeoptions"
        inline
      />
      <div>Survey cost: {{ surveyfeetext }} (Based on stored ranges for this purchase cost.)</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Total: {{ format_currency(total.min) }} - {{ format_currency(total.max) }}</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'

const ricssurveycostranges = {
  l1: {
    lt249: {
      min: 300,
      max: 500
    },
    lt349: {
      min: 500,
      max: 600
    },
    lt449: {
      min: 600,
      max: 700
    },
    top: {
      min: 700,
      max: 900
    },
  },
  l2: {
    lt249: {
      min: 400,
      max: 600
    },
    lt349: {
      min: 600,
      max: 700
    },
    lt449: {
      min: 700,
      max: 800
    },
    top: {
      min: 800,
      max: 1000
    },
  },
  l3: {
    lt249: {
      min: 630,
      max: 800
    },
    lt349: {
      min: 800,
      max: 900
    },
    lt449: {
      min: 900,
      max: 1100
    },
    top: {
      min: 1000,
      max: 1500
    },
  },
}

export default defineComponent({
  name: 'BrrCalcOtherCosts',
  emits: ['projectchanged'],
  props: ['purchaserange'],
  data () {
    return {
      emit_project_change_notification: true,
      auction: false,
      survey: {
        type: 'l3',
        typeoptions: [
          {
            label: 'None',
            value: 'none'
          },
          {
            label: 'RICS Level 1',
            value: 'l1'
          },
          {
            label: 'RICS Level 2',
            value: 'l2'
          },
          {
            label: 'RICS Level 3',
            value: 'l3'
          },
        ]
      },
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
    },
    helpsurvey () {
      this.$q.dialog({
        title: 'RICS Survey',
        message: 'See <a href="https://hoa.org.uk/advice/guides-for-homeowners/i-am-buying/how-much-does-a-house-survey-cost/" target="_new">this website</a> here for my source info for caculating survey costs. for details.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.auction = data_to_load.auction
      this.survey.type = data_to_load.survey_type
      this.sourcing.usesourcing = data_to_load.sourcing_usesourcing
      this.sourcing.custom = data_to_load.sourcing_custom
      this.sourcing.type = data_to_load.sourcing_type

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'OtherCosts')
      }
    }
  },
  computed: {
    serializer_card_data () {
      return {
        auction: this.auction,
        survey_type: this.survey.type,
        sourcing_usesourcing: this.sourcing.usesourcing,
        sourcing_custom: this.sourcing.custom,
        sourcing_type: this.sourcing.type,
      }
    },
    surveyfeetext () {
      if (this.surveyfee.min === this.surveyfee.max) {
        return this.format_currency(this.surveyfee.min)
      }
      return this.format_currency(this.surveyfee.min) + '-' + this.format_currency(this.surveyfee.max)
    },
    surveyfee () {
      if (this.survey.type === 'none') {
        return {
          min: 0,
          max: 0
        }
      }
      function getrange(num) {
        if (num < 249000) {
          return 'lt249'
        }
        if (num < 349000) {
          return 'lt349'
        }
        if (num < 449000) {
          return 'lt449'
        }
        return 'top'
      }
      var range = {
        min: getrange(this.purchaserange.min),
        max: getrange(this.purchaserange.max)
      }
      return {
        min: ricssurveycostranges[this.survey.type][range.min].min,
        max: ricssurveycostranges[this.survey.type][range.max].max
      }
    },
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
        min: 2300,
        max: 2300
      }
    },
    total () {
      let total = {
        min: 0,
        max: 0
      }
      this.othercosts_items_detail.forEach(function other_cost (ite) {
        total.min += -1 * ite.best
        total.max += -1 * ite.worst
      })
      return total
    },
    othercosts_items () {
      let ret_val = []
      ret_val.push({name: 'Other Costs', worst: -1 * this.total.max, best: -1 * this.total.min})
      return ret_val
    },
    othercosts_items_detail () {
      let ret_val = []
      ret_val.push({name: 'Fees', worst: -1 * this.fees.max, best: -1 * this.fees.min})
      if (this.auction) {
        ret_val.push({name: 'Auction Survey', worst: -1 * this.consts.auction_survey, best: -1 * this.consts.auction_survey})
        ret_val.push({name: 'Auction Legal Review', worst: -1 * this.consts.auction_legal_review, best: -1 * this.consts.auction_legal_review})
      }
      if (this.sourcing.usesourcing) {
        ret_val.push({name: 'Sourcing Fee', worst: -1 * this.sourcingfee.max, best: -1 * this.sourcingfee.min})
      }
      if (this.survey.type !== 'none') {
        ret_val.push({name: 'Survey', worst: -1 * this.surveyfee.max, best: -1 * this.surveyfee.min})
      }
      return ret_val
    }
  }
})
</script>
