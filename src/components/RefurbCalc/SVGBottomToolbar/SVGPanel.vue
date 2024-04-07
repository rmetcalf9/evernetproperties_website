<template><div /></template>

<script>
function getSVGPanelPathString ({
  leftX,
  rightX,
  panelHeight,
  isTopLeftCurved,
  isTopRightCurved,
  panelCurveWidth,
  panelCurveHeight,
  includeBottomLine
}) {
  var PathBottomLeft = [leftX, 0]
  var PathBottomRight = [rightX, 0]
  var PathTopLeft = [leftX, -(panelHeight)]
  var PathTopRight = [rightX, -(panelHeight)]

  // var PathMidLeft = [-panelWidth / 2, panelCurveHeight - (panelHeight)]

  var pathCoords = []
  if (includeBottomLine) {
    pathCoords.push(['M', ...PathBottomRight])
  } else {
    pathCoords.push(['M', ...PathBottomLeft])
    pathCoords.push(['L', ...PathBottomRight])
  }

  if (isTopRightCurved) {
    var PathMidRight = [rightX, panelCurveHeight - (panelHeight)]
    var PathRightCircleInset = [rightX - panelCurveWidth, -(panelHeight)]
    pathCoords.push(['L', ...PathMidRight])
    pathCoords.push(['A', panelCurveWidth, panelCurveHeight, 0, 0, 0, ...PathRightCircleInset])
  } else {
    pathCoords.push(['L', ...PathTopRight])
  }
  if (isTopLeftCurved) {
    var PathMidLeft = [leftX, panelCurveHeight - (panelHeight)]
    var PathLeftCircleInset = [leftX + panelCurveWidth, -(panelHeight)]
    pathCoords.push(['L', ...PathLeftCircleInset])
    pathCoords.push(['A', panelCurveWidth, panelCurveHeight, 0, 0, 0, ...PathMidLeft])
  } else {
    pathCoords.push(['L', ...PathTopLeft])
  }
  pathCoords.push(['L', ...PathBottomLeft])

  return pathCoords.reduce(function (total, currentValue, currentIndex, arr) {
    // return total + currentValue[0] + ' ' + currentValue[1] + ' ' + currentValue[2] + ' '
    return currentValue.reduce(function (total2, currentValue2, currentIndex2, arr2) {
      return total2 + currentValue2 + ' '
    }, total)
  }, '')
}

export default {
  name: 'SVGPanel',
  props: {
    selectedCell: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      rootGroup: undefined,
      cellBackgroundArray: undefined,
      cellDrawArray: undefined,
      numCells: undefined,
      cellWidth: 150,
      panelHeight: 70,
      panelCurveWidth: 50, // panelHeight / 2
      panelCurveHeight: 50, // panelHeight / 2
      cellDivideLineYGap: 10,
      includeBottomLineInMainPanel: true,
      cellIconSVGArray: []
    }
  },
  methods: {
    render ({ rootGroup, cellArray }) {
      var TTT = this
      this.numCells = cellArray.length
      this.rootGroup = rootGroup.append('g')
      this.rootGroup.attr('style', 'pointer-events: auto;')
      this.cellBackgroundArray = cellArray.map(function (currentValue, index, arr) {
        TTT.cellIconSVGArray.push({
          title: currentValue.title
        })
        return TTT.renderCellBackgroundAndReturnUpdateObj({ cellNumber: index, selected: (index === TTT.selectedCell), render: currentValue.render })
      })
      this.renderPanelOutline()
      this.renderCellsAndSeperators()
    },
    renderCellsAndSeperators () {
      var TTT = this
      this.cellBackgroundArray.map(function (currentValue, index, arr) {
        var cellLeft = (-(TTT.cellWidth * TTT.numCells) / 2) + (TTT.cellWidth * index)
        if (index !== 0) {
          // Draw left hand side line
          TTT.rootGroup
            .append('line')
            .attr('x1', cellLeft)
            .attr('y1', -TTT.cellDivideLineYGap)
            .attr('x2', cellLeft)
            .attr('y2', TTT.cellDivideLineYGap - TTT.panelHeight)
            .attr('style', 'stroke:rgb(0,0,0);stroke-width:2')
        }
        TTT.cellIconSVGArray[index] = currentValue.g.append('g')
          .attr('transform', 'translate(' + (cellLeft + (TTT.cellWidth / 2)) + ' ' + -(TTT.panelHeight / 2) + ')')
        if (typeof (currentValue.render) !== 'undefined') {
          currentValue.render({ rootGroup: TTT.cellIconSVGArray[index] })
        }
      })
    },
    renderPanelOutline () {
      this.rootGroup.append('path')
        .attr('d', getSVGPanelPathString({
          leftX: -(this.numCells * this.cellWidth) / 2,
          rightX: (this.numCells * this.cellWidth) / 2,
          panelHeight: this.panelHeight,
          isTopLeftCurved: true,
          isTopRightCurved: true,
          panelCurveWidth: this.panelCurveWidth,
          panelCurveHeight: this.panelCurveHeight,
          includeBottomLine: this.includeBottomLineInMainPanel
        }))
        .attr('stroke', 'black')
        .attr('stroke-width', 5)
        .attr('stroke-linecap', 'square')
        .attr('fill', 'none')
    },
    getColor ({ selected }) {
      if (selected) {
        return 'grey'
      }
      return 'lightgrey'
    },
    renderCellBackgroundAndReturnUpdateObj ({ cellNumber, selected, render }) {
      var TTT = this
      var leftX = (cellNumber * this.cellWidth) - ((this.numCells * this.cellWidth) / 2)

      var LCellNum = cellNumber
      var g = this.rootGroup.append('g')
        .on('click', function (d, i) { TTT.$emit('selectedCell', LCellNum) })

      var path = g.append('path')
        .attr('d', getSVGPanelPathString({
          leftX: leftX,
          rightX: leftX + this.cellWidth,
          panelHeight: this.panelHeight,
          isTopLeftCurved: (cellNumber === 0),
          isTopRightCurved: (cellNumber === (this.numCells - 1)),
          panelCurveWidth: this.panelCurveWidth,
          panelCurveHeight: this.panelCurveHeight,
          includeBottomLine: true
        }))
        .attr('fill', this.getColor({ selected: selected }))

      if (typeof (TTT.cellIconSVGArray[cellNumber].title) !== 'undefined') {
        g
          .append('title')
          .text(TTT.cellIconSVGArray[cellNumber].title)
      }

      return {
        updateFn: function ({ selected }) {
          path.attr('fill', TTT.getColor({ selected: selected }))
        },
        g: g,
        render: render
      }
    },
    rerenderIcon ({ index, newRenderFunction }) {
      var TTT = this
      TTT.cellIconSVGArray[index].selectAll('*').remove()
      if (typeof (newRenderFunction) !== 'undefined') {
        newRenderFunction({ rootGroup: TTT.cellIconSVGArray[index] })
      }
    }
  },
  watch: {
    selectedCell: function (newVal, oldVal) {
      this.cellBackgroundArray[oldVal].updateFn({ selected: (oldVal === this.selectedCell) })
      this.cellBackgroundArray[newVal].updateFn({ selected: (newVal === this.selectedCell) })
    }
  }
}
</script>

<style>
</style>
