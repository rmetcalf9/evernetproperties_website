<template>
  <q-page class="flex ">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <div v-if="security_role_cansave">
        <h1>Project Analysis</h1>
      </div>
      <div v-if="!security_role_cansave">
        <h1>Buy Refurbish Rent Refinance Calculator</h1>
      </div>
      <BrrToolbar
        ref="BrrToolbar"
        v-if="security_role_cansave"
        :reason_project_not_savable="reason_project_not_savable"
        :is_saved_project_with_id="is_saved_project_with_id"
        @activity_log="activity_log"
        @saveproject="save_project"
        @createtodo="createtodo"
      />
      <q-tabs
        v-if="security_role_cansave"
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="main" label="Main" />
        <q-tab name="project" label="Project" />
      </q-tabs>
      <div class="row" v-show="tab==='main'">
        <DealBasicInfo
          ref="DealBasicInfo"
          v-if="security_role_cansave"
          :ever_saved="ever_saved"
          @projectchanged="projectchanged"
          @navigate_away="navigate_away"
        />
        <Vision
          ref="Vision"
          @projectchanged="projectchanged"
        />
        <GdvCard
          ref="GdvCard"
          @projectchanged="projectchanged"
        />
        <PurchasePrice
          ref="PurchasePrice"
          v-model:purchaserange="purchaserange"
          @projectchanged="projectchanged"
        />
        <RefurbCost
          ref="RefurbCost"
          @projectchanged="projectchanged"
        />
        <StampDuty
          ref="StampDuty"
          :purchaserange="purchaserange"
          @projectchanged="projectchanged"
        />
        <OtherCosts
          ref="OtherCosts"
          :purchaserange="purchaserange"
          @projectchanged="projectchanged"
        />
        <Finance
          ref="Finance"
          :purchaserange="purchaserange"
          :refurb_cost_total="refurb_cost_total"
          :stampduty_total="stampduty_total"
          :othercosts_total="othercosts_total"
          :refurbmonths="refurbmonths"
          :gdv_total="gdv_total"
          @projectchanged="projectchanged"
        />
        <Refinance
          ref="Refinance"
          :gdv_total="gdv_total"
          @projectchanged="projectchanged"
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
        <FlipDealRating
          ref="FlipDealRating"
          :purchaserange="purchaserange"
          :finance_in_items_without_cash="finance_in_items_without_cash"
          :finance_out_items="finance_out_items"
          :finance_during_items="finance_during_items"
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
        <Location
          ref="Location"
          @projectchanged="projectchanged"
        />
        <ProjectSerializer
          ref="ProjectSerializer"
          v-if="security_role_cansave"
          @saveprojectcomplete="save_project_complete"
          :project_type="project_type"
        />
      </div>
      <div class="row" v-show="tab==='project'">
        <Workflow
          ref="Workflow"
          @projectchanged="projectchanged"
          @activity_log="activity_log"
          @click_save_btn="click_save_btn"
          v-if="security_role_cansave"
        />
        <Todos
          ref="todos"
          v-if="security_role_cansave"
        />
        <ActivityLog
          ref="ActivityLog"
          @projectchanged="projectchanged"
          v-if="security_role_cansave"
        />
        <SaveToGoogleSheet
          ref="SaveToGoogleSheet"
          v-if="security_role_cansave"
          :serialized_data="serialized_data"
          :patch="patch"
          :stampduty_total="stampduty_total"
          :refurb_cost_total="refurb_cost_total"
          :othercosts_items_detail="othercosts_items_detail"
          :caculated_loan_details="caculated_loan_details"
          :finance_bridgecost="finance_bridgecost"
          :finance_bridgeamount="finance_bridgeamount"
          :refinance_costs="refinance_costs"
          :gdv_total="gdv_total"
          @apiaddweblink="apiaddweblink"
          @activity_log="activity_log"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import BrrToolbar from '../../components/BrrCalc/BrrToolbar/BrrToolbar.vue'


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
import FlipDealRating from '../../components/FlipCalc/DealRating.vue'
import DealBasicInfo from '../../components/BrrCalc/DealBasicInfo.vue'
import Location from '../../components/CommonCalcComponents/Location.vue'

import SaveToGoogleSheet from '../../components/BrrCalc/SaveToGoogleSheet.vue'
import ActivityLog from '../../components/CommonCalcComponents/ActivityLog.vue'
import Todos from '../../components/CommonCalcComponents/Todos.vue'
import Workflow from '../../components/CommonCalcComponents/Workflow.vue'

import ProjectSerializer from '../../components/CommonCalcComponents/ProjectSerializer.vue'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import common_constants from '../../components/common_constants.js'

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
    ProjectSerializer,
    SaveToGoogleSheet,
    ActivityLog,
    BrrToolbar,
    Workflow,
    FlipDealRating,
    Todos,
    Location
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const dataCachesStore = useDataCachesStore()
    return {
      backend_connection_store,
      dataCachesStore
    }
  },
  data () {
    return {
      tab: 'main',
      isMounted: false,
      purchaserange: {
        min: 180000,
        max: 190000
      },
      loaded_project_id: ''
    }
  },
  computed: {
    project_type () {
      return common_constants.project_type_constants.project_type_purchase
    },
    is_saved_project_with_id () {
      return this.loaded_project_id !== ''
    },
    ever_saved () {
      if (!this.isMounted) {
        return false
      }
      if (!this.security_role_cansave) {
        console.log('WARNING ever_saved checked when cansave is false')
        return false
      }
      return this.$refs.BrrToolbar.ever_saved
    },
    reason_project_not_savable () {
      if (!this.isMounted) {
        return ''
      }
      return this.$refs.DealBasicInfo.reason_project_not_savable
    },
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
    caculated_loan_details () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.caculated_loan_details
    },
    finance_bridgecost () {
      if (!this.isMounted) {
        return {
          best: 0,
          worst: 0
        }
      }
      return this.$refs.Finance.bridgecost
    },
    finance_bridgeamount () {
      if (!this.isMounted) {
        return {
          best: 0,
          worst: 0
        }
      }
      return this.$refs.Finance.bridgeamount
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
    finance_in_items_without_cash () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Finance.finance_in_items_without_cash
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
    refinance_costs () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.Refinance.refinance_costs
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
    othercosts_items_detail () {
      if (!this.isMounted) {
        return []
      }
      return this.$refs.OtherCosts.othercosts_items_detail
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
    },
    serialized_data () {
      if (!this.security_role_cansave) {
        console.log('WARNING serialized_data checked when cansave is false')
        return {}
      }
      if (!this.isMounted) {
        return {}
      }
      return {
        dealbasicinfo: this.$refs.DealBasicInfo.serializer_card_data,
        vision: this.$refs.Vision.serializer_card_data,
        gdvcard: this.$refs.GdvCard.serializer_card_data,
        purchaseprice: this.$refs.PurchasePrice.serializer_card_data,
        refurbcost: this.$refs.RefurbCost.serializer_card_data,
        stampduty: this.$refs.StampDuty.serializer_card_data,
        othercosts: this.$refs.OtherCosts.serializer_card_data,
        finance: this.$refs.Finance.serializer_card_data,
        refinance: this.$refs.Refinance.serializer_card_data
      }
    },
    patch () {
      if (!this.isMounted) {
        return {id: 'notset', name: 'Not Set'}
      }
      if (!this.security_role_cansave) {
        console.log('WARNING patch method called when cansave is false')
        return {id: 'notset', name: 'Not Set'}
      }

      return this.$refs.DealBasicInfo.patch
    }
  },
  methods: {
    navigate_away(params) {
      const TTT = this
      if (!this.$refs.BrrToolbar.is_project_changed) {
        this.$router.push(params.dest)
        return
      }
      this.$refs.BrrToolbar.click_save_btn()
      setTimeout(function () {
        TTT.navigate_away(params)
      }, 100)
    },
    createtodo(params) {
      const TTT = this
      const callback = {
        ok: function (response) {
          TTT.$refs.todos.add_single_todo(response.data.todo)
          Notify.create({
            color: 'bg-grey-2',
            message: 'Todo added',
            timeout: 2000,
            color: 'positive'
          })
        },
        error: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: response.message,
            timeout: 2000,
            color: 'negative'
          })
        }
      }
      TTT.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects/' + TTT.loaded_project_id + '/todos',
        method: 'POST',
        data: params,
        callback: callback
      })
    },
    apiaddweblink(params) {
      return this.$refs.DealBasicInfo.apiaddweblink(params)
    },
    activity_log (obj) {
      if (!this.isMounted) {
        console.log('ERROR - trying to log activity unmounted', obj)
        return
      }
      this.$refs.ActivityLog.log_activity(obj)
    },
    projectchanged (source) {
      console.log('BrrCalc page received project changed from ', source)
      if (!this.security_role_cansave) {
        // console.log('WARNING projectchanged checked when cansave is false')
        // warning not needed - this is normal
        return false
      }
      if (!this.isMounted) {
        console.log('WARNING = projectchanged called when mounted is false')
        return
      }
      if (typeof (this.$refs.BrrToolbar) === 'undefined') {
        console.log('WARNING = projectchanged called when BrrToolbar is undefined')
        return false
      }
      if (source === 'ActivityLog:log_activity:forcesave') {
        this.$refs.BrrToolbar.set_changed_true({autosave_seconds: 0})
      } else {
        this.$refs.BrrToolbar.set_changed_true()
      }
    },
    click_save_btn () {
      this.$refs.BrrToolbar.click_save_btn()
    },
    save_project () {
      this.$refs.ProjectSerializer.save_project({
        dict_of_card_info: this.serialized_data,
        activity_log: this.$refs.ActivityLog.serializer_card_data,
        workflow: this.$refs.Workflow.serializer_card_data,
        patch_id: this.serialized_data.dealbasicinfo.patch_id,
        location: this.$refs.Location.serializer_card_data,
        passthroughdata: undefined
      })
    },
    load_project_into_cards (project) {
      this.$refs.ProjectSerializer.serializer_load_data(project)
      this.$refs.DealBasicInfo.serializer_load_data(project.sub_section_details.dealbasicinfo)
      if (typeof (project.sub_section_details.vision) !== 'undefined') {
        this.$refs.Vision.serializer_load_data(project.sub_section_details.vision)
      }
      if (typeof (project.sub_section_details.gdvcard) !== 'undefined') {
        this.$refs.GdvCard.serializer_load_data(project.sub_section_details.gdvcard)
      }
      if (typeof (project.sub_section_details.purchaseprice) !== 'undefined') {
        this.$refs.PurchasePrice.serializer_load_data(project.sub_section_details.purchaseprice)
      }
      if (typeof (project.sub_section_details.refurbcost) !== 'undefined') {
        this.$refs.RefurbCost.serializer_load_data(project.sub_section_details.refurbcost)
      }
      if (typeof (project.sub_section_details.stampduty) !== 'undefined') {
        this.$refs.StampDuty.serializer_load_data(project.sub_section_details.stampduty)
      }
      if (typeof (project.sub_section_details.othercosts) !== 'undefined') {
        this.$refs.OtherCosts.serializer_load_data(project.sub_section_details.othercosts)
      }
      if (typeof (project.sub_section_details.finance) !== 'undefined') {
        this.$refs.Finance.serializer_load_data(project.sub_section_details.finance)
      }
      if (typeof (project.sub_section_details.refinance) !== 'undefined') {
        this.$refs.Refinance.serializer_load_data(project.sub_section_details.refinance)
      }
      if (typeof (project.location) !== 'undefined') {
        this.$refs.Location.serializer_load_data(project.location)
      }
      this.$refs.ActivityLog.serializer_load_data(project.activity_log)
      this.$refs.Workflow.serializer_load_data(project.workflow)
      this.$refs.BrrToolbar.serializer_load_data({})

      // todos only loaded. Never saved
      this.$refs.todos.serializer_load_data(project.todos)
    },
    save_project_complete ({success, response, passthroughdata}) {
      if (success) {
        this.loaded_project_id = response.data.id
      }
      this.$refs.BrrToolbar.save_project_complete_notification({
        success: success,
        response: response
      })
    },
    load_project_api_fail (response) {
      Notify.create({
        color: 'bg-grey-2',
        message: 'Error loading project ' + response,
        timeout: 2000,
        color: 'negative'
      })
      this.load_complete()
    },
    load_project_api_success (response) {
      this.loaded_project_id = response.data.id
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
      const TTT = this
      setTimeout(function () {
        TTT.isMounted = true
      }, 105)
    },
    call_load_api () {
      const TTT = this
      const callback = {
        ok: TTT.load_project_api_success,
        error: TTT.load_project_api_fail
      }
      TTT.dataCachesStore.get({
        backend_connection_store: TTT.backend_connection_store,
        object_type: 'projects',
        object_id: TTT.$route.query.projectid,
        skip_cache: false,
        callback: callback
      })
    }
  },
  mounted (){
    const TTT = this
    if (typeof (TTT.$route.query.projectid) === 'undefined') {
      TTT.load_complete();
      if (typeof (TTT.$route.query.patchid) !== 'undefined') {
        if (!TTT.security_role_cansave) {
          return
        }
        this.$refs.DealBasicInfo.select_patch_by_id(TTT.$route.query.patchid)
      }
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
