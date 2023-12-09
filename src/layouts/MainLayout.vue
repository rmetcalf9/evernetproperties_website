<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-7 text-white">
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
      <div class="sub-toolbar bg-grey-5 fit row no-wrap justify-center items-center content-start">
        <div v-for="item in menu_items" :key="item.name">
          <router-link :to="item.target">{{ item.name }}</router-link>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
      <div class="bottom-sub-toolbar bg-grey-5 fit column wrap justify-center items-center content-center text-white">
        <img
          class="bottom-logo"
          alt="Evernet properties logo"
          src="~assets/main_logo.svg"
        >
        <div>Evernet Properties Limited |  Company Number: XXX | Company registered office : TODO</div>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-grey-7 text-white">
      <div class="footer">© 2023 All Right Reserved Evernet Properties Limited</div>
    </q-footer>
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
.bottom-logo {
  width: 100px;
  padding-top: 10px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
}
.main-toolbar {
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
}
.sub-toolbar {
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
}
.bottom-sub-toolbar {

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
.footer {
  text-align: right;
  padding-right: 5px;
}
</style>
