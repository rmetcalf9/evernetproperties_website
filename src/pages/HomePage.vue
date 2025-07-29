<template>
  <q-page class="flex flex-center">
    <div class="main-page fit row wrap justify-center items-center content-center">
      <h2>Transform the Way You Source Property Deals</h2>
      <div class="flex-break"></div>
      <div class="flex row first-section">
        <div>
          <img
            alt="Profile Picture"
            src="~assets/profile-pic.png"
            class="profile-picture"
          >
        </div>
        <div class="flex column">
          <div class="homepage-mainpara">Deal sourcing should be <b>efficient, accurate, and scalable</b>—but too often, it’s held back by inconsistent due diligence, scattered data, and time-consuming admin. Our software is built for <b>professional deal sourcers and investors</b> who want to streamline their workflow, raise the quality of their deals, and grow their portfolios with confidence.</div>
          <div v-for="feature in features" :key="feature">
            <q-icon name="check_box" color="green" size="32px" />
            <b>{{ feature.main }}</b> - {{ feature.sub }}
          </div>
          <div class="homepage-start">🚀 Start streamlining your deal sourcing today!</div>
        </div>
      </div>
      <div class="flex-break"></div>
      <q-card style="max-width:700px; padding: 30px; margin: 20px;"  @click="click_ppb_card">
        <h4 style="margin: 0px;">Early Access to Property Pipeline Builder!</h4>
        <div class="row">
          <div>
            <img
              class="main-logo"
              alt="Evernet properties logo"
              src="~assets/workflow_image.png"
              style="width: 200px;"
            >
          </div>
          <div class="col q-ma-sm" style="min-width: 200px;">
            <p>We’re thrilled to introduce <b>Property Pipeline Builder</b>, a game-changing app for deal sourcers to streamline property evaluations and organise due diligence. Exclusive early access is now available for Samuel Leeds Academy members. [<a  href="#" onclick="return false;">Click here</a>] to learn more and secure your spot!</p>
          </div>
          <div align="center" style="width: 100%">
            <q-btn
              color="positive"
              label="Click here to find out more!"
            />
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  data () {
    return {
      features: [
        {main: 'Organized Deal Pipeline', sub: 'Keep track of all your potential deals in one place'},
        {main: 'Purchase deals', sub: 'Support your search finding properties to purchase'},
        {main: 'Rent-to-Rent deals', sub: 'Help organise your rent-to-rent deal hunt'},
        {main: 'Dynamic call script call', sub: 'Make professional sales calls to landlords'},
        {main: 'Standardized Due Diligence', sub: 'Ensure every deal meets high-quality standards with structured assessments'},
        {main: 'Accurate Calculations', sub: 'Use verified formulas to back up your figures with evidence'},
        {main: 'Increased Efficiency', sub: 'Save time, reduce errors, and focus on closing the best deals'},
        {main: 'Scalability', sub: 'Manage more deals effortlessly as your business grows'},
      ]
    }
  },
  components: {
  },
  methods: {
    click_ppb_card () {
    this.$router.push('/v/aaaaa/000000')
    }
  }
})
</script>

<style>
.homepage-featuremain {
  font-weight: 700;
}
.homepage-featuresub {

}
.homepage-mainpara {
  max-width: 400px;
  margin-bottom: 15px;
}
.homepage-start {
  margin-top: 15px;
  font-weight: 700;
  font-size: 1.2rem;
}
.first-section {
  padding-bottom: 30px;
}
.profile-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
}
.flex-break {
  flex: 1 0 100%
}
.main-page {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
}
</style>
