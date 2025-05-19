<template>
  <q-page class="flex flex-center locationpage-main">
    <div class="cols">
      <h1>Area Research</h1>
      <table>
        <tr>
          <td>Status:</td>
          <td>{{ status_text }}</td>
          <td><q-btn round  color="primary" icon="refresh" @click="rescan" /></td>
        </tr>
        <tr v-if="status > 2">
          <td>Location:</td>
          <td>{{ cur_location.coords.latitude }}, {{ cur_location.coords.longitude }}</td>
          <td></td>
        </tr>
      </table>
      <div v-if="status > 3">
        <q-tabs
          v-model=cur_postcode
        >
          <q-tab v-for="postcode in postcodes" :key='postcode.postcode'
            :name="postcode.postcode"
            :label="postcode.postcode"
          />
        </q-tabs>
        <div>Links to external sites providing information about this area</div>
        <div class="locationpage-extlinkbuttonlist">
          <q-btn
            label="xxx"
            @click="temp(cur_postcode_data)"
          />
          <q-btn
            label="Rightmove Sold House Prices"
            @click="goto_url('https://www.rightmove.co.uk/house-prices/' + get_rightmovesold_postcode(cur_postcode_data) + '.html?radius=0.5')"
            color="primary"
          />
          <q-btn
            label="Openrent"
            @click="goto_url('https://www.openrent.co.uk/properties-to-rent/' + get_rightmovesold_postcode(cur_postcode_data) + '')"
            color="primary"
          />
          <q-btn
            label="AirBnb"
            @click="goto_url('https://www.airbnb.co.uk/s/' + get_rightmovesold_postcode(cur_postcode_data) + '/homes?refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&price_filter_input_type=2&channel=EXPLORE&search_type=search_query')"
            color="primary"
          />
          <q-btn
            label="EPCs"
            @click="goto_url('https://find-energy-certificate.service.gov.uk/find-a-certificate/search-by-postcode?postcode=' + get_epc_postcode(cur_postcode_data) + '')"
            color="primary"
          />
          <q-btn
            label="UK Gov planning data"
            @click="goto_url(get_ukgovplanningurl(cur_postcode_data))"
            color="primary"
          />
          <q-btn
            label="Streetcheck"
            @click="goto_url('https://www.streetcheck.co.uk/postcode/' + get_streetcheck_postcode(cur_postcode_data) + '')"
            color="primary"
          />
          <q-btn
            label="LHA Rates"
            @click="goto_url('https://lha-direct.voa.gov.uk/SearchResults.aspx?Postcode=' + get_lharate_postcode(cur_postcode_data) + '&LHACategory=999&Month=5&Year=2025&SearchPageParameters=true')"
            color="primary"
          />
          <q-btn
            label="Google Search"
            @click="goto_url('https://www.google.com/search?q=' + get_epc_postcode(cur_postcode_data) + '')"
            color="primary"
          />
          <q-btn
            label="Census"
            @click="goto_url('https://www.nomisweb.co.uk/reports/localarea?search=' + get_census_postcode(cur_postcode_data) + '')"
            color="primary"
          />
          <q-btn
            label="Crime"
            @click="goto_url('https://www.police.uk/pu/your-area/?q=' +  get_police_postcode(cur_postcode_data) + '')"
            color="primary"
          />
        </div>
        <div v-html="postcode_data_div"></div>
      </div>
    </div>
  </q-page>
</template>

//https://www.police.uk/pu/your-area/?q=SE62DU

//https://www.rightmove.co.uk/property-for-sale/map.html?keywords=&sortType=2&viewType=MAP&channel=BUY&index=0&radius=0.25&locationIdentifier=POSTCODE%5E1222222

<script>
import { defineComponent } from 'vue'
import locationFns from './locationFns.js'
import { Notify } from 'quasar'


export default defineComponent({
  name: 'ToolsLocationPage',
  components: {
  },
  data () {
    return {
      status: 0, // See status_text
      error_message: '',
      cur_location: {},
      postcodes: [],
      cur_postcode: ''
    }
  },
  computed: {
    postcode_data_div () {
      var retVal = '<table>'
      const TTT = this

      function add_row(title, field) {
        if (typeof (TTT.cur_postcode_data[field]) !== 'undefined') {
          retVal += '<tr><td>' + title + '</td><td>' + TTT.cur_postcode_data[field] + '</td></tr>'
        }
      }
      add_row('Postcode', 'postcode')
      add_row('nhs_ha', 'nhs_ha')

      add_row('european_electoral_region', 'european_electoral_region')
      add_row('primary_care_trust', 'primary_care_trust')
      add_row('region', 'region')
      add_row('parliamentary_constituency', 'parliamentary_constituency')
      add_row('parliamentary_constituency_2024', 'parliamentary_constituency_2024')
      add_row('admin_district', 'admin_district')
      add_row('parish', 'parish')
      add_row('admin_ward', 'admin_ward')
      add_row('ccg', 'ccg')
      add_row('nuts', 'nuts')
      add_row('pfa', 'pfa')

      retVal += '</table>'
      return retVal
    },
    cur_postcode_data () {
      const TTT = this
      return this.postcodes.filter(function (x) {
        return x.postcode === TTT.cur_postcode
      })[0]
    },
    status_text () {
      if (this.status===0) {
        return 'Initial'
      }
      if (this.status===1) {
        return 'Finding Location...'
      }
      if (this.status===2) {
        return 'Failed to find location - ' + this.error_message
      }
      if (this.status===3) {
        return 'Location Found - finding postcode...'
      }
      if (this.status===4) {
        return 'Postcode Found'
      }
      return 'Unknown'
    }
  },
  methods: {
    get_police_postcode (postcodedata) {
      return postcodedata.outcode.toUpperCase() + postcodedata.incode.toUpperCase()
    },
    get_census_postcode (postcodedata) {
      return postcodedata.outcode.toLowerCase() + '%20' + postcodedata.incode.toLowerCase()
    },
    get_lharate_postcode (postcodedata) {
      return postcodedata.outcode.toUpperCase() + '%2b' + postcodedata.incode.toUpperCase()
    },
    get_streetcheck_postcode (postcodedata) {
      return postcodedata.outcode.toLowerCase() + postcodedata.incode.toLowerCase()
    },
    get_ukgovplanningurl (postcodedata) {
      return 'https://www.planning.data.gov.uk/map/#' + postcodedata.latitude + ',' + postcodedata.longitude + ',14.800276418264161z'
    },
    temp (postcodedata) {
      const callback = {}
      console.log(postcodedata)
      // locationFns.getRightmoveLocationCode(callback, postcodedata.outcode, postcodedata.incode)

    },
    get_rightmovesold_postcode (postcode) {
      return postcode.outcode.toLowerCase() + '-' + postcode.incode.toLowerCase()
    },
    get_epc_postcode (postcode) {
      return postcode.postcode.replace(' ', '+').toLowerCase()
    },
    goto_url (url) {
      window.location.href=url
    },
    rescan () {
      this.status = 1
      this.cur_location = {}
      this.postcodes = []
      this.cur_postcode = ''
      var bestAttemptSoFar = {
        coords: {
          accuracy: 99999
        }
      }
      var callback = {
        ok: this.rescan_positive,
        error: this.rescan_negative
      }
      // locationFns.getLocation({
      //   attemptsRemaining: 4,
      //   bestAttemptSoFar: bestAttemptSoFar,
      //   callback: callback,
      //   allowLowAccuracy: false
      // })
      // "https://api.postcodes.io/postcodes?longitude=51.4430773&latitude=-0.0138776"
      // 'https://api.postcodes.io/postcodes?longitude=-0.0138776&latitude=51.4430773',

      callback.ok({
        coords: {
          latitude: -0.0138776,
          longitude: 51.4430773
        }
      })
    },
    rescan_positive (response) {
      this.status = 3
      this.cur_location = response
      var callback = {
        ok: this.findpostcode_positive,
        error: this.findpostcode_negative
      }
      locationFns.getPostcode(callback, this.cur_location.coords.latitude, this.cur_location.coords.longitude)
    },
    rescan_negative (response) {
      this.status = 2
      this.error_message = response.message
      console.log('rescan_negative', response)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Failed to access location services',
        timeout: 2000,
        color: 'negative'
      })
    },
    findpostcode_positive (response) {
      this.status = 4
      this.postcodes = response.data.result
      if (this.postcodes.length > 0) {
        this.cur_postcode = this.postcodes[0].postcode
      }
    },
    findpostcode_negative (response) {
      this.status = 2
      this.error_message = 'Failed to find postcode'
      console.log('findpostcode_negative', response)
      Notify.create({
        color: 'bg-grey-2',
        message: 'Failed to find postcode',
        timeout: 2000,
        color: 'negative'
      })
    }
  },
  mounted () {
    this.rescan()
  }
})
</script>

<style>
.locationpage-main h1 {
  margin-top: 0px;
  margin-bottom: 10px;
}
.locationpage-extlinkbuttonlist {
  margin-top: 10px;
  margin-bottom: 10px;
}
.locationpage-extlinkbuttonlist button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
