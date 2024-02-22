// This file DRAWS backgroudn items
import { Notify } from 'quasar'
import consts from './consts.js'

function drawOtherArea ({ allzoomedelements, item, title, x, y }) {
  console.log('ssa', title, x, y)
  var rt = allzoomedelements
    .append('rect')
    .attr('width', (item.item_data.width/3))
    .attr('height', (item.item_data.height/2))
    .attr('x', x)
    .attr('y', y)
    .attr('style', 'fill: white;stroke-width:1;stroke:rgb(0,0,0)')

}

function drawSingleItem ({item, allbackgrounditems, allzoomedelements, thencall}) {
  // always draw at the bottom
  let totalHeight = allbackgrounditems.reduce((acc, value) => {
      if (value.order < item.order) {
        return (acc = acc + value.item_data.height);
      }
      return acc
  }, 0);

  if (item.item_data.type === consts.typefloorplan) {
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
    return
  }
  if (item.item_data.type === consts.typeotherarea) {
    var oa_x = 0
    var oa_y = 0
    consts.otherareadata.map(function (i) {
      drawOtherArea({
        allzoomedelements: allzoomedelements,
        item: item,
        title: i.label,
        x: (-550 + (oa_x * (item.item_data.width/3))),
        y: (totalHeight + (oa_y * (item.item_data.height/2)))
      })
      oa_x += 1
      if (oa_x > 2) {
        oa_x = 0
        oa_y = 1
      }
    })

    thencall()
    return
  }

  console.log('Error invalid backgroudn item type', item)
  thencall()
}

function draw_all_items(items_to_draw, allbackgrounditems, allzoomedelements, thencall) {
  if (items_to_draw.length === 0) {
    thencall()
    return
  }
  var lastimage = drawSingleItem({
    item: items_to_draw[0],
    allbackgrounditems: allbackgrounditems,
    allzoomedelements: allzoomedelements,
    thencall: function () {
      items_to_draw.shift()
       draw_all_items(items_to_draw, allbackgrounditems, allzoomedelements, thencall)
    }
  })
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
