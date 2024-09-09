// Utils for outputing sheet

function get_sheet_utils (sheetId) {
  function formatnumbermisc (r1, r2, c1, c2, pattern) {
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
              "pattern": pattern
            }
          }
        },
        "fields": "userEnteredFormat.numberFormat"
      }
    }
  }
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
    makeitalicandvaligntop: function (r1, r2, c1, c2) {
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
                "italic": true
              },
              "verticalAlignment": "TOP"
            }
          },
          "fields": "userEnteredFormat(textFormat, verticalAlignment)"
        }
      }
    },
    makeboldandvaligntopandsetfontsize: function (r1, r2, c1, c2, fontsize) {
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
                "fontSize": fontsize,
                "bold": true
              },
              "verticalAlignment": "TOP"
            }
          },
          "fields": "userEnteredFormat(textFormat, verticalAlignment)"
        }
      }
    },
    formatnumbermisc: function (r1, r2, c1, c2, pattern) { return formatnumbermisc(r1, r2, c1, c2, pattern) },
    formatcurrency: function (r1, r2, c1, c2) { return formatnumbermisc(r1, r2, c1, c2, '[$£-809]#,##0.00') },
    formatpercentage: function (r1, r2, c1, c2) { return formatnumbermisc(r1, r2, c1, c2, '0.00%') },
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
