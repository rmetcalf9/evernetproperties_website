
/*
function renderAxis ({ rootGroup }) {
  rootGroup
    .append('circle')
    .attr('r', 5)

  rootGroup
    .append('line')
    .attr('x1', 0)
    .attr('y1', 100)
    .attr('x2', 0)
    .attr('y2', -100)
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:1')

  rootGroup
    .append('line')
    .attr('x1', 100)
    .attr('y1', 0)
    .attr('x2', -100)
    .attr('y2', 0)
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:1')
}
*/
// https://material.io/resources/icons/?icon=link&style=baseline
function getSVGMaterialIconLink ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'rotate( 40 ) scale( 3 3 ) translate( -12 -12)')
  g.append('path').attr('d', 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z')
  // renderAxis({ rootGroup: rootGroup })
  return g
}

function getSVGMaterialIconDelete ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 2.2 2.2 ) translate( -12 -12)')
  g.append('path').attr('d', 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z')
  g.append('path').attr('d', 'M0 0h24v24H0z').attr('fill', 'none')
  // renderAxis({ rootGroup: rootGroup })
  return g
}

function getSVGMaterialIconEdit ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 2.2 2.2 ) translate( -12 -12)')
  g.append('path').attr('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z')
  g.append('path').attr('d', 'M0 0h24v24H0z').attr('fill', 'none')
  // renderAxis({ rootGroup: rootGroup })
  return g
}

function getSVGRJMIconEraser ({ rootGroup }) {
  // TODO Rounded corners
  var g = rootGroup.append('g').attr('transform', 'rotate( 40 ) translate( 0 -12)')
  g.append('path').attr('d', 'M 0 0 L 0 24 L 24 24 L 24 0 L 0 0').attr('style', 'stroke:rgb(0,0,0);stroke-width:2')
  g.append('path').attr('d', 'M 0 0 L 0 24 L -24 24 L -24 0 L 0 0').attr('fill', 'none').attr('style', 'stroke:rgb(0,0,0);stroke-width:2')
  // renderAxis({ rootGroup: rootGroup })
  return g
}

function getSVGMaterialIconAdd ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 2.8 2.8 ) translate( -12 -12)')
  g.append('path').attr('d', 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z')
  g.append('path').attr('d', 'M0 0h24v24H0z').attr('fill', 'none')
  return g
}

function getSVGMaterialIconLooks ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 2.8 2.8 ) translate( -12 -12)')
  g.append('path').attr('d', 'M12 10c-3.86 0-7 3.14-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.86-3.14-7-7-7zm0-4C5.93 6 1 10.93 1 17h2c0-4.96 4.04-9 9-9s9 4.04 9 9h2c0-6.07-4.93-11-11-11z')
  return g
}

function getSVGMaterialAddAPhoto ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 0.05 0.05 ) translate( -300 500)')
  g.append('path').attr('d', 'M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z')
  return g
}

function getSVGMaterialPhotoCamera ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 0.05 0.05 ) translate( -300 500)')
  g.append('path').attr('d', 'M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z')
  return g
}

function getSVGMaterialConstruction ({ rootGroup }) {
  var g = rootGroup.append('g').attr('transform', 'scale( 0.05 0.05 ) translate( -300 500)')
  g.append('path').attr('d', 'M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z')
  return g
}

function getSVGRJMIconPointer ({ rootGroup }) {
  var halfArrowWidth = 14
  var halfRectWidth = 3
  var TriangleHeight = 24
  var rectHeight = 10
  var rectYOffset = 5
  var pathPoint = [0, -TriangleHeight]
  var pathLeftTriange = [-halfArrowWidth, 0]
  var pathRightTriangle = [halfArrowWidth, 0]
  var pathRectTopLeft = [-halfRectWidth, -rectYOffset]
  var pathRectTopRight = [halfRectWidth, -rectYOffset]
  var pathRectBottomLeft = [-halfRectWidth, rectHeight + rectYOffset]
  var pathRectBottomRight = [halfRectWidth, rectHeight + rectYOffset]

  var rectLines = [
    ['L', ...pathRectTopLeft],
    ['L', ...pathRectBottomLeft],
    ['L', ...pathRectBottomRight],
    ['L', ...pathRectTopRight]
  ]

  var pathCoords = [
    ['M', ...pathPoint],
    ['L', ...pathLeftTriange],
    ...rectLines,
    ['L', ...pathRightTriangle],
    ['L', ...pathPoint]
  ]

  var path = pathCoords.reduce(function (total, currentValue, currentIndex, arr) {
    // return total + currentValue[0] + ' ' + currentValue[1] + ' ' + currentValue[2] + ' '
    return currentValue.reduce(function (total2, currentValue2, currentIndex2, arr2) {
      return total2 + currentValue2 + ' '
    }, total)
  }, '')

  var g = rootGroup.append('g').attr('transform', 'rotate( -30 ) translate( 0 5)')

  g.append('path').attr('d', path).attr('style', 'stroke:rgb(0,0,0);stroke-width:2')
  // g.append('path').attr('d', 'M 0 0 L 0 24 L -24 24 L -24 0 L 0 0').attr('fill', 'none').attr('style', 'stroke:rgb(0,0,0);stroke-width:2')
  // renderAxis({ rootGroup: rootGroup })
  return g
}

export default {
  getSVGMaterialIconLink: getSVGMaterialIconLink,
  getSVGMaterialIconDelete: getSVGMaterialIconDelete,
  getSVGMaterialIconEdit: getSVGMaterialIconEdit,
  getSVGRJMIconEraser: getSVGRJMIconEraser,
  getSVGRJMIconPointer: getSVGRJMIconPointer,
  getSVGMaterialIconAdd: getSVGMaterialIconAdd,
  getSVGMaterialIconLooks: getSVGMaterialIconLooks,
  getSVGMaterialAddAPhoto: getSVGMaterialAddAPhoto,
  getSVGMaterialConstruction: getSVGMaterialConstruction,
  getSVGMaterialPhotoCamera: getSVGMaterialPhotoCamera
}
