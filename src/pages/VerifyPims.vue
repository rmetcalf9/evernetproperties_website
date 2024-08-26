<template>
  <q-page class="flex flex-center">
    <div rows style="max-width: 700px;">
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
      <div class="ppb_ad">
        <h2>Introducing Early Access to the Property Pipeline Builder!</h2>

        <p>We're excited to announce the launch of Property Pipeline Builder—an innovative application designed to streamline and optimize the property evaluation process for deal sourcers. Whether you're evaluating a handful or dozens of properties, this tool is essential for organizing your pipeline and compiling due diligence information effortlessly.</p>

        <div class="flex flex-center">
        <q-video
          src="https://www.youtube.com/embed/sShijAIo18o?rel=0"
          class="ppb-embedded-vid-main-ad"
        />
        </div>


        <h3>Why Property Pipeline Builder?</h3>
        <p>If you're a property professional who evaluates multiple properties regularly, Property Pipeline Builder is tailored to help you manage your workflow more efficiently. Say goodbye to scattered spreadsheets and hello to a centralized, user-friendly platform.</p>

        <h3>Exclusive Early Access for Samuel Leeds Academy Members</h3>
        <p>We’re offering an exclusive early access opportunity to members of the Samuel Leeds Academy. Be among the first to experience the power of Property Pipeline Builder and take your property sourcing to the next level.</p>

        <div align="center">
          <q-btn
            color="positive"
            label="Visit the tools section to get started!"
            @click="click_get_started"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { useRoute } from 'vue-router'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'VerifyPimsPage',
  components: {
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
    click_get_started () {
      this.$router.push('/tools')
    },
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
      if (this.isAdmin && this.route.params.verifycode !== 'aaaaa') {
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
.ppb_ad h2 {
  margin-top: 0px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: normal;
  line-height: normal;
}
.ppb_ad h3 {
  margin-top: 0px;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: normal;
  line-height: normal;
}

.ppb-embedded-vid-main-ad {
  width: 325px;
  height: 200px;
  margin-bottom: 50px;
}
</style>
