<template>
  <h2>In This Walkthrough</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>Finding great property deals means juggling relationships with multiple agents and tracking dozens of projects at once. Each deal demands calls, meetings, and viewings—fast.</p>
  <p>Trying to manage all that with paper notes or scattered Google Docs? Chaos. Notes get lost. Calls get delayed. Momentum slips.</p>
  <p>That’s why we built Agent Notes as part of Property Pipeline Builder. It keeps everything organized, right where you need it, so you can move faster, stay sharper, and close more deals.</p>

  <h3>{{ chapters[1] }}</h3>
  <p>Built right into the Basic Information card on your projects is our new selling agent button:</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Agent notes button"
    small
  />

  <p>Clicking it sets up the notes page for this agent:</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Create Screen"
    small
  />

  <p>Then you can enter the notes for the agent. These notes can be viewed against every project that uses this agent.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_003.png'"
    caption="Agent Notes"
    small
  />

  <h3>{{ chapters[2] }}</h3>

  <p>The call selling agent button is used to make notes when making calls.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_004.png'"
    caption="Call Selling Agent Button"
    small
  />

  <p>This displays the call log screen.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_005.png'"
    caption="Call Screen"
    small
  />

  <p>This dialog contains the fields for logging this call which is related to this property. It also displays the notes stored against this agent. This can include whatever you want but typically it will be staff names, phone numbers and weblinks.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_006.png'"
    caption="Projects"
    small
  />

  <p>You can expand the projects section to see other projects in the system that are linked to this agent.</p>

  <h3>{{ chapters[3] }}</h3>
  <p>Sometimes you will need to view the agent notes without viewing a specific project. At the bottom of the projects screen you can see a Patch Agent Notes button:</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_007.png'"
    caption="Projects"
    small
  />

  <p>You can then select the agent and view the notes directly.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_008.png'"
    caption="Projects"
    small
  />

  <p>Agents notes are deletable only if there are no projects linked to them. You can unlink a project by viewing the project and selecting the unlink button in agent notes:</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_009.png'"
    caption="Projects"
    small
  />


  <h3>{{ chapters[4] }}</h3>
  <p>Success in property isn’t about luck - it’s about consistency. That means making lots of calls and knowing exactly who you spoke to, what was said, and where you are in the process. Notes are essential.</p>
  <p>But calls aren’t one-and-done. You’ll be calling agents again and again. The faster you can manage your notes, the more time you save on admin—and the more time you spend building relationships and uncovering deals.</p>

</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'
import TutorialImage from '../../../components/TutorialImage.vue'

export default defineComponent({
  name: 'TrainingFocusAgentnotes',
  components: {
    TutorialImage
  },
  data () {
    return {
      chapters: [
        'The Problem',
        'Agents with Notes',
        'Notes appear when making calls',
        'Viewing Notes without a project',
        'Summary - How this will help you',
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
