<template>
  <q-page class="flex flex-center">
    <div>
      <h3 style="margin: 0px;">Tools</h3>
      Useful tools and calculators for property tasks.
      <div class="row">
        <q-card inline class="q-ma-sm card-style tool-card" @click="click_brrr_card">
          <q-card-section>
            <div class="text-h6">Buy Refurbish Rent Refinance Calculator</div>
            <div class="row">
              <div>
                <img
                  alt="Profile Picture"
                  src="~assets/tool_brr_calc.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm">
                <div style="height: 150px;">This calculator lets you input data from a property you are considering using the BRRR strategy with and will calculate the expected profit, ROI. It also allows you to experiment with different finance options.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm card-style tool-card" @click="click_flip_card">
          <q-card-section>
            <div class="text-h6">Flip Calculator</div>
            <div class="row">
              <div>
                <img
                  alt="Profile Picture"
                  src="~assets/tool_brr_calc.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm">
                <div style="height: 150px;">Use this calculator if you are working on a flip deal; where you buy a property, push the value up then sell it for a profit.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolsPage',
  data () {
    return {
    }
  },
  methods: {
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    },
    click_flip_card () {
      this.$router.push('/tools/flipcalc')
    }
  }
})
</script>

<style>
.tool-card {
  max-width: 500px;
}
.tool-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
  border-style: solid;
}
</style>
