import gfxFunctions from '../SVGBottomToolbar/GfxFunctions.js'

function drawAnyNode ({rootGroup, x, y, nodeid, iconFn, transform}) {
  const nodeData = [nodeid];
  let base = rootGroup
    .append('g')
    .attr('transform', 'translate( ' + x + ' ' + y + ')')
    .attr('class', 'nodeitem')
    .data(nodeData)
    .attr("id", function(d) { return '_' + d })
    // .attr('data-rjmnodeid', function (d) { return d.id })

  base
    .append('circle')
    .attr('r', 20)
    .attr('style', 'fill: lightblue;')

  let pic_g = base.append('g')
    .attr('transform', transform)
  iconFn ({ rootGroup:pic_g })
}

function removeNodeById({ rootGroup, nodeid }) {
    var svgnode = rootGroup.select('#_' + nodeid)
    svgnode.remove()
}

function drawPictureNode ({rootGroup, x, y, nodeid}) {
  return drawAnyNode({
    rootGroup: rootGroup,
    x: x,
    y: y,
    nodeid: nodeid,
    iconFn: gfxFunctions.getSVGMaterialPhotoCamera,
    transform: 'translate( -4 0) scale(0.5 0.5)'
  })
}

function drawWorkNode ({rootGroup, x, y, nodeid}) {
  return drawAnyNode({
    rootGroup: rootGroup,
    x: x,
    y: y,
    nodeid: nodeid,
    iconFn: gfxFunctions.getSVGMaterialConstruction,
    transform: 'translate( -4 0) scale(0.5 0.5)'
  })
}

function drawSingleNode ({node, allbackgroudnitems, rootGroup, thencall}) {
  const svgcords = getSvgCordsFromNodeCords({
    nodecords: node.item_data.cords,
    allbackgroudnitems : allbackgroudnitems
  })
  if (node.type==='PICTURE') {
    drawPictureNode({
      rootGroup: rootGroup,
      x: svgcords.x,
      y: svgcords.y,
      nodeid: node.id
    })
  } else {
    drawWorkNode({
      rootGroup: rootGroup,
      x: svgcords.x,
      y: svgcords.y,
      nodeid: node.id
    })
  }
}

function drawAllNodes ({rootGroup, allnodes, allbackgroudnitems, thencall}) {
  let i = 0;
  while (i < allnodes.length) {
    drawSingleNode ({
      node: allnodes[i],
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
  getNodeCordsFromSVGCords: getNodeCordsFromSVGCords,
  removeNodeById: removeNodeById
}
