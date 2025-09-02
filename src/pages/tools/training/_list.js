import Training_your_first_prop from './Training_your_first_prop.vue'
import Training_fill_your_pipeline from './Training_fill_your_pipeline.vue'
import Training_r2r_overview from './Training_r2r_overview.vue'
import Training_r2r_leads from './Training_r2r_leads.vue'
import Training_r2r_calls from './Training_r2r_calls.vue'
import Training_r2r_workflow from './Training_r2r_workflow.vue'
import Training_focus_agentnotes from './Training_focus_agentnotes.vue'

//// NOTE:
// make youtubevidref undefined for comming soon

const glob_tutorials = [
  {
    weight: 0,
    id: 'your_first_prop',
    name: 'Your First Property',
    section: 'Getting Started',
    description: 'Learn how to get started. Find your first property and add it to the system. See how you can save links to external materials and keep access to it all using your phone when you\'re out and about.',
    component: Training_your_first_prop,
    next: 'fill_your_pipeline',
    youtubevidref: 'lN1htfsbEpY',
    published: true
  },
  {
    weight: 1,
    id: 'fill_your_pipeline',
    name: 'Fill Your Pipeline',
    section: 'Getting Started',
    description: 'Working on properties one at a time is no good. In this tutorial you will learn how to fill your pipeline with multiple leads and go over the process to follow to find the best ones for your investors.',
    component: Training_fill_your_pipeline,
    youtubevidref: 'UA7XWHDQ2CY',
    published: true
  },
  {
    weight: 0,
    id: 'r2r_overview',
    svg: true,
    name: 'Foundations of Rent‑to‑Rent Features',
    section: 'Rent-to-Rent',
    description: 'A detailed orientation to the Rent‑to‑Rent feature set - what each tool does and why it matters. Delve into all the system tools and modules designed specifically for managing Rent‑to‑Rent projects.',
    component: Training_r2r_overview,
    next: 'r2r_leads',
    youtubevidref: 'nEkvURrr9-g',
    published: true
  },
  {
    weight: 1,
    id: 'r2r_leads',
    svg: true,
    name: 'Entering Rent‑to‑Rent Leads: Step‑by‑step Guide',
    section: 'Rent-to-Rent',
    description: 'Learn how to accurately capture new Rent‑to‑Rent landlord leads—covering contact information, property details, and status tracking.',
    component: Training_r2r_leads,
    next: 'r2r_calls',
    youtubevidref: '6p_iIoP7D5E',
    published: true
  },
  {
    weight: 2,
    id: 'r2r_calls',
    svg: true,
    name: 'Making Calls with the Dynamic Script Tool',
    section: 'Rent-to-Rent',
    description: 'Master the use of scripts to call landlords, record outcomes, manage objections, and arrange viewings within the system.',
    component: Training_r2r_calls,
    next: 'r2r_workflow',
    youtubevidref: 'HLopU6JxywA',
    published: true
  },
  {
    weight: 3,
    id: 'r2r_workflow',
    svg: true,
    name: 'Managing the Rent‑to‑Rent Workflow from Lead to Completion',
    section: 'Rent-to-Rent',
    description: 'Navigate the entirety of the Rent‑to‑Rent lifecycle - progress leads through the workflow, manage milestones, and finalise projects.',
    component: Training_r2r_workflow,
    youtubevidref: 'Y7YB3kke35s',
    published: true
  },
  {
    weight: 1,
    id: 'focus_agentnotes',
    svg: true,
    name: 'Feature Focus - Agent Notes',
    section: 'Agent Notes',
    description: 'The agent notes feature will help you keep track of agents you build relationships with. It puts important information at your finger tips to help you secure deals.',
    component: Training_focus_agentnotes,
    youtubevidref: undefined,
    published: true
  }
]


export default {
  glob_tutorials: glob_tutorials
}
