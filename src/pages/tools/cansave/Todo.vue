<template>
  <q-page class="todopageclass">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded">
      <h1>My Todos</h1>
      <q-table
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
      <div>TODO {{ loaded_todo_data }}</div>
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
      loaded_todo_data: undefined,
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
        url: '/me/todos',
        method: 'GET',
        data: undefined,
        callback: callback
      })
    },
    refresh_success (response) {
      this.loaded_todo_data = response.data.todos
      Notify.create({
        color: 'negative',
        message: 'Not implemented',
        timeout: 2000
      })
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
  font-size: 3rem;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
