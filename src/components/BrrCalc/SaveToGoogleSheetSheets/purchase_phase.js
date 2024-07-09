const sheet_name = 'Purchase Phase'

// ALways in sequence. 0=Cash, 1=Mortgage, 2=Bridge

function get_cash_type(spreadsheet, vueobj, sheet_id_map) {
  return {
    name: 'Buying Cash',
    pre_stage: function (context) {return [] },
    start_details: function () {
      return [
        ['Purchase Price', vueobj.serialized_data.purchaseprice.purchaserangevalue.max, vueobj.serialized_data.purchaseprice.purchaserangevalue.min]
      ]
    },
    end_details: function () { return [] },
  }
}
function get_mortgage_type(spreadsheet, vueobj, sheet_id_map) {
  return {
    name: 'Buying with a Mortgage',
    pre_stage: function (context) {
      const data = [];
      context.cur_row = context.cur_row + 1
      data.push({
        range: sheet_name + '!A' + context.cur_row.toString(),
        values: [['IN TEST 1']]
      })

      context.cur_row = context.cur_row + 1
      data.push({
        range: sheet_name + '!A' + context.cur_row.toString(),
        values: [['IN TEST 2']]
      })
      return data
    },
    start_details: function () { return [] },
    end_details: function () {
      return [
        ['Mortgage Payments TODO', 1, 1]
      ]
    },
  }
}

function getType(spreadsheet, vueobj, sheet_id_map) {
  return get_cash_type(spreadsheet, vueobj, sheet_id_map)
  //return get_mortgage_type(spreadsheet, vueobj, sheet_id_map)
}

function get_sheet_values (spreadsheet, vueobj, sheet_id_map) {
  const data = [];
  let context = {
    cur_row: 0
  }

  context.cur_row = context.cur_row + 1
  data.push({
    range: sheet_name + '!A' + context.cur_row.toString(),
    values: [['=HYPERLINK("www.evernetproperties.com", "Project calculation generated by www.evernetproperties.com")']]
  })

  context.cur_row = context.cur_row + 1
  data.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Patch:', vueobj.patch.name]]
  })

  context.cur_row = context.cur_row + 1
  data.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Address:', vueobj.serialized_data.dealbasicinfo.address]]
  })
  data.push({
    range: sheet_name + '!E' + context.cur_row.toString() + ':E' + context.cur_row.toString(),
    values: [[vueobj.serialized_data.dealbasicinfo.postcode]]
  })

  context.cur_row = context.cur_row + 1

  const purchase_type = getType(spreadsheet, vueobj, sheet_id_map)

  context.cur_row = context.cur_row + 1
  data.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':A' + context.cur_row.toString(),
    values: [[purchase_type.name]]
  })

  data.push(purchase_type.pre_stage(context))

  // Title
  context.cur_row = context.cur_row + 1
  data.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['', 'Worst', 'Best']]
  })

  let details = purchase_type.start_details()
  details.push(['Refurbishment', vueobj.refurb_cost_total.max, vueobj.refurb_cost_total.min])
  details.push(['Stamp Duty', vueobj.stampduty_total.max, vueobj.stampduty_total.min])
  vueobj.othercosts_items_detail.forEach(function (ite) {
    details.push([ite.name, -1 * ite.worst, -1 * ite.best])
  })

  // Now add in the fixed loan costs
  vueobj.caculated_loan_details.forEach(function (loan) {
    details.push([loan.name + ' interest', loan.interest, loan.interest])
  })

  details.push(purchase_type.end_details())


  details.forEach(function (detail) {
    context.cur_row = context.cur_row + 1
    data.push({
      range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
      values: [[detail[0], detail[1], detail[2]]]
    })
  })

  context.cur_row = context.cur_row + 1
  data.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Total', 'TODO', 'TODO']]
  })


  return data
}

function get_sheet (spreadsheet, vueobj, sheet_id_map) {
  const requests = [];

  requests.push({
    "repeatCell": {
      "range": {
        "sheetId": sheet_id_map[sheet_name],
        "startRowIndex": 0,
        "endRowIndex": vueobj.serialized_data.dealbasicinfo.weblinks.length + 6 + 1,
        "startColumnIndex": 0,
        "endColumnIndex": 1
      },
      "cell": {
        "userEnteredFormat": {
          "textFormat": {
            "bold": true
          },
          "verticalAlignment": "TOP"
        }
      },
      "fields": "userEnteredFormat(textFormat, verticalAlignment)"
    }
  })

  return requests
}

export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values,
  get_sheet: get_sheet
}
