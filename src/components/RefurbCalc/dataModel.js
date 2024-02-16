// This file contains the data model
//  this isn't the SVG access
import { uid } from 'quasar'

function getNewlyCreatedDataSet () {
  return {
    background_items: [
    ]
  }
}

function addBackgroundItem ({data}) {
  const item = {
    id: uid()
  }
  console.log('ss', data)
  data.background_items.push(item)
}

export default {
  getNewlyCreatedDataSet: getNewlyCreatedDataSet,
  addBackgroundItem: addBackgroundItem
}
