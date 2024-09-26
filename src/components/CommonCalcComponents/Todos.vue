<template>
  <div>
    <q-card inline class="q-ma-sm card-style featurecard col-grow">
      <q-card-section>
        <div class="text-h6 todos-card-head"><q-icon name="rule" size="30px" /> Todo Items</div>
        <div style="width: 100%; max-width: 400px">
          <div v-for="group in Object.keys(todo_groups)" :key='group'>
            <div v-if="(due_todos(group).length +  notdone_todos(group).length) > 0">
              <div v-if="group !== ''" class="todos-grouptitle">{{ group }}</div>
              <div>
                <div v-for="todo in due_todos(group)" :key='todo.id'>
                  <TodoItem
                    :todo="todo"
                    @update_todo_item='update_todo_item'
                  />
                </div>
                <div v-for="todo in notdone_todos(group)" :key='todo.id'>
                  <TodoItem
                    :todo="todo"
                    @update_todo_item='update_todo_item'
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>Completed Items</div>
            <div v-for="todo in done_todos" :key='todo.id'>
              <TodoItem
                :todo="todo"
                @update_todo_item='update_todo_item'
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import common_constants from '../../components/common_constants.js'
import TodoItem from '../../components/TodoItem.vue'

export default defineComponent({
  name: 'BrrCalcTodos',
  components: {
    TodoItem
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      todos: []
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
    serializer_load_data (todos) {
      this.todos = todos
    },
    add_single_todo (item) {
      // Called when user manually adds
      this.todos.push(item)
    },
    update_todo_item (todo) {
      const TTT = this
      TTT.todos = TTT.todos.map(function(x) {
        if (x.id == todo.id) {x = todo}
        return x
      })
    }
  }
})
</script>

<style>
.todos-card-head {
  padding-bottom: 10px;
}
.todos-grouptitle {
  font-weight: 600;
}
.todos-btn {
  padding: 5px;
}
</style>
