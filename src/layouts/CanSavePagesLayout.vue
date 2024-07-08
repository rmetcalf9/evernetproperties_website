<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-7 text-white">
      <q-toolbar class="main-toolbar column no-wrap justify-start items-center content-start">
        <div class="row no-wrap justify-start items-center content-start">
          <img
            class="main-logo"
            alt="Evernet properties logo"
            src="~assets/main_logo.svg"
          >
          <div class="column no-wrap justify-start items-center content-start">
            <q-toolbar-title>
              Evernet Properties Limited
            </q-toolbar-title>
            <div>
              We find properties
            </div>
          </div>
        </div>
      </q-toolbar>
      <div class="sub-toolbar bg-grey-5 fit row no-wrap justify-center items-center content-start">
        <div v-for="item in menu_items" :key="item.name">
          <router-link :to="item.target" class="toolbar">{{ item.name }}</router-link>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <div class="child_page_class">
        <div v-if="page_to_show==='waiting'">
          <q-page class="flex flex-center">
            <h1>Please wait...</h1>
          </q-page>
        </div>
        <div v-if="page_to_show==='noconnection'">
          <q-page class="flex flex-center">
            <h1>No Connection to server</h1>
          </q-page>
        </div>
        <div v-if="page_to_show==='connected'">
          <q-page class="flex flex-center">
            <h1>TODO Login button</h1>
          </q-page>
        </div>
        <div v-if="page_to_show==='loggedin'">
          <router-view />
        </div>
      </div>
      <div class="bottom-sub-toolbar bg-grey-5 fit column wrap justify-center items-center content-center text-white">
        <img
          alt="PIMS Logo"
          src="~assets/PIMS Logo White.png"
          class="pims-logo"
        >Membership number 34541 (Robert Metcalf)
        <img
          class="bottom-logo"
          alt="Evernet properties logo"
          src="~assets/main_logo.svg"
        >
        <div>Evernet Properties Limited |  Company Number: 15345182 | Company registered office : 86-90, Paul Street, London EC2A 4NE</div>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-grey-7 text-white">
      <div class="footer row">
        <div class="left_footer col-grow"><router-link to="/privacy" class="toolbar">Privacy Policy</router-link></div>
        <div class="right_footer">
          {{ copyright }}
          <q-tooltip>
            <table>
              <tr><td>Connection: {{ connectionState }}</td></tr>
            </table>
          </q-tooltip>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Notify, Cookies } from 'quasar'
import common from './common.js'

import { useBackendConnectionStore } from 'stores/backend_connection'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },

  data () {
    return {
      menu_items: common.get_menu_items(),
      page_to_show: 'waiting' // waiting -> noconnection -> connected -> loggedin
    }
  },
  computed: {
    copyright () {
      return '© ' + new Date().getFullYear() + ' All Right Reserved'
    },
    connectionState () {
      return this.backend_connection_store.connectionStateString
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    }
  },
  methods: {
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
    },
  },
  mounted () {
    const TTT = this
    const login_callback = {
      ok: function (response) {
        TTT.page_to_show = 'loggedin'
      },
      error: function (response) {
        TTT.page_to_show = 'noconnection'
      }
    }
    const callback = {
      ok: function (response) {
        if (TTT.isLoggedin) {
          TTT.page_to_show = 'loggedin'
        } else {
          TTT.backend_connection_store.login(login_callback, TTT.$rjmgclientid)
        }
      },
      error: function (response) {
        TTT.page_to_show = 'noconnection'
      }
    }
    TTT.page_to_show = 'waiting'
    TTT.backend_connection_store.connect(callback)
    TTT.cookiePopup()
  }
})
</script>

<style>
.pims-logo {
  width: 200px;
  height: 80px;
  object-fit: cover;
  object-position: 0 -10;
}
.main-logo {
  width: 80px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0px;
}
.bottom-logo {
  width: 100px;
  padding-top: 10px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
}
.main-toolbar {
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
}
.sub-toolbar {
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
}
.bottom-sub-toolbar {
  padding-left: 5px;
  padding-right: 5px;
}
.sub-toolbar-item {
  padding-left: 5px;
  padding-right: 5px;
}
a.toolbar {
  text-decoration: none;
  color: white;
  padding: 5px;
}
.left_footer {
  text-align: left;
  padding-left: 5px;
}
.right_footer {
  text-align: right;
  padding-right: 5px;
}
.child_page_class {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

.featurecard {
  color: white;
  background-color: LightCoral;
}

</style>
