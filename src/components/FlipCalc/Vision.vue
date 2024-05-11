<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Flip Vision</div>
      <div class="row">
        <q-input v-model="devplan" label="What is the way to increase GDV in this flip?" class="col-grow" />
        <q-btn round  color="primary" icon="info" @click="helpdevplan" />
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FlipCalcVision',
  data () {
    return {
      devplan: ''
    }
  },
  methods: {
    helpdevplan () {
      this.$q.dialog({
        title: 'What is the plan for this flip?',
        message: 'This is the way we will increase the value between buying and selling.'
      }).onOk(() => {
        // console.log('OK')
      })
    }
  }
})
</script>
