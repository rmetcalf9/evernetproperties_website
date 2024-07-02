<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Buy Refurbish Rent Refinance Calculator</h1>
      <div>This calculator can be used for calculating deal information for a Buy, Refurbish, Rent, Refinance project (BRRR). You can use this page to perform these calculations.</div>
      <div class="row">
        <DealBasicInfo
          ref="DealBasicInfo"
        />
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
        <Refinance
          ref="Refinance"
          :gdv_total="gdv_total"
        />
        <DealSummary
          ref="DealSummary"
          :purchaserange="purchaserange"
          :finance_in_items="finance_in_items"
          :finance_out_items="finance_out_items"
          :finance_during_items="finance_during_items"
          :refinance_out_items="refinance_out_items"
          :purchase_items="purchase_items"
          :stampduty_items="stampduty_items"
          :othercosts_items="othercosts_items"
          :refurb_cost_items="refurb_cost_items"
          :gdv_total="gdv_total"
          :refurbmonths="refurbmonths"
          :is_valid_input="is_valid_input"
        />
        <DealRating
          ref="DealRating"
          :purchaserange="purchaserange"
          :finance_totalmoneyneeded="finance_totalmoneyneeded"
          :deal_summary_final_bal="deal_summary_final_bal"
          :finance_refinance="finance_refinance"
          :gdv_total="gdv_total"
          :refurbmonths="refurbmonths"
          :stampduty_total="stampduty_total"
          :othercosts_total="othercosts_total"
          :refurb_cost_total="refurb_cost_total"
          :is_valid_input="is_valid_input"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Vision from '../../components/BrrCalc/Vision.vue'
import GdvCard from '../../components/CommonCalcComponents/Gdv.vue'
import PurchasePrice from '../../components/CommonCalcComponents/PurchasePrice.vue'
import RefurbCost from '../../components/CommonCalcComponents/RefurbCost.vue'
import StampDuty from '../../components/CommonCalcComponents/StampDuty.vue'
import OtherCosts from '../../components/CommonCalcComponents/OtherCosts.vue'
import Finance from '../../components/CommonCalcComponents/Finance.vue'
import Refinance from '../../components/BrrCalc/Refinance.vue'
import DealSummary from '../../components/BrrCalc/DealSummary.vue'
import DealRating from '../../components/BrrCalc/DealRating.vue'
import DealBasicInfo from '../../components/BrrCalc/DealBasicInfo.vue'

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
    Vision,
    DealRating,
    Refinance,
    DealBasicInfo
  },
  data () {
    return {
      isMounted: false,
      purchaserange: {
        min: 180000,
        max: 190000
      }
    }
  },
  computed: {
    is_valid_input() {
      if (!this.isMounted) {
        return true
      }
      if (!this.$refs.PurchasePrice.isValid) {
        return false
      }
      if (!this.$refs.GdvCard.isValid) {
        return false
      }
      return true
    },
    deal_summary_final_bal () {
      if (!this.isMounted) {
        return {
          best: 0,
          worst: 0
        }
      }
      return this.$refs.DealSummary.final_bal
    },
    finance_refinance () {
      if (!this.isMounted) {
        return {
          userefinance: false,
          ltv: {
            min: 75,
            max: 75
          }
        }
      }
      return this.$refs.Refinance.get_refinance
    },
    finance_totalmoneyneeded () {
      if (!this.isMounted) {
        return {
          best: 0,
          worst: 0
        }
      }
      return this.$refs.Finance.totalmoneyneeded
    },
    finance_in_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_in_items
    },
    finance_during_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_during_items
    },
    finance_out_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_out_items
    },
    refinance_out_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Refinance.refinance_out_items
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
    const TTT = this
    setTimeout(function () {
      TTT.isMounted = true;
    }, 5)
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
  padding: 0px;
}
.card-style {
  max-width: 500px;
}
.maincard {
  color: white;
  background-color: grey;
}

</style>
