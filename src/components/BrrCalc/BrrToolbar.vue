<template>
  <div class="brrcalctoolbar">
    <q-btn color="primary" icon="call" label="Selling agent" @click="click_selling_agent_btn" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BrrCalcToolbar',
  emits: ['activity_log'],
  data () {
    return {
    }
  },
  methods: {
    click_selling_agent_btn () {
      const obj = {
        type: 'call_agent',
        text: 'TODO code to allow user to input',
        head_notes: undefined
      }
      this.$emit('activity_log', obj)
    }
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
</style>
