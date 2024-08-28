<template>
  <div class="tutorial-image-outer">
    <div v-if="!small" class="tutorial-image col">
      <img :src="src">
      <div class="tutorial-image-caption">{{ caption }}</div>
    </div>
    <div v-if="small" class="tutorial-image-small col">
      <img :src="src">
      <div class="tutorial-image-caption">{{ caption }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialImage',
  props: {
    src: {
      type: String
    },
    caption: {
      type: String
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
})
</script>

<style>
.tutorial-image-outer {
  width: 100%;
}
.tutorial-image-caption {
  width: 100%;
  margin: auto;
  text-align: center;
  font-weight: 300;
}

.tutorial-image {
  margin: auto;
  border-style: dashed;
  border-width: 2px;
  width: 85%;
  max-width: 800px;
}
.tutorial-image img {
  width: 100%;
  padding: 10px;
}

.tutorial-image-small {
  margin: auto;
  border-style: dashed;
  border-width: 2px;
  width: 45%;
  max-width: 400px;
}
.tutorial-image-small img {
  width: 100%;
  padding: 10px;
}


</style>
