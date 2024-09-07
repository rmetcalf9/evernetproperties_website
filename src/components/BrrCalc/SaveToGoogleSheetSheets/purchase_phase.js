import utils from './_utils.js'

const sheet_name = 'Purchase Phase'

const bridge_amount_string = 'Bridge Amount'

// ALways in sequence. 0=Cash, 1=Mortgage, 2=Bridge

function get_cash_type(spreadsheet, vueobj, sheet_id_map) {
  return {
    name: 'Buying Cash',
    pre_stage: function (context) {return },
    start_details: function (context) {
      return [
        ['Purchase Price', vueobj.serialized_data.purchaseprice.purchaserangevalue.max, vueobj.serialized_data.purchaseprice.purchaserangevalue.min]
      ]
    },
    end_details: function (context) { return [] },
  }
}
function get_mortgage_type(spreadsheet, vueobj, sheet_id_map) {
  return {
    name: 'Buying with a Mortgage',
    pre_stage: function (context, su) {
      const value_requests = [];

      const row_top = context.cur_row

      context.cur_row = context.cur_row + 1
      context.value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['', 'Worst', 'Best']]
      })
      context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,1,3))


      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Purchase Price', vueobj.serialized_data.purchaseprice.purchaserangevalue.max, vueobj.serialized_data.purchaseprice.purchaserangevalue.min]]
      })
      context.requests.push(su.formatcurrency(row_top,context.cur_row,1,3))

      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Mortage Rate', vueobj.serialized_data.finance.mortgage.rate.max / 100, vueobj.serialized_data.finance.mortgage.rate.min / 100]]
      })
      context.requests.push(su.formatpercentage(context.cur_row-1,context.cur_row,1,3))

      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Mortgage LTV', vueobj.serialized_data.finance.mortgage.ltv.max / 100, vueobj.serialized_data.finance.mortgage.ltv.min / 100]]
      })
      context.requests.push(su.formatpercentage(context.cur_row-1,context.cur_row,1,3))

      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Total Mortgage', '=B' + (row_top+2).toString() + '*B' + (context.cur_row-1).toString(), '=C' + (row_top+2).toString() + '*C' + (context.cur_row-1).toString()]]
      })
      context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))

      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Monthly Payments', '=(B' + (context.cur_row-1).toString() + '*B' + (row_top+3).toString() + ')/12', '=(C' + (context.cur_row-1).toString() + '*C' + (row_top+3).toString() + ')/12']]
      })
      context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))
      context.misc_data.monthly_payments_row = context.cur_row


      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Deposit', '=B' + (row_top+2).toString() + '-B' + (context.cur_row-2).toString(), '=C' + (row_top+2).toString() + '-C' + (context.cur_row-2).toString()]]
      })
      context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))
      context.misc_data.deposit_row = context.cur_row

      context.cur_row = context.cur_row + 1
      value_requests.push({
        range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
        values: [['Refurb Duration Months', vueobj.serialized_data.refurbcost.refurbtimerange.max, vueobj.serialized_data.refurbcost.refurbtimerange.min]]
      })
      context.requests.push(su.formatnumbermisc(context.cur_row-1,context.cur_row,1,3,'0'))
      context.misc_data.refurb_duration_row = context.cur_row


      context.requests.push(su.makeboldandvaligntop(row_top,context.cur_row,0,1))

      //Blank row
      context.cur_row = context.cur_row + 1

      context.value_requests.push(value_requests)
    },
    start_details: function (context) {
      return [
        ['Deposit', '=B' + (context.misc_data.deposit_row).toString(), '=C' + (context.misc_data.deposit_row).toString()],
        ['Mortgage Arangement', vueobj.serialized_data.finance.mortgage.arrangementfee, vueobj.serialized_data.finance.mortgage.arrangementfee],
      ]
    },
    end_details: function (context) {
      return [
        ['Mortgage Payments', '=B' + (context.misc_data.monthly_payments_row).toString() + '*B' + (context.misc_data.refurb_duration_row).toString(), '=C' + (context.misc_data.monthly_payments_row).toString() + '*C' + (context.misc_data.refurb_duration_row).toString()],
        ['(During refurbishment)', '', '']
      ]
    },
  }
}
function get_bridge_type(spreadsheet, vueobj, sheet_id_map) {
  return {
    name: 'Buying with a Bridge',
    pre_stage: function (context) {return },
    start_details: function (context) {
      return [
        ['Purchase Price', vueobj.serialized_data.purchaseprice.purchaserangevalue.max, vueobj.serialized_data.purchaseprice.purchaserangevalue.min]
      ]
    },
    end_details: function (context) {
      return [
        ['Bridge Costs', vueobj.finance_bridgecost.worst, vueobj.finance_bridgecost.best],
        [bridge_amount_string, vueobj.finance_bridgeamount.worst * -1, vueobj.finance_bridgeamount.best * -1]
      ]
    },
  }
}

function getType(spreadsheet, vueobj, sheet_id_map) {
  if (vueobj.serialized_data.finance.mortgage.usemortgage) {
    return get_mortgage_type(spreadsheet, vueobj, sheet_id_map)
  }
  if (vueobj.serialized_data.finance.bridge.usebridge) {
    return get_bridge_type(spreadsheet, vueobj, sheet_id_map)
    //bridge {
    //    "usebridge": false,
    //    "startcost": 0.01,
    //    "endcost": 0.01,
    //    "monthlycost": 0.01,
    //    "amount": {
    //        "worst": 1,
    //        "best": 1
    //    }
    //}
  }
  return get_cash_type(spreadsheet, vueobj, sheet_id_map)
  //return get_mortgage_type(spreadsheet, vueobj, sheet_id_map)
}

function get_sheet_values (spreadsheet, vueobj, sheet_id_map) {
  const su = utils.get_sheet_utils(sheet_id_map[sheet_name])
  let context = {
    cur_row: 0,
    requests: [],
    value_requests: [],
    misc_data: {}
  }
  context.requests.push(su.adjustcolumnwidth(0,170))

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

  const purchase_type = getType(spreadsheet, vueobj, sheet_id_map)

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':A' + context.cur_row.toString(),
    values: [[purchase_type.name]]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,1))

  purchase_type.pre_stage(context, su)

  // Title
  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['', 'Worst', 'Best']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,1,3))

  const row_start_of_details = context.cur_row
  let details = purchase_type.start_details(context)
  details.push(['Refurbishment', vueobj.refurb_cost_total.max, vueobj.refurb_cost_total.min])
  details.push(['Stamp Duty', vueobj.stampduty_total.max, vueobj.stampduty_total.min])
  vueobj.othercosts_items_detail.forEach(function (ite) {
    details.push([ite.name, -1 * ite.worst, -1 * ite.best])
  })

  // Now add in the fixed loan costs
  vueobj.caculated_loan_details.forEach(function (loan) {
    details.push([loan.name, loan.amount * -1, loan.amount * -1])
    details.push([loan.name + ' interest', loan.interest, loan.interest])
  })

  details = details.concat(purchase_type.end_details(context))
  let detail_row_map = {}

  details.forEach(function (detail) {
    context.cur_row = context.cur_row + 1
    detail_row_map[detail[0]] = context.cur_row
    context.value_requests.push({
      range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
      values: [[detail[0], detail[1], detail[2]]]
    })
    if (detail[0] === '(During refurbishment)') {
      context.requests.push(su.makeitalicandvaligntop(context.cur_row-1,context.cur_row,0,1))
    } else {
      context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,1))
    }
  })

  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  const total_money_needed_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Total Money needed', '=SUM(B' + (row_start_of_details+1).toString() + ':B' + (context.cur_row-1).toString() + ')', '=SUM(C' + (row_start_of_details+1).toString() + ':C' + (context.cur_row-1).toString() + ')']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,3))
  context.requests.push(su.formatcurrency(row_start_of_details,context.cur_row,1,3))

  if (vueobj.serialized_data.finance.bridge.usebridge) {
    if (vueobj.serialized_data.refinance.refinance_userefinance) {
      _output_refinance_using_bridge(context, su, vueobj, total_money_needed_row, detail_row_map)
    }
  }

  return {
    value_requests: context.value_requests,
    requests: context.requests
  }
}

function _output_refinance_using_bridge(context, su, vueobj, total_money_needed_row, detail_row_map) {
  const bridge_costs_row = detail_row_map[bridge_amount_string]

  context.cur_row = context.cur_row + 1

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':B' + context.cur_row.toString(),
    values: [['Refinance to exit bridge']]
  })
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,1))

  context.cur_row = context.cur_row + 1
  const gdv_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['GDV', vueobj.gdv_total.min, vueobj.gdv_total.max]]
  })
  context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))

  context.cur_row = context.cur_row + 1
  const refinance_ltv_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Refinance LTV', vueobj.serialized_data.refinance.refinance_userefinance_ltv.min / 100, vueobj.serialized_data.refinance.refinance_userefinance_ltv.max / 100]]
  })
  context.requests.push(su.formatpercentage(context.cur_row-1,context.cur_row,1,3))

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [['Refinance Rate', vueobj.serialized_data.refinance.refinance_userefinance_rate.min / 100, vueobj.serialized_data.refinance.refinance_userefinance_rate.max / 100]]
  })
  context.requests.push(su.formatpercentage(context.cur_row-1,context.cur_row,1,3))

  context.cur_row = context.cur_row + 1
  const mortgage_total_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [[
      'Refinance mortgage total',
      '=B' + (gdv_row).toString() + '*B' + (refinance_ltv_row).toString(),
      '=C' + (gdv_row).toString() + '*C' + (refinance_ltv_row).toString(),
    ]]
  })
  context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))

  context.cur_row = context.cur_row + 1
  const payback_bridge_row = context.cur_row
  let paybacks_last_row = payback_bridge_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [[
      'Pay back bridge', '=B' + (bridge_costs_row).toString() + ' * -1',
      '=C' + (bridge_costs_row).toString() + ' * -1'
    ]]
  })
  context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))

  vueobj.caculated_loan_details.forEach(function (loan) {
    context.cur_row = context.cur_row + 1
    paybacks_last_row = context.cur_row
    context.value_requests.push({
      range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
      values: [[
        'Pay back ' + loan.name, loan.amount, loan.amount
      ]]
    })
    context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))
  })


  context.cur_row = context.cur_row + 1
  const remaining_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [[
      'Remaining',
      '=B' + (mortgage_total_row).toString() + '-sum(B' + (payback_bridge_row).toString() + ":B" + (paybacks_last_row).toString() + ")",
      '=C' + (mortgage_total_row).toString() + '-sum(C' + (payback_bridge_row).toString() + ":C" + (paybacks_last_row).toString() + ")",
    ]]
  })
  context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))

  context.cur_row = context.cur_row + 1
  const original_row = context.cur_row
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [[
      'Original Money in',
      '=B' + (total_money_needed_row).toString(),
      '=C' + (total_money_needed_row).toString()
    ]]
  })
  context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,3))

  context.cur_row = context.cur_row + 1
  context.value_requests.push({
    range: sheet_name + '!A' + context.cur_row.toString() + ':C' + context.cur_row.toString(),
    values: [[
      'Left in',
      '=B' + (original_row).toString() + '-B' + (remaining_row).toString(),
      '=C' + (original_row).toString() + '-C' + (remaining_row).toString()
    ]]
  })
  context.requests.push(su.formatcurrency(context.cur_row-1,context.cur_row,1,3))
  context.requests.push(su.makeboldandvaligntop(context.cur_row-1,context.cur_row,0,3))

}


export default {
  sheet_name: sheet_name,
  get_sheet_values: get_sheet_values
}
