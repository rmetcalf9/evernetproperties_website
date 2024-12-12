import { describe, expect, it, test } from 'vitest';
import events from '../../../src/events.js'


const standard_event = {
  date: '2024-12-11T18:30:00Z',
  title: 'Property Pipeline Builder',
  subtitle: 'Early Access Webinar',
  description: 'Property Pipeline Builder early access user group session. This session is for users who are interested in using it to manage their deal pipeline. I will demonstrate major features, present the road map and invite discussion to shape the future direction. In order to generate the maximum value for users I want to gather as much feedback as possible.',
  meeting_url: 'https://meet.google.com/fyv-szmv-wxs'
}
const oneHour = 60 * 60 * 1000; // times are in miliseconds


test('2_weeks_before_event_stage_shows', () => {
  const current_date = new Date(standard_event.date)
  const two_weeks_before_event = new Date(current_date.setDate(current_date.getDate() - (2 * 7)))
  expect(events.get_stage_internal(standard_event, current_date)).toBe('before_event')
})

test('3_hours_before_event_stage_shows', () => {
  const current_date = new Date(standard_event.date)
  const three_house_before_event = new Date(current_date.getTime() - (3 * oneHour))
  expect(events.get_stage_internal(standard_event, three_house_before_event)).toBe('before_event')
})

test('1_hour_less_1_sec_before_event_stage_shows_near', () => {
  const current_date = new Date(standard_event.date)
  const three_house_before_event = new Date(current_date.getTime() - (1 * oneHour) + 1000)
  expect(events.get_stage_internal(standard_event, three_house_before_event)).toBe('near_and_during_event')
})

test('exact_event_start_shows_near', () => {
  const current_date = new Date(standard_event.date)
  expect(events.get_stage_internal(standard_event, current_date)).toBe('near_and_during_event')
})

test('half_hour_in_shows_near', () => {
  const current_date = new Date(standard_event.date)
  const half_hour_after_event = new Date(current_date.getTime() + (0.5 * oneHour))
  expect(events.get_stage_internal(standard_event, half_hour_after_event)).toBe('near_and_during_event')
})

test('one_and_a_half_hour_after_shows_after', () => {
  const current_date = new Date(standard_event.date)
  const one_and_a_half_hours_after_event = new Date(current_date.getTime() + (1.5 * oneHour))
  expect(events.get_stage_internal(standard_event, one_and_a_half_hours_after_event)).toBe('after_event')
})

test('one_week_after_shows_after', () => {
  const current_date = new Date(standard_event.date)
  const one_week_after_event = new Date(current_date.setDate(current_date.getDate() + (1 * 7)))
  expect(events.get_stage_internal(standard_event, one_week_after_event)).toBe('after_event')
})
