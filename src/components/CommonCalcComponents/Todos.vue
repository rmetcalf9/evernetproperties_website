<template>
  <div>
    <q-card inline class="q-ma-sm card-style featurecard col-grow">
      <q-card-section>
        <div class="text-h6">Todo Items</div>
        <div style="width: 100%; max-width: 400px">
          <div v-for="group in Object.keys(todo_groups)" :key='group'>
            <div v-if="group !== ''" class="todos-grouptitle">{{ group }}</div>
            <div>
              <div v-for="todo in due_todos(group)" :key='todo.id' class="todos-duetodoitem flex col">
                <div class="col-grow">
                  <div>Type: {{ get_todo_item_type(todo.type) }}</div>
                  <div>{{ todo.description }}</div>
                  <div>Due by: NOW!</div>
                </div>
                <div><q-btn icon="check" round color="secondary" @click="btn_mark_done(todo)" /></div>
              </div>
              <div v-for="todo in notdone_todos(group)" :key='todo.id' class="todos-todoitem flex col">
                <div class="col-grow">
                  <div>Type: {{ get_todo_item_type(todo.type) }}</div>
                  <div>{{ todo.description }}</div>
                  <div>Due in: {{ due_date_text(todo.due_date) }}</div>
                </div>
                <div class="todos-btn"><q-btn icon="edit" round color="secondary" @click="btn_edit(todo)" /></div>
                <div class="todos-btn"><q-btn icon="check" round color="secondary" @click="btn_mark_done(todo)" /></div>
              </div>
            </div>
          </div>
          <div>
            <div>Completed Items</div>
            <div v-for="todo in done_todos" :key='todo.id' class="todos-tododoneitem flex col">
              <div class="col-grow">
                <div>Type: {{ get_todo_item_type(todo.type) }}</div>
                <div v-if="todo.group !== ''">Group: {{ todo.group }}</div>
                <div>{{ todo.description }}</div>
                <div>Completion Notes: {{ todo.done_text }}</div>
                <div>Date Completed: {{ done_date_text(todo.done_date) }}</div>
              </div>
              <div><q-btn label="Mark Undone" color="secondary" @click="btn_mark_undone(todo)" /></div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog_visible">
      <q-card class="todos-dialogcard">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Edit Todo ITem</div>
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
            <div class="brrcalctoolbar-field">Due:
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
import common_constants from '../../components/common_constants.js'

function days_between(date1, date2) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
}

export default defineComponent({
  name: 'BrrCalcTodos',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      todos: [],
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
    todo_groups () {
      // Make sure blank group is FIRST
      let groups = { '': true }
      this.todos.forEach(function (x) {
        groups[x.group] = true
      })
      return groups
    },

    done_todos () {
      return this.todos.filter(function (x) {
        return x.done === true
      })
    }
  },
  methods: {
    click_dialog_ok () {
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
    helpgrouping () {
      this.$q.dialog({
        title: 'Todo Item Grouping',
        message: 'The grouping field can be left blank. It can be used to group todo items together in displays.',
        html: false
      }).onOk(() => {
        // console.log('OK')
      })
    },
    btn_edit(todo) {
      this.dialog_data.description = todo.description
      this.dialog_data.type = todo.type
      this.dialog_data.group = todo.group
      this.dialog_data.due = 'UNCHANGED'
      this.dialog_data.loaded_todo = todo

      this.dialog_visible = true
    },
    due_todos (group) {
      return this.todos.filter(function (x) {
        return (x.group === group) && (x.done === false) && (x.due === true)
      })
    },
    notdone_todos (group) {
      return this.todos.filter(function (x) {
        return (x.group === group) && (x.done === false) && (x.due === false)
      })
    },
    get_todo_item_type (type) {
      return common_constants.todo_item_types.filter(function (x) {
        return x.value===type
      })[0].label
    },
    due_date_text (due_date) {
      const num_days_between = days_between(new Date(), new Date(due_date))
      if (num_days_between === 1) {
        return num_days_between + ' day'
      }
      return num_days_between + ' days'
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
    serializer_load_data (todos) {
      this.todos = todos
    },
    add_single_todo (item) {
      // Called when user manually adds
      this.todos.push(item)
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
          TTT.todos = TTT.todos.map(function(x) {
            if (x.id == todo.id) {x = response.data.todo}
            return x
          })
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
.todos-grouptitle {
  font-weight: 600;
}
.todos-duetodoitem {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: darkred;
  background-color: grey;
}
.todos-todoitem {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: lightgrey;
  background-color: grey;
}
.todos-tododoneitem {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
  border-color: lightgrey;
  background-color: lightgrey;
  color: black;
}
.todos-btn {
  padding: 5px;
}
.todos-dialogcard {
  min-width:50%;
}
</style>
