<template>
  <div class="brrcalctoolbar">
    <q-btn color="primary" icon="call" label="Selling agent" @click="open_dialog" />
    <q-dialog v-model="dialog_visible">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Log call with selling agent</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div>
            <q-input
              filled clearable v-model="spoke_to" label="Spoke to"
              :rules="[val => val.length>2 || 'Too short']"
            />
            </div>
          <div>
            <q-input
              filled
              autogrow
              v-model="notes"
              label="Notes"
              :rules="[val => val.length>2 || 'Too short']"
            />
          </div>
          <q-card-actions align="right" class="text-primary">
          <q-btn icon="call" label="Cancel" @click="this.dialog_visible = false" />
            <q-btn color="primary" icon="call" label="Save" @click="click_selling_agent_btn" :disable="isDisabled" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'BrrCalcToolbarCallSellingAgent',
  emits: ['activity_log'],
  data () {
    return {
      dialog_visible: ref(false),
      spoke_to: '',
      notes: ''
    }
  },
  computed: {
    isDisabled () {
      if (this.spoke_to.length < 1) {
        return true
      }
      if (this.notes < 3) {
        return true
      }
      return false
    }
  },
  methods: {
    open_dialog () {
      this.dialog_visible = true
      this.spoke_to = ''
      this.notes = ''
    },
    click_selling_agent_btn () {
      const obj = {
        type: 'call_agent',
        text: 'Called selling agent spoke to (' + this.spoke_to + ') - ' + this.notes,
        head_notes: undefined
      }
      this.$emit('activity_log', obj)
      this.dialog_visible = false
    }
  }
})
</script>

<style>
.brrcalctoolbar {
  padding: 10px;
}
</style>
