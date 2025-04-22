<template>
  <q-page class="flex flex-center">
    <div class="fit column wrap justify-start items-start content-center">
      <h2>Viewings for Rental Leads</h2>
      <p>List of all deals that need to be viewed</p>
      <div class="flex" v-if="total_number_of_viewings === 0">
        <div class="text-h6">
          You have no outstanding viewings.
          <q-btn  color="primary" label="Back to tools" @click="$router.push('/tools')" />
        </div>
      </div>
      <div class="flex" v-if="total_number_of_viewings > 0">
        <div v-for="display in display_array" :key='display.id'>
          <q-card inline class="q-ma-sm card-style" @click="$router.push('/tools/rentproject/showviewingsforpatch?patchid=' + display.id)">
            <q-card-section>
              <div class="text-h6">{{ display.title }}</div>
              <div class="row">
                <div class="col q-ma-sm" v-if="display.num !== 0">
                  <div>{{ display.num_arranged }} viewings arranged</div>
                  <div>{{ display.num_ready }} ready to view</div>
                  <div>
                    <q-btn  color="primary" icon="home" label="Show" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useBackendConnectionStore } from 'stores/backend_connection'

const rent_call_workflow_id = '2'
const rent_to_call_stage_id_viewing_arranged = '2'
const rent_to_call_stage_id_ready_to_view = '3'

function get_number_of_viewings(x) {
  var num_arranged = 0
  var num_ready = 0
  if (typeof (x.detail.workflow_lookup[rent_call_workflow_id]) !== 'undefined') {
    if (typeof (x.detail.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_viewing_arranged]) !== 'undefined') {
      num_arranged = x.detail.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_viewing_arranged].length
    }
    if (typeof (x.detail.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_ready_to_view]) !== 'undefined') {
      num_ready = x.detail.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id_ready_to_view].length
    }
  }
  return {
    num: num_arranged + num_ready,
    num_arranged: num_arranged,
    num_ready: num_ready

  }
}

export default defineComponent({
  name: 'ShowViewingsPage',
  setup () {
    const q = useQuasar()
    const backend_connection_store = useBackendConnectionStore()
    return {
      q: q,
      backend_connection_store: backend_connection_store
    }
  },
  data () {
    return {
      patches_data: []
    }
  },
  computed: {
    total_number_of_viewings () {
      return this.display_array.filter(function (x) {
        return x.id==='all'
      })[0].num
    },
    display_array () {
      var ret_val = []
      var total_viewings_make = 0
      var total_viewing_arranged = 0
      var total_ready_to_view = 0

      this.patches_data.map(function (x) {
        if (x.loaded && x.loadsuccess) {
          const num_calls = get_number_of_viewings(x)
          if (num_calls.num > 0) {
            total_viewings_make += num_calls.num
            total_viewing_arranged += num_calls.num_arranged
            total_ready_to_view += num_calls.num_ready
            ret_val.push({
              id: x.from_user_profile.id,
              title: x.from_user_profile.name,
              num: num_calls.num,
              num_arranged: num_calls.num_arranged,
              num_ready: num_calls.num_ready
            })
          }
        } else {
          // Assume one call to make for every patch to force it to be displayed until loaded
          ret_val.push({
            id: x.from_user_profile.id,
            title: x.from_user_profile.name,
            num: 1,
            num_arranged: 1,
            num_ready: 1
          })
        }
      })

      ret_val.unshift({
        id: 'all',
        title: 'All Patches',
        num: total_viewings_make,
        num_arranged: total_viewing_arranged,
        num_ready: total_ready_to_view
      })

      return ret_val
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    recursive_load_patch_details () {
      const items_to_load = this.patches_data.filter(function (x) {
        return x.loaded === false
      })
      if (items_to_load.length === 0) {
        return
      }
      const item_to_load = items_to_load[0]

      const TTT = this
      const callback = {
        ok: function (response) {
          item_to_load.loaded=true
          item_to_load.loadsuccess=true
          item_to_load.detail=response.data
          TTT.recursive_load_patch_details()
        },
        error: function (response) {
          item_to_load.loaded=true
          item_to_load.loadsuccess=false
          TTT.recursive_load_patch_details()
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/patches/' + item_to_load.from_user_profile.id,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    }
  },
  mounted () {
    this.patches_data = this.user_profile.patches.map(function (x) {
      return {
        from_user_profile: x,
        loaded: false,
        loadsuccess: true,
        detail: {}
      }
    })
    this.recursive_load_patch_details()
  }
})
</script>

<style>
</style>
