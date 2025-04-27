import { defineStore } from 'pinia'
/*
  Store for system datacaches
  This stoe is wiped when user logs out

  TODO:
  2- All loads go through here
  3- Loads check here first then go through
  4- Invalidate options
*/

// Only objects in this dict are valid objects to cache
const valid_objects = {
  projects: {
    url: '/projects'
  }
}

function get_blank_cache_data () {
  let retVal = {}
  Object.keys(valid_objects).map(function (x) {
    retVal[x] = {}
  })
  return retVal
}

export const useDataCachesStore = defineStore('dataCachesStore', {
  state: () => ({
    cache_data: get_blank_cache_data()
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2
    // }
  },

  actions: {
    reset () {
      this.cache_data = get_blank_cache_data()
    },
    save ({backend_connection_store, object_type, object_data, callback}) {
      const TTT = this
      if (!Object.hasOwn(valid_objects, object_type)) {
        callback.error('Tried to save invalid object type ' + object_type)
        return
      }
      const callback2 = {
        ok: function (response) {
          TTT.cache_data[object_type][response.data.id] = response.data
          callback.ok(response)
        },
        error: callback.error
      }
      backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: valid_objects[object_type].url,
        method: 'POST',
        data: object_data,
        callback: callback2
      })
    }
  }
})
