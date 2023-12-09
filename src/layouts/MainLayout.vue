<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="main-toolbar column no-wrap justify-start items-center content-start">
        <div class="row no-wrap justify-start items-center content-start">
          <img
            class="main-logo"
            alt="Evernet properties logo"
            src="~assets/main_logo.svg"
          >
          <div class="column no-wrap justify-start items-center content-start">
            <q-toolbar-title>
              Evernet Properties Limited
            </q-toolbar-title>
            <q-toolbar-subtitle>
              We find properties
            </q-toolbar-subtitle>
          </div>
        </div>
      </q-toolbar>
      <div class="sub-toolbar fit row no-wrap justify-center items-center content-start">
        <div v-for="item in menu_items" :key="item.name">
          <router-link :to="item.target">{{ item.name }}</router-link>
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
        {name: 'Home', target: '/'},
        {name: 'About', target: '/about'}
      ]
    }
  }
})
</script>

<style>
.main-logo {
  width: 80px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0px;
}
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
a {
  text-decoration: none;
  color: white;
  padding: 5px;
}
</style>
