import Training_your_first_prop from './Training_your_first_prop.vue'
import Training_fill_your_pipeline from './Training_fill_your_pipeline.vue'

const glob_tutorials = [
  {
    weight: 0,
    id: 'your_first_prop',
    name: 'Your First Property',
    section: 'Getting Started',
    description: 'Learn how to get started. Find your first property and add it to the system. See how you can save links to external materials and keep access to it all using your phone when you\'re out and about.',
    component: Training_your_first_prop,
    next: 'fill_your_pipeline'
  },
  {
    weight: 1,
    id: 'fill_your_pipeline',
    name: 'Fill Your Pipeline',
    section: 'Getting Started',
    description: 'Working on properties one at a time is no good. In this tutorial you will learn how to fill your pipeline with multiple leads and go over the process to follow to find the best ones for your investors.',
    component: Training_fill_your_pipeline
  }
]


export default {
  glob_tutorials: glob_tutorials
}
