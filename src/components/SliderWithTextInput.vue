<template>
  <div class="col-grow ">
    &nbsp;
    <q-range
      v-model="rangevalue"
      :min="0"
      :max="1000000"
      :step="5000"
      thumb-size="40px"
      drag-range
      label
      snap
      :left-label-value="'Best £' + rangevalue.min / 1000 + 'k'"
      :right-label-value="'Worst £' + rangevalue.max / 1000 + 'k'"
    />
  </div>
  <div class="col-grow row">
    <div class="pricetblcell">
      Best Price: <q-input
        v-model.number="rangevalue.min"
        type="number"
        :step="5000"
        filled
        style="max-width: 110px"
        :rules="[ val => val <= rangevalue.max || 'Must be lower than worst']"
      />
    </div>
    <div class="pricetblcell">
      Worst Price: <q-input
        v-model.number="rangevalue.max"
        type="number"
        :step="5000"
        filled
        style="max-width: 110px"
        :rules="[ val => val >= rangevalue.min || 'Must be higher than best']"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

export default defineComponent({
  name: 'SliderWithTextInput',
  props: ['range'],
  emits: ['update:range'],
  data () {
    return {
    }
  },
  computed: {
    rangevalue: {
      get() {
        return this.range;
      },
      set(value) {
        this.$emit("update:range", value);
      },
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
