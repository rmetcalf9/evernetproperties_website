<template>
  <div class="webinar-page">
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
    <p>If you are already a member of our early access program, watch your inbox for your invite. If you are interested in attending and wish to join the early access program you can join using the link below.</p>

    <div align="center">
      <q-btn
        color="positive"
        label="Click here to sign up for the early access program!"
        @click="click_get_started"
      />
    </div>

  </div>
</template>

<script>

const next_event_Data = "2024-12-11T18:30:00Z";

export default {
  name: 'PpbEvent',
  data() {
    return {
      countdown: ""
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    click_get_started () {
      this.$router.push('/signuptoearlyaccess')
    },
    startCountdown() {
      const webinarDate = new Date(next_event_Data).getTime();
      setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = webinarDate - now;

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

        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
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

</style>
