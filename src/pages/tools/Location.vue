<template>
  <q-page class="flex flex-center locationpage-main">
    <div class="cols locationpage-main-div">
      <h1>Area Research</h1>
      <div class="locationpage-devnotice" v-if="useDevLocation">DEBUG DEV LOCATION</div>
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
      <div v-if="status > 4">
        <div class="locationpage-postcodeselector">
          <q-select
            v-model="cur_postcode"
            :options="button_toggle_options" :label="button_toggle_options.length.toString() + ' postcodes found'" emit-value
          />
        </div>
        <div>Links to external sites providing information about this area</div>
        <div class="locationpage-extlinkbuttonlist row">
          <div class="locationpage-extlinkbuttonlist-rightmove column wrap justify-center items-center content-center">
            <h1>Rightmove</h1>
            <div><q-btn
              v-if="is_rightmoveid_loaded(cur_postcode_data)"
              label="Sale"
              @click="goto_url(get_rightmove_url(cur_postcode_data, 'BUY'))"
              color="primary"
            /></div>
            <div><q-btn
              v-if="is_rightmoveid_loaded(cur_postcode_data)"
              label="Rent"
              @click="goto_url(get_rightmove_url(cur_postcode_data, 'RENT'))"
              color="primary"
            /></div>
            <div><q-btn
              v-if="is_rightmoveid_loaded(cur_postcode_data)"
              label="Student Rent"
              @click="goto_url(get_rightmove_url(cur_postcode_data, 'STUDENTS_RENT'))"
              color="primary"
            /></div>
            <div><q-btn
              label="Sold House Prices"
              @click="goto_url('https://www.rightmove.co.uk/house-prices/' + get_rightmovesold_postcode(cur_postcode_data) + '.html?radius=0.5')"
              color="primary"
            /></div>
            <div><q-btn
              v-if="is_rightmoveid_loaded(cur_postcode_data)"
              label="Commercial Sale"
              @click="goto_url(get_rightmove_url(cur_postcode_data, 'COMMERCIAL_BUY'))"
              color="primary"
            /></div>
            <div><q-btn
              v-if="is_rightmoveid_loaded(cur_postcode_data)"
              label="Commercial Rent"
              @click="goto_url(get_rightmove_url(cur_postcode_data, 'COMMERCIAL_RENT'))"
              color="primary"
            /></div>
          </div>
          <div><q-btn
            label="Spareroom"
            @click="goto_url('https://www.spareroom.co.uk/flatshare/?search_id=&location=' + get_police_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
          <div><q-btn
            label="Openrent"
            @click="goto_url('https://www.openrent.co.uk/properties-to-rent/' + get_rightmovesold_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
          <div><q-btn
            label="AirBnb"
            @click="goto_url('https://www.airbnb.co.uk/s/' + get_rightmovesold_postcode(cur_postcode_data) + '/homes?refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&price_filter_input_type=2&channel=EXPLORE&search_type=search_query')"
            color="primary"
          /></div>
          <div><q-btn
            label="EPCs"
            @click="goto_url('https://find-energy-certificate.service.gov.uk/find-a-certificate/search-by-postcode?postcode=' + get_epc_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
          <div><q-btn
            label="UK Gov planning data"
            @click="goto_url(get_ukgovplanningurl(cur_postcode_data))"
            color="primary"
          /></div>
          <div><q-btn
            label="Streetcheck"
            @click="goto_url('https://www.streetcheck.co.uk/postcode/' + get_streetcheck_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
          <div><q-btn
            label="LHA Rates"
            @click="goto_url('https://lha-direct.voa.gov.uk/SearchResults.aspx?Postcode=' + get_lharate_postcode(cur_postcode_data) + '&LHACategory=999&Month=5&Year=2025&SearchPageParameters=true')"
            color="primary"
          /></div>
          <div><q-btn
            label="Google Search"
            @click="goto_url('https://www.google.com/search?q=' + get_epc_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
          <div><q-btn
            label="Census"
            @click="goto_url('https://www.nomisweb.co.uk/reports/localarea?search=' + get_census_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
          <div><q-btn
            label="Crime"
            @click="goto_url('https://www.police.uk/pu/your-area/?q=' +  get_police_postcode(cur_postcode_data) + '')"
            color="primary"
          /></div>
        </div>
        <div v-html="postcode_data_div"></div>
      </div>
    </div>
  </q-page>
</template>

//

<script>
import { defineComponent } from 'vue'
import locationFns from './locationFns.js'
import { Notify } from 'quasar'


const useDevLocation = false

const STATUS_FAILEDTOFINDLOCATION= 2   //Value appears in template
const STATUS_FINDINGPOSTCODE= 3
const STATUS_FAILEDTOFINDPOSTCODE= 4  //Value appears in template
const STATUS_POSTCODEFOUND = 5

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
      cur_postcode: '',
      rmlocationcodes: {}
    }
  },
  computed: {
    useDevLocation () {
      return useDevLocation
    },
    postcode_data_div () {
      var retVal = '<table>'
      const TTT = this

      function add_row(title, field) {
        if (typeof (TTT.cur_postcode_data[field]) !== 'undefined') {
          retVal += '<tr><td class="postcode_data_title_field">' + title + '</td><td>' + TTT.cur_postcode_data[field] + '</td></tr>'
        }
      }
      add_row('Postcode', 'postcode')
      add_row('nhs ha', 'nhs_ha')

      add_row('European Electoral Region', 'european_electoral_region')
      add_row('Primary Care Trust', 'primary_care_trust')
      add_row('Region', 'region')
      add_row('Parliamentary Constituency', 'parliamentary_constituency')
      add_row('Parliamentary Constituency (2024)', 'parliamentary_constituency_2024')
      add_row('Admin District', 'admin_district')
      add_row('Parish', 'parish')
      add_row('Admin Ward', 'admin_ward')
      add_row('ccg', 'ccg')
      add_row('nuts', 'nuts')
      add_row('pfa', 'pfa')

      retVal += '</table>'
      return retVal
    },
    cur_postcode_data () {
      const TTT = this
      if (this.postcodes === null) {
        return {
          postcode: 'AAA AAA',
          outcode: 'AAA',
          incode: 'AAA'
        }
      }
      return this.postcodes.filter(function (x) {
        return x.postcode === TTT.cur_postcode
      })[0]
    },
    button_toggle_options () {
      if (this.postcodes === null) {
        return []
      }
      return this.postcodes.map(function (x) {
        return {
          label: x.postcode,
          value: x.postcode
        }
      })
    },
    status_text () {
      if (this.status===0) {
        return 'Initial'
      }
      if (this.status===1) {
        return 'Finding Location...'
      }
      if (this.status===STATUS_FAILEDTOFINDLOCATION) {
        return 'Failed to find location - ' + this.error_message
      }
      if (this.status===STATUS_FINDINGPOSTCODE) {
        return 'Location Found - finding postcode...'
      }
      if (this.status===STATUS_FAILEDTOFINDPOSTCODE) {
        return 'Failed to find postcode - ' + this.error_message
      }
      if (this.status===STATUS_POSTCODEFOUND) {
        return 'Postcode Found'
      }
      return 'Unknown'
    }
  },
  methods: {
    is_rightmoveid_loaded (postcodedata) {
      return Object.prototype.hasOwnProperty.call(this.rmlocationcodes, postcodedata.postcode)
    },
    get_rightmove_url (postcodedata, channel) {
      var startpart = 'property-for-sale'
      var radius = '0.25'
      if (channel==='RENT') {
        startpart = 'property-to-rent'
      }
      if (channel==='STUDENTS_RENT') {
        startpart = 'student-accommodation'
      }
      if (channel==='COMMERCIAL_RENT') {
        startpart = 'commercial-property-to-let'
        radius = '0.5'
      }
      if (channel==='COMMERCIAL_BUY') {
        startpart = 'commercial-property-for-sale'
        radius = '0.5'
      }
      return 'https://www.rightmove.co.uk/' + startpart + '/map.html?keywords=&sortType=2&viewType=MAP&channel=' + channel  + '&index=0&radius=' + radius + '&locationIdentifier=POSTCODE%5E' + this.rmlocationcodes[postcodedata.postcode] + ''
    },
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
      if (useDevLocation) {
        callback.ok({
          coords: {
            latitude: 52.5645684, // 51.4430773,
            longitude: -0.2632206 // -0.0138776
          }
        })
      } else {
        locationFns.getLocation({
          attemptsRemaining: 4,
          bestAttemptSoFar: bestAttemptSoFar,
          callback: callback,
          allowLowAccuracy: false
        })
        // "https://api.postcodes.io/postcodes?longitude=51.4430773&latitude=-0.0138776"
        // 'https://api.postcodes.io/postcodes?longitude=-0.0138776&latitude=51.4430773',
      }
    },
    rescan_positive (response) {
      this.status = STATUS_FINDINGPOSTCODE
      this.cur_location = response
      var callback = {
        ok: this.findpostcode_positive,
        error: this.findpostcode_negative
      }
      locationFns.getPostcode(callback, this.cur_location.coords.longitude, this.cur_location.coords.latitude)
    },
    rescan_negative (response) {
      this.status = STATUS_FAILEDTOFINDLOCATION
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
      console.log('findpostcode_positive', response)
      const TTT = this
      this.status = STATUS_POSTCODEFOUND
      if (response.data.result === null) {
        this.status = STATUS_FAILEDTOFINDPOSTCODE
        this.error_message = 'Failed to find postcode - No postcodes found for this location'
        return
      }
      this.postcodes = response.data.result
      if (this.postcodes.length > 0) {
        this.cur_postcode = this.postcodes[0].postcode
      }
      var postcodes_to_lookup_in_rightmove = []
      Object.keys(this.postcodes).forEach(function (x) {
        const curpostcode = TTT.postcodes[x]
        if (!TTT.rmlocationcodes.hasOwnProperty(curpostcode.postcode)) {
          postcodes_to_lookup_in_rightmove.push(curpostcode)
        }
      })
      function lookup_all_rightmove_postcodes () {
        if (postcodes_to_lookup_in_rightmove.length===0) {
          return
        }
        const cur_postcode = postcodes_to_lookup_in_rightmove.pop()
        const callback = {
          ok: function (response) {
          TTT.rmlocationcodes = {
            ...TTT.rmlocationcodes,
            [cur_postcode.postcode]: JSON.parse(response.data).matches[0].id
          }
          lookup_all_rightmove_postcodes()
        },
          error: function (error) {
            console.log('Error looking up rightmove location code', error)
            }
        }
        locationFns.getRightmoveLocationCode (callback, cur_postcode.outcode, cur_postcode.incode)
      }
      lookup_all_rightmove_postcodes()
    },
    findpostcode_negative (response) {
      this.status = STATUS_FAILEDTOFINDPOSTCODE
      this.error_message = 'Failed to find postcode - ' +  JSON.stringify(response)
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
.locationpage-main-div {
  padding: 20px;
  margin: 20px;
}
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
  margin-top: 5px;
  margin-bottom: 5px;
}
.locationpage-extlinkbuttonlist-rightmove {
  background: lightblue;
  padding: 10px;
}
.locationpage-extlinkbuttonlist-rightmove h1 {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
  margin: 10px;
}
.postcode_data_title_field {
  max-width: 200px;
}
.locationpage-postcodeselector {
  max-width: 200px;
}
.locationpage-devnotice {
  background: red;
  padding: 10px;
}

</style>
