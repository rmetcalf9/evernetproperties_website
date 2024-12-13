<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Vision</div>
      <div class="row">
        <q-input v-model="devplan" autogrow label="What is the development plan?" class="col-grow" />
        <div>
          <q-btn round  color="primary" icon="info" @click="helpdevplan" />
        </div>
      </div>
      &nbsp;
      <div class="text-h6">Strategies</div>
      <div><q-checkbox v-model="strategy.flip" label="Flip" @click="setchanged"/></div>
      <div><q-checkbox v-model="strategy.hmo" label="HMO" @click="setchanged"/></div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

function get_default_strategy () {
  return {
    flip: false,
    hmo: false
  }
}

export default defineComponent({
  name: 'BrrCalcVision',
  emits: ['projectchanged'],
  data () {
    return {
      devplan: '',
      strategy: get_default_strategy(),
      emit_project_change_notification: true
    }
  },
  computed: {
    serializer_card_data () {
      return {
        devplan: this.devplan,
        strategy: this.strategy
      }
    }
  },
  watch: {
    serializer_card_data(val) {
      this.setchanged()
    }
  },
  methods: {
    setchanged () {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'Vision')
      }
    },
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
      if (typeof (data_to_load.strategy) === 'undefined') {
        this.strategy = get_default_strategy()
      } else {
        this.strategy.flip = data_to_load.strategy.flip
        this.strategy.hmo = data_to_load.strategy.hmo
      }

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  }
})
</script>
