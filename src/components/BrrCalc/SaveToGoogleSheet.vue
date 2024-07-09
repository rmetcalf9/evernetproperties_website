<template>
  <q-card v-if="security_role_cansave" inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Export to Spreadsheet</div>
      <div class="text-subtitle2">Export figures into a google docs spreadsheet.</div>
    </q-card-section>
    <q-card-section>
      <div>
        <q-btn color="primary" icon="save" label="Export to google sheets" @click="click_export" />
      </div>
      <div class="textdiv">
        This feature will generate a spreadsheet containing all the current values for this project and output it to a document in your google drive.
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import { useBackendConnectionStore } from 'stores/backend_connection'
import sheet_main from './SaveToGoogleSheetSheets/main.js'
import sheet_purchase_phase from './SaveToGoogleSheetSheets/purchase_phase.js'

export default defineComponent({
  name: 'SaveToGoogleSheetCompoennt',
  props: ['serialized_data', 'patch', 'refurb_cost_total', 'stampduty_total', 'othercosts_items_detail', 'caculated_loan_details'],
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
        callback: this.execute_export,
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
            title: 'evernetproperties.com-' + this.patch.name + '-' + this.serialized_data.dealbasicinfo.address,
          },
        }).then((response) => {
          // console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
          // Result has:
          // spreadsheetId
          // spreadsheetUrl
          // properties
          // sheets
          this.spreadsheets_batchupdate(response.result)
        });
      } catch (err) {
      this.sheet_api_error_handler(err)
        return;
      }
    },
    spreadsheets_batchupdate (spreadsheet) {
      let sheet_id_map = {
        "Main": spreadsheet.sheets[0].properties.sheetId
      }
      let requests = []
      requests.push({
          "updateSheetProperties": {
              "properties": {
                  "sheetId": spreadsheet.sheets[0].properties.sheetId,
                  "title": 'Main',
              },
              "fields": "title",
          }
      })
      const sheets_to_add = [sheet_purchase_phase.sheet_name]
      sheets_to_add.forEach(function (sheet_title) {
        requests.push({
            "addSheet": {
                "properties": {
                    "title": sheet_title
                }
            }
        })
      })

      requests = requests.concat(sheet_main.get_sheet_main(spreadsheet, this, sheet_id_map))

      const body = {
          requests: requests
      }
      try {
        gapi.client.sheets.spreadsheets.batchUpdate({
          spreadsheetId: spreadsheet.spreadsheetId,
          resource: body
        }).then((response) => {
          const result = response.result;
          console.log('spreadsheet Batch Update result', response.result.replies)
          response.result.replies.forEach(function (reply) {
            if (typeof (reply['addSheet']) !== 'undefined') {
              sheets_to_add.forEach(function (sheet_to_add) {
                if (reply.addSheet.properties.title === sheet_to_add) {
                  sheet_id_map[sheet_to_add] = reply.addSheet.properties.sheetId
                }
              })
            }
          })
          this.spreadsheets_batchupdate_after_all_sheets_added(spreadsheet, sheet_id_map)
        });
      } catch (err) {
        this.sheet_api_error_handler(err)
        return;
      }

    },
    spreadsheets_batchupdate_after_all_sheets_added (spreadsheet, sheet_id_map) {
      let requests = []
      let value_requests = []

      value_requests = value_requests.concat(sheet_main.get_sheet_main_values(spreadsheet, this, sheet_id_map))

      // Repeated for all my subsheets
      let x = sheet_purchase_phase.get_sheet_values(spreadsheet, this, sheet_id_map)
      requests = requests.concat(x.requests)
      value_requests = value_requests.concat(x.value_requests)

      if (requests.length === 0) {
        console.log('No requests required')
        this.spreadsheets_values_batchupdate(spreadsheet, sheet_id_map, value_requests)
        return
      }

      const body = {
          requests: requests
      }
      try {
        gapi.client.sheets.spreadsheets.batchUpdate({
          spreadsheetId: spreadsheet.spreadsheetId,
          resource: body
        }).then((response) => {
          const result = response.result;
          console.log('spreadsheet Batch Update after all sheets added result', response.result.replies)
          this.spreadsheets_values_batchupdate(spreadsheet, sheet_id_map, value_requests)
        });
      } catch (err) {
        this.sheet_api_error_handler(err)
        return;
      }
    },
    spreadsheets_values_batchupdate (spreadsheet, sheet_id_map, value_requests) {
      const body = {
        data: value_requests,
        valueInputOption: 'USER_ENTERED',
      };
      try {
        gapi.client.sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: spreadsheet.spreadsheetId,
          resource: body,
        }).then((response) => {
          const result = response.result;
          console.log(`${result.totalUpdatedCells} cells updated.`);
          this.sheet_final_complete(spreadsheet)
        });
      } catch (err) {
        this.sheet_api_error_handler(err)
        return;
      }

    },
    open_sheet (spreadsheet) {
      window.open(spreadsheet.spreadsheetUrl, '_blank').focus()
    },
    sheet_api_error_handler (err) {
      console.log('Error-' + err.message)
      Notify.create({
        color: 'negative',
        message: 'Export to google sheets failed ' + err.message,
        timeout: 2000
      })
      return;
    },
    sheet_final_complete (spreadsheet) {
      this.open_sheet(spreadsheet)
    }
  }
})
</script>

<style>
.textdiv {
  padding: 20px;
  max-width: 300px;
}
</style>
