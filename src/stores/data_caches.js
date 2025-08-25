import { defineStore } from 'pinia'
/*
  Store for system datacaches
  This stoe is wiped when user logs out

*/

// Only objects in this dict are valid objects to cache
const valid_objects = {
  projects: {
    url: '/projects',
    getOnSaveCacheInvalidationList: projectGetOnSaveCacheInvalidationList
  },
  patches: { // Save might not work because it uses /me/patches endpoint
    url: '/patches'
  },
  patchagents: {
    url: '/patchagents'
  }
}

function projectGetOnSaveCacheInvalidationList(object_data) {
  return [{
    object_type: 'patches',
    object_id: object_data.patch_id
  }]
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
    invalidate ({ object_type, object_id}) {
      if (!Object.hasOwn(valid_objects, object_type)) {
        console.log('Warning - invalid object type in invalidate message', object_type)
        return
      }
      // console.log('data_cache invalidate INVALIDATING', object_type, object_id)
      if (!Object.hasOwn(this.cache_data[object_type], object_id)) {
        // Commonly happens
        // console.log('Warning - trying to invalidate object not in cache', object_type, object_id)
        return
      }
      delete this.cache_data[object_type][object_id]
    },
    save ({backend_connection_store, object_type, object_data, callback}) {
      // Note object_data NOT needed as when object is changed it is only a pointer
      const TTT = this
      if (!Object.hasOwn(valid_objects, object_type)) {
        callback.error('Tried to save invalid object type ' + object_type)
        return
      }
      const callback2 = {
        ok: function (response) {
          // console.log('data_caches save completed success', response)
          // console.log(' object version', response.data.metadata.objectVersion)
          TTT.cache_data[object_type][response.data.id] = response.data
          callback.ok(response)
        },
        error: callback.error
      }
      if (typeof (valid_objects[object_type].getOnSaveCacheInvalidationList) !== 'undefined') {
        const objectsToInvalidata = valid_objects[object_type].getOnSaveCacheInvalidationList(object_data)
        objectsToInvalidata.forEach(function (x) {
          TTT.invalidate(x)
        })
      }
      backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: valid_objects[object_type].url,
        method: 'POST',
        data: object_data,
        callback: callback2
      })
    },
    get ({backend_connection_store, object_type, object_id, skip_cache, callback}) {
      if (!Object.hasOwn(valid_objects, object_type)) {
        callback.error('Tried to load invalid object type ' + object_type)
        return
      }
      const TTT = this
      if (!skip_cache) {
        if (Object.hasOwn(TTT.cache_data[object_type], object_id)) {
          const cache_response = {
            data: TTT.cache_data[object_type][object_id]
          }
          callback.ok(cache_response)
          return
        }
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
        url: valid_objects[object_type].url + '/' + object_id,
        method: 'GET',
        data: undefined,
        callback: callback2
      })
    },
    get_direct_from_cache({object_type, object_id}) {
      if (!Object.hasOwn(valid_objects, object_type)) {
        return undefined
      }
      return this.cache_data[object_type][object_id]
    }
  }
})
