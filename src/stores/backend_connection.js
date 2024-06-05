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

export const useBackendConnectionStore = defineStore('backendConnectionStore', {
  state: () => ({
    connection_state: {
      state: ConnectionState.notconnected,
      error: '',
      server_info_response: {}
    }
  }),

  getters: {
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
        url: backend_endpoint + '/public/api/info/serverinfo'
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
        url: backend_endpoint + '/public/api/login/login',
        data: data
      }
      axios(config).then(
        (response) => {
          console.log('XXX', response)
          this.connection_state.state = ConnectionState.loggedin
        },
        (response) => {
          // error response
          console.log('Error resposne from login - ', response.response)
          this.connection_state.state = ConnectionState.connected
        }
      )
    },
    logout () {
      this.connection_state.state = ConnectionState.connected
    }
  }
})
