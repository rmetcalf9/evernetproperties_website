<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>This tutorial aims to provide training in the use of Property Pipeline Builder rather than how to create Rent-to-Rent projects. Some ways to find potential leads include rightmove and openrent.</p>

  <p>It is useful but not required to get leads from online sources. Where a url is available for a lead Property Pipeline Builder can store it.
  </p>

  <p>Navigate to tools -> Rental Projects -> Enter Rental Lead</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Rental Projects Menu Page"
  />


  <h3>{{ chapters[1] }}</h3>

  <p>All projects are arranged by patch. This allows the grouping of projects in similar areas together. Use the patch drop down to select the patch. You can also use “Add…” to create a new patch.</p>

  <h3>{{ chapters[2] }}</h3>
  <p>For each lead we need to collect information required to evaluate the suitability for rent to rent, and then call the landlord to book a viewing. The fields that we collect are:</p>

  <ul>
  <li>Address</li>
  <li>Postcode</li>
  <li>Landlord Name</li>
  <li>Contact Phone</li>
  <li>Contact Email</li>
  <li>Advertisement Info</li>
  </ul>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Lead Entry Form"
    small="true"
  />

  <p>This information is displayed when calling the landlord. The advertisement info is useful for notes about this particular lead.</p>

  <h3>{{ chapters[3] }}</h3>
  <p>It is useful to add one or more weblinks for each lead. In this example I am adding the rightmove link to the advert. This will mean that you will be able to review the advert in future stages.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_003.png'"
    caption="Adding a rightmove link"
  />

  <h3>{{ chapters[4] }}</h3>
  <p>You will normally be finding batches of leads. When done you can press the “Save and add another” button which will save this lead and you can immediately put the next one in - the patch is already selected.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_004.png'"
    caption="Save and add another button"
  />

  <h3>{{ chapters[5] }}</h3>

  <p>In this tutorial we covered how to enter rental leads into the system. Including selecting the patch, adding the advert information and saving a weblink to the advert.</p>
  
  <p>Now you have entered the leads and proceed to the next tutorial where we will call the landlords.</p>

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
        'Save an add another',
        'Summary'
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
