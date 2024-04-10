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
  const svgcords = getSvgCordsFromNodeCords({
    nodecords: node.cords,
    allbackgroudnitems : allbackgroudnitems
  })
  if (node.type==='PICTURE') {
    drawPictureNode({
      rootGroup: rootGroup,
      x: svgcords.x,
      y: svgcords.y
    })
  } else {
    drawWorkNode({
      rootGroup: rootGroup,
      x: svgcords.x,
      y: svgcords.y
    })
  }
}

function drawAllNodes ({rootGroup, allnodes, allbackgroudnitems, thencall}) {
  let i = 0;
  while (i < allnodes.length) {
    console.log('SSS', allnodes[i])
    drawSingleNode ({
      node: allnodes[i].item_data,
      allbackgroudnitems: allbackgroudnitems,
      rootGroup: rootGroup,
      thencall: thencall
    })
    i++
  }
}


function getSvgCordsFromNodeCords({ nodecords, allbackgroudnitems }) {
  // ASsume all background items is already sorted
  let running_y_total = 0
  let i = 0;
  while (i < allbackgroudnitems.length) {
    if (nodecords.backgrounditem === allbackgroudnitems[i].id) {
      return {
        x: nodecords.x,
        y: nodecords.y + running_y_total
      }
    }
    running_y_total += allbackgroudnitems[i].item_data.height
    i++
  }
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
        ite_id = allbackgroudnitems[i].id
        running_y_total += allbackgroudnitems[i].item_data.height
        if (svgcords.y < running_y_total) {
          break
        }
        last_running_y_total = running_y_total
        i++
    }
    return {
      backgrounditem: ite_id,
      x: svgcords.x,
      y: svgcords.y - last_running_y_total
    }
}

export default {
  drawAllNodes: drawAllNodes,
  drawSingleNode: drawSingleNode, // used when clicking to add single node
  getSvgCordsFromNodeCords: getSvgCordsFromNodeCords,
  getNodeCordsFromSVGCords: getNodeCordsFromSVGCords
}
