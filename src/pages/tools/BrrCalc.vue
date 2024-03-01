<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Buy Refurbish Refinance Strategy</h1>
      <div>When working with a deal sourcer they will provide you with information about specific deals giving what the expected ROI and other figures for the investment will be. Part of the work the deal sourcer has done is research around each figure to justify how they have arrived at the expected ROI. You can use this page to perform these calculations.</div>
      <div class="row">
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
        />
        <DealSummary
          ref="DealSummary"
          :purchaserange="purchaserange"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
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
    Finance
  },
  data () {
    return {
      purchaserange: {
        min: 400000,
        max: 600000
      }
    }
  },
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
