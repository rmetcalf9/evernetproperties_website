<template>
  <div>
    <div v-for="weblink in weblinkdisplay" :key="weblink" >
      <q-chip clickable @click="clickweblink(weblink)" removable @remove="delweblink(weblink.id)" color="primary" text-color="white" :icon="weblink.icon">
        {{ weblink.text }}
      </q-chip>
    </div>
    <q-btn round color="primary" icon="add" @click="addweblink" />
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
    clickweblink (weblink) {
      window.open(weblink.label, '_blank').focus()
    },
    delweblink (id) {
      const newweblinks = this.weblinks.filter(function (weblink) {
        return id !== weblink.id
      })
      this.$emit("updateweblinks", newweblinks)
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
        if (!data.startsWith('http')) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Link must start with http',
            timeout: 2000,
            color: 'negative'
          })
          return
        }
        const newweblinks = TTT.weblinks
        newweblinks.push({
          id: uuidv4(),
          label: data
        })
        TTT.$emit("updateweblinks", newweblinks)
      })
    },
  }
})
</script>

<style>
</style>
