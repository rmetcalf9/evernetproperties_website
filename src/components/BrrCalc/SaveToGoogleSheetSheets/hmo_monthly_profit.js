import utils from './_utils.js'
import hmo_utils from './_hmo_utils.js'

const sheet_name = 'HMO Monthly Profit Estimate'

function get_sheet_values (spreadsheet, vueobj, sheet_id_map) {
  const su = utils.get_sheet_utils(sheet_id_map[sheet_name])
  let context = {
    cur_row: 0,
    requests: [],
    value_requests: [],
    misc_data: {}
  }

  const column_widths = [100,	100,	100,	100,	30]
  let i = 0;
  while (i < column_widths.length) {
    context.requests.push(su.adjustcolumnwidth(i,column_widths[i]))
    i++;
  }


  hmo_utils.header(context, sheet_name, vueobj, su, 'Comparison of HMO income vs running costs')

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':A' + context.cur_row.toString(),
    values: [['Monthly Caculation']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':F' + context.cur_row.toString(),
    values: [['Option 1', '', '', '', '', 'Option 2']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':I' + context.cur_row.toString(),
    values: [['Room', 'Num', 'Monthly Rate', 'Total', '', 'Room', 'Num', 'Monthly Rate', 'Total']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,9))

  const template_data = [
    ['Ensuite', '-1', '550'],
    ['Non-ensuite', '-1', '500'],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  const first_row = context.cur_row
  template_data.forEach(function (row) {
    context.cur_row = context.cur_row + 1
    context.value_requests.push({
      range: sheet_name + '!A' + context.cur_row.toString() + ':I' + context.cur_row.toString(),
      values: [[row[0], row[1], row[2], '=B' + (context.cur_row).toString() + '*C' + (context.cur_row).toString(), '', row[0], row[1], row[2], '=G' + (context.cur_row).toString() + '*H' + (context.cur_row).toString()]]
    })
  })
  context.cur_row = context.cur_row + 1
  const total_row = context.cur_row

  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':I' + context.cur_row.toString(),
    values: [[
      'Total',
      '=sum(B' + (first_row+1).toString() + ':B' + ( context.cur_row-1).toString() + ')',
      '',
      '=sum(D' + (first_row+1).toString() + ':D' + ( context.cur_row-1).toString() + ')',
      '',
      'Total',
      '=sum(G' + (first_row+1).toString() + ':G' + ( context.cur_row-1).toString() + ')',
      '',
      '=sum(I' + (first_row+1).toString() + ':I' + ( context.cur_row-1).toString() + ')',
     ]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,9))

  //C-D
  context.requests.push(su.formatcurrency(first_row-1,context.cur_row,2,4))
  //H-I
  context.requests.push(su.formatcurrency(first_row-1,context.cur_row,7,9))

  context.cur_row = context.cur_row + 1

  // Used
  context.cur_row = context.cur_row + 1
  const used_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Used Figure', '=D' + total_row.toString(), '(Select the total of the option above to use for the profit caculation)']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,2))
  context.cur_row = context.cur_row + 1

  // Monthly costs
  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':A' + context.cur_row.toString(),
    values: [['Monthly Costs']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,1))


  context.cur_row = context.cur_row + 1
  const first_monthly_cost_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Management', '=B' + (used_row).toString() + '*0.15', '(assumed 15%)']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Maintainance', '=B' + (used_row).toString() + '*0.1', '(10%)']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':D' + context.cur_row.toString(),
    values: [['Council tax', '=1370.41/12', 'TODO VERIFY', '(Put Band and link to local authority council tax page here as a note)']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Gas', '155', 'TODO VERIFY']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Electric', '120', 'TODO VERIFY']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Water', '40', 'TODO VERIFY']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Internet', '40', 'TODO VERIFY']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Building insurance', '', 'TODO VERIFY']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Company insurance', '']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Company account', '']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['TV Licence', '14.13', 'TODO VERIFY']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':D' + context.cur_row.toString(),
    values: [['HMO Licence', '16.25', 'TODO VERIFY', '(Place link to council HMO licencing page here)']]
  })

  context.cur_row = context.cur_row + 1
  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  const monthly_spend_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Monthly Spend', '=sum(B' + (first_monthly_cost_row).toString() + ':B' + (context.cur_row-1).toString() + ')']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,2))

  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Monthly Profit', '=B' + (used_row).toString() + '-B' + (monthly_spend_row).toString()]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,2))


  //B
  context.requests.push(su.formatcurrency(first_monthly_cost_row-1,context.cur_row,1,2))


  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}


export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
