<template>
  <div v-if="!is_valid_input" class="invalidmessage col-grow">
    <q-icon name="warning" />Warning: Invalid input data!
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'InvalidMessage',
  props: ['is_valid_input'],
  data () {
  }
})
</script>

<style>
.invalidmessage {
  background-color: white;
  color: red;
  margin: 15px;
  padding: 10px;
  font-size: large;
}
</style>
