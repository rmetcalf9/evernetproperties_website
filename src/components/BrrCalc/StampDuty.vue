<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Stamp Duty</div>
      <div class="text-subtitle2">Stampduty calculation assuming investment property. This is a basic calculator useful for estimates. Factors effecting stamp duty include if the property is habitable, if it’s a commercial property and there are different rules for Scotland.</div>
    </q-card-section>
    <q-card-section>
      <q-checkbox v-model="stampdutydata.exempt" label="Stampduty Exempt" />
      <q-btn round dense flat icon="info" @click="helpexempt" />
      <q-checkbox v-model="stampdutydata.commercial" label="Commercial" />
      <div class="q-pa-lg">
        Property Location
        <q-option-group
          v-model="stampdutydata.location"
          :options="stampdutydata.locationoptions"
          inline
        />
        <div class="text-h6">Stamp Duty: {{ format_currency(stampduty.min) }} - {{ format_currency(stampduty.max) }}</div>
      </div>
      <q-expansion-item
        expand-separator
        icon="info"
        label="Details"
      >
        <div>
          <q-table
            :title="stampdutybands.name"
            :columns="table.columns"
            :rows="stampdutybandswithamount"
            hide-bottom
          >
            <template v-slot:body-cell-min_amount="props">
              <q-td :props="props">
                {{ format_currency(props.value) }}
              </q-td>
            </template>
            <template v-slot:body-cell-max_amount="props">
              <q-td :props="props">
                {{ format_currency(props.value) }}
              </q-td>
            </template>
          </q-table>
        </div>
      </q-expansion-item>
    </q-card-section>
  </q-card>

</template>

<script>
// TODO https://cruseburke.co.uk/stamp-duty-on-commercial-property/ - england comercial
// TODO https://revenue.scot/taxes/land-buildings-transaction-tax/non-residential-property - scotland comercial
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

function stampdutyforthisband (band, amount) {
  if (amount < band.from) {
    return 0
  }
  if (typeof (band.upto) === 'undefined') {
    return (amount - band.from) * band.rate
  }
  if (amount > band.upto) {
    return (band.upto - band.from) * band.rate
  }
  return (amount - band.from) * band.rate
}

export default defineComponent({
  name: 'BrrCalcStampduty',
  props: ['purchaserange'],
  data () {
    return {
      table: {
        columns: [
          { name: "range", label: 'Range', field: 'range'},
          { name: "rate", label: 'Rate', field: 'rate'},
          { name: "min_amount", label: 'Min', field: 'min'},
          { name: "max_amount", label: 'Max', field: 'max'},
        ]
      },
      stampdutydata: {
        exempt: false,
        commercial: false,
        location: 'england',
        locationoptions: [
          {
            label: 'England',
            value: 'england'
          },
          {
            label: 'Scotland',
            value: 'scotland'
          }
        ]
      }
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    helpexempt () {
      this.$q.dialog({
        title: 'Stamp Duty Exempt',
        message: 'Some purchases are stamp duty exempt. e.g. a freehold property under £40k. See <a href="https://www.gov.uk/stamp-duty-land-tax/reliefs-and-exemptions" target="_new">here</a> for details.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    }
  },
  computed: {
    stampduty () {
      var min = 0
      var max = 0
      let i = 0;
      while (i < this.stampdutybandswithamount.length) {
        min += this.stampdutybandswithamount[i].min
        max += this.stampdutybandswithamount[i].max
        i++;
      }
      return {
        min: min,
        max: max
      }
    },
    stampduty_items () {
      if (this.stampdutydata.exempt) {
        return []
      }
      return [
        {name: 'Stamp Duty', worst: -1 * this.stampduty.max, best: -1 * this.stampduty.min}
      ]
    },
    stampdutybandswithamount () {
      var TTT=this
      return this.stampdutybands.bands.map(function (band) {
        return {
          range: utils.format_currency(band.from) + ' - ' + utils.format_currency(band.upto),
          rate: (band.rate * 100) + '%',
          min: stampdutyforthisband(band, TTT.purchaserange.min),
          max: stampdutyforthisband(band, TTT.purchaserange.max)
        }
      })
    },
    stampdutybands () {
      if (this.stampdutydata.exempt) {
        return {
          name: 'exempt',
          bands: [{
            from: 0,
            upto: undefined,
            rate: 0
          }]
        }
      }
      if (this.stampdutydata.commercial) {
        if (this.stampdutydata.location === 'england') {
          return {
            name: 'England Commercial',
            bands: [{
              from: 0,
              upto: 150000,
              rate: 0
            },
            {
              from: 150000,
              upto: 250000,
              rate: 0.02
            },
            {
              from: 250000,
              upto: undefined,
              rate: 0.05
            }]
          }
        }
        return {
          name: 'Scotland Commercial',
          bands: [{
            from: 0,
            upto: 150000,
            rate: 0
          },
          {
            from: 150000,
            upto: 250000,
            rate: 0.01
          },
          {
            from: 250000,
            upto: undefined,
            rate: 0.05
          }]
        }
      }
      if (this.stampdutydata.location === 'england') {
        return {
          name: 'England Residential',
          bands: [{
            from: 0,
            upto: 250000,
            rate: 0.03
          },
          {
            from: 250000,
            upto: 925000,
            rate: 0.08
          },
          {
            from: 925000,
            upto: 1500000,
            rate: 0.13
          },
          {
            from: 1500000,
            upto: undefined,
            rate: 0.15
          }]
        }
      }
      return {
        name: 'Scotland Residential',
        // 0% between £0 - £40,000
        // 3% between £40,000 - £145,000
        // 5% between £145,000 - £250,000
        // 8% between £250,000 - £325,000
        // 13% between £325,000 - £750,000
        // 15% above £750,000
        bands: [{
          from: 0,
          upto: 40000,
          rate: 0
        },{
          from: 40000,
          upto: 145000,
          rate: 0.03
        },{
          from: 145000,
          upto: 250000,
          rate: 0.05
        },{
          from: 250000,
          upto: 325000,
          rate: 0.08
        },{
          from: 325000,
          upto: 750000,
          rate: 0.13
        },{
          from: 750000,
          upto: undefined,
          rate: 0.15
        }]
      }
    }
  }
})
</script>
