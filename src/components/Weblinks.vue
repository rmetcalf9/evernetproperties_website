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
          <div class="text-h6">Edit Weblink</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div style="width: 25vw">
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

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}


export default defineComponent({
  name: 'WebLinksComponent',
  props: ['weblinks'],
  emits: ['updateweblinks'],
  data () {
    return {
      edit_dialog: {
        visible: false,
        record: {}
      }
    }
  },
  computed: {
    weblinkdisplay () {
      return this.weblinks.map(function (x) {
        const url = new URL(x.label)
        let icon = 'web'
        let text = url.hostname
        if (url.hostname === 'www.google.com') {
          if (url.pathname.startsWith('/maps/@')) {
            if (url.pathname.includes('/data=')) {
              text = 'Google Streetview'
              icon = 'streetview'
            } else {
              text = 'Google Map'
              icon = 'map'
            }
          }
          if (url.pathname.startsWith('/maps/place')) {
            text = 'Google Place'
            icon = 'place'
          }
        }
        return {
          id: x.id,
          label: x.label,
          text: text,
          icon: icon
        }
      })
    }
  },
  methods: {
    editweblink (id) {
      this.edit_dialog.record = JSON.parse(JSON.stringify(this.weblinks.filter(function (x) {
        return x.id===id
      })[0]))
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
        data = data.trim()
        const weblinkrecord = {
          id: uuidv4(),
          label: data
        }
        if (!this.validate_weblink(weblinkrecord)) {
          return
        }
        const newweblinks = TTT.weblinks
        newweblinks.push(weblinkrecord)
        TTT.$emit("updateweblinks", newweblinks)
      })
    },
  }
})
</script>

<style>
</style>
