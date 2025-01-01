<template>
<q-page class="flex flex-center">
    <div class="fit column wrap justify-start items-start content-center">
      <h2>Call Rent to Rent Leads</h2>
      <p>List of all leads that need to be called</p>
      <div class="flex" v-if="total_number_of_calls === 0">
        <div class="text-h6">
          You have no outstanding leads to call.
          <q-btn  color="primary" label="Enter more leads here" @click="$router.push('/tools/rentproject/enterlead')" />
        </div>
      </div>
      <div class="flex" v-if="total_number_of_calls > 0">
        <div v-for="display in display_array" :key='display.id'>
          <q-card inline class="q-ma-sm card-style" @click="$router.push('/tools/rentproject/batchcallleads?patchid=' + display.id)">
            <q-card-section>
              <div class="text-h6">{{ display.title }}</div>
              <div class="row">
                <div class="col q-ma-sm" v-if="display.num !== 0">
                  <div>{{ display.num }} calls to make</div>
                  <div align="right">
                    <q-btn  color="primary" icon="call" label="make calls" />
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

import common_constants from '../../../components/common_constants.js'

import { Notify } from 'quasar'

// If we are changing this it's also in batchcallleads as well
const rent_call_workflow_id = '2'
const rent_to_call_stage_id = '1'

function get_number_of_calls_to_make(x) {
  if (typeof (x.detail.workflow_lookup[rent_call_workflow_id]) === 'undefined') {
    return 0
  }
  if (typeof (x.detail.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id]) === 'undefined') {
    return 0
  }
  return x.detail.workflow_lookup[rent_call_workflow_id][rent_to_call_stage_id].length
}

export default defineComponent({
  name: 'RentProjectCallLeads',
  components: {
  },
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
    total_number_of_calls () {
      return this.display_array.filter(function (x) {
        return x.id==='all'
      })[0].num
    },
    display_array () {
      var ret_val = []
      var total_calls_to_make = 0
      this.patches_data.map(function (x) {
        if (x.loaded && x.loadsuccess) {
          const num_calls = get_number_of_calls_to_make(x)
          if (num_calls > 0) {
            total_calls_to_make += num_calls
            ret_val.push({
              id: x.from_user_profile.id,
              title: x.from_user_profile.name,
              num: num_calls
            })
          }
        } else {
          // Assume one call to make for every patch to force it to be displayed until loaded
          ret_val.push({
            id: x.from_user_profile.id,
            title: x.from_user_profile.name,
            num: 1
          })
        }
      })

      ret_val.unshift({
        id: 'all',
        title: 'All Patches',
        num: total_calls_to_make
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
