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
        Introducing Robert, a passionate real estate deal sourcer committed to identifying top-notch, profitable opportunities for investors dedicated to providing high-quality housing for tenants and guests. With Robert's keen market insight and strategic approach, he excels in uncovering deals that align with the vision of creating superior living spaces. Trust Robert to transform opportunities into successful investments, delivering exceptional value in the dynamic world of real estate.
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
