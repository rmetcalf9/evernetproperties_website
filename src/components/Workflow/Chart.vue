<template>
  <div id="chartInsetionPoint_workflowchart" @click="clickDIV($event)">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import * as d3 from 'd3'

import { useBackendConnectionStore } from 'stores/backend_connection'
import { useDataCachesStore } from 'stores/data_caches'

import Workflow_main from './Workflow_main.js'

const stage_height = 130
const stage_width = 400
const x_up_link_right_size = 50



function get_incomming_stages_for_stage (workflow_json, stage_key) {
  let ret_val = []
  Object.keys(workflow_json.stages).forEach(function (cur_stage_key) {
    if (cur_stage_key !== stage_key) {
      const cur_stage = workflow_json.stages[cur_stage_key]
      if (typeof (cur_stage.progression) !== 'undefined') {
        if (typeof (cur_stage.progression.failed) !== 'undefined') {
          if (cur_stage.progression.failed === stage_key) {
            ret_val.push(cur_stage_key)
          }
        }
        if (typeof (cur_stage.progression.success) !== 'undefined') {
          cur_stage.progression.success.forEach(function (success_item) {
            if (success_item.next_stage === stage_key) {
              ret_val.push(cur_stage_key)
            }
          })
        }
      }
    }
  })

  return [...new Set(ret_val)] // Remove duplicates
}

function generate_incomming_stage_map (workflow_json) {
  // This map lets us look up which stages link in to this stage
  let ret_val = {}
  Object.keys(workflow_json.stages).forEach(function (k) {
    const s = workflow_json.stages[k]
    ret_val[k] = get_incomming_stages_for_stage(workflow_json, k)
  })
  return ret_val
}

function draw_workflow(parent, workflow_json, click_stage_callback, patch_data) {
  const context = {
    items_drawn: {},
    cols: [-300, 120, 560],
    incomming_stage_map: generate_incomming_stage_map(workflow_json)
  }
  const arrows = parent.append('g')
  const stages = parent.append('g')

  draw_stage_and_all_children(
    stages,
    workflow_json.initial_stage,
    workflow_json.stages[workflow_json.initial_stage],
    context,
    workflow_json,
    200,
    false,
    click_stage_callback,
    patch_data
  )
  draw_arrows_from_green_stages_to_failed_stages(arrows, workflow_json, context)
}

function draw_arrows_from_green_stages_to_failed_stages (parent, workflow_json, context) {
  Object.keys(workflow_json.stages).forEach (function (cur_green_stage_key) {
    const cur_green_stage = workflow_json.stages[cur_green_stage_key]
    if ((typeof (cur_green_stage.active) !== 'undefined') && (cur_green_stage.active)) {
      if (typeof (cur_green_stage.progression) !== 'undefined') {
        if (typeof (cur_green_stage.progression.failed) !== 'undefined') {
          const red_stage = workflow_json.stages[cur_green_stage.progression.failed]
          const from = context.items_drawn[cur_green_stage_key]
          const to = context.items_drawn[cur_green_stage.progression.failed]
          // console.log('draw arrow from', from, 'to', to)
          draw_arrow(
            parent,
            from.pos_x,
            from.pos_y + stage_height,
            to.pos_x - (stage_width/2),
            to.pos_y + (stage_height/2)
          )
        }
      }
    }
  })



}

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

function all_incomming_stages_have_been_drawn (this_stage_id, context) {
  let ret_val = true
  context.incomming_stage_map[this_stage_id].forEach(function (incoming_stage_key) {
    if (typeof (context.items_drawn[incoming_stage_key]) === 'undefined') {
      ret_val = false
    }
  })
  return ret_val
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
      if (all_incomming_stages_have_been_drawn(this_stage_id, context)) {
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
        // Note arrows from Green stage to red fail stage drawn in a seperate pass at end
      }
    }
    if (typeof (stage_data.progression.success) !== 'undefined') {
      stage_data.progression.success.forEach(function (ite) {
        // Not already drawn - link will go down the page
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
        if (cur_y < context.items_drawn[ite.next_stage].pos_y) {
          draw_arrow(
            parent,
            x_pos,
            cur_y + stage_height,
            context.items_drawn[ite.next_stage].pos_x,
            context.items_drawn[ite.next_stage].pos_y
          )
        } else {
          // Link goes back up the page
          draw_back_line(
            parent,
            x_pos + (stage_width / 2),
            cur_y + (stage_height / 2),
            context.items_drawn[ite.next_stage].pos_x + (stage_width / 2),
            context.items_drawn[ite.next_stage].pos_y + (stage_height / 2),
            x_up_link_right_size
          )
        }
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

function draw_back_line(parent, x1, y1, x2, y2, right_size) {
  let x3 = x2
  if (x1 > x2) {
    x3 = x1
  }
  x3 += right_size
  parent.append('line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x3)
    .attr('y2', y1)
    .attr('stroke', 'black')
    .attr('style', 'stroke-width:10;')

  parent.append('line')
    .attr('x1', x3)
    .attr('y1', y1)
    .attr('x2', x3)
    .attr('y2', y2)
    .attr('stroke', 'black')
    .attr('style', 'stroke-width:10;')

  parent.append('line')
    .attr('x1', x3)
    .attr('y1', y2)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke', 'black')
    .attr('style', 'stroke-width:10;')
    .attr('marker-end', 'url(#triangle)')

    // draw_arrow(
    //  parent,
    //  x_pos + (stage_width / 2),
    //  cur_y + (stage_height / 2),
    //  x_pos + (stage_width / 2) + x_up_link_right_size,
    //  cur_y + (stage_height / 2)
    //)
    // draw_arrow(
    //  parent,
    //  x_pos + (stage_width / 2) + x_up_link_right_size,
    //  cur_y + (stage_height / 2),
    //  x_pos + (stage_width / 2) + x_up_link_right_size,
    //  context.items_drawn[ite.next_stage].pos_y + (stage_height / 2)
    // )
    // draw_arrow(
    //  parent,
    //  x_pos + (stage_width / 2) + x_up_link_right_size,
    //  context.items_drawn[ite.next_stage].pos_y + (stage_height / 2),
    //  context.items_drawn[ite.next_stage].pos_x + (stage_width / 2),
    //  context.items_drawn[ite.next_stage].pos_y + (stage_height / 2)
    // )
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
  props: ['patch_data', 'workflow_id'],
  emits: ['onclickstage'],
  setup () {
    const backend_connection_store = useBackendConnectionStore()
    const dataCachesStore = useDataCachesStore()
    return {
      backend_connection_store,
      dataCachesStore
    }
  },
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
        ymax: 2500
      }
    }
  },
  computed: {
    workflow () {
      return Workflow_main.workflow2(this.backend_connection_store, this.dataCachesStore)[this.workflow_id]
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

          // viewObj.allzoomedelements
          //   .append('text')
          //   .attr('text-anchor', 'middle')
          //   .attr('alignment-baseline', 'central')
          //   .attr('x', 0)
          //   .attr('y', 60)
          //   .attr('style', 'font-size: 40px; font-weight: 300;')
          //   .text(d => '(Note: Diagram only - workflows not yet implemented)')

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
