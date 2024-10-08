import utils from './_utils.js'

const sheet_name = 'Refurb Cost'

const suggestions = [
  'Clear out (Skips)?',
  'Windows?',
  'Electric?',
  'Boiler?',
  'Fire Doors?',
  'Fire alarm system?',
  'Roof?',
  'Decorate?',
  'EPC Works?'
]

const rows_to_fill = 25

function get_sheet_values (spreadsheet, vueobj, sheet_id_map) {
  const su = utils.get_sheet_utils(sheet_id_map[sheet_name])
  let context = {
    cur_row: 0,
    requests: [],
    value_requests: [],
    misc_data: {}
  }
  context.requests.push(su.adjustcolumnwidth(0,115))
  context.requests.push(su.adjustcolumnwidth(1,149))
  context.requests.push(su.adjustcolumnwidth(2,182))
  context.requests.push(su.adjustcolumnwidth(3,110))
  context.requests.push(su.adjustcolumnwidth(4,110))

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString(),
    values: [['=HYPERLINK("www.evernetproperties.com", "Project calculation generated by www.evernetproperties.com")']]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Patch:', vueobj.patch.name]]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Address:', vueobj.serialized_data.dealbasicinfo.address]]
  })
  context.value_requests.push({
    range: sheet_name + '!E' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[vueobj.serialized_data.dealbasicinfo.postcode]]
  })
  context.requests.push(su.makeboldandvaligntop(0,context.cur_row,0,1))

  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  const header_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[
      'Room', 'Item', 'Description', 'Labour', 'Materials'
    ]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,5))

  let i = 0;
  while (i < rows_to_fill) {
    context.cur_row = context.cur_row + 1
    if (i<suggestions.length) {
      context.value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
        values: [[
          '', suggestions[i], '', '', ''
        ]]
      })
    }
    i++;
  }

  context.cur_row = context.cur_row + 1
  const var_total_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[
      '',
      '',
      'Total',
      '=sum(D' + (header_row+1).toString() + ':D' + (context.cur_row-1).toString() + ')',
      '=sum(E' + (header_row+1).toString() + ':E' + (context.cur_row-1).toString() + ')'
    ]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,2,5))

  context.requests.push(su.formatcurrency(header_row,context.cur_row,3,5))
  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  const gross_total_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[
      '',
      '',
      '',
      'Gross Total',
      '=sum(D' + var_total_row.toString() + ':E' + var_total_row.toString() + ')'
    ]]
  })

  context.cur_row = context.cur_row + 1
  const contingency_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[
      '',
      '',
      '',
      'Contingency',
      '=E' +  gross_total_row.toString() + '*0.1'
    ]]
  })

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[
      '',
      '',
      '',
      'VAT',
      '=sum(E' +  gross_total_row.toString() + ':E' + contingency_row.toString() + ')*0.2'
    ]]
  })

  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[
      '',
      '',
      '',
      'Net Total',
      '=sum(E' +  gross_total_row.toString() + ':E' + (context.cur_row-22).toString() + ')'
    ]]
  })
  context.requests.push(su.makeboldandvaligntopandsetfontsize(context.cur_row-1,context.cur_row,3,5,13))
  context.requests.push(su.formatcurrency(gross_total_row,context.cur_row,4,5))

  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}

export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
