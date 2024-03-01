<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Finance</div>
      <div class="text-subtitle2">.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Cash</div>
      100%
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Loans</div>
      TODO
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Bridge</div>
      TODO
    </q-card-section>
  </q-card>

</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcFinance',
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
    }
  }
})
</script>
