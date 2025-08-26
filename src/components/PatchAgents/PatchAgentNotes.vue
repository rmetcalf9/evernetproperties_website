<template>
  <div class="patchagnetnotes-lines  full-width">
    <div>
      <q-input
        filled
        v-model="agent_name"
        label="Agent Name"
      />
    </div>
    <div>
      <AutoLinkEditor
        ref="AutoLinkEditor"
        v-model="agent_notes"
      />
    </div>
    <div class="patchagentnotes-projectinfo">
      <q-expansion-item
        :label="'Projects with this agent (' + projects.length + ')'"
        dense
      >
      <ul>
        <div v-for="project in shown_projects" :key='project.id'>
          <li>
            <div
              v-if="project.id != current_project"
            >
              <a
                class="patchagnetnotes-fake-link cursor-pointer"
                @click.prevent="project_onRowClick({project_id: project.id, new_tab: true})"
              >
                {{ project.name }}
              </a>
            </div>
            <div v-if="project.id == current_project">{{ project.name }} - this project</div>
          </li>
        </div>
        </ul>
        (Only loaded projects shown)
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useDataCachesStore } from 'stores/data_caches'
import AutoLinkEditor from '../../components/AutoLinkEditor.vue'

function getPlainText(html) {
  const div = document.createElement('div'); // in memory only
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export default defineComponent({
  name: 'PatchAgentNotes',
  props: [],
  components: {
    AutoLinkEditor
  },
  setup () {
    const dataCachesStore = useDataCachesStore()
    return {
      dataCachesStore
    }
  },
  data () {
    return {
      agent_name: '',
      agent_notes: '',
      projects: [],
      current_project: ''
    }
  },
  computed: {
    shown_projects () {
      const TTT = this
      return this.projects
        .slice(0, 10)
        .map(function (x) {
          const proj = TTT.dataCachesStore.get_direct_from_cache({
            object_type: 'projects',
            object_id: x
          })
          if (typeof (proj) === 'undefined') {
            return {
              id: undefined,
              name: undefined
            }
          }
          return {
            id: x,
            name: proj.project_name
          }
        })
        .filter(function (x) {
          return typeof (x.id) !== 'undefined'
        })
    }
  },
  methods: {
    init (agent_name, agent_notes, projects, current_project) {
      this.agent_name = agent_name
      this.agent_notes = agent_notes
      this.projects = projects
      this.current_project = current_project
      var shouldStartInEditMode = false
      if (this.agent_notes.trim() === '') {
        shouldStartInEditMode = true
      }
      if (getPlainText(this.agent_notes).trim() === '') {
        shouldStartInEditMode = true
      }
      this.$refs.AutoLinkEditor.setEdit(shouldStartInEditMode)
    },
    project_onRowClick ({project_id, new_tab}) {
      if (new_tab) {
        const route = this.$router.resolve('/tools/brrcalc')
        const absoluteURL = new URL(route.href, window.location.origin + window.location.pathname).href + '?projectid=' + project_id
        var handle = window.open(absoluteURL)
        window.focus()
        return
      }
      this.$router.push('/tools/brrcalc?projectid=' + project_id)
    },
    get_agent_data () {
      return {
        agent_name: this.agent_name,
        agent_notes: this.agent_notes,
        projects: this.projects
      }
    }
  }
})
</script>

<style>
.patchagnetnotes-lines > div {
  margin-bottom: 5px;
}
.patchagnetnotes-fake-link {
  color: #1976d2;
  text-decoration: underline;
}

.patchagnetnotes-fake-link:hover {
  color: #1565c0;
}

.patchagnetnotes-fake-link:visited {
  color: #7b1fa2;
}
.patchagentnotes-projectinfo {
  border: 1px solid #ccc;
}
</style>
