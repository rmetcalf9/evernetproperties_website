<template>
<q-dialog v-model="visible">
  <q-card>
    <q-toolbar>
      <q-toolbar-title>Add Floorplan</q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      Enter a web accessible URL for an image of the floorplan
      <q-input
        ref="urlInput"
        filled
        color="grey"
        v-model="floorplan_url"
        name="Floorplan Image URL"
        label="URL"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Enter URL']"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="OK" color="black" @click="ok" />
      <q-btn flat label="Cancel" color="primary" @click="cancel" />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script>

export default {
  name: 'AddFloorplanDialog',
  data () {
    return {
      visible: false,
      floorplan_url: ''
    }
  },
  methods: {
    ok () {
      if (this.$refs.urlInput.validate()) {
        this.visible = false
        this.$emit('ok', {
          floorplan_url: this.floorplan_url
        })
      }
    },
    cancel () {
      this.visible = false
    },
    launchDialog () {
      this.okdisabled = true
      var TTT = this

      TTT.visible = true // Must be visible for ref to exist
      // setTimeout(function () {
      // Highlight default field
      // TODO Highlight default
      // TTT.$refs.main.focus()
      // }, 5)
    }
  },
  computed: {
  }
}
</script>

<style>
.dialog-class {

}
</style>
