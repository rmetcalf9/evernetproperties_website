
// Creates slots between 9am and 6pm on the days
//  all 1 hour slots

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

function get_slot_text (value) {
  let minutes = value.getMinutes()
  if (minutes === 0) {
    minutes = ''
  } else if (minutes < 10) {
    minutes = ':0' + minutes
  } else {
    minutes = ':' + minutes.toString()
  }
  let day_part = 'am'
  let hours = value.getHours()
  if (hours > 11) {
    day_part = 'pm'
    hours -= 12
    if (hours === 0) {
      hours = 12
    }
  }

  const time = hours + minutes + day_part
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const currentDayOfWeek = daysOfWeek[value.getDay()]

  return time + ' ' + currentDayOfWeek + ' ' + (value.getDate()).toString() + nthNumber(value.getDate())
}

function slots_overlap(s1, s2, e1, e2) {
  if (e2 <= s1) {
    return false
  }
  if (e1 >= s2) {
    return false
  }
  return true
}

function get_latest_clashing_slot_end_time(slot_start_time, slot_end_time, day) {
  let ret_val = undefined
  day.reserved_slots.map(function(reserved_slot) {
    let reserved_slot_start_time_obj = new Date(day.js_day_obj)
    reserved_slot_start_time_obj.setHours(reserved_slot.start.substr(0,2),reserved_slot.start.substr(3,2))
    let reserved_slot_end_time_obj = new Date(day.js_day_obj)
    reserved_slot_end_time_obj.setHours(reserved_slot.end.substr(0,2),reserved_slot.end.substr(3,2))
    if (slots_overlap(slot_start_time, slot_end_time, reserved_slot_start_time_obj, reserved_slot_end_time_obj)) {
      if (typeof (ret_val) === 'undefined') {
        ret_val = new Date(reserved_slot_end_time_obj)
      } else {
        if (ret_val < reserved_slot_end_time_obj) {
          ret_val = new Date(reserved_slot_end_time_obj)
        }
      }
    }
  })
  return ret_val
}

function get_next_free_slot(cur_time, day) {
  let day_end_time = new Date(day.js_day_obj)
  day_end_time.setHours(18)

  let slot_start_time = new Date(cur_time)
  let slot_end_time = new Date(slot_start_time)
  slot_end_time.setTime(slot_end_time.getTime() + (60 * 60 * 1000))
  if (slot_end_time > day_end_time) {
    return undefined
  }

  let clash_slot_end = get_latest_clashing_slot_end_time(slot_start_time, slot_end_time, day)
  if (typeof (clash_slot_end) === 'undefined') {
    return {
      "text": get_slot_text(slot_start_time),
      "start_js_day_obj": slot_start_time,
      "end_js_day_obj":   slot_end_time,
      "day": day
    }
  }
  if (clash_slot_end > day_end_time) {
    return undefined
  }
  return get_next_free_slot(clash_slot_end, day)
}

function get_slots_from_viewing_days(viewing_days) {
  let xxx = 0
  let ret_val = []
  viewing_days.map(function (day) {
    let cur_time = new Date(day.js_day_obj)
    cur_time.setHours(9)
    let slot = get_next_free_slot(cur_time, day)
    while (typeof (slot) !== 'undefined') {
      ret_val.push(slot)
      cur_time = new Date(slot.end_js_day_obj)
      slot = get_next_free_slot(cur_time, day)
    }
  })
  return ret_val
}


export default {
  get_slot_text: get_slot_text,
  get_slots_from_viewing_days: get_slots_from_viewing_days
}
