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
      <div v-if="ever_saved" class="brrcalc-dealbasicinfo-patch">
        Patch: <q-btn flat @click="(obj) => $emit('navigate_away',{ 'dest': '/tools/cansave/patches/' + patch.id})">{{ patch.name }}</q-btn>
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
    <q-separator class="basic-info-seperator" />
    <q-card-section>
      <div>
        <div class="text-h6">Weblinks</div>
        <Weblinks
          ref="Weblinks"
          :weblinks="weblinks"
          @updateweblinks="updateweblinks"
        />
      </div>
      <q-separator class="basic-info-seperator" />
      <div>
        <PatchAgentInput
          :ever_saved="ever_saved"
          :loaded_project_id="loaded_project_id"
          :patch_id="patch.id"
          :selling_agent="selling_agent"
          :selling_agent_id="selling_agent_id"
          @update:selling_agent="selling_agent = $event"
          @update:selling_agent_id="selling_agent_id = $event"
        />
      </div>
      <q-separator class="basic-info-seperator" />
      <div><q-input filled autogrow v-model="notes" label="Notes" /></div>
      <q-separator class="basic-info-seperator" />
      <div>Deal Source</div>
      <div><q-checkbox v-model="deal_source_local_only.self_check_box" label="Self sourced" @update:model-value='updatedealsource' /></div>
      <div><q-input filled autogrow v-model="deal_source_local_only.value" label="Name of source" :disable='deal_source_local_only.self_check_box' @update:model-value='updatedealsource' /></div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import utils from '../../utils.js'
import { useBackendConnectionStore } from 'stores/backend_connection'
import Weblinks from '../../components/Weblinks.vue'
import PatchAgentInput from '../../components/PatchAgents/PatchAgentInput.vue'

function getDefaultSource() {
  return {
    type: 'self',
    value: ''
  }
}

export default defineComponent({
  name: 'DealBasicInfo',
  emits: ['projectchanged', 'navigate_away', 'patchidchanged', 'sellingagentidchanged'],
  props: ['ever_saved', 'loaded_project_id'],
  components: {
    Weblinks, PatchAgentInput
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
      selling_agent_id: '',
      notes: '',
      emit_project_change_notification: true,
      deal_source: getDefaultSource(),
      deal_source_local_only: {
        self_check_box: true,
        value: ''
      }
    }
  },
  watch: {
    'patch.id'(newVal, oldVal) {
      this.$emit('patchidchanged', newVal)
    },
    selling_agent_id(newVal, oldVal) {
      this.$emit('sellingagentidchanged', newVal)
    },
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'DealBasicInfo:serializer')
      }
      // this.set_changed_true()
    }
  },
  computed: {
    deal_source_is_self () {
      return this.deal_source.type === 'self'
    },
    serializer_card_data () {
      return {
        patch_id: this.patch.id,
        address: this.address,
        postcode: this.postcode,
        weblinks: this.weblinks,
        selling_agent: this.selling_agent,
        selling_agent_id: this.selling_agent_id,
        notes: this.notes,
        deal_source: this.deal_source
      }
    },
    reason_project_not_savable () {
      if (this.patch.id === 'notset') {
        return 'Select patch'
      }
      if (typeof (this.address) === 'undefeind') {
        return 'Enter address'
      }
      if (this.address === null) {
        return 'Enter address'
      }
      if (this.address.length < 3) {
        return 'Enter address'
      }
      return ''
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
    apiaddweblink(params) {
      return this.$refs.Weblinks.apiaddweblink(params)
    },
    updatedealsource () {
      let type = 'self'
      if (this.deal_source_local_only.self_check_box === false) {
        type = 'text'
      }
      //  Decided not to blank value
      // if (type==='self') {
      //  this.deal_source_local_only.value = ''
      // }
      let value = this.deal_source_local_only.value
      this.deal_source = {
        type: type,
        value: value
      }
    },
    updateweblinks (newweblinks) {
      this.weblinks = newweblinks
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'DealBasicInfo:updateweblinks')
      }
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false

      this.address = data_to_load.address
      this.postcode = data_to_load.postcode
      this.weblinks = data_to_load.weblinks
      this.selling_agent = data_to_load.selling_agent
      if (typeof (data_to_load.selling_agent_id) === 'undefined') {
        this.selling_agent_id = ''
      } else {
        this.selling_agent_id = data_to_load.selling_agent_id
      }
      this.notes = data_to_load.notes

      this.patch = this.patch_list.filter(function (x) {
        return x.id === data_to_load.patch_id
      })[0]

      if (typeof (data_to_load.deal_source) === 'undefined') {
        this.deal_source = getDefaultSource()
      } else {
        this.deal_source = data_to_load.deal_source
      }
      // Set actual check box and value
      this.deal_source_local_only.self_check_box = (this.deal_source.type==='self')
      this.deal_source_local_only.value = this.deal_source.value

      this.updatedealsource()

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true

        TTT.changed = false
        TTT.autosave_seconds_left = -1
      }, 50)
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
.basic-info-seperator {
  margin-top: 10px;
  margin-bottom: 10px;
}
.brrcalc-dealbasicinfo-patch {
  padding-bottom: 10px;
}
</style>
