import utils from './_utils.js'
import hmo_utils from './_hmo_utils.js'

const sheet_name = 'HMO Room Sizes'

function get_sheet_values (spreadsheet, vueobj, sheet_id_map) {
  const su = utils.get_sheet_utils(sheet_id_map[sheet_name])
  let context = {
    cur_row: 0,
    requests: [],
    value_requests: [],
    misc_data: {}
  }
  const column_widths = [130,	100,	58,	58,	100, 200, 200]
  let i = 0;
  while (i < column_widths.length) {
    context.requests.push(su.adjustcolumnwidth(i,column_widths[i]))
    i++;
  }

  hmo_utils.header(context, sheet_name, vueobj, su, 'List of room sizes to check against licence standards')

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':A' + context.cur_row.toString(),
    values: [['Total area (sqm)']]
  })

  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,1))

  context.cur_row = context.cur_row + 1
  const total_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':G' + context.cur_row.toString(),
    values: [[
      'Level',
      'Room on plan',
      'x',
      'y',
      'sqm',
      'Reconfig Use',
      'Notes'
    ]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,7))

  const template_data = [
    ['Ground', 'Kitchen', '-1', '-1'],
    ['Ground', 'Dinning Room', '-1', '-1'],
    ['Bedroom', 'Dinning Room', '-1', '-1'],
    ['', '', '2', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ]
  template_data.forEach(function (row) {
    context.cur_row = context.cur_row + 1
    context.value_requests.push({
      range: sheet_name + '!A' + context.cur_row.toString() + ':G' + context.cur_row.toString(),
      values: [[
        row[0],
        row[1],
        row[2],
        row[3],
        '=C' + ( context.cur_row).toString() + '*D' + ( context.cur_row).toString(),
        '',
        ''
      ]]
    })
  })
  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':G' + context.cur_row.toString(),
    values: [[
      '',
      '',
      '',
      'Total',
      '=sum(E' + (total_row+1).toString() + ':E' + (context.cur_row-1).toString() + ')',
      '',
      ''
    ]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,7))



  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}


export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
