<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Purchase Price</div>
      <div class="text-subtitle2">In this section we work out the purchase price. This figure is not just read from the listing we will aim to get a below market value (BMV) price and this will involve finding the right property seller and being able to negotiate the price.</div>
    </q-card-section>
    <q-card-section>
      <div class="col-grow ">
        &nbsp;
        <q-range
          v-model="purchaserange"
          :min="0"
          :max="1000000"
          :step="10000"
          drag-range
          label
          :left-label-value="'Best £' + purchaserange.min / 1000 + 'k'"
          :right-label-value="'Worst £' + purchaserange.max / 1000 + 'k'"
        />
      </div>
      <div class="text-h6">Price: £{{ purchaserange.min }} - £{{ purchaserange.max }}</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'BrrCalcPurchase',
  data () {
    return {
      purchaserange: {
        min: 400000,
        max: 600000
      }
    }
  },
  methods: {
  },
  computed: {
  }
})
</script>
