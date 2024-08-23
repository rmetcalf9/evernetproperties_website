<template>
  <q-card inline class="q-ma-sm card-style tool-card" @click="click_brrr_card">
    <q-card-section>
      <div class="text-h6" v-if="ppbmainpage">Create new project</div>
      <div class="text-h6" v-if="!ppbmainpage">Buy Refurbish Rent Refinance Calculator</div>
      <div class="row">
        <div>
          <img
            alt="Item Picture"
            src="~assets/tool_brr_calc.png"
            class="tool-picture"
          >
        </div>
        <div class="col q-ma-sm" style="min-width: 158px;">
          <div v-if="ppbmainpage" style="height: 150px;">Start here - inputting details of new projects.</div>
          <div v-if="!ppbmainpage" style="height: 150px;">This calculator lets you input data from a property you are considering using the BRRR strategy with and will calculate the expected profit, ROI. It also allows you to experiment with different finance options.</div>
          <div align="right">
            <q-btn round  color="primary" icon="info" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolsCansavePatchesPage',
  props: {
    ppbmainpage: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    }
  },
  mounted () {
  }
})
</script>

<style>
.tool-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
  border-style: solid;
}
</style>
