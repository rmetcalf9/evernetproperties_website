<template>
  <div class="tainingmenu flex flex-center row">
    <div>
      <h1>Property Pipeline Builder - Tutorials</h1>
      <p>The following guides will help you get started using the app.</p>
    </div>
    <div>
      <div v-for="section in sections" :key='section.name' class="section-class">
        <h2>{{ section.name }}</h2>
        <div  class="row">
          <q-card v-for="tutorial in section.tutorials" :key="tutorial.id" inline class="q-ma-sm card-style tutorial-tool-card" @click="click_tutorial(tutorial)">
            <q-card-section>
              <div class="text-h6">{{ tutorial.name }}</div>
              <div class="row">
                <div>
                  <img
                    alt="Item Picture"
                    :src="'/training/' + tutorial.id + '.png'"
                    class="tutorial-picture"
                  >
                </div>
                <div class="col q-ma-sm" style="min-width: 158px;">
                  <div style="height: 150px;">{{ tutorial.description }}</div>
                  <div align="right">
                    <q-btn round  color="primary" icon="arrow_forward" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'

function weight_based_compare( a, b ) {
  if ( a.weight < b.weight ){
    return -1;
  }
  if ( a.weight > b.weight ){
    return 1;
  }
  return 0;
}

export default defineComponent({
  name: 'TrainingHomePage',
  data () {
    return {
    }
  },
  computed: {
    sections () {
      let unique_sections = {}
      let i = 0;
      while (i < glob_tutorials.glob_tutorials.length) {
        const section = glob_tutorials.glob_tutorials[i].section
        if (  typeof (unique_sections[section]) === 'undefined' ) {
          unique_sections[section] = {
            name: section,
            weight: glob_tutorials.glob_tutorials[i].weight,
            tutorials: glob_tutorials.glob_tutorials.filter(function (x) {
              return x.section === section
            }).sort(weight_based_compare)
          }
        } else {
          if ( glob_tutorials.glob_tutorials[i].weight < unique_sections[section]) {
            unique_sections[section].weight = glob_tutorials.glob_tutorials[i].weight
          }
        }
        i++;
      }
      let unique_section_array = Object.keys(unique_sections).map(function (x) {
        return unique_sections[x]
      })
      unique_section_array.sort( weight_based_compare );
      return unique_section_array
    }
  },
  methods: {
    click_tutorial (tutorial) {
      this.$router.push('/tools/training/' + tutorial.id)
    }
  }
})
</script>

<style>
.section-class {
  background-color: lightgrey;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
}
.section-class h2 {
  padding: 0px;
  margin: 0px;
}
.tainingmenu {
}
.tainingmenu h1 {
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
}
.tutorial-tool-card {
  max-width: 500px;
}
.tutorial-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
  border-style: solid;
}
</style>
