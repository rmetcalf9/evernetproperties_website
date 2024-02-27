
function format_currency (num) {
  if (num<1000) {
    return '£' + num
  }
  var ns = num.toString()
  return '£' + ns.substring(0, ns.length - 3) + ',' + num.toString().substring(ns.length - 3)
}


export default {
  format_currency: format_currency
}
