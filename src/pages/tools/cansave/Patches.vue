<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Select Patch</h1>
      <div v-for="patch in user_profile.patches" :key="patch">
        <q-card inline class="q-ma-sm card-style tool-card" @click="click_patch(patch.id)">
          <q-card-section>
            <div class="text-h6">{{ patch.name }}</div>
            <div class="row">
              <div>
                <img
                  alt="Item Picture"
                  src="~assets/patch_icon.png"
                  class="tool-picture"
                >
              </div>
              <div class="col q-ma-sm">
                <div align="right">
                  View your projects in {{ patch.name }}.
                  <q-btn round  color="primary" icon="info" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div v-if="user_profile.patches.length === 0">
        <div>You have not saved any projects. Use the BRR tool to create your first project:</div>
        <CommonBRRToolLink />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'
import CommonBRRToolLink from '../../../components/CommonBRRToolLink.vue'

export default defineComponent({
  name: 'ToolsCansavePatchesPage',
  components: {
    CommonBRRToolLink
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    click_patch (patch_id) {
      this.$router.push("/tools/cansave/patches/" + patch_id)
    },
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    }
  },
  mounted () {
  }
})
</script>

<style>
.tool-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
  border-style: solid;
}
</style>
