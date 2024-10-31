<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Stamp Duty</div>
      <div class="text-subtitle2">Stampduty calculation assuming investment property This is known as Stamp Duty in England and Land and Buildings Transaction Tax (LBTT) in Scotland. This is a basic calculator useful for estimates. Factors affecting stamp duty include if the property is habitable, if it’s a commercial property and there are different rules for Scotland. This is an example calculation designed to give a rough idea. It is best to use the official government calculators. Refer to the links given in the detail section.</div>
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
            :rows-per-page-options="[50]"
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
          <div class="stamp-duty-card-detail-bottom-text">
            <p>Example calculation only for use when estimating a project - check with an expert and also check if exemptions apply.</p>
            <p class="stamp-duty-card-detail-bottom-text-title">Sources:</p>
            <ul>
            <li>England Residential: <a href="https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" target="_new">here</a></li>
            <li>England Commercial: <a href="https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-rates" target="_new">here</a></li>
            <li>Scotland Residential: <a href="https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property" target="_new">here</a></li>
            <li>Scotland Commercial: <a href="https://revenue.scot/taxes/land-buildings-transaction-tax/non-residential-property" target="_new">here</a></li>
            </ul>
          </div>
        </div>
      </q-expansion-item>
    </q-card-section>
  </q-card>

</template>

<script>
// Source url's now in details section
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from '../utils.js'
import stampdutybandutils from './StampDutyBandUtils.js'

export default defineComponent({
  name: 'BrrCalcStampduty',
  emits: ['projectchanged'],
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
      },
      emit_project_change_notification: true
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
    },
    serializer_load_data (data_to_load) {
      this.emit_project_change_notification = false
      this.stampdutydata.exempt = data_to_load.stampdutydata_exempt
      this.stampdutydata.commercial = data_to_load.stampdutydata_commercial
      this.stampdutydata.location = data_to_load.stampdutydata_location

      const TTT = this
      setTimeout(function () {
        TTT.emit_project_change_notification = true
      }, 50)
    }
  },
  watch: {
    serializer_card_data(val) {
      if (this.emit_project_change_notification) {
        this.$emit('projectchanged', 'StampDuty')
      }
    }
  },
  computed: {
    serializer_card_data () {
      return {
        stampdutydata_exempt: this.stampdutydata.exempt,
        stampdutydata_commercial: this.stampdutydata.commercial,
        stampdutydata_location: this.stampdutydata.location,
      }
    },
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
          min: stampdutybandutils.stampdutyforthisband(band, TTT.purchaserange.min),
          max: stampdutybandutils.stampdutyforthisband(band, TTT.purchaserange.max)
        }
      })
    },
    stampdutybands () {
      return stampdutybandutils.getstampdutyband(
        this.stampdutydata.exempt,
        this.stampdutydata.commercial,
        this.stampdutydata.location
      )
    }
  }
})
</script>

<style>
.stamp-duty-card-detail-bottom-text {
  padding-top: 10px;
}
.stamp-duty-card-detail-bottom-text-title {
  margin-bottom: 0px;
}
.stamp-duty-card-detail-bottom-text ul {
  margin-top: 0px;
}
</style>
