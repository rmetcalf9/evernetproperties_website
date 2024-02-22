// This file contains the data model
//  this isn't the SVG access
import { uid } from 'quasar'
import consts from './consts.js'

function getNewlyCreatedDataSet () {
  return {
    background_items: [
    ]
  }
}

function getBackgroudnItemJson_Floorplan({url, width, height}) {
  return {
    type: consts.typefloorplan,
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

function getOtherAreaBackgroundItem ({data}) {
  var res = data.background_items.filter(function (x) {
    return (x.item_data.type === consts.typeotherarea)
  })
  if ( res.length === 0 ) {
    return undefined
  }
  return res[0]
}

function getSelectedOtherAreas ({data}) {
  var otherAreaBackgroundItem = getOtherAreaBackgroundItem({data: data})
  if (typeof (otherAreaBackgroundItem) === 'undefined') {
    return []
  }
  return otherAreaBackgroundItem.item_data.selection
}

function setSelectedOtherAreas ({data, selection}) {
  var otherAreaBackgroundItem = getOtherAreaBackgroundItem({data: data})
  if (typeof (otherAreaBackgroundItem) === 'undefined') {
    addBackgroundItem({
      data: data,
      item_data: {
        type: consts.typeotherarea,
        selection: selection,
        height: consts.otherareaheight,
        width: consts.backgrounditemwidth
      }
    })
    return
  }
  otherAreaBackgroundItem.item_data.selection = selection
}

export default {
  getNewlyCreatedDataSet: getNewlyCreatedDataSet,
  addBackgroundItem: addBackgroundItem,
  getBackgroudnItemJson_Floorplan: getBackgroudnItemJson_Floorplan,
  getSelectedOtherAreas: getSelectedOtherAreas,
  setSelectedOtherAreas: setSelectedOtherAreas
}
