<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">GDV (Gross Development Value) </div>
      <div class="text-subtitle2">This is the estimated final value of the property after works are complete</div>
    </q-card-section>
    <q-card-section>
      <div class="col" v-for="gdvitem in gdvitems" :key='gdvitem.id'>
        <div class="row">
          <q-input v-model="gdvitem.name" label="Item" />
          <div class="col-grow" style="align-self: flex-end;">{{ format_currency(gdvitem.gdvrange.min) }} - {{ format_currency(gdvitem.gdvrange.max) }}</div>
          <q-btn round icon="delete" @click="delrow(gdvitem.id)" v-if="this.gdvitems.length > 1" />
        </div>
        <div class="col-grow ">
          <SliderWithTextInput
            ref="slider"
            v-model:range="gdvitem.gdvrange"
            @update:range="updateisvalid"
            min_prefix="Worst £"
            max_prefix="Best £"
            min_label_text="Worst Price"
            max_label_text="Best Price"
          />
        </div>
      </div>
      <q-btn round  color="primary" icon="add" @click="addgdvitem" />
      <div>If the property is to be split into flats add the GDV of each above and the number below is the total GDV.</div>
      <div class="text-h6">Total: {{ format_currency(totalmin) }} - {{ format_currency(totalmax) }}</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'
import SliderWithTextInput from '../../components/SliderWithTextInput.vue'

export default defineComponent({
  name: 'BrrCalcGdv',
  emits: ['projectchanged'],
  components: {
    SliderWithTextInput
  },
  data () {
    return {
      gdvitems: [{
        id: 1,
        name: '',
        gdvrange: {
          min: 400000,
          max: 600000
        }
      }],
      isValid: true,
      emit_project_change_notification: true
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    addgdvitem () {
      var last_id = Math.max(...this.gdvitems.map(o => o.id))
      this.gdvitems.push({
        id: last_id + 1,
        name: '',
        gdvrange: {
          min: 400000,
          max: 600000
        }
      })
      this.updateisvalid()
    },
    delrow (id) {
      if (this.gdvitems.length < 2) {
        return
      }
      this.gdvitems = this.gdvitems.filter(function(el) { return el.id != id; });
      this.updateisvalid()
    },
    updateisvalid () {
      const TTT = this
      setTimeout(function () {
        let valid = true
        TTT.$refs.slider.forEach(function (element) {
          if (!element.isValid) {
            valid = false
          }
        })
        TTT.isValid = !TTT.isValid
        TTT.isValid = valid
      }, 5)
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.gdvitems = data_to_load.gdvitems

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  },
  computed: {
    totalmin () {
      return [...this.gdvitems.map(o => o.gdvrange.min)].reduce((a, b) => a + b, 0)
    },
    totalmax () {
      return [...this.gdvitems.map(o => o.gdvrange.max)].reduce((a, b) => a + b, 0)
    },
    total () {
      return {
        min: this.totalmin,
        max: this.totalmax
      }
    },
    serializer_card_data () {
      return {
        gdvitems: this.gdvitems
      }
    }
  },
  watch: {
    total(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged')
      }
    }
  }
})
</script>
