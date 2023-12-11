<template>
  <q-page class="flex column main-page">
    <div class="main-heading">Privacy Policy</div>


    <div class="heading">Cookies</div>
    <div>Like most websites we use cookies to keep session data, as well as to mark if users have consented to the data policy. We also use third party tools such as google analytics which work anonymized statistical third-party cookies</div>

    <div class="heading">The type of personal information we collect</div>
    <div>We currently collect and process the following information:</div>
    <ul>
    <li>Personal identifiers, contacts and characteristics (for example, name and contact details)</li>
    </ul>

    <div class="heading">How we get the personal information and why we have it</div>
    <div>The personal information we process is provided to us directly by you for one of the following reasons:</div>
    <ul>
      <li>To help us find a property that matches your requirements</li>
    </ul>
    <div>We use the information that you have given us in order to help us secure a property for you. We may share this information with your consent.</div>
    <div>Under the UK General Data Protection Regulation (UK GDPR), the lawful bases we rely on for processing this information are:</div>
    <ol>
    <li>Your consent. You are able to remove your consent at any time. You can do this by contacting us</li>
    </ol>

    <div class="heading">How we store your personal information</div>
    <div>Your information is securely stored.</div>
    <div style="padding-top: 10px"><q-btn
      @click="btnHome"
      label="Back home"
      padding
    ></q-btn></div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrivacyPolicyPage',
  methods: {
    btnHome () {
      this.$router.push('/')
    }
  }
})
</script>

<style>
.main-page {
  padding: 20px;
}
.main-heading {
  font-size: 2rem;
  font-weight: 500;
}
.heading {
  font-size: 1rem;
  font-weight: 500;
}
</style>
