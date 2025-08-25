<template>
  <div class="brrcalctoolbar-todobutton">
    <q-btn color="primary" icon="rule" label="Add TODO" @click="open_dialog" />
    <q-dialog v-model="dialog_visible">
      <q-card class="brrcalctoolbar-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Log todo task for this project</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div>
            <div class="brrcalctoolbar-field">
              <q-select
                v-model="dialog_data.type"
                :options="type_options"
                label="Type of Task"
                emit-value
                map-options
              />
            </div>
            <div class="brrcalctoolbar-field col flex" v-if="dialog_data.type === 'other'">
              <q-input v-model="dialog_data.group" label="Grouping" class="col-grow" />
              <q-btn round dense flat icon="info" @click="helpgrouping" />
            </div>
            <div class="brrcalctoolbar-field">
              <q-input
                v-model="dialog_data.description"
                label="Description"
                autogrow
                :rules="[ val => val.trim().length > 3 || 'Minimum 4 characters']"
                ref="field_description"
              />
            </div>
            <div class="brrcalctoolbar-field">How long until it's due:
                <q-option-group
                  v-model="dialog_data.due"
                  :options="due_options"
                  color="primary"
                  inline
                />
            </div>
          </div>
          <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancel" @click="this.dialog_visible = false" />
            <q-btn color="primary" icon="rule" label="Ok" @click="click_ok" :disable="isDisabled" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import utils from '../../../components/utils.js'
import common_constants from '../../../components/common_constants.js'
import { uuidv4 } from 'node-common-library'

function default_dialog_data () {
  return {
    due: '1',
    description: '',
    type: 'other',
    group: ''
  }
}

export default defineComponent({
  name: 'BrrCalcToolbarTodoButton',
  emits: ['createtodo'],
  data () {
    return {
      dialog_visible: false,
      dialog_data: default_dialog_data(),
      type_options: common_constants.todo_item_types,
      due_options: [
        {label: '1 Day', value: '1'},
        {label: '3 Days', value: '3'},
        {label: '5 Days', value: '5'}
      ]
    }
  },
  computed: {
    isDisabled () {
      return false
    }
  },
  methods: {
    open_dialog () {
      this.dialog_data = default_dialog_data()
      this.dialog_visible = true
    },
    click_ok () {
      this.$refs.field_description.validate()
      if (this.$refs.field_description.hasError) {
        return
      }

      let group = this.dialog_data.group
      if (this.dialog_data.type === 'agent') {
        group = '' // autocaculated by backend
      }
      if (this.dialog_data.type === 'sourcer') {
        group = '' // autocaculated by backend
      }

      const days_until_due = parseInt(this.dialog_data.due)
      const due_date = new Date(new Date().getTime()+(days_until_due*24*60*60*1000))

      const post_data = {
          'id': uuidv4(),
          'weight': '100',
          'due_date': due_date.toISOString(),
          'description': this.dialog_data.description,
          'done': false,
          'done_date': '',
          'group': group,
          'type': this.dialog_data.type,
          'done_text': ''
      }
      this.$emit('createtodo', post_data)
      this.dialog_visible = false
    },
    helpgrouping () {
      this.$q.dialog({
        title: 'Todo Item Grouping',
        message: 'The grouping field can be left blank. It can be used to group todo items together in displays.',
        html: false
      }).onOk(() => {
        // console.log('OK')
      })
    }
  }
})
</script>

<style>
.brrcalctoolbar-card {
  min-width:50%;
}
.brrcalctoolbar-todobutton {
  padding: 10px;
}
.brrcalctoolbar-field {
  padding: 10px;
}
</style>
