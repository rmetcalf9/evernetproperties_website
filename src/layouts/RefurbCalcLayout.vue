<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-7 text-white">
      <HeadToolbars
      />
      <div class="sub-toolbar bg-grey-5 fit row no-wrap justify-center items-center content-start">
        <div class="toolbar_non_click">Refurb Calc</div>
        <a class="toolbar" @click="click_refurb_menu('plans')">Plans</a>
        <a class="toolbar" @click="click_refurb_menu('viewing')">Viewing</a>
        <a class="toolbar" @click="click_refurb_menu('estimate')">Estimate</a>
        <a class="toolbar" @click="click_refurb_menu('report')">Report</a>
        <a class="toolbar" @click="click_refurb_menu('json')">JSON</a>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-7 text-white">
      <div class="footer row">
        <div class="left_footer col-grow"><router-link to="/privacy" class="toolbar">Privacy Policy</router-link></div>
        <div class="right_footer">{{ copyright }}</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Notify, Cookies } from 'quasar'
import HeadToolbars from '../components/LayoutComponents/HeadToolbars.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeadToolbars
  },
  data () {
    return {
      refurb_mode: 'plans'
    }
  },
  computed: {
    copyright () {
      return '© ' + new Date().getFullYear() + ' All Right Reserved'
    }
  },
  methods: {
    click_refurb_menu (ite) {
      this.refurb_mode = ite
      this.$bus.emit('click_refurb_menu', ite)
    },
    notifyAccept () {
      Cookies.set('cookiesAccepted', 'true', {
        secure: !window.location.href.includes('localhost'), // otherwise cookie not set on dev machines
        expires: 180 // expire in 180 days
      })
    },
    navigateToDataAndPrivacy () {
      this.$router.push('/privacy')
    },
    hasAcceptedCookie () {
      if (!Cookies.has('cookiesAccepted')) {
        return false
      }
      var cookieData = Cookies.get('cookiesAccepted')
      if (typeof (cookieData) === 'undefined') {
        return false
      }
      if (cookieData === 'true') {
        return true
      }
      return false
    },
    cookiePopup () {
      var TTT = this
      if (this.hasAcceptedCookie()) {
        return
      }
      Notify.create({
        color: 'bg-grey-2',
        message: 'By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. Some of these may be "third party cookies".',
        timeout: 0,
        actions: [
          { label: 'View Privacy Policy', color: 'primary', handler: TTT.navigateToDataAndPrivacy },
          { label: 'Accept', color: 'white', handler: TTT.notifyAccept }
        ]
      })
    }
  },
  mounted () {
    this.cookiePopup()
  }
})
</script>

<style>
a.toolbar {
  text-decoration: none;
  color: white;
  padding: 5px;
}


.pims-logo {
  width: 200px;
  height: 80px;
  object-fit: cover;
  object-position: 0 -10;
}
.bottom-logo {
  width: 100px;
  padding-top: 10px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
}
.bottom-sub-toolbar {
  padding-left: 5px;
  padding-right: 5px;
}
.left_footer {
  text-align: left;
  padding-left: 5px;
}
.right_footer {
  text-align: right;
  padding-right: 5px;
}
.toolbar_non_click {
  color: black;
}
</style>
