import gfxFunctions from './SVGBottomToolbar/GfxFunctions.js'


function drawPictureNode ({rootGroup, x, y}) {
  let base = rootGroup
    .append('g')
    .attr('transform', 'translate( ' + x + ' ' + y + ')')

  base
    .append('circle')
    .attr('r', 20)
    .attr('style', 'fill: lightblue;')

  let pic_g = base.append('g')
    .attr('transform', 'translate( -4 0) scale(0.5 0.5)')
  gfxFunctions.getSVGMaterialPhotoCamera ({ rootGroup:pic_g })
}

function drawWorkNode ({rootGroup, x, y}) {
  let base = rootGroup
    .append('g')
    .attr('transform', 'translate( ' + x + ' ' + y + ')')

  base
    .append('circle')
    .attr('r', 20)
    .attr('style', 'fill: lightblue;')

  let pic_g = base.append('g')
    .attr('transform', 'translate( -4 0) scale(0.5 0.5)')
  gfxFunctions.getSVGMaterialConstruction ({ rootGroup:pic_g })
}

function drawSingleNode ({node, allbackgroudnitems, rootGroup, thencall}) {
  if (node.type==='PICTURE') {
    drawPictureNode({
      rootGroup: rootGroup,
      x: node.x,
      y: node.y
    })
  } else {
    drawWorkNode({
      rootGroup: rootGroup,
      x: node.x,
      y: node.y
    })
  }
}

function drawAllNodes ({rootGroup}) {
  drawPictureNode({
    rootGroup: rootGroup,
    x: 0,
    y: 0
  })

  drawWorkNode({
    rootGroup: rootGroup,
    x: -100,
    y: 100
  })

}


function getSvgCordsFromNodeCords({ nodecords, allbackgroudnitems }) {
  // ASsume all background items is already sorted
  return {
    x: nodecords.x,
    y: nodecords.y
  }
}

function getNodeCordsFromSVGCords({ svgcords, allbackgroudnitems }) {
    // Assume all background items is already sorted

    let running_y_total = 0
    let ite_id = allbackgroudnitems[0].id
    let last_running_y_total = 0
    let i = 0;
    while (i < allbackgroudnitems.length) {
        console.log('Running:-', allbackgroudnitems[i].id, running_y_total)
        ite_id = allbackgroudnitems[0].id
        running_y_total += allbackgroudnitems[i].item_data.height
        if (svgcords.y < running_y_total) {
          break
        }
        last_running_y_total = running_y_total
        i++
    }

    console.log('allbackgroudnitems LAST running=', last_running_y_total)
    return {
      backgrounditem: ite_id,
      x: svgcords.x,
      y: svgcords.y
    }
}

export default {
  drawAllNodes: drawAllNodes,
  drawSingleNode: drawSingleNode, // used when clicking to add single node
  getSvgCordsFromNodeCords: getSvgCordsFromNodeCords,
  getNodeCordsFromSVGCords: getNodeCordsFromSVGCords
}
