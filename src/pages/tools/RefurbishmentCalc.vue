<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Refurbishment Calculator</h1>
      <div>Input Plans</div>
      <div>Input Photos and Work items</div>
      <div>View work and generate quote</div>
      <chart
      ref="mainChart"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import chart from '../../components/RefurbCalc/Chart.vue'

export default defineComponent({
  name: 'CalcRefurbishment',
  components: {
    chart
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
