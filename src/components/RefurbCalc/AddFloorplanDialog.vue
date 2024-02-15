<template>
  <q-dialog v-model="visible">
    <q-layout view="Lhh lpR fff" container class="bg-white" style="width: 700px; max-width: 80vw;">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            Add floorplan
          </q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <div>AAAA</div>
          <div>&nbsp;</div>
          <q-btn
            @click="ok"
            color="primary"
            label="Ok"
            class = "float-right q-ml-xs"
          />
          <q-btn
            @click="cancel"
            label="Cancel"
            class = "float-right"
          />
        </q-page>
      </q-page-container>

    </q-layout>
  </q-dialog>
</template>

<script>

export default {
  name: 'AddFloorplanDialog',
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    ok () {
      this.visible = false
      this.$emit('ok', {
      
      })
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
</style>
