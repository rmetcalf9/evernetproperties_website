
function isValidTimeStr(timeStr) {
  if (timeStr.length !== 5) {
    return false
  }
  const eles = timeStr.split(':')
  if (eles.length !== 2) {
    return false
  }
  if (eles[0].length !== 2) {
    return false
  }
  if (eles[1].length !== 2) {
    return false
  }
  if (isNaN(eles[0])) {
    return false
  }
  if (isNaN(eles[1])) {
    return false
  }
  const hour = parseInt(eles[0])
  if (hour < 0) {
    return false
  }
  if (hour > 23) {
    return false
  }
  const minute = parseInt(eles[0])
  if (minute < 0) {
    return false
  }
  if (minute > 59) {
    return false
  }
  return true
}

function pad(num, size) {
    num = num.toString()
    while (num.length < size) num = "0" + num
    return num
}

class timeObj {
  constructor(hour, minute) {
    this.hour = hour;
    this.minute = minute;
  }
  isBefore (otherObj) {
    if (this.hour < otherObj.hour) {
      return true
    }
    if (this.hour > otherObj.hour) {
      return false
    }
    if (this.minute < otherObj.minute) {
      return true
    }
    if (this.minute > otherObj.minute) {
      return false
    }
    return true
  }
  addHours (num) {
    this.hour += num
    if (this.hour >= 24) {
      this.hour = 23
      this.minute = 59
    }
  }
  toString () {
    // always 24 hour 00:00
    return pad(this.hour,2) + ':' + pad(this.minute,2)
  }
}
function copy_time_obj(time_obj) {
  return new timeObj(
    time_obj.hour, time_obj.minute
  )
}

function get_time_obj(timestr) {
  // TODO add validation and return undefined for invalid times
  const eles = timestr.split(":")
  return new timeObj(parseInt(eles[0]), parseInt(eles[1]))
}

export default {
  isValidTimeStr: isValidTimeStr,
  get_time_obj: get_time_obj,
  copy_time_obj: copy_time_obj
}
