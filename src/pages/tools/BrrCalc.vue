<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Buy Refurbish Refinance Strategy</h1>
      <div>When working with a deal sourcer they will provide you with information about specific deals giving what the expected ROI and other figures for the investment will be. Part of the work the deal sourcer has done is research around each figure to justify how they have arrived at the expected ROI. You can use this page to perform these calculations.</div>
      <div class="row">
        <Vision
          ref="Vision"
        />
        <GdvCard
          ref="GdvCard"
        />
        <PurchasePrice
          ref="PurchasePrice"
          v-model:purchaserange="purchaserange"
        />
        <RefurbCost
          ref="RefurbCost"
        />
        <StampDuty
          ref="StampDuty"
          :purchaserange="purchaserange"
        />
        <OtherCosts
          ref="OtherCosts"
          :purchaserange="purchaserange"
        />
        <Finance
          ref="Finance"
          :purchaserange="purchaserange"
          :refurb_cost_total="refurb_cost_total"
          :stampduty_total="stampduty_total"
          :othercosts_total="othercosts_total"
          :refurbmonths="refurbmonths"
          :gdv_total="gdv_total"
        />
        <DealSummary
          ref="DealSummary"
          :purchaserange="purchaserange"
          :finance_in_items="finance_in_items"
          :finance_out_items="finance_out_items"
          :purchase_items="purchase_items"
          :stampduty_items="stampduty_items"
          :othercosts_items="othercosts_items"
          :refurb_cost_items="refurb_cost_items"
          :gdv_total="gdv_total"
          :refurbmonths="refurbmonths"
        />
        DEBUG OUTER {{ gdv_total }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Vision from '../../components/BrrCalc/Vision.vue'
import GdvCard from '../../components/BrrCalc/Gdv.vue'
import PurchasePrice from '../../components/BrrCalc/PurchasePrice.vue'
import RefurbCost from '../../components/BrrCalc/RefurbCost.vue'
import StampDuty from '../../components/BrrCalc/StampDuty.vue'
import OtherCosts from '../../components/BrrCalc/OtherCosts.vue'
import DealSummary from '../../components/BrrCalc/DealSummary.vue'
import Finance from '../../components/BrrCalc/Finance.vue'

export default defineComponent({
  name: 'CalcBrrToFlip',
  components: {
    GdvCard,
    PurchasePrice,
    RefurbCost,
    StampDuty,
    OtherCosts,
    DealSummary,
    Finance,
    Vision
  },
  data () {
    return {
      isMounted: false,
      purchaserange: {
        min: 400000,
        max: 600000
      }
    }
  },
  computed: {
    finance_in_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_in_items
    },
    finance_out_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_out_items
    },
    purchase_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.PurchasePrice.purchase_items
    },
    stampduty_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.StampDuty.stampduty_items
    },
    othercosts_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.OtherCosts.othercosts_items
    },
    refurb_cost_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.RefurbCost.refurb_cost_items
    },
    refurb_cost_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.RefurbCost.refurb_cost_total
    },
    refurbmonths () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.RefurbCost.refurbmonths
    },
    stampduty_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.StampDuty.stampduty
    },
    othercosts_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.OtherCosts.total
    },
    gdv_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.GdvCard.total
    }
  },
  mounted (){
    this.isMounted = true;
  }
})
</script>

<style>
h1 {
  font-size: 3rem;
  line-height: 3rem;
  margin: 0px;
}
.main-page {
  margin: 10px;
}
.card-style {
  max-width: 500px;
}
</style>
