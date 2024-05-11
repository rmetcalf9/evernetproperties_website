<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Refinance</div>
      This section is for adding refinance details. After the refurbishment is complete the refinance stage can be used to pull money out of the deal.
      <q-checkbox v-model="refinance.userefinance" label="Refinance after refurbishment" />
        <div v-if="refinance.userefinance">
        Refinance LTV {{ refinance.ltv.min }}% - {{ refinance.ltv.max }}%
        <q-range
          v-model="refinance.ltv"
          :min="0"
          :max="100"
          :step="5"
          thumb-size="40px"
          drag-range
          label
          :left-label-value="refinance.ltv.min + '%'"
          :right-label-value="refinance.ltv.max+ '%'"
        />
        <div>Refinance amount: {{ format_currency(refinanceamount.worst) }} - {{ format_currency(refinanceamount.best) }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import utils from '../utils.js'

export default defineComponent({
  name: 'BrrCalcFinance',
  props: ['gdv_total'],
  data () {
    return {
      refinance: {
        userefinance: true,
        ltv: {
          min: 75,
          max: 75
        }
      }
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
    get_refinance () {
      return this.refinance
    },
    refinanceamount () {
      return {
        worst: this.gdv_total.min * (this.refinance.ltv.min / 100),
        best: this.gdv_total.max * (this.refinance.ltv.max / 100)
      }
    },
    refinance_out_items () {
      let ret_val = []
      if (this.refinance.userefinance) {
        ret_val.push({name: 'Mortgage Refinance', worst: this.refinanceamount.worst, best: this.refinanceamount.best})
      }
      return ret_val
    }
  }
})

</script>

<style>
</style>
