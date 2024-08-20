import utils from './_utils.js'

const sheet_name = 'SHEET NAME'

function get_sheet_values (spreadsheet, vueobj, sheet_id_map) {
  const su = utils.get_sheet_utils(sheet_id_map[sheet_name])
  let context = {
    cur_row: 0,
    requests: [],
    value_requests: [],
    misc_data: {}
  }


  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}


export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
