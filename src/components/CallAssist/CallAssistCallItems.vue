<template>
  <div>
    <ItemShowCallAim
      v-if="item.type === 'ShowCallAim'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
    />
    <ItemShowStages
      v-if="item.type === 'ShowStages'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
    />
    <ItemShowLead
      v-if="item.type === 'ShowLead'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
    />
    <ItemScriptPrompt
      v-if="item.type === 'ScriptPrompt'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
    />
    <ItemCustomVariableDisplay
      v-if="item.type === 'CustomVariableDisplay'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
    />
    <ItemArrangeAppointment
      v-if="item.type === 'ArrangeAppointment'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      @update_item_data="update_item_data"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import ItemShowCallAim from './Items/ItemShowCallAim.vue'
import ItemShowStages from './Items/ItemShowStages.vue'
import ItemShowLead from './Items/ItemShowLead.vue'
import ItemScriptPrompt from './Items/ItemScriptPrompt.vue'
import ItemCustomVariableDisplay from './Items/ItemCustomVariableDisplay.vue'
import ItemArrangeAppointment from './Items/ItemArrangeAppointment.vue'

import {getDefaultItemDataArrangeAppointment} from './Items/ItemArrangeAppointment.vue'

export function getDefaultItemData(itemType) {
  if (itemType === 'ArrangeAppointment') {
    return getDefaultItemDataArrangeAppointment()
  }
  return {}
}

export default defineComponent({
  name: 'CallAssistCallItems',
  props: {
    current_lead: {
      type: Object
    },
    current_stage: {
      type: Object
    },
    calltemplate: {
      type: Object
    },
    item: {
      type: Object
    },
    batchdata: {
      type: Object
    },
    calldata: {
      type: Object
    }
  },
  emits: ['update_item_data'],  
  components: {
    ItemShowCallAim,
    ItemShowStages,
    ItemShowLead,
    ItemScriptPrompt,
    ItemCustomVariableDisplay,
    ItemArrangeAppointment
  },
  data () {
    return {
    }
  },
  methods: {
    update_item_data (props) {
      this.$emit('update_item_data', props)
    }
  }
})
</script>

<style>
</style>
