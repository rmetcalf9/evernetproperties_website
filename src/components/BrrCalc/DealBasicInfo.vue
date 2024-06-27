<template>
  <q-card v-if="security_role_cansave" inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Basic Information</div>
      <div class="text-subtitle2">Basic information about this project</div>
    </q-card-section>
    <q-card-section>
      <div>
        <q-select
          v-model="patch"
          :options="patch_list"
          label="Patch"
          @update:model-value="select_patch"
          emit-value
          option-label="name"
        />
      </div>
      <div><q-input filled clearable v-model="address" label="Address" /></div>
      <div>
        <q-input filled clearable v-model="postcode" label="Postcode">
          <template v-slot:append>
            <q-icon class="q-field__focusable-action" v-if="!isEmpty(postcode)" name="content_copy" @click="copy_text(postcode)" />
          </template>
        </q-input>
      </div>
    </q-card-section>
    <q-card-section>
      <div>
        <div class="text-h6">Weblinks</div>
        <div v-for="weblink in weblinks" :key="weblink" >
          {{ weblink.label }}
          <q-btn round color="primary" icon="delete" @click="delweblink(weblink.id)" />
        </div>
        <q-btn round color="primary" icon="add" @click="addweblink" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import utils from '../../utils.js'
import { useBackendConnectionStore } from 'stores/backend_connection'

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

export default defineComponent({
  name: 'DealBasicInfo',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      patch: {id: 'notset', name: 'Not Set'},
      address: '',
      postcode: '',
      weblinks: [],
      new_patch_value: ''
    }
  },
  computed: {
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    },
    patch_list () {
      return this.backend_connection_store.user_profile.patches.concat(
        [{
            id: 'create',
            name: 'Add...'
        }]
      )
    },
  },
  methods: {
    select_patch (patch) {
      if (patch.id==='create') {
        const TTT = this
        this.$q.dialog({
          title: 'Add new patch',
          message: 'Enter the name for the new patch',
          html: false,
          ok: {
            push: true,
            label: 'Ok',
          },
          cancel: {
            push: true,
            label: 'Cancel',
          },
          prompt: {
            model: '',
            type: 'text' // optional
          }
        }).onOk((input_data) => {
          TTT.new_patch_value = input_data
          const callback = {
            ok: TTT.createpatchcallback,
            error: function (response) {
              console.log('s', response)
              Notify.create({
                color: 'negative',
                message: 'Create patch failed ' + response.response.data.message,
                timeout: 2000
              })
            }
          }
          const post_data = {
            patch_name: input_data
          }
          this.backend_connection_store.call_api({
            apiprefix: 'privateUserAPIPrefix',
            url: '/me/patches',
            method: 'POST',
            data: post_data,
            callback: callback
          })
        })
      }
    },
    createpatchcallback (response) {
      this.backend_connection_store.update_user_profile ({
        user_profile: response.data,
        then: this.createpatchcallback2
      })
    },
    createpatchcallback2 () {
      const TTT = this
      this.patch = this.patch_list.filter(function (x) {
        return x.name === TTT.new_patch_value
      })[0]
      this.new_patch_value = ''
    },
    delweblink (id) {
      console.log('TODO')
      this.weblinks = this.weblinks.filter(function (weblink) {
        return id !== weblink.id
      })
    },
    addweblink () {
      const TTT = this
      this.$q.dialog({
        title: 'Add weblink',
        message: 'Add weblink to information about this property (rightmove, zoopla, etc.)',
        html: false,
        ok: {
          push: true,
          label: 'Ok',
        },
        cancel: {
          push: true,
          label: 'Cancel',
        },
        prompt: {
          model: '',
          type: 'text' // optional
        }
      }).onOk((data) => {
        TTT.weblinks.push({
          id: uuidv4(),
          label: data
        })
      })
    },
    isEmpty (val) {
      if (val == null) {
        return true
      }
      return val.length == 0
    },
    copy_text (text) {
      const TTT = this
      const callback = {
        ok: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Copied to clipboard',
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
      utils.copyTextToClipboard2(text, callback)
    }
  }
})
</script>

<style>
</style>
