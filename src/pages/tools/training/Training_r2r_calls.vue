<template>
  <h2>Covered in this Tutorial</h2>
  <div v-for="chapter in chapters" :key='chapter' class="tutorial-chapter"><q-icon name="check_box" color="green" size="32px" />{{ chapter }}</div>
  <h2>Content</h2>
  <h3>{{ chapters[0] }}</h3>
  <p>The dynamic script tool is a tool that will guide you through phone conversations with landlords to arrange viewings. I have always thought it is better to have conversations with landlords rather than just read from a script as this allows us to maximise human to human interactions.</p>

  <p>The interactive script tool helps you achieve that without losing the ability to guide the conversation. It does this by providing a plan and prompts for the conversation. It is broken up into stages which guide us to the desired outcome.</p>

  <p>Navigate to tools -> Rental Projects -> Call Rental Leads. If you have outstanding rental projects in the ‘Lead’ workflow stage you will see something like the following call selection screen:</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_001.png'"
    caption="Call Selection Screen"
    small
  />
  <p>We make calls in a batch. You can select a particular patch and only call leads from that patch or you can select all your outstanding calls across all patches. Click “Make Calls” to start your batch.</p>

  <p>You are now in the dynamic script tool. This script has been designed to help guide you through the calls.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_002.png'"
    caption="Call Plan Screen"
    small
  />

  <p>First make sure you review the Aim of the call. This will help you keep focused on the goal of the conversation.</p>

  <p>Next enter your Story Prompt. At a point in the script you will need to introduce yourself, who you are and why you are qualified for Rent-to-Rents. This will depend on your particular method.</p>

  <p>Example: I am a senior software architect looking for accommodation in London. My company hires developers from all over the world and we are always looking for places close to transport links.</p>

  <p>After the story prompt use the free time slots tool to add the dates and times you will be free to book viewings. Enter any times you are not able to make a viewing. This will make sure the system suggests times that suit you and you do not need to think about scheduling when you are on the call.</p>

  <p>When you are ready click “Ready To Start Making Calls”</p>

  <h3>{{ chapters[1] }}</h3>
  <p>You are now looking at the script. Each of these screens will be repeated for each lead in the batch. You navigate through the action buttons on the button. (which are covered in detail in a later chapter.)</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_003.png'"
    caption="Call Overview Screen"
  />

  <p>You are now looking at the script. Each of these screens will be repeated for each lead in the batch. You navigate through the action buttons on the button. (which are covered in detail in a later chapter.)</p>

  <ol>
  <li>This is the area where the current script stage will be displayed. In this case it is showing the aim of the call</li>
  <li>This section is for the Lead information which will always be present no matter what screen you are on. This is where the number to dial is, landlord details and the website link to the advert</li>
  <li>This is the call notes section. Use this to add any notes from the call. It is preserved between stages and at the end the notes are saved with the lead.</li>
  <li>This section contains the action buttons. Actions move you between stages and what buttons are available depend on the current stage.</li>
  </ol>

  <p>The first thing you need to do before any call is to make sure you are clear on the aim of the call and the plan. This is why these are displayed at the start of the screen. The call plan lists the stages we will take the call through.</p>

  <p>A skill of a good sales person is to be able to guide the conversation through the plan without taking over the conversation. The stages are designed to give the landlord the most opportunity to speak without losing control of the conversation.</p>

  <p>Once you have reviewed the stages we want to take the conversation through, take time to review the lead information. - Re-read the advert, come up with any questions you want to ask about the property and put them in the notes section.</p>

  <p>When you are prepared press the “Ready to Dial” button.</p>


  <h3>{{ chapters[2] }}</h3>
  <p>Now it’s time to dial the phone!</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_004.png'"
    caption="Qualify the lead Screen"
  />

  <p>You will notice this screen has the same structure of the previous screen. The top section contains the prompt for this stage in the conversation. In this section you are making sure you are talking to the right person.</p>

  <p>If you don’t get an answer you can use the “Skip and return to later” button which will leave this lead in the list to try again.</p>

  <p>If the property is not available you can press the “No longer available button” - the lead will be closed. You can also “Reject the Lead” which will also close the lead.</p>

  <p>For now when you have made sure the landlord is the right person press “Next Stage”</p>


  <h3>{{ chapters[3] }}</h3>
  <p>The script prompt will now change. This gives you prompts to investigate the property. We want to get the landlord talking about their property. Hopefully they will want to sell it to you but otherwise you can show interest and ask open questions to try and get them talking about it. Make sure you don’t ask questions that are already in the advert. Remember to take notes of what the landlord says.</p>

  <p>When done press “Next Stage”</p>

  <p>The next stage is another part of the conversation with the landlord. Here we want to identify landlord pain points. It is good at this point to get the landlord to complain about the property in some way, bad tenants, low rent, etc. This gives us an understanding on possible ways we can help the landlord and present our offer in the best light to them.</p>

  <p>When done press “Next Stage”</p>


  <h3>{{ chapters[4] }}</h3>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_005.png'"
    caption="Qualify the lead Screen"
  />

  <p>Now it’s your time to introduce yourself and start to gain trust. You need to prove to the landlord you are someone they would do business with and be valuable to them. This is a gradual process and won’t happen in one phone call but this introduction sets the scene. Remember the aim of the call is to get a viewing. You can see the introduction script you filled in earlier appears here.</p>

  <p>When done press “Next Stage”</p>

  <h3>{{ chapters[5] }}</h3>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_006.png'"
    caption="Close Screen"
  />
  <p>Now it’s time to close the lead. The aim is to arrange a viewing of the property but it is also important that the landlord is open to a company let. It is a waste of time viewing properties where this is out of question for the landlord. This part of the script makes it as easy as possible for the landlord to arrange the viewing.</p>

  <p>The system gives you two suggested appointment times to immediately give to the landlord. This helps you flow quickly to the close. If neither suggestion works you can ask the landlord when they are free and manually enter a date and time. The busy times section will show appointments you have already made so all the scheduling information you need is on this screen.</p>

  <p>Of course many landlords will have questions and objections. Sometimes objections can be a good thing because it’s the landlord's way of telling you what you need to do to convince them of the value of a company let. The red buttons take you to scripts that will allow you to deal with particular objections the landlord might raise. When you have finished a particular objection you can bring the landlord back here to arrange the viewing.</p>

  <TutorialImage
    :src="'/training/' + tutorial.id + '_007.png'"
    caption="Example Objection Screen"
  />

  <p>On the objection screens you can use the “Back to Close Stage” button to return to the close and once you have arranged the date and time of viewing press the “Next Stage Confirm Address” button.</p>

  <TutorialTip
    text="There is also a “Benefits To Landlords” button which has a useful list of benefits for rent-to-rent deals that may be helpful during the call."
  />


  <h3>{{ chapters[6] }}</h3>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_008.png'"
    caption="Confirm Address Screen"
  />
  <p>Before finishing the call confirm the address is correct and amend it if required. Finally reconfirm the date and time of the viewing before ending the call.</p>

  <p>You can then use the “Complete Call - Viewing Arranged” button which will move the lead into the next part of the workflow.
  </p>

  <p>Now you are done with this call. If there is another lead in the batch you will be taken to the next call to make and can repeat the process.</p>

  <h3>{{ chapters[7] }}</h3>
  <p>Each stage has different action buttons depending on the options available. The action buttons are colour coded depending on the kind of action they execute.</p>
  <TutorialImage
    :src="'/training/' + tutorial.id + '_009.png'"
    caption="Confirm Address Screen"
  />

  <ol>
  <li>White action buttons cause actions that do not alter the lead record at all. They can be used for resetting the script to the start or skipping a lead. Either way the lead isn’t changed and can be followed up later.</li>
  <li>Grey action buttons move you to a different stage in the script.</li>
  <li>Green action buttons are used when the call is completed. When they are pressed the lead will typically flow to a different stage in the workflow depending on the action.</li>
  </ol>


  <h3>{{ chapters[8] }}</h3>
  <p>Congratulations - You have used the dynamic script tool to call leads and arrange viewings. Hopefully you will quickly be very busy visiting properties and putting rent-to-rent deals together. In this tutorial we covered:</p>

  <ul>
  <li>Reviewing the call plan</li>
  <li>Reviewing the lead</li>
  <li>Keeping notes of the call</li>
  <li>Guiding the landlord through the conversation</li>
  <li>Handling objections</li>
  <li>Closing the deal</li>
  <li>Using the appointment scheduler to schedule viewings</li>
  <li>Using action buttons to change stages</li>
  </ul>

  <p>Now move on to the next tutorial to find out how you can manage the leads once you have the viewings booked and where you can see the list of viewings and add them to your calendar.</p>



</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'
import TutorialImage from '../../../components/TutorialImage.vue'
import TutorialTip from '../../../components/TutorialTip.vue'

export default defineComponent({
  name: 'TrainingYourFirstProp',
  components: {
    TutorialImage, TutorialTip
  },
  data () {
    return {
      chapters: [
        'Make sure you are ready',
        'Review call plan',
        'Qualify the lead',
        'Investigate the property & Identify landlord pain points',
        'Introduce yourself',
        'Closing and handling objections',
        'Confirm the address',
        'Action buttons',
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
