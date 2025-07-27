<template>
  <div class="tutorial-page">
    <div v-if="tutorials.length !== 1">
      <h1>Tutorial Not Found</h1>
    </div>
    <div v-if="tutorials.length === 1">
      <div>
        <h1>{{tutorials[0].name}}</h1>
        <div class="col">
          <div class="row">
            <div class="col-grow">
              <img
                alt="Item Picture"
                :src="image_link"
                style="height: 80px;"
              >
            </div>
            <div>
              <q-btn
                color="positive"
                label="Back to tutorial list"
                @click="back_to_tutorial_list"
              />
            </div>
          </div>
          <div>
            {{tutorials[0].description}}
          </div>
        </div>
        <h2>Video</h2>
        <div v-if="typeof (tutorials[0].youtubevidref) === 'undefined'">
          Coming soon...
        </div>
        <div
          v-if="typeof (tutorials[0].youtubevidref) !== 'undefined'"
          class="tutorial-ppb-embedded-vid-outer-div"
        >
          <div
            class="tutorial-ppb-embedded-vid-div"
          >
            <q-video
              :src="'https://www.youtube.com/embed/' + tutorials[0].youtubevidref + '?rel=0'"
              class="tutorial-ppb-embedded-vid"
            />
          </div>
        </div>
        <component
          :is="tutorials[0].component">
        </component>
      </div>
    </div>
    <div v-if="typeof (tutorials[0].next) !== 'undefined'">
      <h1>Next step...</h1>
      <p>We recommend you watch this tutorial next</p>
      <div>
        <TutorialCard
          :tutorial="next_tutorial"
        />
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
import TutorialCard from '../../../components/TutorialCard.vue'

export default defineComponent({
  name: 'TrainingTutorial',
  components: {
    TutorialCard
  },
  data () {
    return {
    }
  },
  computed: {
    tutorials () {
      const TTT = this
      const tutorials = glob_tutorials.glob_tutorials.filter(function (x) {
        return x.id === TTT.$route.params.tutorial
      })
      return tutorials
    },
    image_link () {
      if ((typeof (this.tutorials[0].svg) !== 'undefined') && (this.tutorials[0].svg)) {
        return '/training/' + this.tutorials[0].id + '.svg'
      }
      return '/training/' + this.tutorials[0].id + '.png'
    },
    next_tutorial () {
      const TTT = this
      if (typeof (TTT.tutorials[0].next) === 'undefined') {
        return undefined
      }
      const next_tutorials = glob_tutorials.glob_tutorials.filter(function (x) {
        return x.id === TTT.tutorials[0].next
      })
      if (next_tutorials.length !== 1) {
        return undefined
      }
      return next_tutorials[0]
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
  font-size: 1.1rem;
}
.tutorial-chapter {
  font-size: 15px;
  font-weight: 500;
}
.tutorial-page h1 {
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 0px;
}
.tutorial-page h2 {
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 0px;
}
.tutorial-page h3 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 0px;
}
.tutorial-ppb-embedded-vid-outer-div {
  max-width: 900px;
  margin: auto;

}
.tutorial-ppb-embedded-vid-div {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}
.tutorial-ppb-embedded-vid {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
