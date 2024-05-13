<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Flip Calculator</h1>
      <div>This calculator can work out the costs associated with doing a property flip. It’s helpful to make sure you have remembered everything!</div>
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
        <DealRating
          ref="DealRating"
          :purchaserange="purchaserange"
          :finance_in_items_without_cash="finance_in_items_without_cash"
          :finance_out_items="finance_out_items"
          :finance_during_items="finance_during_items"
          :purchase_items="purchase_items"
          :stampduty_items="stampduty_items"
          :othercosts_items="othercosts_items"
          :refurb_cost_items="refurb_cost_items"
          :gdv_total="gdv_total"
          :refurbmonths="refurbmonths"
          :is_valid_input="is_valid_input"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Vision from '../../components/FlipCalc/Vision.vue'
import GdvCard from '../../components/CommonCalcComponents/Gdv.vue'
import PurchasePrice from '../../components/CommonCalcComponents/PurchasePrice.vue'
import RefurbCost from '../../components/CommonCalcComponents/RefurbCost.vue'
import StampDuty from '../../components/CommonCalcComponents/StampDuty.vue'
import OtherCosts from '../../components/CommonCalcComponents/OtherCosts.vue'
import Finance from '../../components/CommonCalcComponents/Finance.vue'
import DealRating from '../../components/FlipCalc/DealRating.vue'

export default defineComponent({
  name: 'CalcFlip',
  components: {
    GdvCard,
    PurchasePrice,
    RefurbCost,
    StampDuty,
    OtherCosts,
    Finance,
    Vision,
    DealRating
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
      return true
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
    finance_in_items_without_cash () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_in_items_without_cash
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
</style>
