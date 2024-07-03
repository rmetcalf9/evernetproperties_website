<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Purchase Price</div>
      <div class="text-subtitle2">In this section we work out the purchase price. This figure is not just read from the listing we will aim to get a below market value (BMV) price and this will involve finding the right property seller and being able to negotiate the price.</div>
    </q-card-section>
    <q-card-section>
      <SliderWithTextInput
        ref="slider"
        v-model:range="purchaserangevalue"
      />
      <div class="text-h6">Price: {{ format_currency(purchaserangevalue.min) }} - {{ format_currency(purchaserangevalue.max) }}</div>
    </q-card-section>
  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'
import SliderWithTextInput from '../../components/SliderWithTextInput.vue'


export default defineComponent({
  name: 'BrrCalcPurchase',
  props: ['purchaserange'],
  emits: ['update:purchaserange', 'projectchanged'],
  components: {
    SliderWithTextInput
  },
  data () {
    return {
      emit_project_change_notification: true
    }
  },
  methods: {
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.purchaserangevalue = data_to_load.purchaserangevalue

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    },
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged')
      }
    }
  },
  computed: {
    serializer_card_data () {
      return {
        purchaserangevalue: this.purchaserangevalue
      }
    },
    isValid() {
      return this.$refs.slider.isValid
    },
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

<style>
.pricetblcell {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
