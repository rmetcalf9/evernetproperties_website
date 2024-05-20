<template>
  <q-page class="flex flex-center">
    <div class="main-page fit col wrap justify-center items-center content-center">
      <h1>Simple ROI Caculator</h1>
      <div>This caculator is a quick and simple way of finding the ROI on a property on an intrest only mortgage. It doesn't take into account refurbishment.</div>
      <div class="row">
        <q-card inline class="q-ma-sm card-style">
          <q-card-section>
            <div class="text-h6">Property figures</div>
          </q-card-section>
          <q-card-section>
            Purchase Price: <q-input
              v-model.number="purchaseprice"
              type="number"
              :step="5000"
              filled
              style="max-width: 110px"
            />
            Monthly Rent: <q-input
              v-model.number="monthlyrent"
              type="number"
              :step="50"
              filled
              style="max-width: 110px"
            />
            Flat annual service charge: <q-input
              v-model.number="flatannualservicecharge"
              type="number"
              :step="50"
              filled
              style="max-width: 110px"
            />
            Mortgage LTV: <div class="row"><q-input
              v-model.number="mortgageltv"
              type="number"
              :step="5"
              filled
              style="max-width: 110px"
            />
            <q-btn round dense flat icon="info" @click="helpmortgageltv" />
            </div>
            Monthly Rate: <q-input
              v-model.number="mortgagerate"
              type="number"
              :step="0.1"
              filled
              style="max-width: 110px"
            />
          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm card-style">
          <q-card-section>
            <div class="text-h6">Purchase</div>
          </q-card-section>
          <q-card-section>
            <div>Total Mortgage: {{ format_currency(totalmortgage) }}</div>
            <div>Deposit: {{ format_currency(deposit) }}</div>
            <div>Stamp and fees: {{ format_currency(stampandfees) }}</div>
            <div><b>Total Money In: {{ format_currency(totalmoneyin) }}</b></div>
          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm card-style">
          <q-card-section>
            <div class="text-h6">Monthly</div>
          </q-card-section>
          <q-card-section>
            <div>Mortgage: {{ format_currency(monthlymortgage) }}</div>
            <div>Management: {{ format_currency(management) }}</div>
            <div>Maintenance: {{ format_currency(maintenance) }}</div>
            <div>Service Charge: {{ format_currency(flatmonthlyservicecharge) }}</div>
            <div><b>Total Monthly Costs: {{ format_currency(totalmonthlycosts) }}</b></div>
          </q-card-section>
        </q-card>
        <q-card inline class="q-ma-sm card-style">
          <q-card-section>
            <div class="text-h6">Rating</div>
          </q-card-section>
          <q-card-section>
            <div>Money in: {{ format_currency(totalmoneyin) }}</div>
            <div>Monthly Profit: {{ format_currency(monthlyprofit) }}</div>
            <div class="text-h6">ROI: {{ format_percent(roi) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import utils from '../../components/utils.js'


export default defineComponent({
  name: 'SimpleRoiCalc',
  components: {
  },
  data () {
    return {
      isMounted: false,
      purchaseprice: 100000,
      monthlyrent: 800,
      flatannualservicecharge: 0,
      mortgageltv: 75,
      mortgagerate: 6,
    }
  },
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    format_percent (num) {
      return utils.format_percent(num)
    },
    helpmortgageltv () {
      this.$q.dialog({
        title: 'Loan To Value',
        message: 'Note: To see what it is like buying without a mortgage - Enter 0% as LTV!',
        html: true
      }).onOk(() => {
        // console.log('OK')
      })
    }
  },
  computed: {
    totalmortgage () {
      return this.purchaseprice * this.mortgageltv / 100
    },
    deposit () {
      return this.purchaseprice - this.totalmortgage
    },
    stampandfees () {
      return this.purchaseprice * 0.04
    },
    totalmoneyin () {
      return this.deposit + this.stampandfees
    },
    monthlymortgage () {
      return (this.totalmortgage * this.mortgagerate / (100 * 12))
    },
    management () {
      return this.monthlyrent * 0.1
    },
    maintenance () {
      return this.monthlyrent * 0.1
    },
    flatmonthlyservicecharge () {
      return this.flatannualservicecharge / 12
    },
    totalmonthlycosts () {
      return this.monthlymortgage + this.management + this.maintenance + this.flatmonthlyservicecharge
    },
    monthlyprofit () {
      return this.monthlyrent - this.totalmonthlycosts
    },
    roi () {
      return (this.monthlyprofit * 12) / this.totalmoneyin
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
.main-page {
  margin: 10px;
  padding: 0px;
}
.card-style {
  max-width: 500px;
}
</style>
