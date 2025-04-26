import { defineStore } from 'pinia'
/*
  Store for system datacaches
  This stoe is wiped when user logs out

  TODO:
  1- All saves for project object must go through here
  2- All loads go through here
  3- Loads check here first then go through
  4- Invalidate options
*/

// Only objects in this dict are valid objects to cache
const valid_objects = {
  projects: {}
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
    }
  }
})
