<template>
  <div>
    <q-tabs v-model="tab" compact>
      <q-tab name="edit" label="Edit" />
      <q-tab name="view" label="View" />
    </q-tabs>

    <div class="autolinkeditor-mainitems">
      <!-- Editor (model stays untouched) -->
      <q-editor
        v-if="tab==='edit'"
        :model-value="modelValue"
        @update:model-value="updateValue"
        :content-class="'custom-editor'"
        :readonly="readonly"
        :toolbar="customtoolbar"
      />

      <!-- Display with clickable links -->
      <div
        v-if="tab==='view'"
        v-html="formattedContent"
        class="q-mt-md q-pa-sm border rounded"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g

export default defineComponent({
  name: 'AutoLinkEditor',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup() {
    const readonly = ref(false)

    // Regex to detect URLs

    return {
      readonly
    }
  },
  data () {
    return {
      customtoolbar: [['bold', 'italic', 'underline']],
      tab: 'view'
    }
  },
  computed: {
    formattedContent () {
      // Regex to match URLs (http, https, www)
      const urlRegex = /\b((https?:\/\/|www\.)[^\s<]+)/gi;

      return this.modelValue.replace(urlRegex, function(url) {
        let href = url;
        // Add http:// if it starts with "www."
        if (!href.match(/^https?:\/\//i)) {
          href = 'http://' + href;
        }
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
    }
  },
  methods: {
    setEdit (isEdit) {
      if (isEdit) {
        this.tab = 'edit'
        return
      }
      this.tab = 'view'
    },
    updateValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
})
</script>

<style scoped>
.border {
  border: 1px solid #ccc;
}
.rounded {
  border-radius: 8px;
}
.autolinkeditor-mainitems {
  min-width: 150px;
  min-height: 190px;
}
</style>
