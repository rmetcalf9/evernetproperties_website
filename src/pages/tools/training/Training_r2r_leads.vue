<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>TODO LEADS</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Main Project interface showing actions, tabs and cards"
  />

  <h3>{{ chapters[1] }}</h3>
  <p>TODO</p>

  <h3>{{ chapters[2] }}</h3>
  <p>TODO</p>

  <h3>{{ chapters[3] }}</h3>
  <p>TODO</p>

  <h3>{{ chapters[4] }}</h3>
  <p>TODO</p>
  
</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'
import TutorialImage from '../../../components/TutorialImage.vue'

export default defineComponent({
  name: 'TrainingYourFirstProp',
  components: {
    TutorialImage
  },
  data () {
    return {
      chapters: [
        'Find the Lead',
        'Enter the patch',
        'Enter the main details',
        'The web link',
        'Save an add another'
      ]
    }
  },
  computed: {
    tutorial () {
      const TTT = this
      const tutorials = glob_tutorials.glob_tutorials.filter(function (x) {
        return x.id ===TTT.$route.params.tutorial
      })
      return tutorials[0]
    }
  }
})

</script>

<style>
</style>
