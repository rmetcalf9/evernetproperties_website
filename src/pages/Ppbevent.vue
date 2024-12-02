<template>
  <div class="webinar-page">
    <div v-if="stage === 'after_event'">
      <header class="hero">
        <h1>Property Pipeline Builder</h1>
        <h2>Event completed</h2>
        <p>Watch this space for the next event</p>
      </header>
    </div>
    <div v-if="stage !== 'after_event'">
      <!-- Header with Countdown Timer -->
      <header class="hero">
        <h1>Property Pipeline Builder</h1>
        <h2>Early Access Webinar</h2>
        <div class="countdown-timer">
          <p>🚨 Countdown to the Webinar 🚨</p>
          <h2>{{ countdown }}</h2>
        </div>
      </header>

      <!-- Webinar Details Section -->
      <section class="details">
        <p>📅 <strong>Date:</strong> Wednesday, 11 December 2024</p>
        <p>⏰ <strong>Time:</strong> 6:30 PM (GMT)</p>
        <p>🌐 <strong>Where:</strong> Online (link sent upon registration)</p>
      </section>

      <!-- What’s in Store Section -->
      <section class="content">
        <h2>What’s in Store for You?</h2>
        <ul>
          <li>🚀 Discover Core Features: Organize properties and streamline due diligence.</li>
          <li>💡 Shape the Future: Share ideas for upcoming features and enhancements.</li>
          <li>🤝 Collaborate Live: Q&A session for feedback and workflow tips.</li>
        </ul>
      </section>

      <h4>Exclusive webinar for Early Access members</h4>
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
      </div>
    </div>
  </div>
</template>

<script>
import { useBackendConnectionStore } from 'stores/backend_connection'
import LoginButton from '../components/LoginButton.vue'

const next_event_date = "2024-12-11T18:30:00Z";


const webinarDate = new Date(next_event_date).getTime();
const oneHour = 3600000;

function getTimeLeft() {
  const now = new Date().getTime();
  return webinarDate - now;
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
    stage () {
      // before_event
      // near_and_during_event -> 1 hour before event change to this
      // after_event -> 2 hours after event change to this
      const timeLeft = getTimeLeft()
      if (timeLeft > (oneHour * 2)) {
        return 'before_event'
      }
      if (timeLeft > (oneHour * -2)) {
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
  font-size: 2rem;
  color: #e63946;
}

.details,
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
