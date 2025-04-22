<template>
  <q-page class="flex flex-center">
    <div class="fit column wrap justify-start items-start content-center">
      <h2>Viewings for Rental Leads For Patch XXX</h2>
      <div v-if="!projects_fully_loaded">
        <div>patches_to_scan: {{ patches_to_scan }}</div>
        <div>project_ids_to_load: {{ project_ids_to_load }}</div>
        <div>projects: {{ projects }}</div>
        <div>Loading...</div>
      </div>
      <div v-if="projects_fully_loaded">
        <div>projects: {{ projects }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'

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
      projects: []
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
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
          TTT.projects.push(response.data)
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
    TTT.projects_fully_loaded = false
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
</style>
