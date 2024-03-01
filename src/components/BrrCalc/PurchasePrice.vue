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
          v-model="purchaserangevalue"
          :min="0"
          :max="1000000"
          :step="10000"
          drag-range
          label
          :left-label-value="'Best £' + purchaserangevalue.min / 1000 + 'k'"
          :right-label-value="'Worst £' + purchaserangevalue.max / 1000 + 'k'"
        />
      </div>
      <div class="text-h6">Price: {{ format_currency(purchaserangevalue.min) }} - {{ format_currency(purchaserangevalue.max) }}</div>
    </q-card-section>
  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcPurchase',
  props: ['purchaserange'],
  emits: ['update:purchaserange'],
  data () {
    return {
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
    purchaserangevalue: {
      get() {
        return this.purchaserange;
      },
      set(value) {
        this.$emit("update:purchaserange", value);
      },
    },
    purchase_items () {
      return [
        {name: 'Purchase Property', worst: -1 * this.purchaserange.max, best: -1 * this.purchaserange.min}
      ]
    }
  }
})
</script>
