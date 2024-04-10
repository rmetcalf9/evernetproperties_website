// Component to select user interfaces
<template>
  <div>
    <svgPanel
      ref='svgPanel'
      v-bind:selectedCell="selectedPanelItem"
      v-on:selectedCell="toolbarClickItem($event)"
    />
  </div>
</template>

<script>
import svgPanel from './SVGPanel.vue'
import gfxFunctions from './GfxFunctions.js'

export default {
  name: 'UserInterfaceSVGBottomToolbarMain',
  components: {
    svgPanel
  },
  props: [],
  data () {
    return {
      selectedPanelItem: 0, // Currently highlighted on toolbar
      cells: [
        { render: gfxFunctions.getSVGRJMIconPointer, inputMode: 'POINTER', title: 'Pointer mode - use to pan around' },
        { render: gfxFunctions.getSVGMaterialAddAPhoto, inputMode: 'ADDPHOTO', title: 'Photo mode - use to add photos to plan' },
        { render: gfxFunctions.getSVGMaterialConstruction, inputMode: 'ADDWORKITEM', title: 'Work item mode - use to add work items to plan' }
      ]
    }
  },
  methods: {
    getCurrentInputMode () {
      return this.cells[this.selectedPanelItem].inputMode
    },
    toolbarClickItem (event) {
      this.selectedPanelItem = event
    },
    render (params) {
      var TTT = this
      var res = this.$refs.svgPanel.render({ rootGroup: params.rootGroup, cellArray: TTT.cells })

      return res
    },
    activateSubscriptions () {
    },
    destroyed () {
    }
  }
}
</script>

<style></style>
