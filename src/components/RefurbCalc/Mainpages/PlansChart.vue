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
        <q-fab-action color="grey" @click="onClickAddFloorplan" icon="add" label="Add floorplan" />
        <q-fab-action color="grey" @click="onClickAddOtherAreas" icon="add" label="Add other areas" />
      </q-fab>
    </q-page-sticky>
    <addFloorplanDialog
      ref="addFloorplanDialog"
      @ok="onDialogCompleteAddFloorplan"
      :refurbData="refurbData"
    />
  </div>
</template>

<script>
import * as d3 from 'd3'
import { Notify } from 'quasar'
import addFloorplanDialog from '../AddFloorplanDialog.vue'
import refurbDataModel from '../dataModel.js'
import backgroundItemDrawing from '../Drawing/backgroundItemDrawing.js'
import consts from '../consts.js'


export default {
  name: 'ChartComponent',
  components: {
    addFloorplanDialog,
  },
  props: ['refurbData'],
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
  methods: {
    onClickAddOtherAreas () {
      var selectedOtherAreas = refurbDataModel.getSelectedOtherAreas({data: this.refurbData})
      this.$q.dialog({
        title: 'Options',
        message: 'Select other areas to add to plans:',
        options: {
          type: 'checkbox',
          model: selectedOtherAreas,
          // inline: true
          items: consts.otherareadata
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        refurbDataModel.setSelectedOtherAreas({data: this.refurbData, selection: data})
        backgroundItemDrawing.redrawOtherArea({
          backgroudnitem_group: this.refurbData.background_items,
          allzoomedelements: this.background_item_group,
          thencall: this.updatechartsize
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    onClickAddFloorplan () {
      // https://lh3.googleusercontent.com/pw/ABLVV8715kFOUDZGlx6NcwSx-EGUnYGl_7sLJ5T-QHVLTm0ojxZ04GzAyUnwnCORsc34bM5wOiSNnj1PVVhTlxKE-hb8gUw5hMtFH5-6xUymqPObqtQx6dS-Of8tSnFUNGYrPG_d9TzkJqUce4Gtj7dCeJlFQQ=w987-h755-s-no-gm?authuser=0
      this.$refs.addFloorplanDialog.launchDialog()
    },
    onDialogCompleteAddFloorplan (retData) {
      retData.floorplan_url = 'https://lh3.googleusercontent.com/pw/ABLVV8715kFOUDZGlx6NcwSx-EGUnYGl_7sLJ5T-QHVLTm0ojxZ04GzAyUnwnCORsc34bM5wOiSNnj1PVVhTlxKE-hb8gUw5hMtFH5-6xUymqPObqtQx6dS-Of8tSnFUNGYrPG_d9TzkJqUce4Gtj7dCeJlFQQ=w987-h755-s-no-gm?authuser=0'
      // retData.floorplan_url = 'https://www.samuelleeds.com/wp-content/uploads/Power-Team-2.png'
      // tried 'embed' with 'src' instead of href
      const added_item = refurbDataModel.addBackgroundItem({
        data: this.refurbData,
        item_data: refurbDataModel.getBackgroudnItemJson_Floorplan({
          url: retData.floorplan_url,
          width: consts.backgrounditemwidth,
          height: 0
        })
      })
      backgroundItemDrawing.drawSingleItem({
        item: added_item,
        backgroudnitem_group: this.refurbData.background_items,
        allzoomedelements: this.background_item_group,
        thencall: this.updatechartsize
      })
    },
    clickDIV () {
      // console.log('CLICK')
    },
    updatechartsize () {
      let totalHeight = this.refurbData.background_items.reduce((acc, value) => {
          return (acc = acc + value.item_data.height);
      }, 0);
      // console.log('updatechartzied', totalHeight, this.refurbData.background_items.length)
      // console.log('xx', this.refurbData.background_items[this.refurbData.background_items.length-1].item_data.height)
      // console.log('yy', this.refurbData.background_items[this.refurbData.background_items.length-1])
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
          .text(d => 'Setup Plans')

        TTT.background_item_group = viewObj.allzoomedelements.append('g')

        backgroundItemDrawing.drawAllBackgroundItems({
          backgroudnitem_group: TTT.refurbData.background_items,
          allzoomedelements: TTT.background_item_group,
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
