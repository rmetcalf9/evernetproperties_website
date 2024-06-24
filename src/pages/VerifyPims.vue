<template>
  <q-page class="flex flex-center">
    <div rows>
      <div class="verify_block" v-if="show_verify_block">
        <h1>Verify PIMS member</h1>
        <div>Name: {{ info_response.user_profile.pims.first_name }} {{ info_response.user_profile.pims.last_name }}</div>
        <div>PIMS Number: {{ info_response.user_profile.pims.number }}</div>
        <div>Does this match? (search <a href="https://www.thepims.co.uk/members/" target="_new">https://www.thepims.co.uk/members/</a>)</div>
        <div class="buttons-at-bottom" v-if='!complete'>
          <q-btn color="positive" label="Yes - this checks out" @click="verify(true)" />
          &nbsp;
          <q-btn color="negative" label="No - Verify FAILS" @click="verify(false)" />
        </div>
        <div v-if='complete'>
          <h4>Done {{ complete_message }}</h4>
        </div>
      </div>
      <div>
        <div>Extra features available to Samuel Leeds academy members</div>
        <p>This site contains free tools for calculating ROI and evaluating property investments:</p>
        <ul>
        <div><q-icon name="check_box" color="green" size="32px" />Buy Refurbish Refinance</div>
        <div><q-icon name="check_box" color="green" size="32px" />Flip</div>
        <div><q-icon name="check_box" color="green" size="32px" />Deal ratings</div>
        </ul>
        <p>Extra features for PIMS/Samueel Leeds academy members:</p>
        <ul>
        <div><q-icon name="check_box" color="green" size="32px" />Ability to save and compare multiple deals</div>
        <div><q-icon name="check_box" color="green" size="32px" />Due diligence rating</div>
        </ul>
        <div class="inlink" @click="$router.push('/tools')" >Access tools here.
        </div>
        <LoginButton />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useRoute } from 'vue-router'
import { Notify } from 'quasar'

import LoginButton from '../components/LoginButton.vue'

export default defineComponent({
  name: 'VerifyPimsPage',
  components: {
    LoginButton
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const route = useRoute()
    return {
      backend_connection_store,
      route
    }
  },
  data () {
    return {
      show_verify_block: false,
      info_response: {},
      complete: false,
      complete_message: ''
    }
  },
  computed: {
    isAdmin () {
      return this.backend_connection_store.hasRole({role: 'admin'})
    }
  },
  watch: {
    isAdmin: function (val) {
      this.refresh()
    }
  },
  methods: {
    verify (positive) {
      const TTT = this
      const callback = {
        ok: function (response) {
          TTT.complete = true
          TTT.complete_message = 'OK'
        },
        error: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Failed to record result',
            timeout: 2000
          })
        }
      }
      const data = {
        verify_code: this.route.params.verifycode,
        pims_number: this.info_response.user_profile.pims.number,
        verified: positive
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateAdminAPIPrefix',
        url: '/pimsverify',
        method: 'POST',
        data: data,
        callback: callback
      })
    },
    refresh () {
      if (this.isAdmin) {
        const TTT = this
        const callback = {
          ok: function (response) {
            TTT.show_verify_block = true
            TTT.info_response = response.data
          },
          error: function (response) {
            Notify.create({
              color: 'bg-grey-2',
              message: 'Failed to retrieve details',
              timeout: 2000
            })
          }
        }
        this.backend_connection_store.call_api({
          apiprefix: 'privateAdminAPIPrefix',
          url: '/pimsverify/' + this.route.params.verifycode + '/' + this.route.params.pimsnumber,
          method: 'GET',
          data: undefined,
          callback: callback
        })
      }
    }
  },
  mounted () {
    this.refresh()
  }
})
</script>

<style>
.verify_block {
  border: 2px;
  border-color: black;
  border-style: solid;
  margin: 10px;
  padding: 5px;
}
.buttons-at-bottom {
  padding: 5px;
}
h4 {
  margin: 0px;
}
.inlink {
  color: blue;
}
</style>
