<template>
  <q-page class="">
    <div class="fit column wrap justify-start items-start content-center">
      <h2>Enter new Rental Lead</h2>
      <p>Enter a new rental lead to follow up later.</p>
      <LeadInformation
        ref="LeadInformation"
        @projectchanged="console.log('TODO CHANGED NOTIF')"
      />
      <div class="enterlead-btnbar">
        <q-btn label="Cancel" @click="click_cancel" />
        <q-btn color="primary" label="Save" @click="click_save(false)" />
        <q-btn color="primary" label="Save and add another" @click="click_save(true)" />
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import LeadInformation from '../../../components/ProjectTypeRentComponents/LeadInformation.vue'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'RentProjectEnterLead',
  components: {
    LeadInformation
  },
  data () {
    return {
    }
  },
  computed: {
    no_save_reason () {
      if (this.$refs.LeadInformation.serializer_card_data.patch_id === 'notset') {
        console.log('Patch error', this.$refs.LeadInformation.serializer_card_data.patch_id)
        return 'You must select a patch'
      }
      if (this.$refs.LeadInformation.serializer_card_data.landlord_name.length < 3) {
        return 'Enter landlord name'
      }
      if (this.$refs.LeadInformation.serializer_card_data.contact_phone.length < 3) {
        return 'Enter a contact phonenumber'
      }
      return ''
    }
  },
  methods: {
    click_cancel () {
      this.$router.push('/tools')
    },
    click_save (add_another) {
      if (this.no_save_reason !== '') {
        Notify.create({
          color: 'negative',
          message: this.no_save_reason,
          timeout: 2000
        })
        return
      }
      console.log('TODO', add_another)
      // this.$router.push('/tools')
    }
  }
})
</script>

<style>
.enterlead-btnbar > button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
