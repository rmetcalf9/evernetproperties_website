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
      clickSelectedItem: 0, // Item that is selected with a click
      cells: [
        { render: gfxFunctions.getSVGRJMIconPointer, inputMode: 'POINTER', title: 'Pointer mode - use to add photos to plan' },
        { render: gfxFunctions.getSVGMaterialAddAPhoto, inputMode: 'ADD', title: 'Add mode - use to add work items to plan' },
        { render: gfxFunctions.getSVGMaterialConstruction, inputMode: 'LINK', title: 'Link mode - use to create relationships between nodes' },
        { render: gfxFunctions.getSVGMaterialIconDelete, inputMode: 'DELETE', title: 'Delete mode - use to permanently delete items' }
      ]
    }
  },
  methods: {
    getCurrentInputMode () {
      return this.cells[this.selectedPanelItem].inputMode
    },
    toolbarClickItem (event) {
      console.log('toolbarClickItem TODO', event)
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
