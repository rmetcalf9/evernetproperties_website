<template>
<q-page class="flex ">
  <div class="rentcalc-page fit col wrap justify-center items-center content-center">
    <div>
      <h1>Rent Project</h1>
    </div>
    <BrrToolbar
      ref="BrrToolbar"
      reason_project_not_savable=""
      :is_saved_project_with_id="true"
      :is_rent_project="true"
      @activity_log="activity_log"
      @saveproject="save_project"
      @createtodo="createtodo"
    />
    <q-tabs
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
      <LeadInformation
        ref="LeadInformation"
        ever_saved=true
        @navigate_away="navigate_away"
        @projectchanged="projectchanged"
      />
      <ViewingInfo
        ref="ViewingInfo"
        :projectid="loaded_project_id"
        :leadinformation="leadinformation"
        @projectchanged="projectchanged"
      />
      <Location
        ref="Location"
        @projectchanged="projectchanged"
      />
    </div>
    <div class="row" v-show="tab==='project'">
      <Workflow
        ref="Workflow"
        @projectchanged="projectchanged"
        @activity_log="activity_log"
        @click_save_btn="click_save_btn"
      />
      <Todos
        ref="todos"
      />
      <ActivityLog
        ref="ActivityLog"
        @projectchanged="projectchanged"
      />
    </div>
  </div>
  <ProjectSerializer
    ref="ProjectSerializer"
    @saveprojectcomplete="save_project_complete"
    :project_type="project_type"
    success_message="Lead Saved"
  />
</q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify, useQuasar } from 'quasar'

import BrrToolbar from '../../../components/BrrCalc/BrrToolbar/BrrToolbar.vue'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import LeadInformation from '../../../components/ProjectTypeRentComponents/LeadInformation.vue'
import ViewingInfo from '../../../components/ProjectTypeRentComponents/ViewingInfo.vue'

import ActivityLog from '../../../components/CommonCalcComponents/ActivityLog.vue'
import Todos from '../../../components/CommonCalcComponents/Todos.vue'
import Workflow from '../../../components/CommonCalcComponents/Workflow.vue'

import ProjectSerializer from '../../../components/CommonCalcComponents/ProjectSerializer.vue'
import Location from '../../../components/CommonCalcComponents/Location.vue'
import common_constants from '../../../components/common_constants.js'


export default defineComponent({
  name: 'CalcBrrToFlip',
  components: {
    LeadInformation,
    ActivityLog,
    Workflow,
    Todos,
    ProjectSerializer,
    BrrToolbar,
    ViewingInfo,
    Location
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const q = useQuasar()
    const dataCachesStore = useDataCachesStore()
    return {
      q,
      backend_connection_store,
      dataCachesStore
    }
  },
  data () {
    return {
      tab: 'main',
      isMounted: false,
      loaded_project_id: '',
      sucessful_load_completed: false
    }
  },
  computed: {
    leadinformation () {
      if (!this.isMounted) {
        return {
          address: '',
          advert_information: '',
          advertweblinks: [],
          contact_email: '',
          contact_phone: '',
          landlord_name: '',
          lead_source: 'Not Selected',
          patch_id: undefined,
          postcode: ''
        }
      }
      return this.$refs.LeadInformation.serializer_card_data
    },
    project_type () {
      return common_constants.project_type_constants.project_type_rent
    },
    serialized_data () {
      if (!this.isMounted) {
        return {}
      }
      return {
        leadinformation: this.$refs.LeadInformation.serializer_card_data,
        viewinginformation: this.$refs.ViewingInfo.serializer_card_data,
      }
    }
  },
  methods: {
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
    save_project () {
      this.$refs.ProjectSerializer.save_project({
        dict_of_card_info: this.serialized_data,
        activity_log: this.$refs.ActivityLog.serializer_card_data,
        workflow: this.$refs.Workflow.serializer_card_data,
        patch_id: this.serialized_data.leadinformation.patch_id,
        location: this.$refs.Location.serializer_card_data,
        passthroughdata: undefined
      })
    },
    navigate_away(params) {
      const TTT = this
      this.$router.push(params.dest)
      // TODO project change and save check
      // if (!this.$refs.BrrToolbar.is_project_changed) {
      //   this.$router.push(params.dest)
      //   return
      // }
      // this.$refs.BrrToolbar.click_save_btn()
      // setTimeout(function () {
      //   TTT.navigate_away(params)
      // }, 100)
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
    },
    load_project_api_success (response) {
      this.loaded_project_id = response.data.id
      this.load_project_into_cards(response.data)
      this.sucessful_load_completed = true
      Notify.create({
        color: 'bg-grey-2',
        message: 'Project Loaded',
        timeout: 2000,
        color: 'positive'
      })
      this.load_complete()
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
    load_complete () {
      this.q.loading.hide()
      const TTT = this
      setTimeout(function () {
        TTT.isMounted = true
      }, 105)
    },
    load_project_into_cards (project) {
      this.$refs.ProjectSerializer.serializer_load_data(project)

      if (typeof (project.sub_section_details.leadinformation) !== 'undefined') {
        this.$refs.LeadInformation.serializer_load_data(project.sub_section_details.leadinformation)
      }
      if (typeof (project.sub_section_details.viewinginformation) !== 'undefined') {
        this.$refs.ViewingInfo.serializer_load_data(project.sub_section_details.viewinginformation)
      }
      if (typeof (project.location) !== 'undefined') {
        this.$refs.Location.serializer_load_data(project.location)
      }

      this.$refs.ActivityLog.serializer_load_data(project.activity_log)
      this.$refs.Workflow.serializer_load_data(project.workflow)
      // this.$refs.BrrToolbar.serializer_load_data({})

      // todos only loaded. Never saved
      this.$refs.todos.serializer_load_data(project.todos)

      // Loading viewing AFTER workflow
      this.$refs.ViewingInfo.setWorkflowInfo(project.workflow)

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
    projectchanged (source) {
      console.log('rentCalc page received project changed from ', source)
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
      this.$refs.ViewingInfo.setWorkflowInfo(this.$refs.Workflow.serializer_card_data)
    },
    click_save_btn () {
      this.$refs.BrrToolbar.click_save_btn()
    },
    activity_log (obj) {
      if (!this.isMounted) {
        console.log('ERROR - trying to log activity unmounted', obj)
        return
      }
      this.$refs.ActivityLog.log_activity(obj)
    }
  },
  mounted (){
    const TTT = this
    this.q.loading.show()
    if (typeof (TTT.$route.query.projectid) === 'undefined') {
      // No project ID so go to tools
      this.$router.push('/tools')
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
.rentcalc-page h1 {
  font-size: 3rem;
  line-height: 3rem;
  margin: 0px;
}
.rentcalc-page {
  margin: 10px;
  padding: 0px;
}

</style>
