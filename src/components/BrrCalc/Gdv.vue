<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">GDV (Gross Development Value) </div>
      <div class="text-subtitle2">This is the estimated final value of the property after works are complete</div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <q-input v-model="devplan" label="What is the development plan?" class="col-grow" />
        <q-btn round  color="primary" icon="info" @click="helpdevplan" />
      </div>
      <div class="col" v-for="gdvitem in gdvitems" :key='gdvitem.id'>
        <div class="row">
          <q-input v-model="gdvitem.name" label="Item" />
          <div class="col-grow" style="align-self: flex-end;">£{{ gdvitem.gdvrange.min }} - £{{ gdvitem.gdvrange.max }}</div>
          <q-btn round icon="delete" @click="delrow(gdvitem.id)" v-if="this.gdvitems.length > 1" />
        </div>
        <div class="col-grow ">
          &nbsp;
          <q-range
            v-model="gdvitem.gdvrange"
            :min="0"
            :max="1000000"
            :step="10000"
            drag-range
            label
            :left-label-value="'Worst £' + gdvitem.gdvrange.min / 1000 + 'k'"
            :right-label-value="'Best £' + gdvitem.gdvrange.max / 1000 + 'k'"
          />
        </div>
      </div>
      <q-btn round  color="primary" icon="add" @click="addgdvitem" />
      <div>If the property is to be split into flats add the GDV of each above and the number below is the total GDV.</div>
      <div class="text-h6">Total: £{{ totalmin }} - £{{totalmax }}</div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'BrrCalcGdv',
  data () {
    return {
      devplan: '',
      gdvitems: [{
        id: 1,
        name: '',
        gdvrange: {
          min: 400000,
          max: 600000
        }
      }]
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
    },
    delrow (id) {
      if (this.gdvitems.length < 2) {
        return
      }
      this.gdvitems = this.gdvitems.filter(function(el) { return el.id != id; });
    }
  },
  computed: {
    totalmin () {
      return [...this.gdvitems.map(o => o.gdvrange.min)].reduce((a, b) => a + b, 0)
    },
    totalmax () {
      return [...this.gdvitems.map(o => o.gdvrange.max)].reduce((a, b) => a + b, 0)
    }
  }
})
</script>
