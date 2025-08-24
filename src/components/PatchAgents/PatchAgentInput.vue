<template>
  <div class="row">
    <q-input
      filled
      clearable
      :model-value="selling_agent"
      @update:model-value="updateSellingAgent"
      label="Selling Agent"
      class="col"
    />
    <q-btn
      v-if="ever_saved"
      :color="notesbtncolour"
      @click="notesbtnclick"
      class="patchagentinput-notesbutton"
      :icon="notesbtnicon"
    />
    <q-btn
      v-if="ever_saved && selling_agent_id !== ''"
      color="primary"
      @click="updateSellingAgentId('')"
      class="patchagentinput-notesbutton"
      label="tmpdis"
    />
    <q-dialog v-model="add_dialog.visible">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add notes to selling agent</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row">
            <q-input
              filled
              clearable
              v-model="add_dialog.agent_name"
              label="Agent Name"
              class="col"
            />
            <q-btn
              color="primary"
              @click="createbtnclick"
              :label="adddialogcreatebuttonlabel"
              class="patchagentinput-adddialogcreatebutton"
            />
          </div>
          <div>
            <q-virtual-scroll
              style="height: 200px;"
              :items="known_agent_list"
              separator
              v-slot="{ item, index }"
            >
              <q-item
                :key="index"
                dense
              >
                <q-item-section @click="this.add_dialog.agent_name = item.label">
                  <q-item-label>
                    {{ item.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-virtual-scroll>
          </div>
          <q-card-actions align="right" class="text-primary">
            <q-btn label="Cancel" @click="this.add_dialog.visible = false" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PatchAgentInput',
  props: ['ever_saved', 'patch_id', 'selling_agent', 'selling_agent_id'],
  emits: ['update:selling_agent', 'update:selling_agent_id'],
  data () {
    return {
      add_dialog: {
        visible: false,
        agent_name: ''
      }
    }
  },
  computed: {
    notesbtnicon () {
      if (this.selling_agent_id === '') {
        return 'note_add'
      }
      return 'edit_document'
    },
    notesbtncolour () {
      if (this.selling_agent_id === '') {
        return 'undefined'
      }
      return 'primary'
    },
    add_dialog_linking_item () {
      const TTT = this
      const link_targets = this.known_agent_list_unfiltered.filter(function (x) {
        const agentName = TTT?.add_dialog?.agent_name
        if (agentName == null || agentName === '') {
          return false
        }
        return x.label.toLowerCase() === TTT.add_dialog.agent_name.toLowerCase()
      })
      if (link_targets.length === 0) {
        return {id: undefined, label: 'None'}
      }
      return link_targets[0]
    },
    adddialogcreatebuttonlabel () {
      if (typeof (this.add_dialog_linking_item.id) === 'undefined') {
        return 'Create'
      }
      return 'Link'
    },
    known_agent_list_unfiltered () {
      var ret_val = []
      for (let i = 0; i < 10; i++) {
        ret_val.push({
          id: i.toString(),
          label: 'Abce' + i.toString()
        })
      }
      return ret_val
    },
    known_agent_list () {
      const TTT = this
      return this.known_agent_list_unfiltered.filter(function (x) {
        const agentName = TTT?.add_dialog?.agent_name
        if (agentName == null || agentName === '') {
          return true
        }
        return x.label.toLowerCase().includes(TTT.add_dialog.agent_name.toLowerCase())
      })
    }
  },
  methods: {
    updateSellingAgent (value) {
      this.$emit('update:selling_agent', value)
    },
    updateSellingAgentId (value) {
      this.$emit('update:selling_agent_id', value)
    },
    notesbtnclick () {
      if (!this.ever_saved) {
        return // can not connect to notes if not saved
      }
      if (this.selling_agent_id === '') {
        this.add_dialog.agent_name = this.selling_agent
        this.add_dialog.visible = true
        // this.updateSellingAgentId('a')
        // this.updateSellingAgent('a')
      } else {
        console.log('TODO show edit existing notes dialog')
        // this.updateSellingAgentId('')
        // this.updateSellingAgent('SET BLANK')
      }
    },
    createbtnclick () {
      if (typeof (this.add_dialog_linking_item.id) === 'undefined') {
        console.log('TODO create button click')
      } else {
        console.log('TODO link button click')
        console.log('link to ', this.add_dialog_linking_item)
      }
    }
  }
})

</script>

<style>
.patchagentinput-notesbutton {
  margin: 10px;
}
.patchagentinput-adddialogcreatebutton {
  margin: 10px;
}
</style>
