<template>
  <div class="tutorial-page">
    <div v-if="tutorials.length !== 1">
      <h1>Tutorial Not Found</h1>
    </div>
    <div v-if="tutorials.length === 1">
      <div>
        <h1>{{tutorials[0].name}}</h1>
        <div>{{tutorials[0].description}}</div>
        <h2>Video</h2>
        XX
        <component :is="tutorials[0].component"></component>
      </div>
    </div>
    <div align="center">
      <q-btn
        color="positive"
        label="Back to tutorial list"
        @click="back_to_tutorial_list"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import glob_tutorials from './_list.js'

export default defineComponent({
  name: 'TrainingTutorial',
  data () {
    return {
    }
  },
  computed: {
    tutorials () {
      const TTT = this
      const tutorials = glob_tutorials.glob_tutorials.filter(function (x) {
        return x.id ===TTT.$route.params.tutorial
      })
      return tutorials
    }
  },
  methods: {
    back_to_tutorial_list () {
      this.$router.push('/tools/training')
    }
  }
})

</script>

<style>
.tutorial-page {
  margin: 10%;
  padding: 0px;
}
.tutorial-chapter {
  font-size: 15px;
  font-weight: 500;
}

</style>
