import { defineStore } from 'pinia'
import axios from 'axios'

export const useRightmoveLocationCodeStore = defineStore('rightmoveLocationCode', {
  state: () => ({
    code_responses: {}
    // Key is postcode, value is locationCode
  }),

  getters: {
  },

  actions: {
    getLocationCode (postcode_in_rightmove_query_form, callback) {
      const TTT = this
      if (Object.keys(TTT.code_responses).includes(postcode_in_rightmove_query_form)) {
        callback.ok(TTT.code_responses[postcode_in_rightmove_query_form])
      }
      // Note rightmove query form is  outcode + '+' + incode
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.metcarob.com/property_backend/v0/public/api/rmproxy/typeahead?query=' + postcode_in_rightmove_query_form + '&limit=10&exclude=STREET',
      };


      axios.request(config)
      .then((response) => {
        TTT.code_responses[postcode_in_rightmove_query_form] = response
        callback.ok(response)
      })
      .catch((error) => {
        callback.error(error)
      });

    }
  }
})
