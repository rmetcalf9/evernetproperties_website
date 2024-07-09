// Utils for outputing sheet

function get_sheet_utils (sheetId) {
  return {
    makeboldandvaligntop: function (r1, r2, c1, c2) {
      return {
        "repeatCell": {
          "range": {
            "sheetId": sheetId,
            "startRowIndex": r1,
            "endRowIndex": r2,
            "startColumnIndex": c1,
            "endColumnIndex": c2
          },
          "cell": {
            "userEnteredFormat": {
              "textFormat": {
                "bold": true
              },
              "verticalAlignment": "TOP"
            }
          },
          "fields": "userEnteredFormat(textFormat, verticalAlignment)"
        }
      }
    },
    formatcurrency: function (r1, r2, c1, c2) {
      return {
        "repeatCell": {
          "range": {
            "sheetId": sheetId,
            "startRowIndex": r1,
            "endRowIndex": r2,
            "startColumnIndex": c1,
            "endColumnIndex": c2
          },
          "cell": {
            "userEnteredFormat": {
              "numberFormat": {
                "type": "NUMBER",
                "pattern": "[$£-809]#,##0.00"
              }
            }
          },
          "fields": "userEnteredFormat.numberFormat"
        }
      }
    },
    adjustcolumnwidth: function (c, value) {
      return {
        "updateDimensionProperties": {
          "range": {
            "sheetId": sheetId,
            "dimension": "COLUMNS",
            "startIndex": c,
            "endIndex": c+1
          },
          "properties": {
            "pixelSize": value
          },
          "fields": "pixelSize"
        }
      }
    }
  }
}


export default {
  get_sheet_utils: get_sheet_utils
}
