<template>
<q-expansion-item
  expand-separator
  label="Alternative summary format"
>
  <div>
    This is another way of viewing the same numbers that is commonly used. I have included this for comparison.
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
          <td class="text-left alternativetablecell">Price offered</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Mortgage %</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Mortgage</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Deposit</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Stamp Duty</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Legals</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Total Refurb Costs</td>
          <td class="text-right alternativetablecell bluetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell bluetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Total Money In</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td class="worstcasetablecell"></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">End Value</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell yellowtablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">New Mortgage Amount</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Money Pulled Out</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td class="worstcasetablecell"></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Profit</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
        <tr>
          <td class="text-left alternativetablecell">Money Left In</td>
          <td class="text-right alternativetablecell worstcasetablecell totaltablecell">TODO</td>
          <td class="text-right alternativetablecell totaltablecell">TODO</td>
        </tr>
      </tbody>
    </table>
  </div>
</q-expansion-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BrrCalcDealRatingAlternativeSummary',
  computed: {
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
th.totaltablecell {
  font-size: 15px
}
</style>
