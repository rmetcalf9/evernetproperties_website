<template>
  <q-page class="flex flex-center">
    <div class="fit column wrap justify-start items-start content-center">
      <h2>{{ heading }}</h2>
      <div class="text-h6">Aim:</div>
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
            Not {{ blocked_slot.start }}-{{ blocked_slot.end }} <q-btn round color="primary"  size="xs" icon="delete" @click="delreservedslot(day, blocked_slot.id)" />
          </div>
        </div>
      </div>
    </div>
    <BatchCallLeadsAddBlockDialog
      ref="BatchCallLeadsAddBlockDialog"
    />
    <q-btn label="Ready to start making calls..." @click="click_readytogo" color="secondary" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import utils from '../../../components/utils.js'

import BatchCallLeadsAddBlockDialog from '../../../components/BatchCallLeadsAddBlockDialog.vue'



export default defineComponent({
  name: 'BatchCallLeads',
  components: {
    BatchCallLeadsAddBlockDialog
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store: backend_connection_store
    }
  },
  data () {
    return {
      story_prompt: '',
      viewing_days: []
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
    addreservedslot (day) {
      this.$refs.BatchCallLeadsAddBlockDialog.show_dialog(this.viewing_days, day.id)
    },
    delreservedslot(day, id) {
      day.reserved_slots = day.reserved_slots.filter(function (x) {
        return x.id !== id
      })
    },
    click_readytogo () {
      console.log('TODO')
    }
  },
  mounted () {
    this.viewing_days = []
    const start_date = new Date();
    start_date.setHours(0,0,0,0)
    for (let i = 1; i < 8; i++) {
      var this_date = new Date(start_date)
      this_date.setDate(this_date.getDate() + i);
      this.viewing_days.push({
        id: i,
        text: utils.format_date_as_string_without_year(this_date),
        js_day_obj: this_date,
        selected: true,
        reserved_slots: []
      })
    }
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
</style>
