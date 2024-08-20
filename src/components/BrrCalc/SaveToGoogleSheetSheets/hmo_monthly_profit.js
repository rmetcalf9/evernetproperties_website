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
    ['Ensuite', '3', '550'],
    ['Non-ensuite', '3', '500'],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  template_data.forEach(function (row) {
    context.cur_row = context.cur_row + 1
    context.value_requests.push({
      range: sheet_name + '!A' + context.cur_row.toString() + ':I' + context.cur_row.toString(),
      values: [[row[0], row[1], row[2], 'TODO', '', row[0], row[1], row[2], 'TODO']]
    })
  })

  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}


export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
