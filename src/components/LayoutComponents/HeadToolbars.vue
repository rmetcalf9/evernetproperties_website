<template>
  <div>
    <div>
      <q-toolbar class="main-toolbar column no-wrap justify-start items-center content-start">
        <div class="row no-wrap justify-start items-center content-start">
          <img
            class="main-logo"
            alt="Evernet properties logo"
            src="~assets/main_logo.svg"
          >
          <div class="column no-wrap justify-start items-center content-start">
            <q-toolbar-title @click="clicktoolbartitle">
              Evernet Properties Limited
            </q-toolbar-title>
            <div>
              We find properties
            </div>
          </div>
        </div>
      </q-toolbar>
      <div class="sub-toolbar bg-grey-5 fit row no-wrap justify-center items-center content-start">
        <div v-for="item in menu_items" :key="item.name">
          <router-link :to="item.target" class="toolbar">{{ item.name }}</router-link>
        </div>
      </div>
      <PreEventBanner
      />
      <DuringEventBanner
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import PreEventBanner from './PreEventBanner.vue'
import DuringEventBanner from './DuringEventBanner.vue'


export default defineComponent({
  name: 'HeadToolbarLayoutComponent',
  components: {
    PreEventBanner,
    DuringEventBanner
  },
  data () {
    return {
      menu_items: [
        {name: 'Home', target: '/'},
        {name: 'FAQ', target: '/faq'},
        {name: 'Tools', target: '/tools'},
        {name: 'Contact Us', target: '/contact'},
        {name: 'About', target: '/about'}
      ],
      toolbartitlelastclick: Date.now(),
      toolbartitleclickcount: 0
    }
  },
  methods: {
    clicktoolbartitle () {
      // Reset counter if last click was more than 2 seconds ago
      var curTime = Date.now()
      if ((curTime - this.toolbartitlelastclick) > 2000) {
        this.toolbartitlelastclick = curTime
        this.toolbartitleclickcount = 0
        return
      }

      // Not increment following rules
      this.toolbartitleclickcount = this.toolbartitleclickcount + 1
      this.toolbartitlelastclick = curTime

      if (this.toolbartitleclickcount > 7) {
        this.toolbartitleclickcount = 0
        this.$router.push('/debug')
      }
      // console.log('End of clicktoolbartitle')
    }
  }
})

</script>

<style>
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
.main-logo {
  width: 80px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0px;
}

a.toolbar {
  text-decoration: none;
  color: white;
  padding: 5px;
}
</style>
