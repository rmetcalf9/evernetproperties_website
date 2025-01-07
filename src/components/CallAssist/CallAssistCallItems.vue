<template>
  <div>
    <ItemShowCallAim
      v-if="item.type === 'ShowCallAim'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
    />
    <ItemShowStages
      v-if="item.type === 'ShowStages'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
    />
    <ItemShowLead
      v-if="item.type === 'ShowLead'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
    />
    <ItemScriptPrompt
      v-if="item.type === 'ScriptPrompt'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import ItemShowCallAim from './Items/ItemShowCallAim.vue'
import ItemShowStages from './Items/ItemShowStages.vue'
import ItemShowLead from './Items/ItemShowLead.vue'
import ItemScriptPrompt from './Items/ItemScriptPrompt.vue'


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
    }
  },
  components: {
    ItemShowCallAim,
    ItemShowStages,
    ItemShowLead,
    ItemScriptPrompt
  },
  data () {
    return {
    }
  }
})
</script>

<style>
</style>
