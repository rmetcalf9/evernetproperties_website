<template>
  <div id="chartInsetionPoint_workflowchart" @click="clickDIV($event)">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import * as d3 from 'd3'

import Workflow from './FirstWorkflow.js'

export default defineComponent({
  name: 'WorkflowChart',
  data () {
    return {
      allzoomedelements: undefined,
      boudaryRect: undefined,
      svg: undefined,
      background_item_group: undefined,
      chartarea: {
        xmin: -650,
        xmax: 650,
        ymin: -150,
        ymax: 800
      }
    }
  },
  computed: {
    workflow () {
      return Workflow
    }
  },
  methods: {
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
          // .on('contextmenu', viewObj.UIInputZoomedBackgroundContextMenu)
          // .on('dblclick', viewObj.UIInputZoomedBackgroundDoubleClick)
          // .on('click', viewObj.UIInputZoomedBackgroundClick)

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
          .text(d => TTT.workflow.name)

        return viewObj.svg.node()
      }
      var xdiv = document.getElementById('chartInsetionPoint_workflowchart')
      while (xdiv.firstChild) {
        console.log('Removing old SVG')
        xdiv.removeChild(xdiv.firstChild)
      }
      // console.log('nodeData:', this.nodeData)
      xdiv.appendChild(chart(this))
    },
    clickDIV () {
      // console.log('CLICK')
    },

  },
  mounted () {
    this.initChart()
  }
})
</script>

<style>
</style>
