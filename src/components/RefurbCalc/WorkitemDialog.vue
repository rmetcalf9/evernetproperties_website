<template>
<q-dialog v-model="visible">
  <q-card>
    <q-toolbar>
      <q-toolbar-title v-if="!editMode">Add Work item</q-toolbar-title>
      <q-toolbar-title v-if="editMode">Edit Work item</q-toolbar-title>
      <q-btn v-if="editMode" flat round dense icon="delete" @click="deletee" />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      Enter description of work
      <q-input
        ref="urlInput"
        filled
        color="grey"
        v-model="description"
        name="Description of work"
        label="Description"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Enter description of work to be done']"
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
  name: 'AddWorkitemDialog',
  data () {
    return {
      visible: false,
      editMode: false,
      description: '',
      nodeid: undefined,
      nodeCords: undefined
    }
  },
  methods: {
    deletee () {
      this.visible = false
      this.$emit('deletee', {
        nodeid: this.nodeid
      })
    },
    ok () {
      if (this.$refs.urlInput.validate()) {
        this.visible = false
        let node = {
          type: 'WORK',
          cords: this.nodeCords,
          description: this.description
        }
        this.$emit('ok', {
          editMode: this.editMode,
          node: node
        })
      }
    },
    cancel () {
      this.visible = false
    },
    launchDialog (nodeCords, editMode, description, nodeid) {
      this.nodeCords = nodeCords
      this.editMode = editMode
      this.okdisabled = true
      if (editMode) {
        this.description = description
        this.nodeid = nodeid
      } else {
        this.description = ''
      }
      var TTT = this

      TTT.visible = true // Must be visible for ref to exist
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
