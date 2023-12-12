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
        <h3 style="margin: 0px;">Thank you</h3>
        We will be in touch
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostSubscribePage'
})
</script>

<style>
.profile-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
}
</style>
