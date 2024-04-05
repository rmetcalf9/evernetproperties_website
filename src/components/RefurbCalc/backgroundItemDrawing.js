// This file DRAWS backgroudn items
import { Notify } from 'quasar'
import consts from './consts.js'
import * as d3 from 'd3'

function drawOtherArea ({ parentele, item, title, x, y, oadata }) {
  var rt = parentele
    .append('rect')
    .attr('width', (item.item_data.width/3))
    .attr('height', (item.item_data.height/2) - 100)
    .attr('x', x)
    .attr('y', y + 50)
    .attr('style', 'fill: white;stroke-width:1;stroke:rgb(0,0,0)')

  parentele
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .attr('x', x + (item.item_data.width/(2*3)))
    .attr('y', y + 30 + 50)
    .attr('style', 'font-size: 20px; font-weight: 800;')
    .text(d => oadata.label)

}

function redrawOtherArea ({allbackgrounditems, allzoomedelements, thencall}) {
  var otherAreaGroupSelection = d3.select('.backgroudnitemDrawing_otherAreaGroup')
  var otherdataitems = allbackgrounditems.filter(function (x) {
    return (x.item_data.type === consts.typeotherarea)
  })
  if ( otherAreaGroupSelection.size() === 0 ) {
    // need to add other area at bottom as if it was just added
    drawSingleItem ({
      item: otherdataitems[0],
      allbackgrounditems: allbackgrounditems,
      allzoomedelements: allzoomedelements,
      thencall: thencall
    })
    return
  }
  var current_y_pos = otherAreaGroupSelection.node().getBBox().y
  otherAreaGroupSelection.remove()
  drawAllOtherAreas({
    allzoomedelements: allzoomedelements,
    item: otherdataitems[0],
    ypos: current_y_pos
  })
}

function drawAllOtherAreas({ allzoomedelements, item, ypos }) {
  var oa_x = 0
  var oa_y = 0
  var otherAreaGroup = allzoomedelements.append('g')
  otherAreaGroup.attr("class", "backgroudnitemDrawing_otherAreaGroup")
  var oaitem = 0
  consts.otherareadata.map(function (i) {
    if (item.item_data.selection.includes(consts.otherareadata[oaitem].value)) {
      drawOtherArea({
        parentele: otherAreaGroup,
        item: item,
        title: i.label,
        x: (-550 + (oa_x * (item.item_data.width/3))),
        y: (ypos + (oa_y * (item.item_data.height/2))),
        oadata: consts.otherareadata[oaitem]
      })
    }
    oaitem += 1
    oa_x += 1
    if (oa_x > 2) {
      oa_x = 0
      oa_y = 1
    }
  })
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
    var callwithdelay = function () {
      setTimeout(function () {
        if (myimage.node().getBBox().height === 0) {
          callwithdelay()
          return
        }
        item.item_data.height=myimage.node().getBBox().height
        thencall()
      }, 5)
    }
    callwithdelay()
    return
  }
  if (item.item_data.type === consts.typeotherarea) {
    drawAllOtherAreas({
      allzoomedelements: allzoomedelements,
      item: item,
      ypos: totalHeight
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
  drawAllBackgroundItems: drawAllBackgroundItems,
  redrawOtherArea: redrawOtherArea
}
