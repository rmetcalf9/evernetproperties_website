
function are_we_at_open_mustach (str, current_char) {
  if (current_char > str.length - 2) {
    return false
  }
  if (str[current_char] === '{') {
    if (str[current_char + 1] === '{') {
      return true
    }
  }
  return false
}

function get_mustach (str, start_char) {
  var next_close_start = undefined
  var current_char = start_char
  while (current_char < str.length - 1) {
    if (str[current_char] === '}') {
      if (str[current_char + 1] === '}') {
        return str.substr(start_char, (current_char+2) - start_char)
      }
    }
    current_char++
  }

  return undefined
}

function evalarray (ites, context) {
  if (ites.length===1) {
    return context[ites]
  }
  const t = ites[0]
  ites.shift()
  return evalarray(ites, context[t])
}

function evalsinglemustach (mustach, context) {
  var mustach_content = mustach.substr(2)
  mustach_content = mustach_content.substr(0, mustach_content.length - 2).trim()
  if (mustach_content==='') {
    return ''
  }
  const ites = mustach_content.split('.')

  return evalarray(ites, context)
}

function evalmustachstragainstcontext (str, context) {
  var output_str = ''
  var current_char = 0
  while (current_char < str.length) {
    if (are_we_at_open_mustach(str, current_char)) {
      const mustach_str = get_mustach(str, current_char)
      if (typeof (mustach_str) === 'undefined') {
        // It is an open without a close
        output_str += str[current_char]
      } else {
        output_str += evalsinglemustach(mustach_str, context)
        current_char += (mustach_str.length - 1)
      }
    } else {
      output_str += str[current_char]
    }
    current_char++
  }
  return output_str
}



export default {
  evalmustachstragainstcontext: evalmustachstragainstcontext,
  evalsinglemustach: evalsinglemustach
}
