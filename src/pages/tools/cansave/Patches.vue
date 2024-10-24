<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Select Patch</h1>
      <div v-for="patch in patches_data" :key="patch">
        <PatchCard
          :patch="patch"
        />
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
import PatchCard from '../../../components/PatchCard.vue'

export default defineComponent({
  name: 'ToolsCansavePatchesPage',
  components: {
    CommonBRRToolLink,
    PatchCard
  },
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  data () {
    return {
      patches_data:{}
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    click_brrr_card () {
      this.$router.push('/tools/brrcalc')
    },
    recursive_load_project_details () {
      const items_to_load = this.patches_data.filter(function (x) {
        return x.loaded === false
      })
      if (items_to_load.length === 0) {
        return
      }
      const item_to_load = items_to_load[0]

      const TTT = this
      const callback = {
        ok: function (response) {
          item_to_load.loaded=true
          item_to_load.loadsuccess=true
          item_to_load.detail=response.data
          TTT.recursive_load_project_details()
        },
        error: function (response) {
          item_to_load.loaded=true
          item_to_load.loadsuccess=false
          TTT.recursive_load_project_details()
        }
      }
      this.backend_connection_store.call_api({
        apiprefix: 'privateUserAPIPrefix',
        url: '/patches/' + item_to_load.from_user_profile.id,
        method: 'GET',
        data: undefined,
        callback: callback
      })
    }
  },
  mounted () {
    this.patches_data = this.user_profile.patches.map(function (x) {
      return {
        from_user_profile: x,
        loaded: false,
        loadsuccess: true,
        detail: {}
      }
    })
    this.recursive_load_project_details()
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
.workflow_stage_block {
  padding-top: 10px;
}
.workflow_stage_block h1 {
  font-size: 1rem;
  font-weight: 800;
  padding: 0px;
  border: 0px;
  margin: 0px;
  line-height: 1rem;
}

.todo_stage_block h1 {
  font-size: 1rem;
  font-weight: 800;
  padding: 0px;
  border: 0px;
  margin-top: 5px;
  margin-bottom: 0px;
  line-height: 1rem;
}
</style>
