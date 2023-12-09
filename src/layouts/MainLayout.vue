<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="main-toolbar">
        <div class="fit column no-wrap justify-start items-center content-start">
          <q-toolbar-title>
            Evernet Properties Limited
          </q-toolbar-title>
          <q-toolbar-subtitle>
            We find properties
          </q-toolbar-subtitle>
        </div>
      </q-toolbar>
      <div class="sub-toolbar fit row no-wrap justify-center items-center content-start">
        <div v-for="item in menu_items" :key="item.name">
          <div class="sub-toolbar-item">{{ item.name }}</div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      menu_items: [
        {name: 'Home'},
        {name: 'About'}
      ]
    }
  }
})
</script>

<style>
.main-toolbar {
  color: white;
  background: grey;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
}
.sub-toolbar {
  color: white;
  background: darkgrey;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
}
.sub-toolbar-item {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
