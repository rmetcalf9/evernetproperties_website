<template>
  <q-card v-if="security_role_cansave" inline class="q-ma-sm card-style featurecard col-grow">
    <q-card-section>
      <div class="text-h6">Export to Spreadsheet</div>
      <div class="text-subtitle2">Export figures into a google docs spreadsheet.</div>
    </q-card-section>
    <q-card-section>
      <div>
        <q-btn
          color="primary"
          icon="save"
          label="Export to google sheets"
          @click="click_export"
          :disabled="!this.export_possible"
        />
      </div>
      <div class="textdiv">
        This feature will generate a spreadsheet containing all the current values for this project and output it to a document in your google drive.
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify, Loading } from 'quasar'
import { useBackendConnectionStore } from 'stores/backend_connection'
import sheet_main from './SaveToGoogleSheetSheets/main.js'
import sheet_purchase_phase from './SaveToGoogleSheetSheets/purchase_phase.js'
import sheet_gdv_comparables from './SaveToGoogleSheetSheets/gdv_comparables.js'
import sheet_hmo_monthly_profit from './SaveToGoogleSheetSheets/hmo_monthly_profit.js'
import sheet_hmo_room_sizes from './SaveToGoogleSheetSheets/hmo_room_sizes.js'
import sheet_refurb_cost from './SaveToGoogleSheetSheets/refurb_cost.js'

export default defineComponent({
  name: 'SaveToGoogleSheetCompoennt',
  emits: ['apiaddweblink', 'activity_log'],
  props: [
    'serialized_data',
    'patch',
    'refurb_cost_total',
    'stampduty_total',
    'othercosts_items_detail',
    'caculated_loan_details',
    'finance_bridgecost',
    'finance_bridgeamount',
    'gdv_total',
    'refinance_costs',
    'ever_saved',
    'loaded_project_id'
  ],
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
    export_possible () {
      if (!this.ever_saved) {
        return false
      }
      if (typeof (this.loaded_project_id) === 'undefined') {
        return false
      }
      if (this.loaded_project_id === '') {
        return false
      }
      return true
    }
  },
  methods: {
    click_export () {
      if (!this.export_possible) {
        Notify.create({
          color: 'negative',
          message: 'Can not export at the moment - please try again later',
          timeout: 2000
        })
        return
      }
      Loading.show()
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

      let subsheet_javascript_code_files = [sheet_purchase_phase, sheet_gdv_comparables]
      if (typeof(this.serialized_data.vision.strategy) !== 'undefined') {
        if (this.serialized_data.vision.strategy.hmo) {
          subsheet_javascript_code_files.push(sheet_hmo_monthly_profit)
          subsheet_javascript_code_files.push(sheet_hmo_room_sizes)
        }
      }
      subsheet_javascript_code_files.push(sheet_refurb_cost)

      let sheedIdx = 0;
      while (sheedIdx < subsheet_javascript_code_files.length) {
        requests.push({
            "addSheet": {
                "properties": {
                    "title": subsheet_javascript_code_files[sheedIdx].sheet_name
                }
            }
        })
        sheedIdx++;
      }

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
              let sheedIdx = 0;
              while (sheedIdx < subsheet_javascript_code_files.length) {
                if (reply.addSheet.properties.title === subsheet_javascript_code_files[sheedIdx].sheet_name) {
                  sheet_id_map[subsheet_javascript_code_files[sheedIdx].sheet_name] = reply.addSheet.properties.sheetId
                }
                sheedIdx++;
              }
            }
          })
          this.spreadsheets_batchupdate_after_all_sheets_added(spreadsheet, sheet_id_map, subsheet_javascript_code_files)
        });
      } catch (err) {
        this.sheet_api_error_handler(err)
        return;
      }

    },
    spreadsheets_batchupdate_after_all_sheets_added (spreadsheet, sheet_id_map, subsheet_javascript_code_files) {
      let requests = []
      let value_requests = []

      value_requests = value_requests.concat(sheet_main.get_sheet_main_values(spreadsheet, this, sheet_id_map))

      // Repeated for all my subsheets
      let i = 0;
      while (i < subsheet_javascript_code_files.length) {
        let x = subsheet_javascript_code_files[i].get_sheet_values(spreadsheet, this, sheet_id_map)
        requests = requests.concat(x.requests)
        value_requests = value_requests.concat(x.value_requests)
        i++;
      }

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
      Loading.hide()
      console.log('Error-' + err.message)
      Notify.create({
        color: 'negative',
        message: 'Export to google sheets failed ' + err.message,
        timeout: 2000
      })
      return;
    },
    sheet_final_complete (spreadsheet) {
      this.$emit('apiaddweblink', {
        url: spreadsheet.spreadsheetUrl,
        displaytext: 'My Calc'
      })
      const obj = {
        type: 'admin',
        text: 'Generated google sheet',
        head_notes: 'Calculation'
      }
      this.$emit('activity_log', obj)
      this.open_sheet(spreadsheet)
      Loading.hide()
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
