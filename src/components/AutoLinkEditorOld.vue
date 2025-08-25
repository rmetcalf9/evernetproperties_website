<template>
  <q-editor
    ref="editor"
    :model-value="modelValue"
    @update:model-value="updateValue"
    :definitions="definitions"
    :toolbar="toolbar"
    @paste="handlePaste"
    @keyup="handleKeyUp"
    @ready="onEditorReady"
    :placeholder="placeholder"
    :min-height="minHeight"
    :readonly="readonly"
    :dense="dense"
    :square="square"
    :flat="flat"
    :bordered="bordered"
    v-bind="$attrs"
  />
</template>

<script>
import { ref, nextTick, computed, watch } from 'vue'

export default {
  name: 'AutoLinkEditor',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Type or paste links here - they\'ll automatically become clickable!'
    },
    minHeight: {
      type: String,
      default: '200px'
    },
    toolbar: {
      type: Array,
      default: () => [
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'underline', 'strike'],
        ['undo', 'redo']
      ]
    },
    autoLinkOnPaste: {
      type: Boolean,
      default: true
    },
    autoLinkOnType: {
      type: Boolean,
      default: true
    },
    linkTarget: {
      type: String,
      default: '_blank'
    },
    linkRel: {
      type: String,
      default: 'noopener noreferrer'
    },
    urlPattern: {
      type: RegExp,
      default: () => /(https?:\/\/[^\s<>"]+)/gi
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const editor = ref(null)
    const isEditorReady = ref(false)

    const definitions = computed(() => ({}))

    const onEditorReady = () => {
      console.log('Editor is ready!')
      isEditorReady.value = true
    }

    const linkifyText = (text) => {
      return text.replace(props.urlPattern, `<a href="$1" target="${props.linkTarget}" rel="${props.linkRel}">$1</a>`)
    }

    const processContent = async () => {
      console.log('processContent start')
      if (!editor.value || props.readonly || !isEditorReady.value) return
      console.log('A')

      // Wait for Quill instance to be ready
      await nextTick()

      // Get current cursor position
      const quill = editor.value.quill
      if (!quill) {
        console.log('Quill not ready, retrying...')
        // Retry after a short delay if Quill isn't ready yet
        setTimeout(processContent, 50)
        return
      }
      console.log('B - Quill ready')

      const selection = quill.getSelection()

      // Get plain text content
      const plainText = quill.getText()

      // Check if there are any unlinked URLs
      const urls = plainText.match(props.urlPattern)
      if (!urls) return

      // Get current HTML content
      const currentHtml = quill.root.innerHTML

      // Check if URLs are already linked
      const needsLinking = urls.some(url => {
        const isAlreadyLinked = currentHtml.includes(`href="${url}"`)
        return !isAlreadyLinked
      })

      if (needsLinking) {
        // Apply linkification to the current content
        const linkedContent = linkifyText(currentHtml)

        // Update content if it changed
        if (linkedContent !== currentHtml) {
          quill.root.innerHTML = linkedContent

          // Emit the updated content
          emit('update:modelValue', linkedContent)

          // Restore cursor position if possible
          if (selection) {
            await nextTick()
            try {
              quill.setSelection(selection.index, selection.length)
            } catch (e) {
              // If we can't restore exact position, put cursor at end
              quill.setSelection(quill.getLength())
            }
          }
        }
      }
    }

    const handlePaste = async (evt) => {
      if (!props.autoLinkOnPaste) return
      console.log('Paste detected, processing...')
      // Let the paste happen first, then process
      await nextTick()
      setTimeout(processContent, 150) // Increased delay
    }

    const handleKeyUp = async (evt) => {
      if (!props.autoLinkOnType) return
      console.log('Key up:', evt.key)
      // Check for space, enter, or tab which might indicate end of URL typing
      if ([' ', 'Enter', 'Tab'].includes(evt.key)) {
        await nextTick()
        setTimeout(processContent, 150) // Increased delay
      }
    }

    const updateValue = (value) => {
      emit('update:modelValue', value)
    }

    // Watch for external changes to modelValue and update editor if needed
    watch(() => props.modelValue, (newValue) => {
      if (editor.value && editor.value.quill) {
        const currentContent = editor.value.quill.root.innerHTML
        if (currentContent !== newValue) {
          editor.value.quill.root.innerHTML = newValue || ''
        }
      }
    })

    return {
      editor,
      definitions,
      handlePaste,
      handleKeyUp,
      updateValue,
      onEditorReady
    }
  }
}
</script>

<style scoped>
/* Style for auto-generated links */
:deep(.q-editor__content a) {
  color: #1976d2;
  text-decoration: underline;
}

:deep(.q-editor__content a:hover) {
  color: #1565c0;
}
</style>
