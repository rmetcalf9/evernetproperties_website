<template>
  <div v-if="show_banner" class="preeventbanner fit row no-wrap justify-left items-center content-start">
    <div>📰 Event coming up/in progress {{ next_event.title }} - {{ next_event.subtitle }} - <q-btn
        @click="$router.replace('/ppbevent')"
        flat
    >
        Click here for More details
    </q-btn></div>
    <div class="col-grow"></div>
    <div><q-btn icon="close" flat round dense @click="close_banner"/></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import events from '../../events.js'
import { Cookies } from 'quasar'

const cookie_name = 'duringbanner_seen_event'

export default defineComponent({
  name: 'DuringEventBanner',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  components: {
  },
  data () {
    return {
      shown_cookie_set: false
    }
  },
  computed: {
    next_event () {
      return events.next_event
    },
    show_banner () {
      if (this.$router.currentRoute.value.path == '/ppbevent') {
        return false
      }
      if (!this.isLoggedin) {
        return false
      }
      if (events.get_stage(events.next_event) !== 'near_and_during_event') {
        return false
      }
      if (this.shown_cookie_set) {
        return false
      }
      return true
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    }
  },
  methods: {
    close_banner () {
      this.shown_cookie_set = true
      return
      // not setting cookie so banner will come back on page refresh
      Cookies.set(cookie_name, events.next_event.date, {
        secure: !window.location.href.includes('localhost'), // otherwise cookie not set on dev machines
        expires: 180 // expire in 180 days
      })
    }
  },
  mounted () {
    if (!Cookies.has(cookie_name)) {
      return
    }
    var cookieData = Cookies.get(cookie_name)
    if (typeof (cookieData) === 'undefined') {
      return
    }
    if (cookieData !== events.next_event.date) {
      return
    }
    this.shown_cookie_set = true
  }
})

</script>

<style>
.preeventbanner {
  padding-left: 10px;
  padding-right: 10px;
  background-color: goldenrod;
  color: black;
}
</style>
