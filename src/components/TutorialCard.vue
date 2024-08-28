<template>
  <div>
    <q-card inline class="q-ma-sm card-style tutorial-tool-card" @click="click_tutorial(tutorial)">
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
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialImage',
  props: {
    tutorial: {
      type: Object
    }
  },
  data () {
    return {
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
