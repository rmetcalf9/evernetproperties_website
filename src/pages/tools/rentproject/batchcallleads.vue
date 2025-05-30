<template>
  <q-page class="flex flex-center">
    <div
      v-if="!callassistactive"
      class="fit column wrap justify-start items-start content-center">
      <h2>{{ heading }}</h2>
      <div class="text-h4">Aim:</div>
      <div>The aim of the phone call is to secure a views on potential properties.</div>
      <div>We also want to introduce the idea of a company let and make sure the landlord does not get a surprise when we make the viewing.</div>

      <div class="text-h4">Story Prompt:</div>
      <div>Enter a prompt that you will use to  explain who you are and why you are looking for rent to rent properties to landlords.</div>
      <div class="batchcallleads-storydiv">
        <q-input filled clearable v-model="story_prompt" label="Story Prompt" autogrow />
      </div>

      <div class="text-h4">Free days and time slots</div>
      <div>What days are you free for viewings? (This is used for suggestion prompts)</div>
      <div>Random suggestions will be made between 9am and 6pm on the days selected. You can block off times as required.</div>
      <div v-for="day in viewing_days" :key="day.id" class="batchcallleads-daycheckbox">
        <div class="row">
          <q-checkbox dense v-model="day.selected" :label="day.text"/>
          <div v-if="day.selected" class="batchcallleads-blockouttimebutton">
            <q-btn color="primary" size="xs" label="Exclude Time" @click="addreservedslot(day)"  />
          </div>
        </div>
        <div v-if="day.selected">
          <div v-for="blocked_slot in day.reserved_slots" :key="blocked_slot.id">
            Not {{ blocked_slot.start }}-{{ blocked_slot.end }} {{ blocked_slot.text }}<q-btn round color="primary"  size="xs" icon="delete" @click="delreservedslot(day, blocked_slot.id)" />
          </div>
        </div>
      </div>
      &nbsp;
      <div v-if="!leads_fully_loaded" class="text-h6">
        Please wait - loading lead information...
      </div>
      <div v-if="leads_fully_loaded">
        <div v-if="leads.length===0">
          <div class="text-h4">There are currently no leads to call</div>
          <div v-if="$route.query.patchid === 'all'">
            <q-btn color="primary" label="Add Lead" @click="$router.push('/tools/rentproject/enterlead')" />
            <q-btn color="primary" label="Tools" @click="$router.push('/tools')" />
          </div>
          <div v-if="$route.query.patchid !== 'all'" class="batchcallleads-buttongroup">
            <q-btn color="primary" label="Add Lead" @click="$router.push('/tools/rentproject/enterlead?defaultpatch=' + $route.query.patchid)" />
            <q-btn color="primary" label="Patch Info" @click="$router.push('/tools/cansave/patches/' + $route.query.patchid + '?starttab=rent_projects')" />
            <q-btn color="primary" label="Tools" @click="$router.push('/tools')" />
          </div>
        </div>
        <div v-if="leads.length!==0">
          <div class="text-h4">You have {{ leads.length }} leads to call</div>
          &nbsp;
          <q-btn label="Ready to start making calls..." @click="click_readytogo" color="secondary" />
        </div>
      </div>
      <BatchCallLeadsAddBlockDialog
        ref="BatchCallLeadsAddBlockDialog"
      />
    </div>
    <div
      v-if="callassistactive"
      class="fit column wrap justify-start items-start content-center batchcallleads-storydiv">
      <CallAssist
        ref="CallAssist"
        @outcome="outcome"
        @fully_complete="fully_complete"
      />
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import utils from '../../../components/utils.js'
import atomicProjectUpdates from '../../../atomicProjectUpdates.js'
import { Notify } from 'quasar'

import CallAssist from '../../../components/CallAssist/CallAssist.vue'

//TODO REMOVE THIS
import appointment_utils from '../../../components/CallAssist/appointment_utils.js'

import RentToRentLeadTemplate from '../../../components/CallAssistCalls/RentToRentLead.js'

import BatchCallLeadsAddBlockDialog from '../../../components/BatchCallLeadsAddBlockDialog.vue'

import { DateTime } from 'luxon'

// If we are changing this it's also in callleads as well
const rent_call_workflow_id = '2'
const rent_to_call_stage_id = '1'
const rent_rejected_stage_id = '1.1'
const rent_viewing_arranged_stage_id = '2'


export default defineComponent({
  name: 'BatchCallLeads',
  components: {
    BatchCallLeadsAddBlockDialog,
    CallAssist
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store: backend_connection_store
    }
  },
  data () {
    return {
      callassistactive: false,
      story_prompt: '',
      viewing_days: [],
      leads_fully_loaded: false,
      patches_to_scan: [],
      project_ids_to_load: [],
      leads: []
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    },
    heading () {
      const TTT = this
      if (this.$route.query.patchid === 'all') {
        return 'Call All Leads'
      }
      if (typeof (this.user_profile.patches) === 'undefined') {
        return 'Call Leads'
      }
      const thispatchlist = this.user_profile.patches.filter(function (x) {
        return x.id ===TTT.$route.query.patchid
      })
      if (thispatchlist.length!==1) {
        return 'Call Leads'
      }
      return 'Call Leads for ' + thispatchlist[0].name
    }
  },
  methods: {
    outcome (outcome_data) {
      const notes_in_activity_format = outcome_data.call_data.notes.replaceAll('\n','<BR>')
      const TTT = this
      if (outcome_data.outcome_id==='reject_lead') {
        // Rejected before calling
        atomicProjectUpdates.startChange({
          backend_connection_store: TTT.backend_connection_store,
          projectId: outcome_data.current_lead.id
        }).then(
          function ({active_change_object}) {
            active_change_object.change_workflow_state({
              workflow_id: rent_call_workflow_id,
              workflow_stage: rent_rejected_stage_id,
              notes: notes_in_activity_format
            })
            active_change_object.complete()
          },
          function (response) {
            console.log('ERROR', response)
          }
        )
        return
      }
      if (outcome_data.outcome_id==='notavailaible') {
        // Phone call made but not property available
        atomicProjectUpdates.startChange({
          backend_connection_store: TTT.backend_connection_store,
          projectId: outcome_data.current_lead.id
        }).then(
          function ({active_change_object}) {
            active_change_object.change_workflow_state({
              workflow_id: rent_call_workflow_id,
              workflow_stage: rent_rejected_stage_id,
              notes: 'Property not available ' + notes_in_activity_format
            })
            active_change_object.complete()
          },
          function (response) {
            console.log('ERROR', response)
          }
        )
        return
      }
      if (outcome_data.outcome_id==='complete') {
        // This will give something like 2025-04-20
        const viewing_day_ts = outcome_data.call_data.item_data_vals.appointment.selection_day.day.js_day_obj.substring(0,10)
        const viewing_time_ts = outcome_data.call_data.item_data_vals.appointment.selection_time
        const dt = DateTime.fromISO(viewing_day_ts + 'T' + viewing_time_ts, { zone: 'Europe/London' })
        const full_viewing_timestamp = dt.toISO({ includeOffset: true, suppressMilliseconds: false })
        const current_timestamp = DateTime.now().toISO()

        atomicProjectUpdates.startChange({
          backend_connection_store: TTT.backend_connection_store,
          projectId: outcome_data.current_lead.id
        }).then(
          function ({active_change_object}) {
            active_change_object.change_workflow_state({
              workflow_id: rent_call_workflow_id,
              workflow_stage: rent_viewing_arranged_stage_id,
              notes: 'Viewing booked for ' + outcome_data.call_data.item_data_vals.appointment.selection_day.name + ' at ' + outcome_data.call_data.item_data_vals.appointment.selection_time + '<BR>' + notes_in_activity_format
            })
            active_change_object.change_address({
              address: outcome_data.call_data.item_data_vals.address.value,
              postcode: outcome_data.call_data.item_data_vals.postcode.value
            })
            active_change_object.change_viewing_information({
              viewing_timestamp: full_viewing_timestamp,
              call_timestamp: current_timestamp,
              call_notes: outcome_data.call_data.notes,
            })
            active_change_object.complete()
          },
          function (response) {
            console.log('ERROR', response)
          }
        )
        return
      }
    },
    fully_complete () {
      Notify.create({
        color: 'positive',
        message: 'Batch Complete',
        timeout: 2000
      })
      if (this.$route.query.patchid !== 'all') {
        this.$router.push('/tools/cansave/patches/' + this.$route.query.patchid + '?starttab=rent_projects')
      } else {
        this.$router.push('/tools')
      }
    },
    addreservedslot (day) {
      this.$refs.BatchCallLeadsAddBlockDialog.show_dialog(this.viewing_days, day.id)
    },
    delreservedslot(day, id) {
      day.reserved_slots = day.reserved_slots.filter(function (x) {
        return x.id !== id
      })
    },
    click_readytogo () {
      window.scrollTo(0,0)

      this.callassistactive = true
      const TTT = this
      setTimeout(function () {
        var use_story_prompt = TTT.story_prompt
        if (use_story_prompt === '') {
          use_story_prompt = 'No story prompt provided'
        }
        let selected_viewing_days = []
        Object.keys(TTT.viewing_days).map(function (x) {
          if (TTT.viewing_days[x].selected) {
            selected_viewing_days.push(TTT.viewing_days[x])
          }
        })
        TTT.$refs.CallAssist.prepare(RentToRentLeadTemplate,
          TTT.leads.map(function (x) {
            return {
              id: x.id,
              name: x.project_name,
              raw: x
            }
          }),
          {
            story_prompt: use_story_prompt,
            viewing_days: {
              items: selected_viewing_days
            }
          }
        )
      }, 10)

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
            if (typeof (response.data.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id]) !== 'undefined') {
              response.data.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id].map(function (x) {
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
        TTT.leads_fully_loaded = true
        return
      }
      const id_of_project_to_load = this.project_ids_to_load.pop()

      const callback = {
        ok: function (response) {
          TTT.leads.push(response.data)
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
        url: '/projects/' + id_of_project_to_load,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    }
  },
  mounted () {
    const TTT = this
    this.viewing_days = []
    const start_date = new Date();
    start_date.setHours(2,0,0,0) // STart at 2am because otherwise on daylight savings I get wrong day
    for (let i = 1; i < 8; i++) {
      var this_date = new Date(start_date)
      this_date.setDate(this_date.getDate() + i);
      this.viewing_days.push({
        id: i.toString(),
        text: utils.format_date_as_string_without_year(this_date),
        js_day_obj: this_date,
        selected: true,
        reserved_slots: []
      })
    }
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
.batchcallleads-storydiv {
  width: 100%;
  max-width: 800px;
  padding: 10px;
}
.batchcallleads-daycheckbox {
  padding: 0px;
  margin: 0px;
  border: 0px;
}
.batchcallleads-daycheckbox > .q-checkbox {
  padding: 0px;
  margin: 0px;
  border: 0px;
}
.batchcallleads-blockouttimebutton {
  margin-left: 10px;
}
.batchcallleads-buttongroup > button {
  margin: 5px;
}
</style>
