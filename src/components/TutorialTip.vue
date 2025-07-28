<template>
  <div class="tutorialtip-maindiv row">
    <div class="tutorialtip-icondiv">
      <img
        alt="Profile Picture"
        src="~assets/lightbulb_icon.svg"
        class="tutorialtip-iconpic"
      >
    </div>
    <div>
      {{ text }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialTip',
  props: {
    text: {
      type: String
    }
  },
  data () {
    return {
    }
  }
})
</script>

<style>
.tutorialtip-maindiv {
  background: lightblue;
  padding: 10px;
  border: solid;
  border-width: 2px;
}

.tutorialtip-icondiv {
  padding-right: 10px;
}


</style>
