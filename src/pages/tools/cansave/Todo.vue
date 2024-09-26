<template>
  <q-page class="todopageclass">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <h1>My Todos</h1>
      <div v-if="!table_mode">
        <div>
          <div class="flex">Due:
              <q-option-group
                v-model="group_by"
                :options="group_by_options"
                color="primary"
                inline
              />
          </div>
        </div>
        <div v-for="group in display_groups" :key="group.name">
          <h2>{{ group.name }}</h2>
          <div v-for="todo_item in group.items" :key="todo_item.id">
            {{ todo_item }}
          </div>
        </div>
      </div>
      <q-table
        v-if="table_mode"
        flat bordered
        title="Todo Items"
        :rows="loaded_todo_data"
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        no-data-label="No todos foudn"
        no-results-label="No results matching this filter"
        row-key="name"
      >
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'ToolsCansaveTodoPage',
  components: {
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
      table_mode: false,
      loaded_todo_data: undefined,
      group_by: 'group',
      group_by_options: [
        {label: 'None', value: 'none'},
        {label: 'Group', value: 'group'},
        {label: 'Project', value: 'project'}
      ],
      filter: '',
      columns: [
        {
          name: 'project',
          required: true,
          label: 'Project',
          align: 'left',
          field: 'project_name',
          sortable: true
        },
        {
          name: 'group',
          required: true,
          label: 'Group',
          align: 'left',
          field: 'group',
          sortable: true
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true
        },
        {
          name: 'due',
          required: true,
          label: 'Due',
          align: 'left',
          field: 'due',
          sortable: true
        },
        {
          name: 'due_date',
          required: true,
          label: 'Due Date',
          align: 'left',
          field: 'due_date',
          sortable: true
        },
        {
          name: 'done',
          required: true,
          label: 'Done',
          align: 'left',
          field: 'done',
          sortable: true
        },
        {
          name: 'done_date',
          required: true,
          label: 'Done Date',
          align: 'left',
          field: 'done_date',
          sortable: true
        }
      ],
      initialPagination: {
        // sortBy: 'desc',
        // descending: false,
        // page: 2,
        rowsPerPage: 50
      }
    }
  },
  computed: {
    display_groups () {
      const TTT = this
      if (this.group_by === 'none') {
        return [{
          name: '',
          items: this.loaded_todo_data
        }]
      }
      let ret_val = []
      let groups = {
        '': {
          name: '',
          filter: undefined
        }
      }
      this.loaded_todo_data.forEach( function (item) {
        if (TTT.group_by === 'group') {
          groups[item.group] = {
            name: item.group,
            filter: function (x) {
              return x.group === item.group
            }
          }
        }
        if (TTT.group_by === 'project') {
          groups[item.project_name] = {
            name: item.project_name,
            filter: function (x) {
              return true
            }
          }
        }
      })
      Object.keys(groups).map(function (x) {
        if (typeof (groups[x].filter) !== 'undefined') {
          let name = groups[x].name
          if (name === '') {
            name = 'No Group'
          }
          ret_val.push({
            'name': name,
            'items': TTT.loaded_todo_data.filter(groups[x].filter)
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
.todopageclass {
  margin-left: 5%;
  margin-right: 5%;
}
.todopageclass h1 {
  font-size: 4rem;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
}
.todopageclass h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0px;
}
</style>
