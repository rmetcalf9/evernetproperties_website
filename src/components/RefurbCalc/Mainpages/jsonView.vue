<template>
  <div>
    <h1>Json Data</h1>
    <div>Use this page to save and restore data for this tool. To save the data copy to clipboard then store the text. To restore the data paste the copied text into the box below</div>
    <q-btn label="Copy to clipboard"  color="primary" icon="content_copy" @click="copytoclipboard" />
    <q-btn label="Reset Data" icon="delete" @click="resetdata" />
    <q-input
      filled
      type="textarea"
      v-model="value"
    />
    modelValue: {{modelValue}}
    value: {{ value }}
  </div>
</template>
<script>
import refurbDataModel from '../dataModel.js'
import copytoclipboard from '../copyToClipboard.js'
import { Notify } from 'quasar'

export default {
  name: 'JsonComponent',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return JSON.stringify(this.modelValue);
      },
      set(value) {
        this.$emit("update:modelValue", JSON.parse(value));
      },
    }
  },
  methods: {
    copytoclipboard () {
      const callback = {
        "ok": function () {
          Notify.create({
            color: 'bg-grey-2',
            message: 'Copied sucessfully',
            timeout: 2
          })
        },
        "error": function (errmsg) {
          Notify.create({
            color: 'bg-grey-2',
            message: errmsg,
            timeout: 2
          })
        }
      }
      copytoclipboard.copyTextToClipboard(this.value, callback)
    },
    resetdata () {
      var newJson = refurbDataModel.getNewlyCreatedDataSet()
      this.value = JSON.stringify(newJson)
      this.$emit("update:modelValue", newJson)
    }
  }
}
</script>

<style>
</style>
