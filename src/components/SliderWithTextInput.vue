<template>
  <div class="col-grow ">
    &nbsp;
    <q-range
      v-model="rangevalue"
      :min="min"
      :max="max"
      :step="step"
      thumb-size="40px"
      drag-range
      label
      snap
      :left-label-value="left_label_value_used"
      :right-label-value="right_label_value_used"
    />
  </div>
  <div class="col-grow row">
    <div class="pricetblcell">
      {{ min_label_text }}: <q-input
        ref="bestinput"
        v-model.number="rangevalue.min"
        type="number"
        :step="step"
        filled
        style="max-width: 110px"
        :rules="[ val => val <= rangevalue.max || 'Must be lower than ' + max_label_text]"
        @update:model-value="validateworst"
      />
    </div>
    <div class="pricetblcell">
      {{ max_label_text }}: <q-input
        ref="worstinput"
        v-model.number="rangevalue.max"
        type="number"
        :step="step"
        filled
        style="max-width: 110px"
        :rules="[ val => val >= rangevalue.min || 'Must be higher than ' + min_label_text]"
        @update:model-value="validatebest"
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
  props: {
    range: Object,
    min_prefix: {
      type: String,
      default: 'Best £'
    },
    max_prefix: {
      type: String,
      default: 'Worst £'
    },
    left_label_value: {
      type: String,
      default: ''
    },
    right_label_value: {
      type: String,
      default: ''
    },
    min_label_text: {
      type: String,
      default: 'Best Price'
    },
    max_label_text: {
      type: String,
      default: 'Worst Price'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1000000
    },
    step: {
      type: Number,
      default: 5000
    }
  },
  emits: ['update:range'],
  data () {
    return {
    }
  },
  methods: {
    validateworst () {
      this.$refs.worstinput.validate()
      this.emitrangevalue(this.rangevalue)
    },
    validatebest () {
      this.$refs.bestinput.validate()
      this.emitrangevalue(this.rangevalue)
    },
    emitrangevalue (value) {
      const emitObj = {
        min: this.ensurenumber(value.min),
        max: this.ensurenumber(value.max)
      }
      this.$emit("update:range", emitObj)
    },
    ensurenumber(val) {
      if (val === null) {
        return 0
      }
      if (typeof (val) === 'undefined') {
        return 0
      }
      if (val === '') {
        return 0
      }
      return val
    }
  },
  computed: {
    left_label_value_used() {
      if (this.left_label_value == '') {
        return this.min_prefix + this.rangevalue.min / 1000 + 'k'
      }
      return this.left_label_value
    },
    right_label_value_used() {
      if (this.right_label_value == '') {
        return this.max_prefix + this.rangevalue.max / 1000 + 'k'
      }
      return this.right_label_value
    },
    isValid() {
      if (!this.$refs.worstinput.validate()) {
        return false
      }
      return this.$refs.bestinput.validate()
    },
    rangevalue: {
      get() {
        return this.range
      },
      set(value) {
        this.emitrangevalue(value)
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
