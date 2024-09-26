<template>
  <div v-if="typeof (todo) !== 'undefined'" :class="get_item_class">
    <div class="col-grow">
      <div>Type: {{ get_todo_item_type(todo.type) }}</div>
      <div v-if="todo.group !== ''">Group: {{ todo.group }}</div>
      <div v-html="get_multiline_html(todo.description)"></div>
      <div>{{ due_date_text(todo) }}</div>
      <div v-if="todo.done">Completion Notes: {{ todo.done_text }}</div>
      <div v-if="todo.done">Date Completed: {{ done_date_text(todo.done_date) }}</div>
    </div>
    <div>
      <div v-if="!todo.done" class="todoitem-btn"><q-btn icon="edit" round color="secondary" @click="btn_edit(todo)" /></div>
      <div v-if="!todo.done" class="todoitem-btn"><q-btn icon="check" round color="secondary" @click="btn_mark_done(todo)" /></div>
      <div v-if="todo.done"><q-btn label="Mark Undone" color="secondary" @click="btn_mark_undone(todo)" /></div>
    </div>
    <q-dialog v-model="dialog_visible">
      <q-card class="todoitem-dialogcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Edit Todo ITem</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div>
            <div class="todoitem-dialogfield">
              <q-select
                v-model="dialog_data.type"
                :options="type_options"
                label="Type of Task"
                emit-value
                map-options
              />
            </div>
            <div class="todoitem-dialogfield col flex" v-if="dialog_data.type === 'other'">
              <q-input v-model="dialog_data.group" label="Grouping" class="col-grow" />
              <q-btn round dense flat icon="info" @click="helpgrouping" />
            </div>
            <div class="todoitem-dialogfield">
              <q-input
                v-model="dialog_data.description"
                label="Description"
                autogrow
                :rules="[ val => val.trim().length > 3 || 'Minimum 4 characters']"
                ref="field_description"
              />
            </div>
            <div class="todoitem-dialogfield">Due:
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
            <q-btn color="primary" icon="rule" label="Ok" @click="click_dialog_ok" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import common_constants from '../components/common_constants.js'

function days_between(date1, date2) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
}

export default defineComponent({
  name: 'BrrCalcTodoItem',
  props: ['todo'],
  emits: ['update_todo_item'],
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      dialog_visible: false,
      type_options: common_constants.todo_item_types,
      dialog_data: {
        description: '',
        type: 'other',
        group: '',
        due: 'UNCHANGED',
        loaded_todo: undefined
      },
      due_options: [
        {label: 'Unchanged', value: 'UNCHANGED'},
        {label: '1 Day', value: '1'},
        {label: '3 Days', value: '3'},
        {label: '5 Days', value: '5'}
      ]
    }
  },
  computed: {
    get_item_class () {
      if (this.todo.done) {
        return 'todoitem-tododoneitem'
      }
      if (this.todo.due) {
        return 'todoitem-duetodoitem flex col'
      }
      return 'todoitem-todoitem flex col'
    }
  },
  methods: {
    helpgrouping () {
      this.$q.dialog({
        title: 'Todo Item Grouping',
        message: 'The grouping field can be left blank. It can be used to group todo items together in displays.',
        html: false
      }).onOk(() => {
        // console.log('OK')
      })
    },
    get_multiline_html (text) {
      return text.replaceAll('\n', '<br/>')
    },
    get_todo_item_type (type) {
      return common_constants.todo_item_types.filter(function (x) {
        return x.value===type
      })[0].label
    },
    due_date_text (todo) {
      if (todo.due) {
        return 'Due by: NOW!'
      }
      const num_days_between = days_between(new Date(), new Date(todo.due_date))
      if (num_days_between === 1) {
        return 'Due in: ' + num_days_between + ' day'
      }
      return 'Due in: ' + num_days_between + ' days'
    },
    done_date_text (done_date) {
      const js_date_obj = new Date(done_date)
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return js_date_obj.toLocaleDateString("en-GB", options)
    },
    btn_edit(todo) {
      this.dialog_data.description = todo.description
      this.dialog_data.type = todo.type
      this.dialog_data.group = todo.group
      this.dialog_data.due = 'UNCHANGED'
      this.dialog_data.loaded_todo = todo

      this.dialog_visible = true
    },
    click_dialog_ok () {
      // This needs to be removed
      this.dialog_data.loaded_todo.description = this.dialog_data.description
      this.dialog_data.loaded_todo.type = this.dialog_data.type
      this.dialog_data.loaded_todo.group = this.dialog_data.group
      if (this.dialog_data.due !== 'UNCHANGED') {
        const days_until_due = parseInt(this.dialog_data.due)
        const due_date = new Date(new Date().getTime()+(days_until_due*24*60*60*1000))
        this.dialog_data.loaded_todo.due_date = due_date.toISOString()
      }
      this.exec_update_todo_item(this.dialog_data.loaded_todo)

      this.dialog_visible = false
    },    
    btn_mark_done (todo) {
      const TTT = this
      this.$q.dialog({
        title: 'Completion Notes',
        message: 'Description: ' + todo.description + ' - Enter notes around completion of this task.',
        html: false,
        ok: {
          push: true,
          label: 'Ok',
          color: 'primary'
        },
        cancel: {
          push: true,
          label: 'Cancel',
          color: 'secondary'
        },
        prompt: {
          model: todo.done_text,
          type: 'text' // optional
        },
      }).onOk((data) => {
        todo.done_text = data
        todo.done = true
        TTT.exec_update_todo_item(todo)
      })
    },
    btn_mark_undone (todo) {
      todo.done = false
      this.exec_update_todo_item(todo)
    },
    exec_update_todo_item (todo) {
      const TTT = this
      const callback = {
        ok: function (response) {
          TTT.$emit('update_todo_item', response.data.todo)
        },
        error: function (response) {
          Notify.create({
            color: 'bg-grey-2',
            message: response.message,
            timeout: 2000,
            color: 'negative'
          })
        }
      }
      TTT.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/projects/' + TTT.$route.query.projectid + '/todos',
        method: 'POST',
        data: todo,
        callback: callback
      })
    }
  }
})
</script>

<style>
.todoitem-duetodoitem {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: lightgrey;
  background-color: darkred;
}
.todoitem-todoitem {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: lightgrey;
  background-color: grey;
}
.todoitem-tododoneitem {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: lightgrey;
  background-color: lightgrey;
  color: black;
}
.todoitem-btn {
  padding: 5px;
}
.todoitem-dialogcard {
  min-width:50%;
}
.todoitem-dialogfield {
  padding: 10px;
}

</style>
