<template>
  <q-dialog v-model="dialog_visible">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Block out time</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div>
          Add time that are not availaible for viewings.
        </div>
        <!--<div>
          <q-select
            v-model="selected_day"
            :options="day_list"
            label="Day"
            emit-value
            map-options
          />
        </div>-->
        <div>
          Start Time: <q-input filled v-model="selected_start_time" mask="time" :rules="['time']" @update:model-value="update_start_time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="selected_start_time" @update:model-value="update_start_time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          End Time: <q-input filled v-model="selected_end_time" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="selected_end_time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancel" @click="this.dialog_visible = false" />
          <q-btn color="primary" label="Add" @click="addbtnclick" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import utils from '../components/utils.js'
import timeUtils from '../components/timeUtils.js'

export default defineComponent({
  name: 'BatchCallLeadsAddBlockDialog',
  data () {
    return {
      dialog_visible: false,
      viewing_days: [],
      selected_day: undefined,
      selected_start_time: '09:00',
      selected_end_time: '10:00'
    }
  },
  computed: {
    day_list () {
      return this.viewing_days.filter(function (x) {
        return x.selected
      }).map(function (x) {
        return {
          label: x.text,
          value: x.id
        }
      })
    }
  },
  methods: {
    show_dialog (viewing_days, selected_day_id) {
      this.viewing_days = viewing_days
      this.selected_start_time = '09:00'
      this.selected_end_time = '10:00'
      this.selected_day = selected_day_id

      this.dialog_visible = true
    },
    update_start_time () {
      if (!timeUtils.isValidTimeStr(this.selected_start_time)) {
        return
      }
      if (!timeUtils.isValidTimeStr(this.selected_end_time)) {
        return
      }
      const start_time_obj = timeUtils.get_time_obj(this.selected_start_time)
      const end_time_obj = timeUtils.get_time_obj(this.selected_end_time)
      if (end_time_obj.isBefore(start_time_obj)) {
        let new_end_time_obj = timeUtils.copy_time_obj(start_time_obj)
        new_end_time_obj.addHours(1)
        this.selected_end_time = new_end_time_obj.toString()
      }
    },
    notifyvalidationerror (message) {
      Notify.create({
        color: 'bg-grey-2',
        message: message,
        timeout: 2000,
        color: 'negative'
      })
    },
    addbtnclick () {
      if (!timeUtils.isValidTimeStr(this.selected_start_time)) {
        this.notifyvalidationerror('Invalid Start Time')
        return
      }
      if (!timeUtils.isValidTimeStr(this.selected_end_time)) {
        this.notifyvalidationerror('Invalid End Time')
        return
      }
      const start_time_obj = timeUtils.get_time_obj(this.selected_start_time)
      const end_time_obj = timeUtils.get_time_obj(this.selected_end_time)
      if (end_time_obj.isBefore(start_time_obj)) {
        this.notifyvalidationerror('End time must be after start time')
        return
      }
      const TTT = this
      const day_to_change = this.viewing_days.filter(function (x) {
        return x.id === TTT.selected_day
      })[0]
      day_to_change.reserved_slots.push({
        id: utils.uuidv4(),
        start: this.selected_start_time,
        end: this.selected_end_time,
      })
      this.dialog_visible = false
    }
  }
})
</script>

<style>
</style>
