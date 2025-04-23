<template>
  <q-page class="flex flex-center">
    <div class="main-div">
      <LoginButton
        :floating="true"
      />
      <h3 style="margin-top: 0px; margin-bottom: 15px;">Property Pipeline Builder</h3>
      <q-btn color="primary" label="Training Videos, Guides and Tutorials" icon="help" to="/tools/training" />
      <div v-if="!security_role_cansave" class="row ppb-ad-block">
        <div class="ppb-ad-block-left-text">
          Use your Property Pipeline Builder to setup your projects for success!
          <div><q-icon name="check_box" color="green" size="32px" />Keep track of properties you are working on</div>
          <div><q-icon name="check_box" color="green" size="32px" />Manage projects through the pipeline</div>
          <div><q-icon name="check_box" color="green" size="32px" />All information in one place</div>
          <div><q-icon name="check_box" color="green" size="32px" />Work with multiple patches</div>
          <div><q-icon name="check_box" color="green" size="32px" />Access on the road via your mobile</div>
          <div v-if="!isLoggedin" class="ppb-calltoaction">
            <div class="tools-h5">Click Sign in to get started</div>
            <LoginButton
              :floating="false"
              :center="false"
            />
          </div>
          <div v-if="isLoggedinButNotSignedUp" class="ppb-calltoaction">
            <h5>Click User Profile in to register for early access</h5>
          </div>
        </div>
        <div class="ppb-embedded-vid-div">
          <div>
            <p>Early access sign up tutorial video</p>
            <q-video
              src="https://www.youtube.com/embed/TXHtRWG6GlI?rel=0"
              class="ppb-embedded-vid"
            />
          </div>
        </div>
      </div>
      <div class="row" v-if="security_role_cansave">
        <q-card inline class="q-ma-sm card-style tool-card featurecard" @click="$router.push('/tools/cansave/patches')">
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
                <div style="height: 150px;">View and manage your saved projects. Your Projects are arranged into patches and can be reloaded and updated.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <CommonBRRToolLink
          :ppbmainpage="true"
        />
        <q-card
          v-if="featureflags.rent_to_rent_projects"
          inline class="q-ma-sm card-style tool-card" @click="$router.push('tools/cansave/toolsrent')"
        >
          <q-card-section>
            <div class="text-h6">Rental Projects</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/enter_rental_lead.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm">
                <div style="height: 150px;">This is the rental projects menu. This contains the functionality around the rental property strategies - Rent to HMO, Rent to Serviced Accommodation, etc. These functions allow you to enter leads, make calls to landlords and manage the viewing calendar.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm card-style tool-card featurecard" @click="$router.push('/tools/cansave/todo')">
          <q-card-section>
            <div class="text-h6">My Todo List</div>
            <div class="row">
              <div>
                <q-icon name="rule" size="150px" class="tool-picture" />
              </div>
              <div class="col q-ma-sm">
                <div style="height: 150px;">View your saved actions across all your projects</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <h3 style="margin-bottom: 0px;">Tools</h3>
      Useful tools and calculators for property tasks.
      <div class="row">
        <q-card inline class="q-ma-sm card-style tool-card" @click="$router.push('/tools/simpleroicalc')">
          <q-card-section>
            <div class="text-h6">Simple ROI Calculator</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/tool_simpleroi_calc.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm" style="min-width: 158px;">
                <div style="height: 150px;">This calculator is a quick and simple way of finding the ROI on a property. It doesn't take into account refurbishment.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <CommonBRRToolLink />
        <q-card inline class="q-ma-sm card-style tool-card" @click="$router.push('/tools/flipcalc')">
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
              <div class="col q-ma-sm" style="min-width: 100px;">
                <div style="height: 150px;">Use this calculator if you are working on a flip deal; where you buy a property, push the value up then sell it for a profit.</div>
                <div align="right">
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- HMO HmoCommercialValuationCalc -->
        <q-card inline class="q-ma-sm card-style tool-card" @click="$router.push('/tools/hmocommercialvaluecalc')">
          <q-card-section>
            <div class="text-h6">HMO Commercial Valuation Calculator</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/tool_hmo_commercial_val_calc.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm" style="min-width: 100px;">
                <div style="height: 150px;">Use this tool to calculate an estimate on what a commercial valuation would be for a HMO based on HMO’s in the area.</div>
                <div align="right">
                  <q-btn round dense color="primary" icon="info" />
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
import featureflags from '../featureflags.js'

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
    featureflags () {
      return featureflags
    },
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    isLoggedinButNotSignedUp () {
      if (!this.isLoggedin) {
        return false
      }
      return !this.security_role_cansave
    }
  },
  methods: {
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
.main-div {
  padding: 20px;
}
.ppb-calltoaction h5 {
  margin-top: 5px;
}
.ppb-ad-block {
}
.ppb-ad-block-left-text {
  margin: 5px;
}
.ppb-embedded-vid-div {
  margin: 5px;
}
.ppb-embedded-vid {
width: 280px;
height: 200px
}
.tools-h5 {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: normal;
}
</style>
