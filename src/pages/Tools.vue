<template>
  <q-page class="flex flex-center">
    <div>
      <LoginButton
      />
      <h3 style="margin: 0px;">Tools</h3>
      Useful tools and calculators for property tasks.
      <div class="row">
        <q-card inline class="q-ma-sm card-style tool-card" @click="click_simproi_card">
          <q-card-section>
            <div class="text-h6">Simple ROI Caculator</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/tool_simpleroi_calc.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm">
                <div style="height: 150px;">This caculator is a quick and simple way of finding the ROI on a property. It doesn't take into account refurbishment.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <CommonBRRToolLink />
        <q-card inline class="q-ma-sm card-style tool-card" @click="click_flip_card">
          <q-card-section>
            <div class="text-h6">Flip Calculator</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/tool_flip_calc.png"
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
        <q-card v-if="security_role_cansave" inline class="q-ma-sm card-style tool-card featurecard" @click="click_myprojects_card">
          <q-card-section>
            <div class="text-h6">My Projects</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/tool_flip_calc.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm">
                <div style="height: 150px;">Use this tool to view and manage your saved projects. Your BRR Calculator projects are arranged into patches and can be reloaded and updated.</div>
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
import LoginButton from '../components/LoginButton.vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import CommonBRRToolLink from '../components/CommonBRRToolLink.vue'

export default defineComponent({
  name: 'ToolsPage',
  components: {
    LoginButton,
    CommonBRRToolLink
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
    }
  },
  computed: {
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    }
  },
  methods: {
    click_simproi_card () {
      this.$router.push('/tools/simpleroicalc')
    },
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    },
    click_flip_card () {
      this.$router.push('/tools/flipcalc')
    },
    click_myprojects_card () {
      this.$router.push('/tools/cansave/patches')
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
