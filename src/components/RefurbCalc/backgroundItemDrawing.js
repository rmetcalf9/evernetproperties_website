// This file DRAWS backgroudn items
import { Notify } from 'quasar'

function drawSingleItem ({item, allbackgrounditems, allzoomedelements, thencall}) {
  // always draw at the bottom
  let totalHeight = allbackgrounditems.reduce((acc, value) => {
      if (value.order < item.order) {
        return (acc = acc + value.item_data.height);
      }
      return acc
  }, 0);

  var myimage = allzoomedelements.append('svg:image')
      .attr('href', item.item_data.url)
      .attr('width',  item.item_data.width)
      // .attr('height',  item.item_data.height)
      .attr('x', -550)
      .attr('y', totalHeight)
      .on("error", function(d){
          console.log('load failed', d)
          Notify.create({
            color: 'bg-grey-2',
            message: 'Failed to load image',
            timeout: 2
          })
      })
  setTimeout(function () {
    item.item_data.height=myimage.node().getBBox().height
    thencall()
  }, 5)
}

function draw_all_items(items_to_draw, allbackgrounditems, allzoomedelements, thencall) {
  if (items_to_draw.length === 0) {
    thencall()
    return
  }
  if (items_to_draw[0].item_data.type === 'floorplan') {
    var lastimage = drawSingleItem({
      item: items_to_draw[0],
      allbackgrounditems: allbackgrounditems,
      allzoomedelements: allzoomedelements,
      thencall: function () {
        items_to_draw.shift()
         draw_all_items(items_to_draw, allbackgrounditems, allzoomedelements, thencall)
      }
    })
  } else {
    console.log('Error invalid backgroudn item type', items_to_draw[0])
  }
}

function drawAllBackgroundItems ({allbackgrounditems, allzoomedelements, thencall}) {
  allbackgrounditems.sort((a, b) => a.order - b.order)
  var items_to_draw = allbackgrounditems.map(function (x) {return x})
  draw_all_items(items_to_draw, allbackgrounditems, allzoomedelements, thencall)
}

export default {
  drawSingleItem: drawSingleItem,
  drawAllBackgroundItems: drawAllBackgroundItems
}
