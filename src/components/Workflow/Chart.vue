<template>
  <div id="chartInsetionPoint_workflowchart" @click="clickDIV($event)">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import * as d3 from 'd3'

import Workflow_main from './Workflow_main.js'

function draw_workflow(parent, workflow_json, click_stage_callback, patch_data) {
  const context = {
    items_drawn: {},
    cols: [-300, 120, 560]
  }
  draw_stage_and_all_children(
    parent,
    workflow_json.initial_stage,
    workflow_json.stages[workflow_json.initial_stage],
    context,
    workflow_json,
    200,
    false,
    click_stage_callback,
    patch_data
  )

}

const stage_height = 130
const stage_width = 400

function get_x_for_stage(stage_data, context, is_fail_path) {
  let draw_col = 0
  if (is_fail_path) {
    draw_col = 2
  } else {
    if (typeof (stage_data.draw_col) !== 'undefined') {
      draw_col = stage_data.draw_col
    }
  }
  return context.cols[draw_col]
}

function draw_stage_and_all_children(parent, this_stage_id, stage_data, context, workflow_json, cur_y, is_fail_path, click_stage_callback, patch_data) {
  if (Object.keys(context.items_drawn).includes(this_stage_id)) {
    return //alredy drawn
  }
  const x_pos = get_x_for_stage(stage_data, context, is_fail_path)
  const group = parent.append('g')
    .attr('transform', 'translate( ' + x_pos + ' ' + cur_y + ')')

  context.items_drawn[this_stage_id] = {
    pos_x: x_pos,
    pos_y: cur_y
  }

  draw_stage(group, this_stage_id, stage_data, is_fail_path, click_stage_callback, workflow_json, patch_data)
  if (typeof (stage_data.progression) !== 'undefined') {
    if (typeof (stage_data.progression.failed) !== 'undefined') {
      draw_stage_and_all_children(
        parent,
        stage_data.progression.failed,
        workflow_json.stages[stage_data.progression.failed],
        context,
        workflow_json,
        cur_y + 150,
        true,
        click_stage_callback,
        patch_data
      )
      draw_arrow(
        parent,
        x_pos,
        cur_y + stage_height,
        context.cols[2] - (stage_width/2),
        cur_y + 150 + (stage_height/2)
      )
    }
    if (typeof (stage_data.progression.success) !== 'undefined') {
      stage_data.progression.success.forEach(function (ite) {
        draw_stage_and_all_children(
          parent,
          ite.next_stage,
          workflow_json.stages[ite.next_stage],
          context,
          workflow_json,
          cur_y + 300,
          false,
          click_stage_callback,
          patch_data
        )
        // It has just been drawn so will always be in drawn array
        draw_arrow(
          parent,
          x_pos,
          cur_y + stage_height,
          context.items_drawn[ite.next_stage].pos_x,
          context.items_drawn[ite.next_stage].pos_y
        )

      })
    }


  }
}

function draw_arrow(parent, x1, y1, x2, y2) {
  parent.append('line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke', 'black')
    .attr('style', 'stroke-width:10;')
    .attr('marker-end', 'url(#triangle)')

}

function draw_stage(parent, this_stage_id, stage_data, is_fail_stage, click_stage_callback, workflow_json, patch_data) {
  // 0,0 is centre TOP of the rectangle
  const group = parent.append('g')

  let colour = 'lightgreen'
  if (is_fail_stage) {
    colour = 'pink'
  }

  function click_stage() {
    click_stage_callback(this_stage_id, stage_data)
  }


  let num_of_projects = 0
  if (typeof (patch_data.workflow_lookup) !== 'undefined') {
    if (typeof (patch_data.workflow_lookup[workflow_json.id]) !== 'undefined') {
      if (typeof (patch_data.workflow_lookup[workflow_json.id][this_stage_id]) !== 'undefined') {
        num_of_projects = patch_data.workflow_lookup[workflow_json.id][this_stage_id].length
      }
    }
  }

  group
    .append('rect')
    .attr('width', stage_width)
    .attr('height', stage_height)
    .attr('x', -(stage_width/2))
    .attr('y', 0)
    .attr('style', 'fill: ' + colour + ';stroke-width:3;stroke:rgb(0,0,0)')
    .on('click', click_stage)

  group
    .append('text')
    .attr('x', 0)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .style("font-size", "28px")
    .style("font-weight", "500")
    .text(stage_data.name)
    .on('click', click_stage)

    group
      .append('text')
      .attr('x', 0)
      .attr('y', 110)
      .attr('text-anchor', 'middle')
      .style("font-size", "56px")
      .style("font-weight", "500")
      .text(num_of_projects.toString())
      .on('click', click_stage)

    if (typeof (stage_data.diagram_notes) !== 'undefined') {
      let y = 0
      stage_data.diagram_notes.split('<BR>').forEach(function (line) {
          group
            .append('text')
            .attr('x', -((stage_width/2)+20))
            .attr('y', y)
            .attr('text-anchor', 'end')
            .attr('alignment-baseline', 'text-before-edge')
            .style("font-size", "24px")
            .style("font-weight", "500")
            .text(line)
          y = y + 30
      })
    }


}

export default defineComponent({
  name: 'WorkflowChart',
  props: ['patch_data'],
  emits: ['onclickstage'],
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
      return Workflow_main.workflows[Workflow_main.default_workflow_id]
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
          .attr('style', 'font-size: 60px; font-weight: 800;')
          .text(d => TTT.workflow.name)

        viewObj.allzoomedelements
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .attr('x', 0)
          .attr('y', -0)
          .attr('style', 'font-size: 50px; font-weight: 300;')
          .text(d => 'Projects for patch ' + TTT.patch_data.name)

          viewObj.allzoomedelements
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .attr('x', 0)
            .attr('y', 60)
            .attr('style', 'font-size: 40px; font-weight: 300;')
            .text(d => '(Note: Diagram only - workflows not yet implemented)')

        return viewObj.svg.node()
      }
      var xdiv = document.getElementById('chartInsetionPoint_workflowchart')
      while (xdiv.firstChild) {
        console.log('Removing old SVG')
        xdiv.removeChild(xdiv.firstChild)
      }
      // console.log('nodeData:', this.nodeData)
      xdiv.appendChild(chart(this))

      this.svg.append('marker')
        .attr('id', 'triangle')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', '8')
        .attr('refY', '5')
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', '4')
        .attr('markerHeight', '4')
        .attr('orient', 'auto')
        .attr('fill', 'black')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')


      draw_workflow(this.allzoomedelements, this.workflow, this.click_stage_callback, this.patch_data)
    },
    click_stage_callback (stage_id, stage_data) {
      this.$emit("onclickstage", this.workflow.id, stage_id, stage_data);
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
