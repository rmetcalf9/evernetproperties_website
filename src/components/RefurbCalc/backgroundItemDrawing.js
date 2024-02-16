// This file DRAWS backgroudn items
import { Notify } from 'quasar'

function drawSingleItem ({item, allzoomedelements}) {
  // TODO Differs dependant on type
  var myimage = allzoomedelements.append('svg:image')
      .attr('href', item.item_data.url)
      .attr('width',  item.item_data.width)
      .attr('height',  item.item_data.height)
      .on("error", function(d){
          console.log('load failed', d)
          Notify.create({
            color: 'bg-grey-2',
            message: 'Failed to load image',
            timeout: 2
          })
      })
}

function drawAllBackgroundItems ({allbackgrounditems, allzoomedelements}) {
  allbackgrounditems.sort((a, b) => a.order - b.order)
  allbackgrounditems.forEach(function (x) {
    if (x.item_data.type === 'floorplan') {
      drawSingleItem({
        item: x,
        allzoomedelements: allzoomedelements
      })
    } else {
      console.log('Error invalid backgroudn item type', x)
    }
  })
}

export default {
  drawSingleItem: drawSingleItem,
  drawAllBackgroundItems: drawAllBackgroundItems
}
