<template>
  <q-page class="flex flex-center">
    <div rows>
      <h3 style="margin: 0px;">User Profile</h3>
      <h4>Basic</h4>
      <div class="section">
        <div>User: {{ user_profile.name }}</div>
        <div>Email: {{ user_profile.email }}</div>
      </div>
      <div class="section">
        <h4>PIMS Membership <q-btn round dense flat icon="info" @click="pimsinfo" /></h4>
        <div>
          <div>First Name: {{ user_profile.email }}</div>
          <div>Last Name: {{ user_profile.email }}</div>
          <div>PIMS Number: {{ user_profile.email }}</div>
          <div>Verified: <q-icon name="check_box" color="green" size="32px" /></div>
          <div>Verified: <q-icon name="cancel" color="red" size="32px" /></div>
        </div>
      </div>
      <q-btn
        @click="logout"
        color="primary"
        label="Logout"
      ></q-btn>
    </div>
    <q-dialog v-model="enterpimsdialog.visible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          TODO
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" color="secondary" @click="enterpimsdialogclick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useBackendConnectionStore } from 'stores/backend_connection'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    return {
      backend_connection_store
    }
  },
  components: {
  },
  data () {
    return {
      enterpimsdialog: {
        visible: false
      }
    }
  },
  computed: {
    isLoggedin () {
      return this.backend_connection_store.isLoggedin
    },
    user_profile () {
      return this.backend_connection_store.user_profile
    }
  },
  methods: {
    logout () {
      this.backend_connection_store.logout()
      this.$router.push("/tools")
    },
    pimsinfo () {
      const TTT = this
      this.$q.dialog({
        title: 'PIMS Membership Details',
        message: 'Extra site features are available to users who have a verified PIMS membership.',
        html: true,
        ok: {
          push: true,
          label: 'Enter PIMS details',
          color: 'secondary'
        },
        cancel: {
          push: true,
          label: 'Close',
          color: 'primary'
        }
      }).onOk(() => {
        TTT.enterpimsdialog.visible = true
      })
    },
    enterpimsdialogclick () {
      console.log('TODO')
    }
  },
  mounted () {
    if (!this.isLoggedin) {
      this.$router.push("/tools")
    }
  }
})
</script>

<style>
h4 {
  margin-top: 35px;
  margin-bottom: 0px;
}
.section {
  margin-bottom: 20px;
}
</style>
