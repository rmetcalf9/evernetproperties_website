<template>
    <div class="profileapikeys-main">
      <h4>API Keys<q-btn round dense flat icon="info" @click="clickhelp" /></h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Used</th>
            <th>Expires</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="apikey in user_profile.apikeys" :key="apikey.id">
            <td>{{ apikey.name }}</td>
            <td>{{ get_last_used_string(apikey.last_used) }}</td>
            <td>{{ expires_string(apikey.expires) }}</td>
            <td>
              <q-btn round dense flat icon="content_copy" @click="copy_apikey(apikey)" />
              <q-btn round dense flat icon="delete" @click="delete_apikey(apikey)" />
            </td>
          </tr>
        </tbody>
      </table>
      <q-btn
        class="profileapikeys-bottom-button"
        @click="addapikey"
        color="secondary"
        label="Add API Key"
      ></q-btn>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import utils from '../utils.js'

export default defineComponent({
  name: 'ProfilePageApiKeys',
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
    }
  },
  computed: {
    user_profile () {
      // console.log('ProfileApiKeys', this.backend_connection_store.user_profile)
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    delete_apikey (apikey) {
      const TTT = this
      const callback = {
        ok: TTT.delapikey_successcallback,
        error: TTT.delapikey_failcallback
      }
      const post_data = {
        name: apikey.name
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/me/apikey',
        method: 'DELETE',
        data: post_data,
        callback: callback
      })
    },
    copy_apikey (apikey) {
      const TTT = this
      const callback = {
        ok: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'API key copied to clipboard',
            timeout: 2000
          })
        },
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Copy failed',
            timeout: 2000
          })
        }
      }
      utils.copyTextToClipboard2(apikey.apikey, callback)
    },
    expires_string (expires) {
      const timestamp = new Date(expires)
      return timestamp.toDateString()
    },
    get_last_used_string (last_used) {
      if (last_used==='') {
        return 'Never'
      }
      // const timestamp = new Date(ite.timestamp)
      return 'SS' + last_used;
    },
    clickhelp () {
      this.$q.dialog({
        title: 'API Keys',
        message: 'API Keys allow for integrations with other systems.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    },
    addapikey () {
      const TTT = this
      this.$q.dialog({
        title: 'Create API Key',
        message: 'Enter the name for this API key',
        html: false,
        ok: {
          push: true,
          label: 'Ok',
          color: 'primary'
        },
        cancel: {
          push: true,
          label: 'Cancel',
          color: 'primary'
        },
        prompt: {
          model: '',
          type: 'text' // optional
        },
      }).onOk((data) => {
        if (data.length < 1) {
          Notify.create({
            color: 'negative',
            message: 'You must specify a name for the apikey',
            timeout: 2000
          })
          return
        }
        const callback = {
          ok: TTT.addapikey_successcallback,
          error: TTT.addapikey_failcallback
        }
        const post_data = {
          name: data
        }
        this.backend_connection_store.call_api({
          apiprefix: 'privateUserAPIPrefix',
          url: '/me/apikey',
          method: 'POST',
          data: post_data,
          callback: callback
        })
      })
    },
    addapikey_successcallback (response) {
      this.backend_connection_store.update_user_profile ({
        user_profile: response.data.user_profile,
        then: undefined
      })
    },
    addapikey_failcallback (response) {
      Notify.create({
        color: 'negative',
        message: 'Api key creation failed - ' + response,
        timeout: 2000
      })
    },
    delapikey_successcallback (response) {
      this.backend_connection_store.update_user_profile ({
        user_profile: response.data.user_profile,
        then: undefined
      })
    },
    delapikey_failcallback (response) {
      Notify.create({
        color: 'negative',
        message: 'Api key deletion failed - ' + response,
        timeout: 2000
      })
    }
  }
})

</script>

<style>
.profileapikeys-main {
  margin-top: 35px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  border-color: black;
  border-style: dashed;
}
.profileapikeys-main h4 {
  margin-top: 5px;
  margin-bottom: 0px;
}
.profileapikeys-bottom-button {
  margin-top: 10px;
}
</style>
