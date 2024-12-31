
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
  if (num === null) {
    return '£-.--'
  }
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

function format_percent (num, decimal_places) {
  if (typeof (decimal_places) === 'undefined') {
    decimal_places = 2
  }
  return (num * 100).toFixed(decimal_places).toString() + '%'
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function get_source_text(source_obj) {
  if (typeof (source_obj) === 'undefined') {
    return 'Self'
  }
  if (source_obj.type === 'self') {
    return 'Self'
  }
  if (typeof (source_obj.value) === 'undefined') {
    return '<Blank>'
  }
  if (source_obj.value === '') {
    return '<Blank>'
  }
  return source_obj.value
}

function get_agent_text(agent_text) {
  if (typeof (agent_text) === 'undefined') {
    return '<Blank>'
  }
  if (agent_text === '') {
    return '<Blank>'
  }
  return agent_text
}

function boolean_undefined_to_false(value) {
  if (typeof (value) === 'boolean') {
    return value
  }
  return false
}

const nthNumber = (number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function format_date_as_string_without_year (value) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayOfWeek = daysOfWeek[value.getDay()]
  const month = value.toLocaleString('default', { month: 'long' })

  return currentDayOfWeek + ' ' + (value.getDate()).toString() + nthNumber(value.getDate()) + ' ' + month
}

export default {
  format_currency: format_currency,
  format_percent: format_percent,
  uuidv4: uuidv4,
  get_source_text: get_source_text,
  get_agent_text: get_agent_text,
  boolean_undefined_to_false: boolean_undefined_to_false,
  format_date_as_string_without_year: format_date_as_string_without_year
}
