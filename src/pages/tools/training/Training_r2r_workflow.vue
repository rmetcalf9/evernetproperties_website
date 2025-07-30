<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>Let's start by having a look at the rent project workflow. To get here navigate to<BR/>Tools -> My Projects -> Patch -> Rent Projects -> Pick from Workflow</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Rent Project Workflow"
  />
  <p>This shows the stages in our pipeline. You can see the leads at the start and as we book viewings, complete due diligence, negotiate etc. we move the projects from one stage to another. This allows us to work with a large number of projects in a consistent way.</p>

  <h3>{{ chapters[1] }}</h3>
  <p>Before we dive into the workflow - let's see all the viewings we just lined up!<BR/>
  Navigate to tools -> Rental Projects -> Show Rental Viewing List</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Menu of Patches"
  />

  <p>You can show all the viewings across patches or just the patch you are interested in. For now select a patch:</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_003.png'"
    caption="Viewings Overview"
  />
  <p>This shows the days you have viewings as well as the addresses and times of each viewings. The add to calendar button will let you add a viewing into your calendar. The “i” icon will take you to more detailed information about this project and the “Patch” button takes you to the patch screen.</p>s


  <h3>{{ chapters[2] }}</h3>
  <p>Lets click the “i” and navigate to the rent project screen. This is familiar to anyone who also uses the purchase projects; but let's take a quick tour of the features.</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_004.png'"
    caption="Rent Project - Main Tab"
  />

  <p>The screen is laid out with the following sections:</p>
  <ul>
  <li>Actions -> Used to log activity and add Todo’s</li>
  <li>Tabs -> Switch between visible cards</li>
  <li>Cards -> Individual items with different data about the cards.</li>
  </ul>

  <p>You can use the lead information card to update the address of the property and view the weblinks. The call for the viewing card shows details of the call. Click the “Project” tab to view more cards:</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_005.png'"
    caption="Rent Project - Project Tab"
  />

  <p>The workflow card can be used to move this project from one workflow stage to another. You can also reset the workflow back to the Lead stage which will enable you to put this project back into the dynamic script tool.</p>

  <p>The todo items and Activity log tabs show information about the project. They can be added using the action buttons above. In this example we have logged a todo item to find more information about the property and you can see we have logged research we did on AirDna</p>


  <h3>{{ chapters[3] }}</h3>
  <p>Navigate back to the Main tab and click the patch button which is in the Lead Information Tab. This will bring you to the patch screen with the Rent Projects tab highlighted.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_006.png'"
    caption="Patches - Rent Projects Tab"
  />

  <p>Here you can view projects, see what stages they are in, filter them and access the workflow overview.</p>

  <h3>{{ chapters[4] }}</h3>
  <p>That is the end of the rent-to-rent feature tutorials. The first tutorials took you through the step to step process to establish potential leads and get the viewings booked. Once this is complete then you will need to do due diligence on the projects, perform research, actually view the project and take many more actions. The todo and activity log features help you keep track of all the actions for the project, make sure only the best projects move forward and create a highly detailed investor pack if you sell the deal.</p>

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
        'The Rent Project Workflow',
        'Show Rental Viewing List',
        'Rent Project Screen',
        'Patch screen - Rent Projects',
        'Summary of Rent to Rent features'
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
