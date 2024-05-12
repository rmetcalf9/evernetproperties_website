<template>
  <div class="featuretable">
    <div v-for="feature in features" :key="feature">
      <q-icon v-if="feature.type==='positive'" name="check_box" color="green" size="32px" />
      <q-icon v-if="feature.type==='negative'" name="cancel" color="red" size="32px" />
      <q-icon v-if="feature.type==='neutral'" name="remove" color="orange" size="32px" />
      {{ feature.text }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FeatureTable',
  props: ['features'],
  data () {
    return {
    }
  }
})

</script>

<style>
.featuretable {
  background-color: white;
  color: black;
  font-weight: 700;
}
</style>
