<template>
  <div>
    <div id="chartInsetionPoint_adsdsa" @click="clickDIV($event)">
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        color="grey"
        icon="keyboard_arrow_up"
        direction="up"
        vertical-actions-align="right"
      >
        <q-fab-action color="grey" @click="onClickTODO" icon="add" label="Add photo" />
        <q-fab-action color="grey" @click="onClickTODO" icon="add" label="Add workitem" />
      </q-fab>
    </q-page-sticky>
    <svgBottomToolbar
      ref='svgBottomToolbar'
    />    
  </div>
</template>

<script>
import * as d3 from 'd3'
import { Notify } from 'quasar'
import addFloorplanDialog from './AddFloorplanDialog.vue'
import refurbDataModel from './dataModel.js'
import backgroundItemDrawing from './backgroundItemDrawing.js'
import consts from './consts.js'

import svgBottomToolbar from './SVGBottomToolbar/Main.vue'


export default {
  name: 'ViewingChartComponent',
  components: {
  },
  props: ['refurbData'],
  data () {
    return {
      allzoomedelements: undefined,
      boudaryRect: undefined,
      svg: undefined,
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
        var width = 800
        var height = 800

        viewObj.svg = d3.create('svg')
          .attr('style', 'border: 1px solid black;position:fixed; top:0; left:0; height:100%; width:100%')
          .attr('viewBox', [-width / 2, -height / 2, width, height])
          .attr('oncontextmenu', 'return false;') // Not sure this line does anything

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

        backgroundItemDrawing.drawAllBackgroundItems({
          allbackgrounditems: TTT.refurbData.background_items,
          allzoomedelements: viewObj.allzoomedelements,
          thencall: TTT.updatechartsize
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
