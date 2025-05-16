<template>
  <div>
    <div v-for="weblink in weblinkdisplay" :key="weblink" >
      <q-chip clickable @click="clickweblink(weblink)" removable @remove="editweblink(weblink.id)" color="primary" text-color="white" :icon="weblink.icon" icon-remove="edit">
        {{ weblink.text }}
      </q-chip>
    </div>
    <q-btn round color="primary" icon="add" @click="addweblink" />
    <q-dialog v-model="edit_dialog.visible">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ edit_dialog.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div style="width: 25vw">
            {{ edit_dialog.message }}
            <q-input v-model="edit_dialog.record.displaytext" label="Display Text" clearable />
            <q-input v-model="edit_dialog.record.label" label="URL" clearable />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Delete" color="negative" @click="delweblink(edit_dialog.record.id)" />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="OK"  @click="editweblinkok" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { Notify } from 'quasar'
import utils from '../components/utils.js'
import { uuidv4 } from 'node-common-library'


function new_weblink_record(label, displaytext) {
  return {
    id: uuidv4(),
    label: label, // this is the URL must start http://
    displaytext: displaytext
  }
}

export default defineComponent({
  name: 'WebLinksComponent',
  props: ['weblinks'],
  emits: ['updateweblinks'],
  data () {
    return {
      edit_dialog: {
        visible: false,
        record: {},
        title: '',
        message: ''
      }
    }
  },
  computed: {
    weblinkdisplay () {
      return this.weblinks.map(function (x) {
        if (typeof (x.displaytext) !== 'undefined') {
          if (x.displaytext != null) {
            if (x.displaytext.trim().length > 0) {
              return {
                id: x.id,
                label: x.label,
                text: x.displaytext,
                icon: 'star'
              }
            }
          }
        }
        const textandicon = utils.getDefaultWeblinkDisplayTextAndIcon(x.label)
        return {
          id: x.id,
          label: x.label,
          text: textandicon.text,
          icon: textandicon.icon
        }
      })
    }
  },
  methods: {
    editweblink (id) {
      this.edit_dialog.record = JSON.parse(JSON.stringify(this.weblinks.filter(function (x) {
        return x.id===id
      })[0]))
      this.edit_dialog.title = 'Edit Weblink'
      this.edit_dialog.message = ''
      this.edit_dialog.visible = true
    },
    editweblinkok () {
      if (!this.validate_weblink(this.edit_dialog.record)) {
        return
      }
      const TTT = this
      const newweblinks = this.weblinks.filter(function (weblink) {
        return TTT.edit_dialog.record.id !== weblink.id
      })
      newweblinks.push(this.edit_dialog.record)
      this.edit_dialog.visible = false
      TTT.$emit("updateweblinks", newweblinks)
    },
    apiaddweblink({url, displaytext}) {
      // Called from another part of the app
      const newweblinks = this.weblinks.filter(function (weblink) {
        return true
      })
      newweblinks.push(new_weblink_record(url, displaytext))
      this.$emit("updateweblinks", newweblinks)
    },
    clickweblink (weblink) {
      window.open(weblink.label, '_blank').focus()
    },
    delweblink (id) {
      const newweblinks = this.weblinks.filter(function (weblink) {
        return id !== weblink.id
      })
      this.edit_dialog.visible = false
      this.$emit("updateweblinks", newweblinks)
    },
    validate_weblink(record) {
      if (typeof (record.label) === 'undefined') {
        Notify.create({
          color: 'bg-grey-2',
          message: 'Link must start with http',
          timeout: 2000,
          color: 'negative'
        })
        return false
      }
      if (record.label === null) {
        Notify.create({
          color: 'bg-grey-2',
          message: 'Link must start with http',
          timeout: 2000,
          color: 'negative'
        })
        return false
      }
      if (!record.label.startsWith('http')) {
        Notify.create({
          color: 'bg-grey-2',
          message: 'Link must start with http',
          timeout: 2000,
          color: 'negative'
        })
        return false
      }
      return true
    },
    addweblink () {
      const TTT = this

      this.edit_dialog.title = 'Add Weblink'
      this.edit_dialog.message = 'Add weblink to information about this property (rightmove, zoopla, etc.)'
      this.edit_dialog.record = new_weblink_record('', '')
      this.edit_dialog.visible = true
    },
  }
})
</script>

<style>
</style>
