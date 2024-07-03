<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Buy Refurbish Rent Refinance Calculator</h1>
      <div>This calculator can be used for calculating deal information for a Buy, Refurbish, Rent, Refinance project (BRRR). You can use this page to perform these calculations.</div>
      <div class="row">
        <DealBasicInfo
          ref="DealBasicInfo"
          @saveproject="save_project"
        />
        <Vision
          ref="Vision"
        />
        <GdvCard
          ref="GdvCard"
        />
        <PurchasePrice
          ref="PurchasePrice"
          v-model:purchaserange="purchaserange"
        />
        <RefurbCost
          ref="RefurbCost"
        />
        <StampDuty
          ref="StampDuty"
          :purchaserange="purchaserange"
        />
        <OtherCosts
          ref="OtherCosts"
          :purchaserange="purchaserange"
        />
        <Finance
          ref="Finance"
          :purchaserange="purchaserange"
          :refurb_cost_total="refurb_cost_total"
          :stampduty_total="stampduty_total"
          :othercosts_total="othercosts_total"
          :refurbmonths="refurbmonths"
          :gdv_total="gdv_total"
        />
        <Refinance
          ref="Refinance"
          :gdv_total="gdv_total"
        />
        <DealSummary
          ref="DealSummary"
          :purchaserange="purchaserange"
          :finance_in_items="finance_in_items"
          :finance_out_items="finance_out_items"
          :finance_during_items="finance_during_items"
          :refinance_out_items="refinance_out_items"
          :purchase_items="purchase_items"
          :stampduty_items="stampduty_items"
          :othercosts_items="othercosts_items"
          :refurb_cost_items="refurb_cost_items"
          :gdv_total="gdv_total"
          :refurbmonths="refurbmonths"
          :is_valid_input="is_valid_input"
        />
        <DealRating
          ref="DealRating"
          :purchaserange="purchaserange"
          :finance_totalmoneyneeded="finance_totalmoneyneeded"
          :deal_summary_final_bal="deal_summary_final_bal"
          :finance_refinance="finance_refinance"
          :gdv_total="gdv_total"
          :refurbmonths="refurbmonths"
          :stampduty_total="stampduty_total"
          :othercosts_total="othercosts_total"
          :refurb_cost_total="refurb_cost_total"
          :is_valid_input="is_valid_input"
        />
        <ProjectSerializer
          ref="ProjectSerializer"
          v-if="security_role_cansave"
          @saveprojectcomplete="save_project_complete"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Vision from '../../components/BrrCalc/Vision.vue'
import GdvCard from '../../components/CommonCalcComponents/Gdv.vue'
import PurchasePrice from '../../components/CommonCalcComponents/PurchasePrice.vue'
import RefurbCost from '../../components/CommonCalcComponents/RefurbCost.vue'
import StampDuty from '../../components/CommonCalcComponents/StampDuty.vue'
import OtherCosts from '../../components/CommonCalcComponents/OtherCosts.vue'
import Finance from '../../components/CommonCalcComponents/Finance.vue'
import Refinance from '../../components/BrrCalc/Refinance.vue'
import DealSummary from '../../components/BrrCalc/DealSummary.vue'
import DealRating from '../../components/BrrCalc/DealRating.vue'
import DealBasicInfo from '../../components/BrrCalc/DealBasicInfo.vue'

import ProjectSerializer from '../../components/BrrCalc/ProjectSerializer.vue'
import { useBackendConnectionStore } from 'stores/backend_connection'

import { Notify } from 'quasar'



export default defineComponent({
  name: 'CalcBrrToFlip',
  components: {
    GdvCard,
    PurchasePrice,
    RefurbCost,
    StampDuty,
    OtherCosts,
    DealSummary,
    Finance,
    Vision,
    DealRating,
    Refinance,
    DealBasicInfo,
    ProjectSerializer
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      isMounted: false,
      purchaserange: {
        min: 180000,
        max: 190000
      }
    }
  },
  computed: {
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    },
    is_valid_input() {
      if (!this.isMounted) {
        return true
      }
      if (!this.$refs.PurchasePrice.isValid) {
        return false
      }
      if (!this.$refs.GdvCard.isValid) {
        return false
      }
      return true
    },
    deal_summary_final_bal () {
      if (!this.isMounted) {
        return {
          best: 0,
          worst: 0
        }
      }
      return this.$refs.DealSummary.final_bal
    },
    finance_refinance () {
      if (!this.isMounted) {
        return {
          userefinance: false,
          ltv: {
            min: 75,
            max: 75
          }
        }
      }
      return this.$refs.Refinance.get_refinance
    },
    finance_totalmoneyneeded () {
      if (!this.isMounted) {
        return {
          best: 0,
          worst: 0
        }
      }
      return this.$refs.Finance.totalmoneyneeded
    },
    finance_in_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_in_items
    },
    finance_during_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_during_items
    },
    finance_out_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_out_items
    },
    refinance_out_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Refinance.refinance_out_items
    },
    purchase_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.PurchasePrice.purchase_items
    },
    stampduty_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.StampDuty.stampduty_items
    },
    othercosts_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.OtherCosts.othercosts_items
    },
    refurb_cost_items () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.RefurbCost.refurb_cost_items
    },
    refurb_cost_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.RefurbCost.refurb_cost_total
    },
    refurbmonths () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.RefurbCost.refurbmonths
    },
    stampduty_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.StampDuty.stampduty
    },
    othercosts_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.OtherCosts.total
    },
    gdv_total () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.GdvCard.total
    }
  },
  methods: {
    save_project () {
      const dict_of_card_info = {
        dealbasicinfo: this.$refs.DealBasicInfo.serializer_card_data
      }
      this.$refs.ProjectSerializer.save_project({
        dict_of_card_info: dict_of_card_info
      })
    },
    load_project_into_cards (project) {
      this.$refs.ProjectSerializer.serializer_load_data(project)
      this.$refs.DealBasicInfo.serializer_load_data(project.sub_section_details.dealbasicinfo)
    },
    save_project_complete ({success, response}) {
      this.$refs.DealBasicInfo.save_project_complete_notification({
        success: success,
        response: response
      })
    },
    load_project_api_fail (response) {
      console.log('Failed to load project via API - ', response)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Error loading project ' + response,
        timeout: 2000,
        color: 'negative'
      })
      this.load_complete()
    },
    load_project_api_success (response) {
      this.load_project_into_cards(response.data)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Project Loaded',
        timeout: 2000,
        color: 'positive'
      })
      this.load_complete()
    },
    load_complete () {
      setTimeout(function () {
        this.isMounted = true
      }, 5)
    },
    call_load_api () {
      const TTT = this
      const callback = {
        ok: TTT.load_project_api_success,
        error: TTT.load_project_api_fail
      }
      TTT.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects/' + TTT.$route.query.projectid,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    }
  },
  mounted (){
    const TTT = this
    if (typeof (TTT.$route.query.projectid) === undefined) {
      TTT.load_complete();
      return
    }
    if (TTT.security_role_cansave) {
      TTT.call_load_api()
      return
    }
    // May not have processed autologin from token yet. Give time for this to happen
    setTimeout(function () {
      TTT.call_load_api()
    }, 1000)
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
  padding: 0px;
}
.card-style {
  max-width: 500px;
}
.maincard {
  color: white;
  background-color: grey;
}

</style>
