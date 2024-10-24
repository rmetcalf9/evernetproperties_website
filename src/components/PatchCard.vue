<template>
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
</template>

<script>
import { defineComponent } from 'vue'
import Workflow_main from './Workflow/Workflow_main.js'


export default defineComponent({
  name: 'PatchCard',
  props: ['patch'],
  data () {
    return {
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
    }
  }
})

</script>

<style>
</style>
