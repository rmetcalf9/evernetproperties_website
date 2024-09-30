<template>
  <q-page class="todopageclass">
    <h1>My Todos</h1>
    <TodoDisplay
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import { Notify } from 'quasar'
import TodoDisplay from '../../../components/TodoDisplay.vue'

export default defineComponent({
  name: 'ToolsCansaveTodoPage',
  components: {
    TodoDisplay
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
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
</style>
