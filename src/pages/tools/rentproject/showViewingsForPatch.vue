<template>
  <q-page class="flex flex-center">
    <div class="fit column wrap justify-start items-start content-center showviewingsforpatch-maindiv">
      <div class="showviewingsforpatch-headingdiv">
        <h2>{{ heading }}</h2>
        <q-btn label="Patch" @click="$router.push('/tools/cansave/patches/' +  $route.query.patchid + '?starttab=rent_projects')" />
      </div>
      <div v-if="!projects_fully_loaded">
        <div>Loading...</div>
      </div>
      <div v-if="projects_fully_loaded">
        <div v-if="days.length === 0" class="showviewingsforpatch-dayheading">
          No viewings for this patch
        </div>
        <div v-for="day in days" :key="day">
          <div class="showviewingsforpatch-dayheading">{{ display_string_for_day(day) }}</div>
          <div v-for="project in projects_by_day[day]" :key="project.id" class="showviewingsforpatch-project">
            <div class="row">
              <div class="showviewingsforpatch-projecttime">{{ project.calc.time_str }}</div>
              <div>: {{ project.raw.sub_section_details.leadinformation.address }}, {{ project.raw.sub_section_details.leadinformation.postcode }} </div>
              <div v-if="project.calc.is_need_to_prepare">&nbsp;(Need to prepare)</div>
              <div><q-btn round dense flat color="primary" icon="info" @click="$router.push('/tools/rentproject/rentcalc?projectid=' + project.raw.id)" /></div>
            </div>
            <div>
              <add-to-calendar-button
                :name="'Viewing: ' + project.raw.sub_section_details.leadinformation.address + ', ' + project.raw.sub_section_details.leadinformation.postcode"
                options="'Apple','Google','Yahoo','iCal'"
                :location="project.raw.sub_section_details.leadinformation.address + ', ' + project.raw.sub_section_details.leadinformation.postcode"
                :description="calendar_description(project.raw)"
                :startDate="project.calc.event_cal_start_date"
                :endDate="project.calc.event_cal_end_date"
                :startTime="project.calc.event_cal_start_time"
                :endTime="project.calc.event_cal_end_time"
                timeZone="Europe/London"
              ></add-to-calendar-button>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { DateTime } from 'luxon'
import 'add-to-calendar-button'
import utils from '../../../components/utils.js'

const rent_call_workflow_id = '2'
const rent_to_call_stage_id_viewing_arranged = '2'
const rent_to_call_stage_id_ready_to_view = '3'

export default defineComponent({
  name: 'ShowViewingsForPatchPage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store: backend_connection_store
    }
  },
  data () {
    return {
      projects_fully_loaded: false,
      patches_to_scan: [],
      project_ids_to_load: [],
      days: [],
      projects_by_day: {}
    }
  },
  computed: {
    heading () {
      const TTT = this
      if (this.$route.query.patchid === 'all') {
        return 'Viewings for Rental Leads For All patches'
      }
      if (typeof (this.user_profile.patches) === 'undefined') {
        return 'Viewings for Rental Leads'
      }
      const thispatchlist = this.user_profile.patches.filter(function (x) {
        return x.id ===TTT.$route.query.patchid
      })
      if (thispatchlist.length!==1) {
        return 'Viewings for Rental Leads'
      }
      return 'Viewings for Rental Leads For ' + thispatchlist[0].name
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    calendar_description (project) {
      return utils.rentalprojectcalendardescription({
        projectid: project.id,
        leadinformation: project.sub_section_details.leadinformation,
        call_notes: project.sub_section_details.viewinginformation.call_notes
      })
    },
    display_string_for_day (day) {
      const dt = DateTime.fromISO(day);
      return dt.toFormat('cccc d LLL yyyy');
    },
    load_project (project) {
      if (typeof (project.sub_section_details.viewinginformation) === 'undefined') {
        console.log('Warning - project with no viewing information - skipping')
        return
      }
      if (typeof (project.sub_section_details.viewinginformation.viewing_timestamp) === 'undefined') {
        console.log('Warning - project with no viewing_timestamp information - skipping')
        return
      }
      const day = project.sub_section_details.viewinginformation.viewing_timestamp.substring(0,10)
      if (!this.days.includes(day)) {
        this.days.push(day)
        this.days = this.days.sort()
        this.projects_by_day[day] = []
      }
      const time_obj = DateTime.fromISO(project.sub_section_details.viewinginformation.viewing_timestamp)
      const time_objPlusOneHour = time_obj.plus({ hours: 1 });
      this.projects_by_day[day].push({
        raw: project,
        calc: {
          viewing_timestamp_js_td: time_obj,
          time_str: time_obj.toFormat('h:mm a'),
          is_need_to_prepare: project.workflow.current_stage === rent_to_call_stage_id_viewing_arranged,
          event_cal_start_date: day,
          event_cal_end_date: day,
          event_cal_start_time: time_obj.toFormat('HH:mm'),
          event_cal_end_time: time_objPlusOneHour.toFormat('HH:mm')
        }
      })
      this.projects_by_day[day].sort(function (a,b) {
        if (a<b) {
          return -1
        }
        if (a===b) {
          return 0
        }
        return 1
      })
    },
    recursive_get_list_of_projects_to_load () {
      const TTT = this
      // scans the list of patches and returns project ids that need scanning
      if (this.patches_to_scan.length === 0) {
        TTT.recursive_load_projects()
        return
      }
      const id_of_patch_to_load = this.patches_to_scan.pop()

      const callback = {
        ok: function (response) {
          if (typeof (response.data.workflow_lookup[rent_call_workflow_id]) !== 'undefined') {
            if (typeof (response.data.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_viewing_arranged]) !== 'undefined') {
              response.data.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_viewing_arranged].map(function (x) {
                TTT.project_ids_to_load.push(x)
              })
            }
            if (typeof (response.data.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_ready_to_view]) !== 'undefined') {
              response.data.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_ready_to_view].map(function (x) {
                TTT.project_ids_to_load.push(x)
              })
            }
          }

          //project_ids_to_load
          TTT.recursive_get_list_of_projects_to_load()
        },
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Unable to load leads (patches) - please try again later',
            timeout: 2000
          })
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/patches/' + id_of_patch_to_load,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    },
    recursive_load_projects () {
      const TTT = this
      // Loads the projects and adds them to the leads variable
      if (this.project_ids_to_load.length === 0) {
        TTT.projects_fully_loaded = true
        return
      }
      const id_of_project_to_load = this.project_ids_to_load.pop()

      const callback = {
        ok: function (response) {
          TTT.load_project(response.data)
          TTT.recursive_load_projects()
        },
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Unable to load leads (project) - please try again later',
            timeout: 2000
          })
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects/' + id_of_project_to_load, // GET -> Loading
        method: 'GET',
        data: undefined,
        callback: callback
      })
    }
  },
  mounted () {
    const TTT = this
    TTT.projects_fully_loaded = false
    TTT.patches_to_scan = []
    TTT.project_ids_to_load = []
    TTT.days = []
    TTT.projects_by_day = {}

    // User profile is not always loaded immediately
    setTimeout(function () {
      if (TTT.$route.query.patchid === 'all') {
        TTT.patches_data = TTT.user_profile.patches.map(function (x) {
          TTT.patches_to_scan.push(x.id)
        })
      } else {
        TTT.patches_to_scan.push(TTT.$route.query.patchid)
      }
      TTT.recursive_get_list_of_projects_to_load()
    }, 300)
  }
})
</script>

<style>
.showviewingsforpatch-dayheading {
  font-size: 2rem;
  font-weight: 600;
}
.showviewingsforpatch-projecttime {
  font-weight: 600;
}
.showviewingsforpatch-project {
  padding-bottom: 20px;
}
.showviewingsforpatch-maindiv h2 {
  margin-bottom: 0px;
}
.showviewingsforpatch-headingdiv {
  margin-bottom: 20px;
}
</style>
