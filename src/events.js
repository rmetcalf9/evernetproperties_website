
const next_event = {
  date: '2025-08-21T19:00:00Z',
  title: 'Property Pipeline Builder',
  subtitle: 'Unlock the Full Potential of Rent-to-Rent with Property Pipeline Builder',
  description: 'Our latest update to Property Pipeline Builder brings you a complete Rent-to-Rent toolkit — designed to streamline your process from lead to deal. In this webinar, you’ll discover how to: Effortlessly record and track landlord leads, Conduct high-impact sales calls that convert, Manage deals through every stage to successful completion. Whether you’re new to Rent-to-Rent or looking to sharpen your approach, this session will show you how Property Pipeline Builder can simplify your workflow, save you time, and boost your results.',
  meeting_url: 'https://meet.google.com/ugz-ktpg-jfc'
}
const oneHour = 3600000;

function get_stage_internal(event, current_date) {
  // before_event
  // near_and_during_event -> 1 hour before event change to this
  // after_event -> 2 hours after event change to this
  const webinarDate = new Date(event.date);
  const timeLeft = webinarDate.getTime() - (current_date).getTime()

  const time_to_switch_to_near = oneHour * 2
  const time_to_switch_to_after = oneHour * -1

  if (timeLeft > (time_to_switch_to_near)) {
    return 'before_event'
  }
  // show join link until one hour into the event
  if (timeLeft > time_to_switch_to_after) { // one hour PASSED start
    return 'near_and_during_event'
  }
  return 'after_event'
}

function get_stage(event) {
  return get_stage_internal(event, new Date())
}

export default {
  next_event: next_event,
  get_stage: get_stage,
  get_stage_internal: get_stage_internal //for testing
}
