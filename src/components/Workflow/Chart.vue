<template>
  <div id="chartInsetionPoint_workflowchart" @click="clickDIV($event)">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import * as d3 from 'd3'

import Workflow from './FirstWorkflow.js'

function draw_workflow(parent, workflow_json) {
  const context = {
    items_drawn: [],
    cols: [-500, 0, 500]
  }
  draw_stage_and_all_children(
    parent,
    workflow_json.initial_stage,
    workflow_json.stages[workflow_json.initial_stage],
    context,
    workflow_json,
    200,
    false
  )

}

function draw_stage_and_all_children(parent, this_stage_id, stage_data, context, workflow_json, cur_y, is_fail_path) {
  if (context.items_drawn.includes(this_stage_id)) {
    return //alredy drawn
  }
  let draw_col = 0
  if (is_fail_path) {
    draw_col = 2
  } else {
    if (typeof (stage_data.draw_col) !== 'undefined') {
      draw_col = stage_data.draw_col
    }
  }
  const group = parent.append('g')
    .attr('transform', 'translate( ' + context.cols[draw_col] + ' ' + cur_y + ')')

  context.items_drawn.push(this_stage_id)

  draw_stage(group, stage_data, is_fail_path)
  if (typeof (stage_data.progression) !== 'undefined') {
    if (typeof (stage_data.progression.failed) !== 'undefined') {
      draw_stage_and_all_children(
        parent,
        stage_data.progression.failed,
        workflow_json.stages[stage_data.progression.failed],
        context,
        workflow_json,
        cur_y + 150,
        true
      )
    }
    if (typeof (stage_data.progression.success) !== 'undefined') {
      stage_data.progression.success.forEach(function (ite) {
        draw_stage_and_all_children(
          parent, ite.next_stage,
          workflow_json.stages[ite.next_stage],
          context,
          workflow_json,
          cur_y + 300,
          false
        )
      })
    }


  }
}

function draw_stage(parent, stage_data, is_fail_stage) {
  // 0,0 is centre TOP of the rectangle
  const group = parent.append('g')

  const width = 400

  let colour = 'lightgreen'
  if (is_fail_stage) {
    colour = 'pink'
  }

  group
    .append('rect')
    .attr('width', width)
    .attr('height', 130)
    .attr('x', -(width/2))
    .attr('y', 0)
    .attr('style', 'fill: ' + colour + ';stroke-width:3;stroke:rgb(0,0,0)')

    group
      .append('text')
      .attr('x', 0)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style("font-size", "28px")
      .style("font-weight", "500")
      .text(stage_data.name)

      group
        .append('text')
        .attr('x', 0)
        .attr('y', 110)
        .attr('text-anchor', 'middle')
        .style("font-size", "56px")
        .style("font-weight", "500")
        .text('0')


}

export default defineComponent({
  name: 'WorkflowChart',
  data () {
    return {
      allzoomedelements: undefined,
      boudaryRect: undefined,
      svg: undefined,
      background_item_group: undefined,
      chartarea: {
        xmin: -950,
        xmax: 950,
        ymin: -150,
        ymax: 2300
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

      draw_workflow(this.allzoomedelements, this.workflow)
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
