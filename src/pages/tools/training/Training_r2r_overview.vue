<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>Property Pipeline Builder handles two main kinds of projects. Purchase projects and Rental projects. Rental projects are for Rent-to-Rent deals where a property is rented from a landlord and then run as serviced accommodation or similar.</p>

  <p>Rent-to-Rent features are available in two places. Firstly from the main tools menu the “Rental Projects” option is what is used to enter leads, call the leads and show the viewing list.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Main Project interface showing actions, tabs and cards"
  />

  <p>The second place the Rent-to-Rent features are available is in the Patch screen and this is covered in a later tutorial.</p>


  <h3>{{ chapters[1] }}</h3>

  The rental projects menu contains three items.

  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Main Project interface showing actions, tabs and cards"
  />

  <ul>
  <li>Enter Rental Lead - We are going to use this in the next tutorial to enter leads we have found for possible properties that might make good rent to rents.</li>

  <li>Call Rental Leads - This option gives access to the dynamic script tool which helps you make successful calls to landlords to arrange viewings - we will go into this in more detail in a future tutorial.</li>

  <li>Show Rental Viewing list - This keeps track of viewings that have been arranged so you can do further investigation into leads and add appointments into your calendar.</li>
  </ul>



  <h3>{{ chapters[2] }}</h3>
  <p>We will dive into a full overview of the Rent-to-Rent workflow in a later tutorial but for now it is important to understand the basics of the process.</p>

  <p>The first step is gathering leads. Leads can come from many sources, Rightmove, Spareroom, even Gumtree. We check adverts for relevant properties that meet our criteria. We then input these into Property Pipeline Builder which records them as leads we need to follow up.</p>

  <p>The second step is to call the landlords one by one, qualify them to ensure they are suitable and then book appointments to view. The dynamic script tool helps with this process, providing prompts to help you arrange the viewings.</p>

  <p>Once viewings are arranged Property Pipeline Builder can help you manage due diligence and further steps in the workflow will help you organise multiple leads converting them into actual Rent-to-Rent projects.</p>

  <p>Follow along with the next tutorial to find out how to record the leads.</p>


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
        'Overview',
        'Rental Project Options',
        'How the Rent-to-Rent functions work'
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
