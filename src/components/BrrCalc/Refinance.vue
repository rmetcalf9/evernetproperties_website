<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Refinance</div>
      This section is for adding refinance details. After the refurbishment is complete the refinance stage can be used to pull money out of the deal.
      <q-checkbox v-model="refinance.userefinance" label="Refinance after refurbishment" />
        <div v-if="refinance.userefinance">
        Refinance LTV {{ refinance.ltv.min }}% - {{ refinance.ltv.max }}%
        <SliderWithTextInput
          ref="slider"
          v-model:range="refinance.ltv"
          :min="0"
          :max="100"
          :step="5"
          :left_label_value="refinance.ltv.min + '%'"
          :right_label_value="refinance.ltv.max+ '%'"
          min_label_text="Worst LTV %"
          max_label_text="Best LTV %"
        />
        <hr/>
        Intrest rate {{ refinance.rate.min }}% - {{ refinance.rate.max }}%
        <SliderWithTextInput
          ref="slider"
          v-model:range="refinance.rate"
          :min="0"
          :max="50"
          :step="0.1"
          :left_label_value="refinance.rate.min + '%'"
          :right_label_value="refinance.rate.max+ '%'"
          min_label_text="Worst %"
          max_label_text="Best %"
        />
        <hr/>
        <div>Refinance amount: {{ format_currency(refinanceamount.worst) }} - {{ format_currency(refinanceamount.best) }}</div>
        <div>Monthly Payments: {{ format_currency(monthly_payments.worst) }} - {{ format_currency(monthly_payments.best) }}</div>
        <div>
          <div><b>Refinance Costs:</b></div>
          <div v-for="item in refinance_costs" :key='item.name'>
            <div>{{ item.name }}: {{ format_currency(item.worst * -1) }} - {{ format_currency(item.best * -1) }}</div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import utils from '../utils.js'
import SliderWithTextInput from '../../components/SliderWithTextInput.vue'

function default_rate () {
  return {
    min: 6.0,
    max: 6.0
  }
}

function default_bricks_and_mortar_remortgage_cost () {
  return 2500
}

export default defineComponent({
  name: 'BrrCalcFinance',
  emits: ['projectchanged'],
  props: ['gdv_total'],
  components: {
    SliderWithTextInput
  },
  data () {
    return {
      refinance: {
        userefinance: true,
        ltv: {
          min: 75,
          max: 75
        },
        rate: default_rate()
      },
      emit_project_change_notification: true
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.refinance.userefinance = data_to_load.refinance_userefinance
      this.refinance.ltv = data_to_load.refinance_userefinance_ltv
      if (typeof ( data_to_load.refinance_userefinance_rate) === 'undefined') {
        this.refinance.rate = default_rate()
      } else {
        this.refinance.rate = data_to_load.refinance_userefinance_rate
      }

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'Refinance')
      }
    }
  },
  computed: {
    monthly_payments () {
      return {
        worst: this.refinanceamount.worst * (this.refinance.rate.min / (100 * 12)),
        best: this.refinanceamount.best * (this.refinance.rate.max / (100 * 12))
      }
    },
    serializer_card_data () {
      return {
        refinance_userefinance: this.refinance.userefinance,
        refinance_userefinance_ltv: this.refinance.ltv,
        refinance_userefinance_rate: this.refinance.rate,
      }
    },
    get_refinance () {
      return this.refinance
    },
    refinanceamount () {
      return {
        worst: this.gdv_total.min * (this.refinance.ltv.min / 100),
        best: this.gdv_total.max * (this.refinance.ltv.max / 100)
      }
    },
    refinance_costs () {
      let ret_val = []
      ret_val.push({
        name: 'Remortgage Cost',
        worst: -1 * default_bricks_and_mortar_remortgage_cost(),
        best: -1 * default_bricks_and_mortar_remortgage_cost()
      })
      return ret_val
    },
    refinance_out_items () {
      let ret_val = []
      if (this.refinance.userefinance) {
        ret_val.push({name: 'Mortgage Refinance', worst: this.refinanceamount.worst, best: this.refinanceamount.best})
      }
      this.refinance_costs.map(function (x) {
        ret_val.push(x)
      })
      return ret_val
    },
  }
})

</script>

<style>
</style>
