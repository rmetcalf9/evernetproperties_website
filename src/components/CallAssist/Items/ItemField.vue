<template>
  <div>
    <q-input filled clearable v-model="value" :label="get_mustach_text(item.label)"></q-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mustach_utils from '../mustach_utils.js'

export function getDefaultItemDataField() {
  return {
    mounted: false,
    value: ''
  }
}


export default defineComponent({
  name: 'CallAssistCallItemShowCallAim',
  emits: ['update_item_data'],
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
  data () {
    return {
    }
  },
  computed: {
    value: {
      get() {
        return this.calldata.item_data_vals[this.item.unique_id].value
      },
      set(value) {
        // let item_data = JSON.parse(JSON.stringify(this.calldata.item_data_vals[this.item.unique_id]))
        let item_data = this.calldata.item_data_vals[this.item.unique_id]
        item_data.value = value
        this.$emit('update_item_data',{
          item_id: this.item.unique_id,
          item_data: item_data
        })
      },
    },
  },
  methods: {
    get_mustach_text (prompt_text) {
      return mustach_utils.evalmustachstragainstcontext(prompt_text, {
        current_lead: this.current_lead,
        current_stage: this.current_stage,
        calltemplate: this.calltemplate,
        item: this.item,
        batchdata: this.batchdata,
        calldata: this.calldata
      })
    },
  },
  mounted () {
    if (!this.calldata.item_data_vals[this.item.unique_id].mounted) {
      const item_data = {
        mounted: true,
        value: this.get_mustach_text(this.item.default)
      }
      this.$emit('update_item_data',{
        item_id: this.item.unique_id,
        item_data: item_data
      })
    }
  }
})
</script>

<style>
</style>
