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
      ref="item"
    />
    <ItemShowStages
      v-if="item.type === 'ShowStages'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      ref="item"
    />
    <ItemShowLead
      v-if="item.type === 'ShowLead'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      ref="item"
    />
    <ItemScriptPrompt
      v-if="item.type === 'ScriptPrompt'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      ref="item"
    />
    <ItemCustomVariableDisplay
      v-if="item.type === 'CustomVariableDisplay'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      ref="item"
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
      ref="item"
    />
    <ItemInlineActionList
      v-if="item.type === 'InlineActionList'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      @update_item_data="update_item_data"
      @click_action_button="click_action_button"
      ref="item"
    />
    <ItemField
      v-if="item.type === 'Field'"
      :current_lead="current_lead"
      :current_stage="current_stage"
      :calltemplate="calltemplate"
      :item="item"
      :batchdata="batchdata"
      :calldata="calldata"
      @update_item_data="update_item_data"
      ref="item"
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
import ItemInlineActionList from './Items/ItemInlineActionList.vue'
import ItemField from './Items/ItemField.vue'

import {getDefaultItemDataArrangeAppointment} from './Items/ItemArrangeAppointment.vue'
import {getDefaultItemDataField} from './Items/ItemField.vue'

export function getDefaultItemData(itemType) {
  if (itemType === 'ArrangeAppointment') {
    return getDefaultItemDataArrangeAppointment()
  }
  if (itemType === 'Field') {
    return getDefaultItemDataField()
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
  emits: ['update_item_data', 'click_action_button'],
  components: {
    ItemShowCallAim,
    ItemShowStages,
    ItemShowLead,
    ItemScriptPrompt,
    ItemCustomVariableDisplay,
    ItemArrangeAppointment,
    ItemInlineActionList,
    ItemField
  },
  data () {
    return {
    }
  },
  methods: {
    update_item_data (props) {
      this.$emit('update_item_data', props)
    },
    click_action_button (props) {
      this.$emit('click_action_button', props)
    },
    validate (action) {
      if (typeof (this.$refs.item.validate) === 'function') {
        return this.$refs.item.validate(action)
      }
      return true
    }
  }
})
</script>

<style>
</style>
