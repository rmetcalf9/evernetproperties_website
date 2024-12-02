<template>
  <div class="webinar-page">
    <div v-if="stage === 'after_event'">
      <header class="hero">
        <h1>{{ next_event.title }}</h1>
        <h2>Event completed</h2>
        <p>Watch this space for the next event</p>
      </header>
    </div>
    <div v-if="stage !== 'after_event'">
      <!-- Header with Countdown Timer -->
      <header class="hero">
        <h1>{{ next_event.title }}</h1>
        <h2>{{ next_event.subtitle }}</h2>
        <div v-if="stage === 'near_and_during_event'" class="ppbevent-above-time-join-link">
          <div v-if="isLoggedin">
            <a :href="next_event.meeting_url" target="_new">Click here to join</a>
          </div>
          <div v-if="!isLoggedin">
            <LoginButton
              :floating="false"
              :center="true"
            />
            Sign in to get join link
          </div>
        </div>
        <div class="countdown-timer">
          <h2>{{ countdown }}</h2>
        </div>

        <p>📅 <strong>Date:</strong> {{ event_day }}</p>
        <p>⏰ <strong>Time:</strong> {{ event_time }}</p>
        <p>🌐 <strong>Where:</strong> Online (link sent upon registration)</p>

        <p>{{ next_event.description }}</p>
        </header>

      <!-- What’s in Store Section -->
      <section class="content">
        <h2>What’s in Store for You?</h2>
        <ul>
          <li>🚀 Discover Core Features: Organize properties and streamline due diligence.</li>
          <li>💡 Shape the Future: Share ideas for upcoming features and enhancements.</li>
          <li>🤝 Collaborate Live: Q&A session for feedback and workflow tips.</li>
        </ul>
      </section>

      <div v-if="stage !== 'near_and_during_event'">
        <h4>Webinar for Early Access members</h4>
        <div v-if="!isLoggedin">
          <p>If you are already a member of our early access program login for calendar invite.</p>
          <div class="ppbevent-loginbutton-wrapper">
            <LoginButton
              :floating="false"
              :center="true"
            />
          </div>
          <p>If you are not a member of our early access program, joining is free for Samuel Leeds academy members and you can sign up using the link below.</p>

          <div align="center">
            <q-btn
              color="positive"
              label="Click here to sign up for the early access program!"
              @click="click_get_started"
            />
          </div>
        </div>
        <div v-if="isLoggedin">
          <p>As an early access member you are invited to join the event.</p>
            <div><center>
              <add-to-calendar-button
                :name="next_event.title + ' - ' + next_event.subtitle"
                options="'Apple','Google','Yahoo','iCal'"
                location="Online Event"
                :description="next_event.description + '[br][br][url]' + next_event.meeting_url + '|Click here to join meeting[/url]'"
                :startDate="event_cal_start_date"
                :endDate="event_cal_end_date"
                :startTime="event_cal_start_time"
                :endTime="event_cal_end_time"
                timeZone="Europe/London"
              ></add-to-calendar-button>
            </center></div>
          or return to this page on {{ event_day }} at {{ event_time }}.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBackendConnectionStore } from 'stores/backend_connection'
import LoginButton from '../components/LoginButton.vue'
import 'add-to-calendar-button'


const next_event = {
  date: '2024-12-11T18:30:00Z',
  title: 'Property Pipeline Builder',
  subtitle: 'Early Access Webinar',
  description: 'Property Pipeline Builder early access user group session. This session is for users who are interested in using it to manage their deal pipeline. I will demonstrate major features, present the road map and invite discussion to shape the future direction. In order to generate the maximum value for users I want to gather as much feedback as possible.',
  meeting_url: 'https://meet.google.com/fyv-szmv-wxs'
}


const webinarDate = new Date(next_event.date);
const oneHour = 3600000;

function getTimeLeft() {
  const now = new Date().getTime();
  return webinarDate.getTime() - now;
}
function twoDigit(num) {
  return ('00' + num).substr(-2)
}

export default {
  name: 'PpbEvent',
  components: {
    LoginButton
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data() {
    return {
      countdown: ""
    };
  },
  mounted() {
    this.startCountdown();
  },
  computed: {
    next_event () {
      return next_event
    },
    event_cal_start_date () {
      // See https://add-to-calendar-button.com/configuration for format
      // YYYY-MM-DD
      var mm = webinarDate.getMonth() + 1;
      var dd = webinarDate.getDate();
      var yy = webinarDate.getFullYear();
      return yy + '-' + twoDigit(mm) + '-' + twoDigit(dd)
    },
    event_cal_end_date () {
      // 2024-12-05
      return this.event_cal_start_date
    },
    event_cal_start_time () {
      // "23:30"
      // HH:MM
      var hh = webinarDate.getHours()
      var mm = webinarDate.getMinutes()
      return twoDigit(hh) + ':' + twoDigit(mm)
    },
    event_cal_end_time () {
      // "23:30"
      var hh = webinarDate.getHours()
      var mm = webinarDate.getMinutes()
      return twoDigit(hh+1) + ':' + twoDigit(mm)
    },
    event_day () {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return webinarDate.toLocaleDateString("en-GB", options)
    },
    event_time () {
      var options = { hour12: true, hour: '2-digit', minute:'2-digit' }
      return webinarDate.toLocaleTimeString('en-GB', options)
    },
    stage () {
      // before_event
      // near_and_during_event -> 1 hour before event change to this
      // after_event -> 2 hours after event change to this
      const timeLeft = getTimeLeft()
      if (timeLeft > (oneHour * 2)) {
        return 'before_event'
      }
      // show join link half an hour before to logged on users
      if (timeLeft > (oneHour * -0.5)) {
        return 'near_and_during_event'
      }
      return 'after_event'
    },
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
  },
  methods: {
    click_get_started () {
      this.$router.push('/signuptoearlyaccess')
    },
    startCountdown() {
      setInterval(() => {
        const timeLeft = getTimeLeft();

        if (timeLeft <= 0) {
          this.countdown = "Webinar has started!";
          return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        this.countdown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        // this.countdown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      }, 1000);
    },
    register() {
      // Placeholder: Send formData to your API or handle submission
      alert(`Thank you for registering, ${this.formData.name}!`);
    },
  },
};
</script>

<style>
.webinar-page {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.hero {
  background: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
}

.countdown-timer h2 {
  font-size: 1.7rem;
  color: #e63946;
  margin-top: 0px;
}

.content {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 10px 0;
}

.webinar-page h4 {
  margin-bottom: 10px;
}

.ppbevent-loginbutton-wrapper {
  margin-bottom: 10px;
}

</style>
