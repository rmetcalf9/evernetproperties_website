
function format_currency (num) {
  if (typeof(num) === 'undefined') {
    return ''
  }
  if (num<1000) {
    return '£' + num.toFixed(0)
  }
  var ns = num.toFixed(0).toString()
  return '£' + ns.substring(0, ns.length - 3) + ',' + ns.toString().substring(ns.length - 3)
}


export default {
  format_currency: format_currency
}
