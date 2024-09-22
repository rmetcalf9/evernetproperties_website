<template>
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
              <div><q-btn icon="check" round color="secondary" @click="btn_mark_done(todo, true)" /></div>
            </div>
            <div v-for="todo in notdone_todos(group)" :key='todo.id' class="todos-todoitem flex col">
              <div class="col-grow">
                <div>Type: {{ get_todo_item_type(todo.type) }}</div>
                <div>{{ todo.description }}</div>
                <div>Due in: {{ due_date_text(todo.due_date) }}</div>
              </div>
              <div><q-btn icon="check" round color="secondary" @click="btn_mark_done(todo, true)" /></div>
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
            <div><q-btn label="Mark Undone" color="secondary" @click="btn_mark_undone(todo, false)" /></div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
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
    }
  },
  computed: {
    todo_groups () {
      let groups = {}
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
    btn_mark_done (todo, isdone) {
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
        TTT.exec_mark_done(todo, true)
      })
    },
    btn_mark_undone (todo, isdone) {
      this.exec_mark_done(todo, false)
    },
    exec_mark_done (todo, isdone) {
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
      todo.done = isdone
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
</style>
