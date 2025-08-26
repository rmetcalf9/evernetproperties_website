<template>
  <div>
    <div class="autolinkeditor-mainitems">
      <div
        style="position: relative;"
        v-if="tab==='edit'"
      >
        <!-- Editor (model stays untouched) -->
        <q-editor
          :model-value="modelValue"
          @update:model-value="updateValue"
          :content-class="'custom-editor'"
          :readonly="readonly"
          :toolbar="customtoolbar"
        />
        <q-btn
          style="position: absolute; top: 0; right: 0;" icon="visibility" round
          size="sm"
          flat
          @click="tab='view'"
        />

      </div>

      <!-- Display with clickable links -->
      <div
        style="position: relative;"
        v-if="tab==='view'"
        class="q-mt-md q-pa-sm border rounded"
      >
        <div v-html="formattedContent" />
        <q-btn
          style="position: absolute; top: 0; right: 0;" icon="edit" round
          size="sm"
          flat
          @click="tab='edit'"
        />
      </div>
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
  min-height: 100px;
}
</style>
