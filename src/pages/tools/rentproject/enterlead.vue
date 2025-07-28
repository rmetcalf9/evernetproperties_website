<template>
  <q-page class="">
    <div class="fit column wrap justify-start items-start content-center">
      <h2>Enter new Rental Lead</h2>
      <p>Enter a new rental lead to follow up later.</p>
      <LeadInformation
        ref="LeadInformation"
      />
      <div class="enterlead-btnbar">
        <q-btn label="Cancel" @click="click_cancel" />
        <q-btn color="primary" label="Save" @click="click_save(false)" />
        <q-btn color="primary" label="Save and add another" @click="click_save(true)" />
      </div>
      <ProjectSerializer
        ref="ProjectSerializer"
        @saveprojectcomplete="save_project_complete"
        :project_type="project_type"
        success_message="Lead Saved"
      />
      <div class="enterlead-hiddenparts">
        <ActivityLog
          ref="ActivityLog"
        />
        <Workflow
          ref="Workflow"
          :default_workflow_id="default_workflow_id"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import LeadInformation from '../../../components/ProjectTypeRentComponents/LeadInformation.vue'
import ActivityLog from '../../../components/CommonCalcComponents/ActivityLog.vue'
import Workflow from '../../../components/CommonCalcComponents/Workflow.vue'
import Workflow_main from '../../../components/Workflow/Workflow_main.js'

import ProjectSerializer from '../../../components/CommonCalcComponents/ProjectSerializer.vue'
import common_constants from '../../../components/common_constants.js'

import { Notify } from 'quasar'

export default defineComponent({
  name: 'RentProjectEnterLead',
  components: {
    LeadInformation,
    ActivityLog,
    Workflow,
    ProjectSerializer
  },
  setup () {
    const q = useQuasar()
    return {
      q: q
    }
  },
  data () {
    return {
    }
  },
  computed: {
    default_workflow_id () {
      return Workflow_main.default_rent_workflow_id
    },
    project_type () {
      return common_constants.project_type_constants.project_type_rent
    },
    no_save_reason () {
      if (this.$refs.LeadInformation.serializer_card_data.patch_id === 'notset') {
        console.log('Patch error', this.$refs.LeadInformation.serializer_card_data.patch_id)
        return 'You must select a patch'
      }
      if (this.$refs.LeadInformation.serializer_card_data.landlord_name.length < 3) {
        return 'Enter landlord name'
      }
      if (this.$refs.LeadInformation.serializer_card_data.contact_phone.length < 3) {
        return 'Enter a contact phonenumber'
      }
      return ''
    },
    serialized_data () {
      return {
        leadinformation: this.$refs.LeadInformation.serializer_card_data
      }
    }
  },
  methods: {
    click_cancel () {
      this.$router.push('/tools')
    },
    click_save (add_another) {
      if (this.no_save_reason !== '') {
        Notify.create({
          color: 'negative',
          message: this.no_save_reason,
          timeout: 2000
        })
        return
      }
      this.q.loading.show({
        message: 'Saving lead...'
      })
      this.$refs.ProjectSerializer.save_project({
        dict_of_card_info: this.serialized_data,
        activity_log: this.$refs.ActivityLog.serializer_card_data,
        workflow: this.$refs.Workflow.serializer_card_data,
        patch_id: this.serialized_data.leadinformation.patch_id,
        location: undefined,
        passthroughdata: {
          add_another: add_another,
          patch_id: this.serialized_data.leadinformation.patch_id
        }
      })
    },
    save_project_complete ({success, response, passthroughdata}) {
      this.q.loading.hide()
      if (!success) {
        // Seariailiaser makes message
        return
      }
      if (passthroughdata.add_another) {
        this.reset_data()
        this.$refs.LeadInformation.select_patch_by_id(passthroughdata.patch_id)
      } else {
        this.$router.push('/tools')
      }
    },
    reset_data() {
      this.$refs.LeadInformation.reset_data()
    }
  },
  mounted () {
    if (typeof(this.$route.query.defaultpatch) !== 'undefined') {
      this.$refs.LeadInformation.select_patch_by_id(this.$route.query.defaultpatch)
    }
  }
})
</script>

<style>
.enterlead-btnbar > button {
  margin-left: 5px;
  margin-right: 5px;
}
.enterlead-hiddenparts {
  display: none;
}
</style>
