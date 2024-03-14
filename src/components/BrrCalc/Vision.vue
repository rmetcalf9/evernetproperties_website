<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Vision</div>
      <div class="row">
        <q-input v-model="devplan" label="What is the development plan?" class="col-grow" />
        <q-btn round  color="primary" icon="info" @click="helpdevplan" />
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BrrCalcVision',
  data () {
    return {
      devplan: ''
    }
  },
  methods: {
    helpdevplan () {
      this.$q.dialog({
        title: 'What is the development plan?',
        message: 'Enter the development plan. E.g. Split into two flats'
      }).onOk(() => {
        // console.log('OK')
      })
    }
  }
})
</script>
