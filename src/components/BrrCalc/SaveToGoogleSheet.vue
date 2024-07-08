<template>
  <q-card v-if="security_role_cansave" inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Export to Spreadsheet</div>
      <div class="text-subtitle2">Export figures into a google docs spreadsheet.</div>
    </q-card-section>
    <q-card-section>
      <q-btn color="primary" icon="save" label="Export to google sheets" @click="click_export" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import { useBackendConnectionStore } from 'stores/backend_connection'

export default defineComponent({
  name: 'SaveToGoogleSheetCompoennt',
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
    security_role_cansave () {
      return this.backend_connection_store.security_role_cansave
    },
  },
  methods: {
    click_export () {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.$rjmgclientid,
        scope: this.$rjmgscopes,
        callback: this.execute_export, // defined later
      });
      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
      }
    },
    execute_export () {
      try {
        gapi.client.sheets.spreadsheets.create({
          properties: {
            title: 'evernetproperties.com',
          },
        }).then((response) => {
          console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
        });
      } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
      }
    }
  }
})
</script>

<style>
</style>
