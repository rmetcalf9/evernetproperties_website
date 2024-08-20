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

  hmo_utils.header(context, sheet_name, vueobj, su, 'List of room sizes to check against licence standards')


  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}


export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
