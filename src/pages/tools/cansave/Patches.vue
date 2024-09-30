<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Select Patch</h1>
      <div v-for="patch in patches_data" :key="patch">
        <q-card inline class="q-ma-sm card-style tool-card" @click="click_patch(patch.from_user_profile.id)">
          <q-card-section>
            <div class="text-h6">{{ patch.from_user_profile.name }}</div>
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
                  View your projects in {{ patch.from_user_profile.name }}.
                  <div v-if="patch.loaded">
                    <div class="workflow_stage_block">
                      <div v-for="workflow_type_id in Object.keys(patch.detail.workflow_lookup)" :key=workflow_type_id>
                        <h1>{{ get_workflow_name(workflow_type_id) }}</h1>
                        <div v-for="stage_id in Object.keys(patch.detail.workflow_lookup[workflow_type_id])" :key=stage_id>
                          {{ get_workflow_stage_name(workflow_type_id, stage_id) }}: {{ patch.detail.workflow_lookup[workflow_type_id][stage_id].length }}
                        </div>
                      </div>
                    </div>
                    <div class="todo_stage_block" v-if="num_todos(patch)>0">
                      <h1>Todos</h1>
                      <div>Due: {{ todo_text(patch) }}</div>
                    </div>
                  </div>
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

import Workflow_main from '../../../components/Workflow/Workflow_main.js'

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
      patches_data:{}
    }
  },
  computed: {
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    todo_text (patch) {
      let due = 0
      let notdue = 0
      let done = 0

      Object.keys(patch.detail.todogroups).forEach(function (x) {
        due = due + patch.detail.todogroups[x].due
        notdue = notdue + patch.detail.todogroups[x].not_due.length
        done = done + patch.detail.todogroups[x].done
      })
      return due.toString() + '/' + (notdue + due).toString() + ' (' + done.toString() + ')'
    },
    num_todos (patch) {
      let due = 0
      let notdue = 0
      let done = 0

      Object.keys(patch.detail.todogroups).forEach(function (x) {
        due = due + patch.detail.todogroups[x].due
        notdue = notdue + patch.detail.todogroups[x].not_due.length
        done = done + patch.detail.todogroups[x].done
      })
      return due + notdue + done
    },
    get_workflow_name (workflow_type_id) {
      return Workflow_main.workflows[workflow_type_id].name
    },
    get_workflow_stage_name (workflow_type_id, stage_id) {
      return Workflow_main.workflows[workflow_type_id].stages[stage_id].name
    },
    click_patch (patch_id) {
      this.$router.push("/tools/cansave/patches/" + patch_id)
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
