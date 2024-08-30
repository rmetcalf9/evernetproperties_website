<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>

  <h2>Main content</h2>

  <h3>{{ chapters[0] }}</h3>
  <p>To find your pipelines click on the tools menu, then select “My Projects” then select a patch. At the top of the table there is a button titled “Workflow”. Click on this:</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Accessing your pipelines using the workflow button"
  />
  <p>The pipeline is shown as a flow chart. This shows all the stages that a project can progress to.</p>

  <h3>{{ chapters[1] }}</h3>

  <p>The first two stages in the standard pipeline are “lead” and “potential”.</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Lead and potential stages"
  />

  <p>All projects start in the lead stage. At this point their basic information is checked, address, price, GDV and potential strategies that we might use. If the project has the potential to make profit it is moved to the potential stage. At this point we phone the agent, find out more about this project, if it is still on the market and if it is worth viewing it.</p>

  <p>In this process we are trying to make sure we set up our projects for success. The process of finding the gems means looking at a lot of projects. The bad ones will fall by the wayside.</p>


  <h3>{{ chapters[2] }}</h3>

  <p>We want to minimise the amount of wasted effort we need to do. This is why we book the viewing before we dive into detailed information about the property. Only when we have confirmed the property is available and the seller is open to selling it at a sensible price do we start looking at the numbers for the strategy.</p>

  <p>At this point we will be putting the figures into the system, working out the strategy and performing the initial due diligence. At the end of this stage we will either have a list of questions we need to focus on during the viewing, or we will need to reject the project and cancel the viewing.</p>

  <h3>{{ chapters[3] }}</h3>

  <p>During the viewing questions we have about the potential for the project will be made and enough information will be gathered. At this point detailed cost estimates of the refurbishment can be made, room sizes can be confirmed and checked against any guidelines. Checks can be made on windows, boilers and other expensive items.</p>

  <p>All of this will enable a detailed ROI analysis of the project and an “if-would” offer can be put forward.</p>

  <h3>{{ chapters[4] }}</h3>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_003.png'"
    caption="Offer process"
  />

  <p>Next comes the process of negotiation. Even if the initial offer is rejected the project is set aside. This enables us to follow up after a month or so and re-make the offer if the property is still available or an existing sale falls through.</p>

  <h3>{{ chapters[5] }}</h3>


  <TutorialImage
    :src="'/training/' + tutorial.id + '_004.png'"
    caption="Workflow card in the project tab"
    :small="true"
  />

  <p>To move a project from one stage to another navigate to the project view. From here click the “Project” tab. Here you will see the workflow card with buttons depending on the current stage the project is at.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_005.png'"
    caption="Activity log showing project moving between stages"
    :small="true"
  />

  <p>Note: The activity log card will show the status changes of the project.</p>


  <h3>{{ chapters[6] }}</h3>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_006.png'"
    caption="Workflow card showing the reset workflow button"
    :small="true"
  />

  <p>If you move a project into the wrong state by accident you may want to reset it back to the start of the workflow. To do this use the “Reset Workflow” button on the workflow card.</p>

  <h3>{{ chapters[7] }}</h3>

  <p>It is always useful to view projects that are all at the same stage in the workflow. This can be done by clicking on the coloured box for that stage in the workflow.</p>

  <h2>Summary</h2>

  <p>Working on multiple properties at the same time is vital for success. In this tutorial you learned how to use the workflow tools to manage your pipeline, how to view your pipeline, view projects at each stage as well as what the stages mean and what they are used for.</p>

  <p>This will enable you to scale up your activities from just one property to multiple without losing track of important information.</p>
</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'
import TutorialImage from '../../../components/TutorialImage.vue'

export default defineComponent({
  name: 'TrainingTutorial',
  components: {
    TutorialImage
  },
  data () {
    return {
      chapters: [
        'Where is my pipeline?',
        'Stages: Lead & Potential',
        'Stage: Viewing Booked',
        'Stages: Viewed & Offer made',
        'Stages: Accepted and Rejected Offers',
        'Moving project between stages',
        'Resetting a projects workflow',
        'View projects at certain stage'
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
