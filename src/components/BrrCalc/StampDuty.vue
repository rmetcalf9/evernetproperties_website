<template>
  <q-card inline class="q-ma-sm card-style">
    <q-card-section>
      <div class="text-h6">Stamp Duty</div>
      <div class="text-subtitle2">Stampduty cacluation assuming investment property</div>
    </q-card-section>
    <q-card-section>
      <q-checkbox v-model="stampdutydata.exempt" label="Stampduty Exempt" />
      <div class="q-pa-lg">
        Property Location
        <q-option-group
          v-model="stampdutydata.location"
          :options="stampdutydata.locationoptions"
          inline
        />
        <div class="text-h6">Stamp Duty: {{ format_currency(stampduty.min) }} - {{ format_currency(stampduty.max) }}</div>
      </div>
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import utils from './utils.js'

function getenglandstampduty (amount) {
  // 3% between £0 - £250,000
  // 8% between £250,000 - £925,000
  // 13% between £925,000 - £1,500,000
  // 15% above £1,500,000
  if (amount <= 250000) {
    return amount * 0.03
  }
  if (amount <= 925000) {
    return (250000 * 0.03) + ((amount-250000) * 0.08)
  }
  if (amount <= 1500000) {
    return (250000 * 0.03) + ((925000-250000) * 0.08) + ((amount-925000) * 0.13)
  }
  return (250000 * 0.03) + ((925000-250000) * 0.08) + ((1500000 - 925000) * 0.13) +  ((amount-1500000) * 0.15)
}

function getscotlandstampduty (amount) {
  // 0% between £0 - £40,000
  // 3% between £40,000 - £145,000
  // 5% between £145,000 - £250,000
  // 8% between £250,000 - £325,000
  // 13% between £325,000 - £750,000
  // 15% above £750,000
  if (amount <= 40000) {
    return 0
  }
  if (amount <= 145000) {
    return ((amount-40000) * 0.03)
  }
  if (amount <= 250000) {
    return ((145000-40000) * 0.03) + ((amount-145000) * 0.05)
  }
  if (amount <= 325000) {
    return ((145000-40000) * 0.03) + ((250000-145000) * 0.05) + ((amount-250000) * 0.08)
  }
  if (amount <= 750000) {
    return ((145000-40000) * 0.03) + ((250000-145000) * 0.05) + ((325000-250000) * 0.08) + ((amount-325000) * 0.13)
  }
  return ((145000-40000) * 0.03) + ((250000-145000) * 0.05) + ((325000-250000) * 0.08) + ((750000-325000) * 0.13) + ((amount-750000) * 0.15)
}

export default defineComponent({
  name: 'BrrCalcStampduty',
  props: ['purchaserange'],
  data () {
    return {
      stampdutydata: {
        exempt: false,
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
    }
  },
  computed: {
    stampdutyengland () {
      return {
        min: getenglandstampduty(this.purchaserange.min),
        max: getenglandstampduty(this.purchaserange.max)
      }
    },
    stampdutyscotland () {
      return {
      min: getscotlandstampduty(this.purchaserange.min),
      max: getscotlandstampduty(this.purchaserange.max)
      }
    },
    stampduty () {
      if (this.stampdutydata.exempt) {
        return {
          min: 0,
          max: 0
        }
      }
      if (this.stampdutydata.location === 'england') {
        return this.stampdutyengland
      }
      return this.stampdutyscotland
    }
  }
})
</script>
