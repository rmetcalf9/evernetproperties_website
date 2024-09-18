<template>
  <q-page class="flex">
    <div class="HmoCommercialValuationCalc-main-page fit col wrap justify-center items-center content-center">
      <h1>HMO Commercial Valuation Calculator</h1>
      <div>This calculator will help you estimate a commercial valuation on a HMO based on existing properties in the area. To use it fill in general information about the area, then list comparable HMO’s in the area. Finally enter details about the HMO you are looking at and the final card will show an estimated valuation.</div>
      <div class="row">
        <q-card inline class="q-ma-sm HmoCommercialValuationCalc-card-style">
          <q-card-section>
            <div class="text-h6">General Area Information</div>
          </q-card-section>
          <q-card-section>
            Average Ensuite Monthly Room Rate (£): <q-input
              v-model.number="general_area.room_rate"
              type="number"
              :step="25"
              filled
              style="max-width: 110px"
            />
            Cost Percentage (%):
            <q-btn round dense flat icon="info" @click="helpareacostpercentage" />
            <q-input
              v-model.number="general_area.cost_percentage"
              type="number"
              :step="1"
              :min="10"
              :max="50"
              :rules="[ val => val <= 50 || 'Should be less than 50%', val => val >= 10 || 'Should be more than 10%']"
              filled
              style="max-width: 110px"
            />
          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm HmoCommercialValuationCalc-card-style">
          <q-card-section>
            <div class="text-h6">HMO Comparables</div>
          </q-card-section>
          <q-card-section>
          <div>Find examples of HMO’s that have sold in the area. You can do this by:</div>
          <ul>
          <li>Speaking to agents in the area and asking about HMO prices</li>
          <li>Speaking to HMO letting agents and finding out about HMO prices in the area</li>
          <li>Go to the council website for the HMO register; going through the addresses and looking at sold prices on rightmove for those addresses</li>
          <li>Go through Dealsourcr deals for this area (e.g. for Middlesbrough the link is <a href="https://dealsourcr.com/deal-search/hmos-in-middlesbrough" target="_blank">https://dealsourcr.com/deal-search/hmos-in-middlesbrough</a>)</li>
          </ul>
          <div>Once you have a few examples, enter them here. The most relevant prices are the ones with a similar size to the one you are looking at.</div>
            <table class="HmoCommercialValuationCalc-comptable">
              <thead>
                <tr>
                  <th class="">Price</th>
                  <th class=""># Rooms</th>
                  <th class="">Calculation</th>
                  <th class="">Use?</th>
                  <th class=""></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in comps" :key='item.id'>
                  <td>
                    <q-input
                      v-model.number="item.price"
                      type="number"
                      :step="5000"
                      filled
                      style="max-width: 110px"
                    />
                  </td>
                  <td>
                    <q-input
                      v-model.number="item.rooms"
                      type="number"
                      :step="1"
                      :min="1"
                      :max="50"
                      filled
                      style="max-width: 70px"
                    />
                  </td>
                  <td>
                    <div>
                      <div>Annual Rent:  {{ format_currency(getannualrent(item)) }}</div>
                      <div>Yield: {{ format_percent(getannualyield(item)) }}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <q-checkbox
                        v-model="item.use"
                        label=""
                        @update:model-value="updateitemuse(item)"/>
                    </div>
                  </td>
                  <td>
                    <div v-if="comps.length > 1">
                      <q-btn round color="primary" icon="delete" @click="delcomp(item)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <q-btn round  color="primary" icon="add" @click="addcomp" />

          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm HmoCommercialValuationCalc-card-style">
          <q-card-section>
            <div class="text-h6">HMO Information</div>
          </q-card-section>
          <q-card-section>
            <div>Fill this section with information about the HMO you are valuing:</div>
            Rooms: <q-input
              v-model.number="curhmo.rooms"
              type="number"
              :step="1"
              :min="1"
              :max="50"
              filled
              style="max-width: 70px"
            />
            <div>
              Our Annual Rent: {{ format_currency(hmo_annual_rent) }}
            </div>
            Cost percentage: <q-btn round dense flat icon="info" @click="helpareacostpercentage" /><q-input
              v-model.number="curhmo.cost_percentage"
              type="number"
              :step="1"
              :min="10"
              :max="50"
              :rules="[ val => val <= 50 || 'Should be less than 50%', val => val >= 10 || 'Should be more than 10%']"
              filled
              style="max-width: 110px"
            />
          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm HmoCommercialValuationCalc-card-style">
          <q-card-section>
            <div class="text-h6">Valuation</div>
          </q-card-section>
          <q-card-section>
            <div>The following shows the estimated value and yields:</div>
            <div class="HmoCommercialValuationCalc-final-totals">
              <div>Min: {{ format_currency(min_val) }} ({{ format_percent(min_yield) }})</div>
              <div>Avg: {{ format_currency(avg_val) }} ({{ format_percent(avg_yield) }})</div>
              <div>Max: {{ format_currency(max_val) }} ({{ format_percent(max_yield) }})</div>
            </div>
            <FeatureTable
              v-model:features="features"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import utils from '../../components/utils.js'
import { Notify } from 'quasar'
import FeatureTable from '../../components/CommonCalcComponents/FeatureTable.vue'

function getdefaultcomp () {
  return {
    id: utils.uuidv4(),
    price: '200000',
    rooms: 6,
    use: true
  }
}

export default defineComponent({
  name: 'HmoCommercialValuationCalc',
  components: {
    FeatureTable
  },
  data () {
    return {
      isMounted: false,
      general_area: {
        room_rate: 500,
        cost_percentage: 25
      },
      comps: [getdefaultcomp()],
      curhmo: {
        rooms: 5,
        cost_percentage: 25
      }
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    format_percent (num) {
      return utils.format_percent(num)
    },
    helpareacostpercentage () {
      this.$q.dialog({
        title: 'Cost Percentage',
        message: 'The cost percentage is the percentage of the rent that will be allowed to account for running costs of the HMO. (Such as Bills, Maintenance, etc.) Typically a figure of 25% is used, but sometimes 35% if a building is high maintenance. Note: Mortgage payments are NOT included.',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    },
    addcomp () {
      this.comps.push(getdefaultcomp())
    },
    delcomp (item) {
      if (this.comps.length <2) {
        return
      }
      if (item.use) {
        if (this.used_comps.length < 2) {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Must use at least one comparable',
            timeout: 2000
          })
          return
        }
      }
      const newcomps = this.comps.filter(function (curitem) {
        return item.id !== curitem.id
      })
      this.comps = newcomps
    },
    getannualrent (item) {
      return item.rooms * 12 * this.general_area.room_rate
    },
    getannualyield (item) {
      return item.price / (this.getannualrent(item) * (100-this.general_area.cost_percentage))
    },
    updateitemuse (item) {
      if (!item.use) {
        if (this.used_comps.length < 1) {
          item.use = true
          Notify.create({
            color: 'bg-grey-2',
            message: 'Must use at least one comparable',
            timeout: 2000
          })
        }
      }
    }
  },
  computed: {
    hmo_annual_rent () {
      return this.curhmo.rooms * 12 * this.general_area.room_rate
    },
    used_comps () {
      return this.comps.filter(function (comp) {
        return comp.use
      })
    },
    min_yield () {
      const TTT = this
      return this.used_comps.reduce(function (acc, cur) {
        const curyield = TTT.getannualyield(cur)
        if (curyield < acc) {
          return curyield
        }
        return acc
      }, 99999999)
    },
    avg_yield () {
      const TTT = this
      return this.used_comps.reduce(function (acc, cur) {
        return acc + TTT.getannualyield(cur)
      }, 0) / this.used_comps.length
    },
    max_yield () {
      const TTT = this
      return this.used_comps.reduce(function (acc, cur) {
        const curyield = TTT.getannualyield(cur)
        if (curyield > acc) {
          return curyield
        }
        return acc
      }, -99999999)
    },
    min_val () {
      return this.hmo_annual_rent * (100-this.curhmo.cost_percentage) * this.min_yield
    },
    avg_val () {
      return this.hmo_annual_rent * (100-this.curhmo.cost_percentage) * this.avg_yield
    },
    max_val () {
      return this.hmo_annual_rent * (100-this.curhmo.cost_percentage) * this.max_yield
    },
    features () {
      const TTT = this
      let ret_val = []
      if (this.curhmo.rooms < 5) {
        ret_val.push({
          type: 'negative',
          text: 'Less than 5 rooms - check with lender to confirm a commercial valuation is available'
        })
      }
      if (this.curhmo.cost_percentage < 20) {
        ret_val.push({
          type: 'neutral',
          text: 'Cost percentage less than 20% - is this realistic?'
        })
      }
      const used_less_than_5_rooms =  this.used_comps.reduce(function (acc, cur) {
        if (cur.rooms < 5) {
          return true
        }
        return acc
      }, false)
      if (used_less_than_5_rooms) {
        ret_val.push({
          type: 'negative',
          text: 'Comparable with less than 5 rooms - may not be valid'
        })
      }
      if (this.used_comps.length < 3) {
        ret_val.push({
          type: 'negative',
          text: 'Compared with less than 3 other properties'
        })
      }
      const max_size_diff =  this.used_comps.reduce(function (acc, cur) {
        const diff = Math.abs(cur.rooms - TTT.curhmo.rooms)
        if (diff > acc) {
          return diff
        }
        return acc
      }, 0)
      if (max_size_diff > 2) {
        if (max_size_diff > 3) {
          ret_val.push({
            type: 'negative',
            text: 'Compared with properties of significantly different size'
          })
        } else {
          ret_val.push({
            type: 'neutral',
            text: 'Compared with properties of different size'
          })
        }
      }

      return ret_val
    }
  },
  mounted (){
    const TTT = this
    setTimeout(function () {
      TTT.isMounted = true;
    }, 5)
  }
})
</script>

<style>
h1 {
  font-size: 3rem;
  line-height: 3rem;
  margin: 0px;
}
.HmoCommercialValuationCalc-main-page {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 0px;
}
.HmoCommercialValuationCalc-card-style {
  max-width: 500px;
}
.HmoCommercialValuationCalc-final-totals {
  font-size: 2rem;
  font-weight: 600;
}
</style>
