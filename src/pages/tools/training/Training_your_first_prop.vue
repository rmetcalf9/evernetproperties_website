<template>
  <h2>Covered in this Tutorial</h2>
    <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h2>Summary</h2>
</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'

export default defineComponent({
  name: 'TrainingYourFirstProp',
  data () {
    return {
      chapters: [
        'Getting started',
        'Adding the first property',
        'Guide thorough the project interface',
        'Adding link from Rightmove',
        'Finding the address',
        'Saving the streetview',
        'Link to the EPC',
        'Saving and getting it back',
        'Accessing when your out and about',
        'What next',
      ]
    }
  }
})

</script>

<style>
</style>
