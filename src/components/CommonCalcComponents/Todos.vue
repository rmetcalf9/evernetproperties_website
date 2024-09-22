<template>
  <q-card inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Todo Items</div>
      <div style="width: 100%; max-width: 400px">
        TODO {{ todos }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BrrCalcTodos',
  data () {
    return {
      todos: [],
    }
  },
  computed: {
  },
  methods: {
    serializer_load_data (todos) {
      this.todos = todos
    },
    add_single_todo (item) {
      // Called when user manually adds
      this.todos.push(item)
    }
  }
})
</script>
