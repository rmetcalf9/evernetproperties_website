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


export default {
  drawAllNodes: drawAllNodes
}
