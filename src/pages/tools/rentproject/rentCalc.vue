<template>
<q-page class="flex ">
  <div class="rentcalc-page fit col wrap justify-center items-center content-center">
    <div>
      <h1>Rent Project</h1>
    </div>
    <div>TODO Toolbar</div>
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
import { Notify } from 'quasar'

import { useBackendConnectionStore } from 'stores/backend_connection'

import LeadInformation from '../../../components/ProjectTypeRentComponents/LeadInformation.vue'

import ActivityLog from '../../../components/CommonCalcComponents/ActivityLog.vue'
import Todos from '../../../components/CommonCalcComponents/Todos.vue'
import Workflow from '../../../components/CommonCalcComponents/Workflow.vue'

import ProjectSerializer from '../../../components/BrrCalc/ProjectSerializer.vue'
import common_constants from '../../../components/common_constants.js'


export default defineComponent({
  name: 'CalcBrrToFlip',
  components: {
    LeadInformation,
    ActivityLog,
    Workflow,
    Todos,
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
      tab: 'main',
      isMounted: false,
      loaded_project_id: ''
    }
  },
  computed: {
    project_type () {
      return common_constants.project_type_constants.project_type_rent
    }
  },
  methods: {
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
      TTT.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects/' + TTT.$route.query.projectid,
        method: 'GET',
        data: undefined,
        callback: callback
      })
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


      this.$refs.ActivityLog.serializer_load_data(project.activity_log)
      this.$refs.Workflow.serializer_load_data(project.workflow)
      // this.$refs.BrrToolbar.serializer_load_data({})

      // todos only loaded. Never saved
      this.$refs.todos.serializer_load_data(project.todos)
    },
    save_project_complete ({success, response, passthroughdata}) {
    },
    projectchanged (source) {
      console.log('rentCalc page received project changed from ', source)
      if (!this.isMounted) {
        console.log('WARNING = projectchanged called when mounted is false')
        return
      }
      // TODO reactavate when I put in toolbar
      // if (typeof (this.$refs.BrrToolbar) === 'undefined') {
      //   console.log('WARNING = projectchanged called when BrrToolbar is undefined')
      //   return false
      // }
      // this.$refs.BrrToolbar.set_changed_true()
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
