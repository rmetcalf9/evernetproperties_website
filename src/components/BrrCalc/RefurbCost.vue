<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Refurbishment</div>
      <div class="text-subtitle2">This section holds the details of the refurbishment. Put in the minimum and maximum estimated cost as well the length of time the refurbishment will take.</div>
    </q-card-section>
    <q-card-section>
      <div class="col-grow ">
        &nbsp;
        <q-range
          v-model="refurbrange"
          :min="0"
          :max="100000"
          :step="1000"
          drag-range
          label
          :left-label-value="'Best £' + refurbrange.min / 1000 + 'k'"
          :right-label-value="'Worst £' + refurbrange.max / 1000 + 'k'"
        />
      </div>
      <div class="text-h6">Cost: {{ format_currency(refurbrange.min) }} - {{ format_currency(refurbrange.max) }}</div>
      <div class="col-grow ">
        &nbsp;
        <q-range
          v-model="refurbtimerange"
          :min="0"
          :max="36"
          :step="1"
          drag-range
          label
          :left-label-value="'Best ' + refurbtimerange.min + ' months'"
          :right-label-value="'Worst ' + refurbtimerange.max + ' months'"
        />
      </div>
      <div class="text-h6">Duration: {{ refurbtimerange.min }} - {{ refurbtimerange.max }} months</div>
      <div>This figure is the amount of time to take out loans for and effects the amount of interest that needs to be paid.</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'BrrCalcRefurbCost',
  data () {
    return {
      refurbrange: {
        min: 40000,
        max: 60000
      },
      refurbtimerange: {
        min: 6,
        max: 12
      }
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    }
  },
  computed: {
    refurb_cost_total () {
      return this.refurbrange
    },
    refurb_cost_items () {
      return [
        {name: 'Refurbishment', worst: -1 * this.refurb_cost_total.max, best: -1 * this.refurb_cost_total.min}
      ]
    },
    refurbmonths () {
      return {
        worst: this.refurbtimerange.max,
        best: this.refurbtimerange.min
      }
    }
  }
})
</script>
