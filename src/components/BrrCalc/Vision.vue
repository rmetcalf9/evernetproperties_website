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
  emits: ['projectchanged'],
  data () {
    return {
      devplan: '',
      emit_project_change_notification: true
    }
  },
  computed: {
    serializer_card_data () {
      return {
        devplan: this.devplan
      }
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged')
      }
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
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.devplan = data_to_load.devplan

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  }
})
</script>
