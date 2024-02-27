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
      <div class="text-h6">Cost: £{{ refurbrange.min }} - £{{ refurbrange.max }}</div>
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
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

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
  },
  computed: {
  }
})
</script>
