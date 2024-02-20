// This file DRAWS backgroudn items
import { Notify } from 'quasar'

function drawSingleItem ({item, allzoomedelements, offset}) {
  // TODO Differs dependant on type
  console.log('off', offset)
  var myimage = allzoomedelements.append('svg:image')
      .attr('href', item.item_data.url)
      .attr('width',  item.item_data.width)
      //.attr('height',  item.item_data.height)
      // .attr('x', 0)
      .attr('y', offset)
      .on("error", function(d){
          console.log('load failed', d)
          Notify.create({
            color: 'bg-grey-2',
            message: 'Failed to load image',
            timeout: 2
          })
      })
  return myimage
}

function draw_all_items(items_to_draw, offset, allzoomedelements) {
  if (items_to_draw.length === 0) {
    return
  }
  if (items_to_draw[0].item_data.type === 'floorplan') {
    var lastimage = drawSingleItem({
      item: items_to_draw[0],
      allzoomedelements: allzoomedelements,
      offset: offset
    })
  } else {
    console.log('Error invalid backgroudn item type', items_to_draw[0])
  }
  items_to_draw.shift()
  setTimeout(function () {
    offset += lastimage.node().getBBox().height
     draw_all_items(items_to_draw, offset, allzoomedelements)
  }, 2)
}

function drawAllBackgroundItems ({allbackgrounditems, allzoomedelements}) {
  allbackgrounditems.sort((a, b) => a.order - b.order)
  let offset = 0
  var items_to_draw = allbackgrounditems.map(function (x) {return x})
  draw_all_items(items_to_draw, offset, allzoomedelements)
}

export default {
  drawSingleItem: drawSingleItem,
  drawAllBackgroundItems: drawAllBackgroundItems
}
