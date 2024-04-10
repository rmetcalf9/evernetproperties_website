<template>
  <div>
    <q-page class="flex flex-center">
      <div class="main-page fit col wrap justify-center items-center content-center">
        <div
        v-if="refurb_mode === 'plans'"
        >
          <plansChart
            ref="plansChart"
            :refurbData="refurb_data"
          />
        </div>
        <div
        v-if="refurb_mode === 'viewing'"
        >
          <viewingChart
            ref="viewingChart"
            :refurbData="refurb_data"
          />
        </div>
        <div
        v-if="refurb_mode === 'json'"
        >
          <jsonView
            ref="jsonView"
            :model-value="refurb_data"
            @update:model-value="newValue => refurb_data = newValue"
          />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

import plansChart from '../../components/RefurbCalc/Mainpages/PlansChart.vue'
import viewingChart from '../../components/RefurbCalc/Mainpages/ViewingChart.vue'
import jsonView from '../../components/RefurbCalc/Mainpages/jsonView.vue'

import refurbDataModel from '../../components/RefurbCalc/dataModel.js'

export default defineComponent({
  name: 'CalcRefurbishment',
  components: {
    plansChart,
    viewingChart,
    jsonView
  },
  data () {
    return {
      refurb_mode: 'plans',
      refurb_data: refurbDataModel.getNewlyCreatedDataSet()
    }
  },
  methods: {
    click_refurb_menu (ite) {
      if (ite === 'viewing') {
        if (this.refurb_data.background_items.length === 0) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Add floorplans before viewing',
            timeout: 2
          })
          return
        }
      }
      this.refurb_mode = ite
    }
  },
  mounted () {
    var TTT = this
    this.$bus.on('click_refurb_menu', (ite) => {
      TTT.click_refurb_menu(ite)
    })
  },
  unmounted () {
  }
})
</script>

<style>
h1 {
  font-size: 3rem;
  line-height: 3rem;
  margin: 0px;
}
.main-page {
  margin: 10px;
}
.card-style {
  max-width: 500px;
}
</style>
