<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>Starting from the evernetproperites website look for the "tools" option in the menu bar. Click on it. If you are not signed in then do so by clicking the blue sign in button on the right of the screen. If you are signed in and you have been granted access to the Property Pipeline Builder you will see the following items:</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Main Menu Items"
  />
  <p>Click inside the "Create new project" box to move to the project screen</p>

  <h3>{{ chapters[1] }}</h3>

  <p>In the main project interface you will see Actions, tabs and cards</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Main Project interface showing actions, tabs and cards"
  />
  <p>Actions are one off actions you can perform, such as saving the project or logging a call with an agent. The tabs divide the information into multiple screens and the cards show project details divided into logical sections. When you first look at the screen it looks complex and there are a lot of places to put information. The system will help guide you through what information is required at what stage and it is best to look at it one card at a time.</p>

  <p>For this tutorial we are focusing just on the “Basic Information” card.</p>


  <h3>{{ chapters[2] }}</h3>

  <p>The system works with properties from all sources. For the tutorial we will use an example from Rightmove but the same methods can be used for different sources. Find the property you are interested in in Rightmove and load it into your browser in a separate tab. </p>

  <ul>
  <li>“copy” the rightmove url from the address bar</li>
  <li>Switch to the Property Pipeline Builder Tab</li>
  <li>Click the + button in the Weblink part of the basic information</li>
  <li>Paste the link into the URL</li>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_003.png'"
    caption="Dialog to add a weblink"
    :small=true
  />
  <li>You can add a display text if you want</li>
  <li>Press Ok</li>
  </ul>

  <p>You now have recorded the Rightmove link in the system. You are able to click the “chip” that has appeared and the Rightmove link to the property will open in a new tab.</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_004.png'"
    caption="Basic information showing Rightmove 'chip' that can be clicked to open the link"
    :small=true
  />

  <h3>{{ chapters[3] }}</h3>

  <p>At this stage we need to know the address and postcode of the property. This includes house number and full postcode. Enter these in the basic information card. It might also be a good time to enter the selling agent.</p>

  <p>If the property is found through another deal sourcer you can mark this and enter the name of the sourcer as well.</p>


  <h3>{{ chapters[4] }}</h3>

  <p>Projects will be organised into patches. This helps keep properties in a similar area together as they will share the same powerteam. For the property you are looking at, decide the patch name and add the patch. The patch name might be the city or general area the property is in. Where you see Patch -> “Not Set” use the drop down and add the patch.</p>

  <p>Note: When you did this the project was saved after a 2 second delay. You can save immediately at any time by pressing the save button in the actions area.</p>


  <h3>{{ chapters[5] }}</h3>

  <p>In the same way as you added the Rightmove link you can add links to other places. Some very useful links would be:</p>
  <ul>
  <li>Street view link - find the property on Google Streetview then paste in the link. Now you can always view the property and surrounding area.</li>
  <li>EPC - find the properties EPC certificate and add the link here</li>
  </ul>


  <h3>{{ chapters[6] }}</h3>

  <p>Changes you make are saved after a delay. You can close the window. To get the project details back, return to the evernetpropetires website and click tools. If you are not logged in do so. You can now click the My Projects item.</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Main Menu Items"
  />
  <p>You will be prompted to select a patch and then you will see a list of projects you have saved. Click the one you want to access again.</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_005.png'"
    caption="Main Menu Items"
  />

  <h3>{{ chapters[7] }}</h3>

  <p>One of the advantages of having projects in the system is the ability to access them anywhere. You can do this from any phone or tablet.</p>

  <p>Access the web browser (Safari on an iPhone or Chrome on an Android)</p>
  <ul>
  <li>Navigate to evernetproperties.com</li>
  <li>Log in with the same google account as you used on the website</li>
  <li>Click “My Projects” and your patch</li>
  <li>Click the project</li>
  </ul>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_006.png'"
    caption="Phone display showing project list"
    :small=true
  />

  <p>You can now see the project as well as access all the links you used previously. This is very useful, especially if you have stored external links to Streetview and Rightmove as it puts all the project information at your fingertips.</p>


  <h2>Summary</h2>

  <p>In this tutorial you created your first project and entered basic information. You saw how we can use links to keep track of information about the project. You created a patch, stored your project and learned that you can access all this from anywhere using your phone.</p>

  <p>It’s no good looking at just one project - the key to success is continually looking at many projects and finding the best ones! You should be looking at 10 projects a week minimum!</p>

  <p>You need to fill your pipeline! - and that’s the subject of our next tutorial.</p>


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
        'Getting started',
        'Guide thorough the project interface',
        'Adding link from Rightmove',
        'Finding the address and postcode',
        'Add the patch',
        'Storing extra links (Streetview and EPC)',
        'Saving and getting it back',
        'Accessing when you\'re out and about'
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
