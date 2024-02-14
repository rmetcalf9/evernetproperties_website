<template>
  <div>
    <q-page class="flex flex-center">
      <div class="main-page fit col wrap justify-center items-center content-center">
        <h1>Refurbishment Calculator {{ refurb_mode }}</h1>
        <plansChart
          ref="plansChart"
          v-if="refurb_mode === 'plans'"
        />
      </div>
    </q-page>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import plansChart from '../../components/RefurbCalc/PlansChart.vue'

export default defineComponent({
  name: 'CalcRefurbishment',
  components: {
    plansChart
  },
  data () {
    return {
      refurb_mode: 'plans'
    }
  },
  methods: {
    click_refurb_menu (ite) {
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
