<template>
  <q-page class="flex flex-center">
  <div class="main-page fit row wrap justify-center items-center content-center">
    <div class="flex-break"></div>
    <div class="flex row first-section">
      <div>
        <img
          alt="Profile Picture"
          src="~assets/profile-pic.png"
          class="profile-picture"
        >
      </div>
      <div style="max-width: 400px;">
        <h3 style="margin: 0px;">Robert Metcalf</h3>
        <div class="aboutpage-paragraph">With over 20 years of experience in software engineering, I have built enterprise systems, CRM platforms, and integration solutions across industries such as local government, education, healthcare, broadcasting, and entertainment. My expertise spans full-stack development, DevOps, systematisation, and designing seamless integrations.</div>

        <div class="aboutpage-paragraph">As a property investor specializing in HMOs, I’ve worked with deal sourcers and experienced firsthand the challenges of inconsistent due diligence. This frustration led me to develop a software solution that ensures every deal is backed by accurate calculations, thorough evidence, and a structured process.</div>

        <div class="aboutpage-paragraph">Designed specifically for professional deal sourcers and investors, my software helps build a pipeline of potential deals, streamlines due diligence, and enhances tracking across multiple projects. By raising the quality and consistency of deal sourcing, it empowers users to operate more efficiently and scale their portfolios with confidence.</div>

        <div class="aboutpage-paragraph">Let’s transform the way deal sourcing is done—smarter, faster, and more reliable. 🚀</div>
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage'
})
</script>

<style>
.aboutpage-paragraph {
  margin-top: 10px;
}
.profile-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
}
</style>
