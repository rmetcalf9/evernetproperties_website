<template>
  <div class="tododisplayclass">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <div>
        <div>
          <div class="flex">Group:
              <q-option-group
                v-model="group_by"
                :options="group_by_options"
                color="primary"
                inline
              />
          </div>
        </div>
        <div v-for="group in display_groups" :key="group.name">
          <div v-if="typeof (group.link_url) === 'undefined'">
            <h2>{{ group.name }}</h2>
          </div>
          <div v-if="typeof (group.link_url) !== 'undefined'">
            <h2>{{ group.name }} <q-btn color="primary" icon="arrow_forward" @click="$router.push(group.link_url)" /></h2>
          </div>
          <div class="row">
            <div v-for="todo_item in group.due_items" :key="todo_item.id">
              <TodoItem
                :todo="todo_item"
                :include_project="group_by != 'project'"
                @update_todo_item='refresh'
              />
            </div>
            <div v-for="todo_item in group.nondue_items" :key="todo_item.id">
              <TodoItem
                :todo="todo_item"
                :include_project="group_by != 'project'"
                @update_todo_item='refresh'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import TodoItem from './TodoItem.vue'

export default defineComponent({
  name: 'TodoDisplayComponent',
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
      loaded: false,
      loaded_todo_data: undefined,
      group_by: 'group',
      group_by_options: [
        {label: 'None', value: 'none'},
        {label: 'Group', value: 'group'},
        {label: 'Project', value: 'project'}
      ]
    }
  },
  computed: {
    display_groups () {
      const TTT = this
      let ret_val = []
      let groups = {
        '': {
          name: '',
          link_url: undefined,
          filter: undefined
        }
      }
      if (this.group_by === 'none') {
        groups[''] = {
          name: '',
          filter: function (x) {
            return true
          }
        }
      } else {
        this.loaded_todo_data.forEach( function (item) {
          if (TTT.group_by === 'group') {
            groups[item.group] = {
              name: item.group,
              link_url: undefined,
              filter: function (x) {
                return x.group === item.group
              }
            }
          }
          if (TTT.group_by === 'project') {
            groups[item.project_name] = {
              name: item.project_name,
              link_url: '/tools/brrcalc?projectid=' + item.project_id,
              filter: function (x) {
                return x.project_id === item.project_id
              }
            }
          }
        })
      }
      Object.keys(groups).map(function (x) {
        if (typeof (groups[x].filter) !== 'undefined') {
          let name = groups[x].name
          if (name === '') {
            name = 'Ungrouped'
          }
          ret_val.push({
            name: name,
            link_url: groups[x].link_url,
            due_items: TTT.loaded_todo_data.filter(groups[x].filter).filter(function (x) { return x.due }),
            nondue_items: TTT.loaded_todo_data.filter(groups[x].filter).filter(function (x) { return !x.due })
          })
        }
      })
      return ret_val
    }
  },
  methods: {
    refresh () {
      const TTT = this
      const callback = {
        ok: TTT.refresh_success,
        error: function (response) {
          Notify.create({
            color: 'negative',
            message: 'Failed to load todos',
            timeout: 2000
          })
          TTT.$router.push('/tools')
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/me/todos?done=false',
        method: 'GET',
        data: undefined,
        callback: callback
      })
    },
    refresh_success (response) {
      this.loaded_todo_data = response.data.todos
      this.loaded = true
    }
  },
  mounted () {
    this.loaded = false
    this.refresh()
  }
})
</script>

<style>
.tododisplayclass {
}
.tododisplayclass h1 {
  font-size: 4rem;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
}
.tododisplayclass h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0px;
}

</style>
