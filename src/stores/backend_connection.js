import { defineStore } from 'pinia'
import axios from 'axios'

// This store maanges the connection with the backend
// It will:
//   1. decide if this frontend is dev or prod.
//   2. Get connection state
//         0-> Not Connected
//         1-> Connecting
//         2-> Connected
//         3-> Failed to connect
//    TODO Add logged in to this

const backend_endpoint = 'https://api.metcarob.com/property_backend/v0'

const api_prefixes = {
  infoAPIPrefix: { url: '/public/api/info', add_token: false },
  loginAPIPrefix: { url: '/public/api/login', add_token: false },
  privateUserAPIPrefix: { url: '/private/api/user', add_token: true },
  privateAdminAPIPrefix: { url: '/private/api/admin', add_token: true }
}

// TODO Process message use this.api_calls_to_make.shift


// https://www.codecademy.com/resources/docs/javascript/enums
const ConnectionState = Object.freeze({
  notconnected: 0,
  connecting: 1,
  connected: 2,
  failed: 3,
  logininprogress: 4,
  loggedin: 5
});
function getEnumText(enum_name, value) {
  return Object.keys(enum_name).filter(function (x) {
    return enum_name[x] === value
  })[0]
}

function getEmptyUserProfile() {
  return {
    pims: {
      state: ''
    }
  }
}
function getEmptyLoginInfo() {
  return {
    login_token: '',
    refresh_token: ''
  }
}
function getEmptyApiCaller() {
  return {
    api_calls_to_make: [],
    running: false
  }
}

export const useBackendConnectionStore = defineStore('backendConnectionStore', {
  state: () => ({
    connection_state: {
      state: ConnectionState.notconnected,
      error: '',
      server_info_response: {}
    },
    user_profile: getEmptyUserProfile(),
    login_info: getEmptyLoginInfo(),
    api_caller: getEmptyApiCaller()
  }),

  getters: {
    security_role_cansave (state) {
      if (!this.isLoggedin) {
        return false
      }
      return this.hasRole({role: state.connection_state.server_info_response.data.Derived.security_role_cansave})
    },
    frontendInstance (state) {
      let url = new URL(window.location.href)
      if (url.host === 'evernetproperties.com') return 'prod'
      return 'dev'
    },
    connectionStateString (state) {
      let stateText = getEnumText(ConnectionState, state.connection_state.state)
      if (state.connection_state.state === ConnectionState.failed) {
        stateText += ' (' + state.connection_state.error + ')'
      }
      return stateText + ' (' + this.frontendInstance + ')'
    },
    isConnected (state) {
      if (state.connection_state.state === ConnectionState.notconnected) {
        return false
      }
      if (state.connection_state.state === ConnectionState.connecting) {
        return false
      }
      return true
    },
    isLogininprogress (state) {
      return state.connection_state.state === ConnectionState.logininprogress
    },
    isLoggedin (state) {
      return state.connection_state.state === ConnectionState.loggedin
    },
    hasRole (state) {
      const TTT = this
      return function ({role}) {
        if (!TTT.isLoggedin) {
          return false
        }
        return state.user_profile.roles.includes(role)
      }
    }
  },
  actions: {
    connect () {
      if (this.connection_state.state === ConnectionState.connecting) {
        console.log('backend_connection Call to connect while already connecting - ignoring call')
        return
      }
      // Not sure if I want this
      // if (this.connection_state.state === ConnectionState.failed) {
      //  this.connection_state.state = ConnectionState.notconnected
      //  this.connection_state.error = ''
      //  this.connection_state.server_info_response = {}
      // }
      if (this.connection_state.state !== ConnectionState.notconnected) {
        // console.log('backend_connection Call to connect but already connected - ignoring call')
        // Silently ignore
        return
      }
      var config = {
        method: 'GET',
        url: backend_endpoint + api_prefixes.infoAPIPrefix.url + '/serverinfo'
      }
      axios(config).then(
        (response) => {
          this._connection_complete_success(response)
        },
        (response) => {
          this._connection_complete_fail(response)
        }
      )

      // this.connection_state.state = ConnectionState.failed
      // this.connection_state.error = 'Not Implemented'
      // this.connection_state.server_info_response = {}
    },
    _connection_complete_success (response) {
      this.connection_state.state = ConnectionState.connected
      this.connection_state.error = ''
      this.connection_state.server_info_response = response
    },
    _connection_complete_fail (response) {
      this.connection_state.state = ConnectionState.failed
      this.connection_state.error = JSON.stringify(response)
      this.connection_state.server_info_response = {}
    },
    login () {
      // https://developers.google.com/identity/gsi/web/reference/js-reference
      this.connection_state.state = ConnectionState.logininprogress
       window.google.accounts.id.initialize({
        client_id: '954557855733-9fovnaaj81f4cpbceqfpn72i2e8oksaa.apps.googleusercontent.com',
        callback: this._login_callback_from_google
      });
      window.google.accounts.id.prompt();
    },
    _login_callback_from_google (tokenResponse) {
      const data = {
        'frontend_instance': this.frontendInstance,
        'google_response': tokenResponse
      }
      var config = {
        method: 'POST',
        url: backend_endpoint + api_prefixes.loginAPIPrefix.url + '/login',
        data: data
      }
      axios(config).then(
        (response) => {
          this._login_complete_success(response)
        },
        (response) => {
          // error response
          console.log('Error resposne from login - ', response.response)
          this.connection_state.state = ConnectionState.connected
        }
      )
    },
    _login_complete_success (response) {
      this.connection_state.state = ConnectionState.loggedin
      this.user_profile = response.data.user_profile
      this.login_info.login_token = response.data.login_token
      this.login_info.refresh_token = response.data.refresh_token
    },
    logout () {
      this.connection_state.state = ConnectionState.connected
      this.user_profile = getEmptyUserProfile()
      this.login_info = getEmptyLoginInfo(),
      this.api_caller = getEmptyApiCaller()

    },
    update_user_profile ({user_profile, then}) {
      this.user_profile = user_profile
      if (typeof (then) !== 'undefined') {
        then()
      }
    },
    call_api ({apiprefix, url, method, data, callback}) {
      this.api_caller.api_calls_to_make.push({apiprefix, url, method, data, callback})
      if (!this.api_caller.running) {
        this.api_caller.running = true
        this.process_all_api_calls()
      }
    },
    process_all_api_calls () {
      if (this.api_caller.api_calls_to_make.length === 0) {
        this.api_caller.running = false
        return
      }
      const cur_api_call_to_make = this.api_caller.api_calls_to_make.shift()
      this.process_all_api_calls_make_individual_call({cur_api_call_to_make: cur_api_call_to_make, refresh_tried: false})
    },
    process_all_api_calls_make_individual_call({cur_api_call_to_make, refresh_tried}) {
      const TTT = this
      const callback = {
        ok: function (response) {
          cur_api_call_to_make.callback.ok(response)
          TTT.process_all_api_calls()
        },
        error: function (response) {
          // Test for 401 response and try refreshing the token
          if (response.response.status === 401) {
            if (!refresh_tried) {
              console.log('API Error - got 401 trying to update refresh token')
              TTT.get_new_token_using_refresh_token({
                success_fn: function () {
                  TTT.process_all_api_calls_make_individual_call({
                    cur_api_call_to_make: cur_api_call_to_make,
                    refresh_tried: true
                  })
                }
              })
              // Execution continuing with get_new_token_using_refresh_token
              // so no need to call process_all_api_calls.
              return
            }
          }
          console.log('error response', response.response.status)
          cur_api_call_to_make.callback.error(response)
          TTT.process_all_api_calls()
        }
      }
      var config = {
        method: cur_api_call_to_make.method,
        url: backend_endpoint + api_prefixes[cur_api_call_to_make.apiprefix].url + cur_api_call_to_make.url,
        data: cur_api_call_to_make.data,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      if (api_prefixes[cur_api_call_to_make.apiprefix].add_token) {
        if (!this.isLoggedin) {
          callback.error({
            message: 'Need to be logged in to make this call'
          })
          return
        }
        // config.headers['jwt-auth-token'] = jwtToken
        // Kong can only read Authorization header- https://docs.konghq.com/hub/kong-inc/jwt/
        config.headers.Authorization = 'Bearer ' + this.login_info.login_token
      }
      axios(config).then(
        (response) => {
          callback.ok(response)
        },
        (response) => {
          // error response
          callback.error(response)
        }
      )
    },
    get_new_token_using_refresh_token({success_fn}) {
      const data = {
        'frontend_instance': this.frontendInstance,
        'user_id': this.user_profile.id,
        'refresh_token': this.login_info.refresh_token
      }
      var config = {
        method: 'POST',
        url: backend_endpoint + api_prefixes.loginAPIPrefix.url + '/refresh',
        data: data
      }
      const TTT = this
      axios(config).then(
        (response) => {
          // Write back new tokens
          TTT.user_profile = response.data.user_profile
          TTT.login_info.login_token = response.data.login_token
          TTT.login_info.refresh_token = response.data.refresh_token
          success_fn()
        },
        (response) => {
          // error response
          console.log('Refresh token failed - logging out user')
          TTT.api_caller.running = false
          TTT.logout()
        }
      )
    }
  }
})
