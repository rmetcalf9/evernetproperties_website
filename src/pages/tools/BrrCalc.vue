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
        />

        <q-card inline class="q-ma-sm card-style">
          <q-card-section>
            <div class="text-h6">Refurbishment Cost</div>
            <div class="text-subtitle2">TODO</div>
          </q-card-section>
          <q-card-section>
            AAA
          </q-card-section>
        </q-card>
        <div>TODO Buy with bridge or cash</div>

      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import GdvCard from '../../components/BrrCalc/Gdv.vue'
import PurchasePrice from '../../components/BrrCalc/PurchasePrice.vue'

export default defineComponent({
  name: 'CalcBrrToFlip',
  components: {
    GdvCard,
    PurchasePrice
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
