<template>
  <q-page class="flex flex-center">
    <div class="main-page fit row wrap justify-center items-center content-center">
      <h2>Let us find you a property</h2>
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
          <div v-for="feature in features" :key="feature"><q-icon name="check_box" color="green" size="32px" />{{ feature }}</div>
        </div>
      </div>
      <div class="flex-break"></div>
      <CrmInvestorSubForm
        ref="CrmInvestorSubForm"
      ></CrmInvestorSubForm>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CrmInvestorSubForm from '../components/CrmInvestorSubForm.vue'

export default defineComponent({
  name: 'HomePage',
  data () {
    return {
      features: [
      'Cash Flowing property found for you',
      'Save Time and Energy',
      'Rental and SA Market Assessed',
      'Expert Insight',
      'Risks Addressed',
      'Due Diligence Support',
      'Below Market Value Price Negotiated',
      'Great ROI Deals Selected',
      'Bespoke Search Service Available',
      ]
    }
  },
  components: {
    CrmInvestorSubForm
  }
})
</script>

<style>
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
