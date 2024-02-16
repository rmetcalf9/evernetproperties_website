// This file contains the data model
//  this isn't the SVG access
import { uid } from 'quasar'

function getNewlyCreatedDataSet () {
  return {
    background_items: [
    ]
  }
}

function getBackgroudnItemJson_Floorplan({url, width, height}) {
  return {
    type: 'floorplan',
    url: url,
    width: width,
    height: height
  }
}

function addBackgroundItem ({data, item_data}) {
  let maxOrder = data.background_items.reduce((acc, value) => {
      return (acc = acc > value.order ? acc : value.order);
  }, 0);
  const item = {
    id: uid(),
    item_data: item_data,
    order: maxOrder + 1
  }
  data.background_items.push(item)
  return item
}

export default {
  getNewlyCreatedDataSet: getNewlyCreatedDataSet,
  addBackgroundItem: addBackgroundItem,
  getBackgroudnItemJson_Floorplan: getBackgroudnItemJson_Floorplan
}
