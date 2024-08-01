<template>
  <q-card v-if="security_role_cansave" inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Basic Information</div>
      <div class="text-subtitle2">Basic information about this project</div>
    </q-card-section>
    <q-card-section>
      <div v-if="!ever_saved">
        <q-select
          v-model="patch"
          :options="patch_list"
          label="Patch"
          @update:model-value="select_patch"
          emit-value
          option-label="name"
        />
      </div>
      <div v-if="ever_saved">
        Patch: {{ patch.name }}
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
        <Weblinks
          :weblinks="weblinks"
          @updateweblinks="updateweblinks"
        />
      </div>
      <div><q-input filled clearable v-model="selling_agent" label="Selling Agent" /></div>
      <div><q-input filled autogrow v-model="notes" label="Notes" /></div>

    </q-card-section>
    <q-card-section>
      <div>
        <q-btn color="primary" icon="save" :label="save_btn_text" @click="click_save_btn" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import utils from '../../utils.js'
import { useBackendConnectionStore } from 'stores/backend_connection'
import Weblinks from '../../components/Weblinks.vue'

export default defineComponent({
  name: 'DealBasicInfo',
  emits: ['saveproject'],
  components: {
    Weblinks,
  },
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
      new_patch_value: '',
      selling_agent: '',
      notes: '',
      changed: false,
      autosave_seconds_left: 60,
      ever_saved: false,
      save_in_progress: false,
      save_monitor_function_running: false
    }
  },
  watch: {
    serializer_card_data(val) {
      this.set_changed_true()
    }
  },
  computed: {
    serializer_card_data () {
      return {
        patch_id: this.patch.id,
        address: this.address,
        postcode: this.postcode,
        weblinks: this.weblinks,
        selling_agent: this.selling_agent,
        notes: this.notes
      }
    },
    no_save_message () {
      // perform all validations and return message to display on save button
      // or empty string
      if (this.patch.id === 'notset') {
        return 'Select patch'
      }
      if (this.address.length < 3) {
        return 'Enter address'
      }
      if (this.save_in_progress) {
        return 'Saving...'
      }
      return ''
    },
    can_save () {
      if (this.save_in_progress) {
        return false
      }
      if (this.changed) {
        return true
      }
      return false
    },
    save_btn_text () {
      if (this.no_save_message !== '') {
        return 'Not able to save (' + this.no_save_message + ')'
      }
      if (!this.changed) {
        if (this.ever_saved) {
          return 'Saved'
        }
        return 'Not able to save (No changes)'
      }
      if (this.autosave_seconds_left === -1) {
        return 'Save Now'
      }
      return 'Save now (auto save in ' + this.autosave_seconds_left + ')'
    },
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
    updateweblinks (newweblinks) {
      this.weblinks = newweblinks
      this.set_changed_true()
    },
    serializer_load_data (data_to_load) {
      this.address = data_to_load.address
      this.postcode = data_to_load.postcode
      this.weblinks = data_to_load.weblinks
      this.selling_agent = data_to_load.selling_agent
      this.notes = data_to_load.notes

      this.patch = this.patch_list.filter(function (x) {
        return x.id === data_to_load.patch_id
      })[0]
      this.ever_saved = true
      const TTT = this
      setTimeout(function () {
        TTT.changed = false
        TTT.autosave_seconds_left = -1
      }, 50)
    },
    set_changed_true() {
      this.changed = true
      if (this.no_save_message !== '') {
        return
      }
      this.autosave_seconds_left = 10
      this.start_save_monitor_function()
    },
    start_save_monitor_function () {
      if (this.save_monitor_function_running) return
      this.save_monitor_function()
    },
    save_monitor_function () {
      this.save_monitor_function_running = true
      if (this.save_in_progress) {
        return
      }
      if (this.autosave_seconds_left === -1) {
        this.save_monitor_function_running = false
        return
      }
      const TTT = this
      TTT.autosave_seconds_left = TTT.autosave_seconds_left - 1
      if (TTT.autosave_seconds_left<1) {
        this.save_monitor_function_running = false
        this.save_now()
        return
      }
      setTimeout(TTT.save_monitor_function, 1000)
    },
    click_save_btn () {
      this.autosave_seconds_left = -1 // This causes save monitor to abort
      this.save_now()
    },
    save_now () {
      if (!this.can_save) {
        return
      }
      this.save_in_progress = true
      this.$emit('saveproject')

    },
    save_project_complete_notification ({success, response}) {
      console.log('save complet notif')
      this.save_in_progress = false
      if (success) {
        this.changed = false
        this.ever_saved = true
      } else {
        // Failed save stop any countdown
        this.autosave_seconds_left = -1
      }
    },
    select_patch_by_id (id) {
      this.patch = this.patch_list.filter(function (x) {
        return x.id === id
      })[0]
    },
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
        user_profile: response.data.user_profile,
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
