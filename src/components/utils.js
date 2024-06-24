
function digits_with_commas_recusrive(numstr) {
  // assume positive
  // assume always recieve string
  if (numstr.length < 4) {
    return numstr
  }
  var high_part = numstr.substring(0, numstr.length - 3)
  var low_part = numstr.substring(numstr.length - 3)
  return digits_with_commas_recusrive(high_part)  + ',' + low_part
}

function format_currency (num) {
  if (typeof(num) === 'undefined') {
    return ''
  }
  if ( typeof (num) === 'string' ) {
    if (num.trim().length === 0) {
      return '£-.--'
    }
  }
  if (isNaN(num)) {
    return ''
  }
  var isneg = (num < 0)
  var prefix="£"
  if (isneg) {
    prefix="-£"
    num = num * -1
  }
  return prefix + digits_with_commas_recusrive(num.toFixed(0).toString())
}

function format_percent (num) {
  return (num * 100).toFixed(2).toString() + '%'
}

export default {
  format_currency: format_currency,
  format_percent: format_percent
}
