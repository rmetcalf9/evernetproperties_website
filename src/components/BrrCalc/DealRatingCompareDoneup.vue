<template>
  <div>
    <div class="text-h5">Compare this project to buying a done up property</div>
    <div>This section compares this project with buying a property that is already done up. To account for the time and risk involved with a refurbishment we expect the end value of the property to be more than if we had just bought one.</div>
    <table class="alternativetable">
      <thead>
        <tr>
          <th class="text-left alternativetablecell"></th>
          <th class="text-center alternativetablecell worstcasetablecell">Worst case</th>
          <th class="text-center alternativetablecell">Best case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left alternativetablecell">Purchase</td>
          <td class="text-right alternativetablecell worstcasetablecell">{{ format_currency(purchaserange.max) }}</td>
          <td class="text-right alternativetablecell">{{ format_currency(purchaserange.min) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Refurb</td>
          <td class="text-right alternativetablecell worstcasetablecell">{{ format_currency(refurb_cost_total.max) }}</td>
          <td class="text-right alternativetablecell">{{ format_currency(refurb_cost_total.min) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell totaltablecell">Total</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(total_spent.worst) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(total_spent.best) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">End Value</td>
          <td class="text-right alternativetablecell worstcasetablecell">{{ format_currency(gdv_total.min) }}</td>
          <td class="text-right alternativetablecell">{{ format_currency(gdv_total.max) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell totaltablecell">Gain</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">{{ format_currency(gain.worst) }}</td>
          <td class="text-right alternativetablecell totaltablecell">{{ format_currency(gain.best) }}</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell totaltablecell">Percentage</td>
          <td class="text-right alternativetablecell worstcasetablecell finaltotaltablecell">{{ format_percent(profit_percentage.worst) }}</td>
          <td class="text-right alternativetablecell finaltotaltablecell">{{ format_percent(profit_percentage.best) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import utils from '../utils.js'

export default defineComponent({
  name: 'BrrCalcDealRatingCompareDoneup',
  props: ['purchaserange', 'refurb_cost_total', 'gdv_total'],
  methods: {
    format_currency (num) {
      return utils.format_currency(num)
    },
    format_percent (num) {
      return utils.format_percent(num)
    }
  },
  computed: {
    total_spent () {
      return {
        worst: this.purchaserange.max + this.refurb_cost_total.max,
        best: this.purchaserange.min + this.refurb_cost_total.min
      }
    },
    gain () {
      return {
        worst: this.gdv_total.min - this.total_spent.worst,
        best: this.gdv_total.max - this.total_spent.best
      }
    },
    profit_percentage () {
      return {
        worst: this.gain.worst / this.total_spent.worst,
        best: this.gain.best / this.total_spent.best
      }
    }
  }
})
</script>

<style>
.worstcasetablecell {
  background-color: lightgrey;
}
table.alternativetable {
  background-color: white;
  color: black;
  padding: 2px;
  border-spacing: 0px;
}
.alternativetablecell {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
}
td.yellowtablecell {
  background-color: yellow;
}
td.bluetablecell {
  background-color: lightblue;
}
td.totaltablecell {
  font-size: 15px;
  font-weight: 600;
}
td.finaltotaltablecell {
  font-size: 25px;
  font-weight: 600;
}
</style>
