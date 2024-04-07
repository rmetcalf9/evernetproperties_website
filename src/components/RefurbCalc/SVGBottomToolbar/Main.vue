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
      curSelectedNodeType: undefined,
      bothCtrlAndShift: false,
      cells: [
        { render: gfxFunctions.getSVGRJMIconPointer, inputMode: 'POINTER', title: 'Pointer mode - use to move and add nodes' },
        { render: gfxFunctions.getSVGMaterialIconAdd, inputMode: 'ADD', title: 'Add mode - use to add nodes to graph' },
        { render: gfxFunctions.getSVGMaterialIconLink, inputMode: 'LINK', title: 'Link mode - use to create relationships between nodes' },
        { render: gfxFunctions.getSVGRJMIconEraser, inputMode: 'ERASER', title: 'Eraser mode - use to hide nodes' },
        { render: gfxFunctions.getSVGMaterialIconDelete, inputMode: 'DELETE', title: 'Delete mode - use to permenantly delete nodes' },
        { render: gfxFunctions.getSVGMaterialIconLooks, inputMode: 'FOCUSEDLINKTYPES', title: 'Relationship Types - click to create and edit relationship types' }
      ]
    }
  },
  methods: {
    isThereANodeTypeSelectedInToolbar () {
      return (typeof (this.curSelectedNodeType) !== 'undefined')
    },
    UIInputNodeContextMenu ({ nodeObj, event }) {
      this.emitIntrepetedInputEvent('UIIntrepretedInputShowNodeInfo', { nodeObj: nodeObj, event: event })
    },
    UIActionNotificationNodeTypeDeleted ({ nodeTypeObj }) {
      var TTT = this
      if (typeof (TTT.curSelectedNodeType) !== 'undefined') {
        if (TTT.curSelectedNodeType.id === nodeTypeObj.id) {
          TTT.clearSelectedNodeType()
        }
      }
    },
    setInputMode ({ type }) {
      var TTT = this
      TTT.selectedPanelItem = TTT.getInputModeFromType({ type: 'POINTER' })
      TTT.clickSelectedItem = TTT.getInputModeFromType({ type: 'POINTER' })
    },
    clearSelectedNodeType () {
      var TTT = this
      if (TTT.clickSelectedItem === this.getInputModeFromType({ type: 'ADD' })) {
        TTT.setInputMode({ type: 'POINTER' })
      }
      TTT.curSelectedNodeType = undefined
      TTT.$refs.svgPanel.rerenderIcon({ index: TTT.getInputModeFromType({ type: 'ADD' }), newRenderFunction: gfxFunctions.getSVGMaterialIconAdd })
      TTT.emitIntrepetedInputEvent('UIIntrepretedUpdateBackground')
    },
    UIActionNotificationNodeTypeCreated ({ nodeTypeObj }) {
      this.setSelectedNodeType({ nodeTypeObj: nodeTypeObj })
      this.selectedPanelItem = this.getInputModeFromType({ type: 'ADD' })
    },
    UIInputZoomedBackgroundClick ({ event }) {
      var TTT = this
      console.log('TODO UIInputZoomedBackgroundClick')
    },
    selectNodeType () {
      var TTT = this
      console.log('TODO selectNodeType')
    },
    UIInputLinkClick ({ linkObj, event }) {
      if (this.getCurrentInputMode() === 'ERASER') {
        this.emitIntrepetedInputEvent('UIIntrepretedInputHidelink', { linkObj: linkObj })
      }
      if (this.getCurrentInputMode() === 'DELETE') {
        this.emitIntrepetedInputEvent('UIIntrepretedDeletelink', { linkObj: linkObj })
      }
    },
    UIInputNewViewLoaded () {
      this.selectedPanelItem = 0
      this.clickSelectedItem = 0
    },
    UIInputNodeDoubleClick ({ nodeObj, event }) {
      this.emitIntrepetedInputEvent('UIIntrepretedInputAddOneLevelNeighbours', { nodeObj: nodeObj })
    },
    UIInputNodeClick ({ nodeObj, event }) {
      if (this.getCurrentInputMode() === 'ERASER') {
        if (this.bothCtrlAndShift) {
          this.emitIntrepetedInputEvent('UIIntrepretedInputHideallothernodes', { node: nodeObj })
        } else {
          this.emitIntrepetedInputEvent('UIIntrepretedInputHidenode', { node: nodeObj })
        }
      }
      if (this.getCurrentInputMode() === 'DELETE') {
        this.emitIntrepetedInputEvent('UIIntrepretedInputDeletenode', { node: nodeObj })
      }
    },
    UIInputNodeDragStart ({ nodeObj, nodeSVGGroup, event }) {
      if (this.getCurrentInputMode() === 'POINTER') {
        this.emitIntrepetedInputEvent('UIIntrepretedInputDragStart', { nodeObj: nodeObj, nodeSVGGroup: nodeSVGGroup, dragType: 1 })
      }
      if (this.getCurrentInputMode() === 'LINK') {
        this.emitIntrepetedInputEvent('UIIntrepretedInputDragStart', { nodeObj: nodeObj, nodeSVGGroup: nodeSVGGroup, dragType: 2 })
      }
    },
    keyPressModeDetect ({ event }) {
      if (event.ctrlKey) {
        if (event.shiftKey) {
          this.bothCtrlAndShift = true
        } else {
          this.bothCtrlAndShift = false
        }
        this.selectedPanelItem = this.getInputModeFromType({ type: 'ERASER' })
      } else {
        if (event.shiftKey) {
          this.selectedPanelItem = this.getInputModeFromType({ type: 'LINK' })
        } else {
          this.selectedPanelItem = this.clickSelectedItem
          // no ctrl or shift
        }
      }
    },
    UIInputKeydownDocument ({ event }) {
      // For both crl and shift we want to be in eraser mode
      this.keyPressModeDetect({ event: event })
    },
    UIInputKeyupDocument ({ event }) {
      this.keyPressModeDetect({ event: event })
    },
    getCurrentInputMode () {
      return this.cells[this.selectedPanelItem].inputMode
    },
    getInputModeFromType ({ type }) {
      var res = -1
      this.cells.map(function (currentValue, index, arr) {
        if (currentValue.inputMode === type) {
          res = index
        }
      })
      return res
    },
    emitIntrepetedInputEvent (name, data) {
      this.$root.$emit(name, data)
    },
    toolbarClickItem (event) {
      console.log('toolbarClickItem TODO')
    },
    render (params) {
      var TTT = this
      var res = this.$refs.svgPanel.render({ rootGroup: params.rootGroup, cellArray: TTT.cells })

      return res
    },
    activateSubscriptions () {
      this.$root.$on('UIInputNodeDragStart', this.UIInputNodeDragStart)
      this.$root.$on('UIInputKeydownDocument', this.UIInputKeydownDocument)
      this.$root.$on('UIInputKeyupDocument', this.UIInputKeyupDocument)
      this.$root.$on('UIInputNodeClick', this.UIInputNodeClick)
      this.$root.$on('UIInputNodeDoubleClick', this.UIInputNodeDoubleClick)
      this.$root.$on('UIInputNewViewLoaded', this.UIInputNewViewLoaded)
      this.$root.$on('UIInputLinkClick', this.UIInputLinkClick)
      this.$root.$on('UIInputZoomedBackgroundClick', this.UIInputZoomedBackgroundClick)
      this.$root.$on('UIActionNotificationNodeTypeCreated', this.UIActionNotificationNodeTypeCreated)
      this.$root.$on('UIActionNotificationNodeTypeDeleted', this.UIActionNotificationNodeTypeDeleted)
      this.$root.$on('UIActionNotificationNodeTypeUpdated', this.UIActionNotificationNodeTypeUpdated)
      this.$root.$on('UIInputNodeContextMenu', this.UIInputNodeContextMenu)
    },
    destroyed () {
      this.$root.$off('UIInputNodeDragStart', this.UIInputNodeDragStart)
      this.$root.$off('UIInputKeydownDocument', this.UIInputKeydownDocument)
      this.$root.$off('UIInputKeyupDocument', this.UIInputKeyupDocument)
      this.$root.$off('UIInputNodeClick', this.UIInputNodeClick)
      this.$root.$off('UIInputNodeDoubleClick', this.UIInputNodeDoubleClick)
      this.$root.$off('UIInputNewViewLoaded', this.UIInputNewViewLoaded)
      this.$root.$off('UIInputLinkClick', this.UIInputLinkClick)
      this.$root.$off('UIInputZoomedBackgroundClick', this.UIInputZoomedBackgroundClick)
      this.$root.$off('UIActionNotificationNodeTypeCreated', this.UIActionNotificationNodeTypeCreated)
      this.$root.$off('UIActionNotificationNodeTypeDeleted', this.UIActionNotificationNodeTypeDeleted)
      this.$root.$off('UIActionNotificationNodeTypeUpdated', this.UIActionNotificationNodeTypeUpdated)
      this.$root.$off('UIInputNodeContextMenu', this.UIInputNodeContextMenu)
    }
  }
}
</script>

<style></style>
