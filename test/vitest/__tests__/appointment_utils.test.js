import { describe, expect, it, test } from 'vitest';
import appointment_utils from '../../../src/components/CallAssist/appointment_utils.js'


const example_viewing_day_no_reserved_slots = [{
  "id": 1,
  "text": "Wednesday 5th February",
  "js_day_obj": "2025-02-05T00:00:00.000Z",
  "selected": true,
  "reserved_slots": []
}]

const example_viewing_day_one_reserved_slot = [{
  "id": 1,
  "text": "Wednesday 5th February",
  "js_day_obj": "2025-02-05T00:00:00.000Z",
  "selected": true,
  "reserved_slots": [{
    "id": "c1fd00f5-04cc-43af-b2df-03494366a4d1",
    "start": "09:00",
    "end": "10:00"
  }]
}]

// slots are always 1 hour
function get_slot(day, start_hour, start_minute) {
  if (typeof (start_minute) === 'undefined') {
    start_minute = 0
  }
  let start_d = new Date(day.js_day_obj)
  start_d.setHours(start_hour, start_minute)
  let end_d = new Date(day.js_day_obj)
  end_d.setTime(start_d.getTime() + (60 * 60 * 1000))

  function time_str(d) {
    return d.toTimeString().split(' ')[0].split(':')[0] + ':' + d.toTimeString().split(' ')[0].split(':')[1]
  }
  return {
    "text": appointment_utils.get_slot_text(start_d), //"9am wed 5th",
    "start_js_day_obj": start_d,
    "end_js_day_obj":   end_d
  }
}

function remove_day_tag_from_objects_in_array(ite) {
  ite = ite.map(function (x) {
    delete x['day']
    return x
  })
  return ite
}

test('No days', () => {
  expect(appointment_utils.get_slots_from_viewing_days([])).toStrictEqual([])
})

test('One Day All Slots', () => {
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_no_reserved_slots))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 9),
    get_slot(example_viewing_day_no_reserved_slots[0], 10),
    get_slot(example_viewing_day_no_reserved_slots[0], 11),
    get_slot(example_viewing_day_no_reserved_slots[0], 12),
    get_slot(example_viewing_day_no_reserved_slots[0], 13),
    get_slot(example_viewing_day_no_reserved_slots[0], 14),
    get_slot(example_viewing_day_no_reserved_slots[0], 15),
    get_slot(example_viewing_day_no_reserved_slots[0], 16),
    get_slot(example_viewing_day_no_reserved_slots[0], 17),
  ])
})

test('One Day 9am slot blocked', () => {
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_one_reserved_slot))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 10),
    get_slot(example_viewing_day_no_reserved_slots[0], 11),
    get_slot(example_viewing_day_no_reserved_slots[0], 12),
    get_slot(example_viewing_day_no_reserved_slots[0], 13),
    get_slot(example_viewing_day_no_reserved_slots[0], 14),
    get_slot(example_viewing_day_no_reserved_slots[0], 15),
    get_slot(example_viewing_day_no_reserved_slots[0], 16),
    get_slot(example_viewing_day_no_reserved_slots[0], 17),
  ])
})

test('One Day 10am slot blocked', () => {
  let dup = JSON.parse(JSON.stringify(example_viewing_day_one_reserved_slot))
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].start = "10:00"
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].end = "11:00"
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_one_reserved_slot))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 9),
    get_slot(example_viewing_day_no_reserved_slots[0], 11),
    get_slot(example_viewing_day_no_reserved_slots[0], 12),
    get_slot(example_viewing_day_no_reserved_slots[0], 13),
    get_slot(example_viewing_day_no_reserved_slots[0], 14),
    get_slot(example_viewing_day_no_reserved_slots[0], 15),
    get_slot(example_viewing_day_no_reserved_slots[0], 16),
    get_slot(example_viewing_day_no_reserved_slots[0], 17),
  ])
})

test('One Day 4pm slot blocked', () => {
  let dup = JSON.parse(JSON.stringify(example_viewing_day_one_reserved_slot))
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].start = "16:00"
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].end = "17:00"
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_one_reserved_slot))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 9),
    get_slot(example_viewing_day_no_reserved_slots[0], 10),
    get_slot(example_viewing_day_no_reserved_slots[0], 11),
    get_slot(example_viewing_day_no_reserved_slots[0], 12),
    get_slot(example_viewing_day_no_reserved_slots[0], 13),
    get_slot(example_viewing_day_no_reserved_slots[0], 14),
    get_slot(example_viewing_day_no_reserved_slots[0], 15),
    get_slot(example_viewing_day_no_reserved_slots[0], 17),
  ])
})

test('One Day 5pm slot blocked', () => {
  let dup = JSON.parse(JSON.stringify(example_viewing_day_one_reserved_slot))
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].start = "17:00"
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].end = "18:00"
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_one_reserved_slot))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 9),
    get_slot(example_viewing_day_no_reserved_slots[0], 10),
    get_slot(example_viewing_day_no_reserved_slots[0], 11),
    get_slot(example_viewing_day_no_reserved_slots[0], 12),
    get_slot(example_viewing_day_no_reserved_slots[0], 13),
    get_slot(example_viewing_day_no_reserved_slots[0], 14),
    get_slot(example_viewing_day_no_reserved_slots[0], 15),
    get_slot(example_viewing_day_no_reserved_slots[0], 16),
  ])
})

test('One Day 6pm slot blocked', () => {
  let dup = JSON.parse(JSON.stringify(example_viewing_day_one_reserved_slot))
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].start = "18:00"
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].end = "19:00"
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_one_reserved_slot))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 9),
    get_slot(example_viewing_day_no_reserved_slots[0], 10),
    get_slot(example_viewing_day_no_reserved_slots[0], 11),
    get_slot(example_viewing_day_no_reserved_slots[0], 12),
    get_slot(example_viewing_day_no_reserved_slots[0], 13),
    get_slot(example_viewing_day_no_reserved_slots[0], 14),
    get_slot(example_viewing_day_no_reserved_slots[0], 15),
    get_slot(example_viewing_day_no_reserved_slots[0], 16),
    get_slot(example_viewing_day_no_reserved_slots[0], 17),
  ])
})

test('One Day 10:30 slot blocked', () => {
  let dup = JSON.parse(JSON.stringify(example_viewing_day_one_reserved_slot))
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].start = "10:30"
  example_viewing_day_one_reserved_slot[0].reserved_slots[0].end = "11:30"
  expect(
    remove_day_tag_from_objects_in_array(appointment_utils.get_slots_from_viewing_days(example_viewing_day_one_reserved_slot))
  ).toStrictEqual([
    get_slot(example_viewing_day_no_reserved_slots[0], 9),
    get_slot(example_viewing_day_no_reserved_slots[0], 11, 30),
    get_slot(example_viewing_day_no_reserved_slots[0], 12, 30),
    get_slot(example_viewing_day_no_reserved_slots[0], 13, 30),
    get_slot(example_viewing_day_no_reserved_slots[0], 14, 30),
    get_slot(example_viewing_day_no_reserved_slots[0], 15, 30),
    get_slot(example_viewing_day_no_reserved_slots[0], 16, 30),
  ])
})
