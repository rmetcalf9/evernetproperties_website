
const next_event = {
  date: '2024-12-11T18:30:00Z',
  title: 'Property Pipeline Builder',
  subtitle: 'Early Access Webinar',
  description: 'Property Pipeline Builder early access user group session. This session is for users who are interested in using it to manage their deal pipeline. I will demonstrate major features, present the road map and invite discussion to shape the future direction. In order to generate the maximum value for users I want to gather as much feedback as possible.',
  meeting_url: 'https://meet.google.com/fyv-szmv-wxs'
}
const oneHour = 3600000;

function get_stage(event) {
  // before_event
  // near_and_during_event -> 1 hour before event change to this
  // after_event -> 2 hours after event change to this
  const webinarDate = new Date(event.date);
  const timeLeft = webinarDate.getTime() - (new Date()).getTime()

  const time_to_switch_to_near = oneHour * 2

  if (timeLeft > (time_to_switch_to_near)) {
    return 'before_event'
  }
  // show join link until one hour into the event
  if (timeLeft < time_to_switch_to_near) { // one hour PASSED start
    return 'near_and_during_event'
  }
  return 'after_event'
}


export default {
  next_event: next_event,
  get_stage: get_stage
}
