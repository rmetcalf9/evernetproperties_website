<template>
  <div>
    <div id="chartInsetionPoint_adsdsa" @click="clickDIV($event)">
    </div>
    <div id="chartInsetionPointPanel_adsdsa">
    </div>
    <svgBottomToolbar
      ref='svgBottomToolbar'
    />
    <workitemDialog
      ref='workitemDialog'
      @ok="onDialogCompleteWorkitemDialog"
    />
  </div>
</template>

<script>
import * as d3 from 'd3'
import { Notify } from 'quasar'
import workitemDialog from '../WorkitemDialog.vue'
import refurbDataModel from '../dataModel.js'
import backgroundItemDrawing from '../Drawing/backgroundItemDrawing.js'
import nodeDrawing from '../Drawing/nodeDrawing.js'

import consts from '../consts.js'

import svgBottomToolbar from '../SVGBottomToolbar/Main.vue'


export default {
  name: 'ViewingChartComponent',
  components: {
    svgBottomToolbar,
    workitemDialog
  },
  props: ['refurbData'],
  data () {
    return {
      allzoomedelements: undefined,
      boudaryRect: undefined,
      svg: undefined,
      panelsvg: undefined,
      background_item_group: undefined,
      node_group: undefined,
      chartarea: {
        xmin: -650,
        xmax: 650,
        ymin: -150,
        ymax: 800
      }
    }
  },
  methods: {
    clickDIV () {
      // console.log('CLICK')
    },
    UIInputZoomedBackgroundClick (d, i) {
      var svgEl = this.svg.node()
      var pt = svgEl.createSVGPoint()
      pt.x = event.clientX
      pt.y = event.clientY
      pt = pt.matrixTransform(this.allzoomedelements.node().getCTM().inverse())
      const nodeCords = nodeDrawing.getNodeCordsFromSVGCords({
        svgcords: pt,
        allbackgroudnitems: this.refurbData.background_items
      })
      const svgCords = nodeDrawing.getSvgCordsFromNodeCords({
        nodecords: nodeCords,
        allbackgroudnitems: this.refurbData.background_items
      })

      const curview = this.$refs.svgBottomToolbar.getCurrentInputMode()
      if (curview === 'ADDWORKITEM') {
        this.addWorkItem(nodeCords)
      } else if (curview === 'ADDPHOTO') {
        this.addPhoto(nodeCords)
      }
      event.preventDefault()
    },
    addWorkItem (nodeCords) {
      this.$refs.workitemDialog.launchDialog(nodeCords)
    },
    onDialogCompleteWorkitemDialog ({ node }) {
      refurbDataModel.addNodeItem({data: this.refurbData, item_data: node})
      nodeDrawing.drawSingleNode ({
        node: node,
        allbackgroudnitems: this.refurbData.background_items,
        rootGroup: this.node_group,
        thencall: undefined
      })
      this.$refs.svgBottomToolbar.setCurrentInputMode('POINTER')
    },
    addPhoto (nodeCords) {
      console.log('TODO addPhoto')
      // let node = {
      //  type: 'PICTURE',
      //  x: point.x,
      //  y: point.y
      // }
      // nodeDrawing.drawSingleNode ({
      //  node: node,
      //  allbackgroudnitems: this.refurbData.background_items,
      //  rootGroup: this.node_group,
      //  thencall: undefined
      // })
    },
    updatechartsize () {
      let totalHeight = this.refurbData.background_items.reduce((acc, value) => {
          return (acc = acc + value.item_data.height);
      }, 0);
      this.boudaryRect
        .attr('height', totalHeight + 200)
    },
    initChart () {
      var TTT = this
      var chart = function (viewObj) {

        // We want all background items to be sorted just once on load
        TTT.refurbData.background_items.sort((a, b) => a.order - b.order)


        var width = 800
        var height = 800

        viewObj.svg = d3.create('svg')
          .attr('style', 'border: 1px solid black;position:fixed; top:0; left:0; height:100%; width:100%')
          .attr('viewBox', [-width / 2, -height / 2, width, height])
          .attr('oncontextmenu', 'return false;') // Not sure this line does anything

        viewObj.panelsvg = d3.create('svg')
          .attr('style', 'position:fixed; top:0; left:0; height:100%; width:100%; pointer-events: none;')
          .attr('viewBox', [-50, 0, 100, 800])
          .attr('oncontextmenu', 'return false;')


        viewObj.allzoomedelements = viewObj.svg.append('g')

        // Draw chart boundary
        TTT.boudaryRect = viewObj.allzoomedelements
          .append('rect')
          .attr('width', viewObj.chartarea.xmax - viewObj.chartarea.xmin)
          .attr('height', viewObj.chartarea.ymax - viewObj.chartarea.ymin)
          .attr('x', viewObj.chartarea.xmin)
          .attr('y', viewObj.chartarea.ymin)
          .attr('style', 'fill: white;stroke-width:3;stroke:rgb(0,0,0)')
          .on('contextmenu', viewObj.UIInputZoomedBackgroundContextMenu)
          .on('dblclick', viewObj.UIInputZoomedBackgroundDoubleClick)
          .on('click', viewObj.UIInputZoomedBackgroundClick)

        viewObj.svg.call(d3.zoom()
          .extent([[0, 0], [width, height]])
          .scaleExtent([-5, 10])
          .on('zoom', zoomed)
        )
        viewObj.svg.on('dblclick.zoom', null) // Remove default double click zoom behaviour

        function zoomed (event, d) {
          viewObj.allzoomedelements.attr('transform', event.transform)
        }

        viewObj.allzoomedelements
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .attr('x', 0)
          .attr('y', -70)
          .attr('style', 'font-size: 40px; font-weight: 800;')
          .text(d => 'Input Viewing Data')
          .on('click', viewObj.UIInputZoomedBackgroundClick)

        TTT.background_item_group = viewObj.allzoomedelements.append('g')
        TTT.background_item_group
          .on('click', viewObj.UIInputZoomedBackgroundClick)

        backgroundItemDrawing.drawAllBackgroundItems({
          backgroudnitem_group: TTT.refurbData.background_items,
          allzoomedelements: TTT.background_item_group,
          thencall: TTT.updatechartsize
        })

        TTT.node_group = viewObj.allzoomedelements.append('g')
        nodeDrawing.drawAllNodes({
          rootGroup: TTT.node_group,
          allnodes: TTT.refurbData.node_items,
          allbackgroudnitems: TTT.refurbData.background_items
        })

        return viewObj.svg.node()
      }
      var xdiv = document.getElementById('chartInsetionPoint_adsdsa')
      while (xdiv.firstChild) {
        console.log('Removing old SVG')
        xdiv.removeChild(xdiv.firstChild)
      }
      // console.log('nodeData:', this.nodeData)
      xdiv.appendChild(chart(this))

      var xdiv2 = document.getElementById('chartInsetionPointPanel_adsdsa')
      while (xdiv2.firstChild) {
        console.log('Removing old SVG2')
        xdiv2.removeChild(xdiv2.firstChild)
      }
      xdiv2.appendChild(this.panelsvg.node())

      var rootGroup = this.panelsvg.append('g').attr('transform', 'translate( 0 780) scale( 0.5 0.5 ) ')
      // renderAxis({ rootGroup: rootGroup })
      this.$refs.svgBottomToolbar.render({ rootGroup: rootGroup })
    }
  },
  mounted () {
    this.initChart()
  },
  unmounted () {
  }
}
</script>

<style>
</style>
