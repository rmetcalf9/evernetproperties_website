<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Select Patch</h1>
      <div v-for="patch in active_patches" :key="patch">
        <PatchCard
          :patch="patch"
        />
      </div>
      <h2>Dormant</h2>
      <p>Dormant patches are patches with no projects in an active stage.</p>
      <div v-for="patch in dormant_patches" :key="patch">
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
import Workflow_main from '../../../components/Workflow/Workflow_main.js'

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
    active_patches () {
      const TTT = this
      return Object.keys(this.patches_data)
        .filter(function (key) {
          if (!TTT.patches_data[key].loaded) return false
          return TTT.patch_has_active_projects(TTT.patches_data[key])
        })
        .reduce((obj, key) => {
          obj[key] = TTT.patches_data[key];
          return obj;
        }, {});
    },
    dormant_patches () {
      const TTT = this
      return Object.keys(this.patches_data)
        .filter(function (key) {
          if (!TTT.patches_data[key].loaded) return false
          return !TTT.patch_has_active_projects(TTT.patches_data[key])
        })
        .reduce((obj, key) => {
          obj[key] = TTT.patches_data[key];
          return obj;
        }, {});
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    patch_has_active_projects (patch) {
      let activeProjects = false
      Object.keys(patch.detail.workflow_lookup).forEach(function (workflow_id) {
        Object.keys(patch.detail.workflow_lookup[workflow_id]).forEach(function (stage_id) {
          if (patch.detail.workflow_lookup[workflow_id][stage_id].length > 0) {
            if (Workflow_main.isActiveStage(workflow_id, stage_id)) {
              activeProjects = true
            }
          }
        })
      })
      return activeProjects
    },
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
