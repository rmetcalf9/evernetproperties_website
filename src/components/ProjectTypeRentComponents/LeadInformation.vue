<template>
  <q-card inline class="q-ma-sm card-style col-grow">
    <q-card-section>
      <div class="text-h6">Lead Information</div>
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
        Patch: <q-btn flat @click="(obj) => $emit('navigate_away',{ 'dest': '/tools/cansave/patches/' + patch.id + '?starttab=rent_projects'})">{{ patch.name }}</q-btn>
      </div>
      <div><q-input filled clearable v-model="address" label="Address" /></div>
      <div>
        <q-input filled clearable v-model="postcode" label="Postcode">
          <template v-slot:append>
            <q-icon class="q-field__focusable-action" v-if="!isEmpty(postcode)" name="content_copy" @click="copy_text(postcode)" />
          </template>
        </q-input>
      </div>
      <div><q-input filled clearable v-model="landlord_name" label="Landlord Name" /></div>
      <div><q-input filled clearable v-model="contact_phone" label="Contact Phone" /></div>
      <div><q-input filled clearable v-model="contact_email" label="Contact Email" /></div>
      <div><q-input filled clearable v-model="advert_information" label="Advert Information" autogrow/></div>

      <div>Advert Links</div>
      <Weblinks
        ref="Weblinks"
        :weblinks="advertweblinks"
        @updateweblinks="updateadvertweblinks"
      />

      <div>Lead Source Gumtree/Facebook/Spareroom</div>
      <q-select
        v-model="lead_source"
        :options="lead_source_options"
        label="Lead Source"
        emit-value
        option-label="name"
      />
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
  name: 'LeadInformationCard',
  emits: ['projectchanged', 'navigate_away'],
  props: ['ever_saved'],
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
      emit_project_change_notification: true,
      patch: {id: 'notset', name: 'Not Set'},
      address: '',
      postcode: '',
      landlord_name: '',
      contact_phone: '',
      contact_email: '',
      advert_information: '',
      advertweblinks: [],
      lead_source: 'Not Selected',
      lead_source_options: [
        'Not Selected',
        'Gumtree',
        'Facebook',
        'Spareroom',
        'Networking',
        'Open Rent',
        'Council HMO List',
        'Referral',
        'Response to Campaign',
        'Other'
      ]
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'LeadInformation:serializer')
      }
    }
  },
  computed: {
    serializer_card_data () {
      return {
        patch_id: this.patch.id,
        address: this.address,
        postcode: this.postcode,
        landlord_name: this.landlord_name,
        contact_phone: this.contact_phone,
        contact_email: this.contact_email,
        advert_information: this.advert_information,
        advertweblinks: this.advertweblinks,
        lead_source: this.lead_source
      }
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
    reset_data() {
      console.log('RESET DATA CALL')
      this.emit_project_change_notification = false

      this.patch = {id: 'notset', name: 'Not Set'}
      this.address = ''
      this.postcode = ''
      this.landlord_name = ''
      this.contact_phone = ''
      this.contact_email = ''
      this.advert_information = ''
      this.advertweblinks = []
      this.lead_source = 'Not Selected'

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)

    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false

      this.address = data_to_load.address
      this.postcode = data_to_load.postcode
      this.landlord_name = data_to_load.landlord_name
      this.contact_phone = data_to_load.contact_phone
      this.contact_email = data_to_load.contact_email
      this.advert_information = data_to_load.advert_information
      this.lead_source = data_to_load.lead_source

      this.patch = this.patch_list.filter(function (x) {
        return x.id === data_to_load.patch_id
      })[0]

      if (typeof (data_to_load.advertweblinks) === 'undefined') {
       this.advertweblinks = []
      } else {
        this.advertweblinks = data_to_load.advertweblinks
      }

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
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
    },
    select_patch_by_id (id) {
      console.log('LeadInformation select_patch_by_id', id)
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
    updateadvertweblinks (newweblinks) {
      this.advertweblinks = newweblinks
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'LeadInformation:updateweblinks')
      }
    },
  }
})

</script>

<style>
</style>
