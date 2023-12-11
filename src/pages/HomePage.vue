<template>
  <q-page class="flex flex-center">
    <div class="main-page fit row wrap justify-center items-center content-center">
      <h2>Let us find you a property</h2>
      <div class="flex-break"></div>
      <div class="flex row first-section">
        <div>
          <img
            alt="Profile Picture"
            src="~assets/profile-pic.png"
            class="profile-picture"
          >
        </div>
        <div class="flex column">
          <div v-for="feature in features" :key="feature"><q-icon name="check_box" color="green" size="32px" />{{ feature }}</div>
        </div>
      </div>
      <div class="flex-break"></div>
      <div>A</div>
      <div>A</div>
      <div>A</div>
      <div>In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/) is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.</div>
      <div>A</div>
      <div>A</div>
      <div>In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/) is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  data () {
    return {
      features: [
        'a main selling point',
        'b',
        'c',
        'c',
        'c',
        'c',
        'c',
        'c',
        'c'
      ]
    }
  }
})
</script>

<style>
.first-section {
  padding-bottom: 30px;
}
.profile-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
}
.flex-break {
  flex: 1 0 100%
}
.main-page {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
}
</style>
