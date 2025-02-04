<template>
  <div>
    <ItemShowCallAim
      v-if="item.type === 'ShowCallAim'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
    />
    <ItemShowStages
      v-if="item.type === 'ShowStages'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
    />
    <ItemShowLead
      v-if="item.type === 'ShowLead'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
    />
    <ItemScriptPrompt
      v-if="item.type === 'ScriptPrompt'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
    />
    <ItemCustomVariableDisplay
      v-if="item.type === 'CustomVariableDisplay'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
    />
    <ItemArrangeAppointment
      v-if="item.type === 'ArrangeAppointment'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
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
    }
  },
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
  }
})
</script>

<style>
</style>
