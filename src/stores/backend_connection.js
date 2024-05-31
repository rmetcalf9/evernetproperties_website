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
  connecting: 2,
  connected: 3,
  failed: 4
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
    },
    counter: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    },
    connectionStateString (state) {
      let stateText = getEnumText(ConnectionState, state.connection_state.state)
      if (state.connection_state.state === ConnectionState.failed) {
        stateText += ' (' + state.connection_state.error + ')'
      }
      return stateText
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
    increment () {
      this.counter++
    }
  }
})
