<template>
  <div class="CallAssistCallItemShowCallAim-maindiv">
    <h1>Lead Information</h1>
    <div>
      <table>
      <tr>
        <th>Address:</th><td>{{ current_lead.raw.sub_section_details.leadinformation.address }}, {{ current_lead.raw.sub_section_details.leadinformation.postcode }}</td>
      </tr>
      <tr>
        <th>Landlord:</th>
        <td>
          Name: {{ current_lead.raw.sub_section_details.leadinformation.landlord_name }}
          <br>
          Phone: {{ current_lead.raw.sub_section_details.leadinformation.contact_phone }}
          <br>
          Email: {{ current_lead.raw.sub_section_details.leadinformation.contact_email }}
        </td>
      </tr>
      <tr>
        <th>Advert Notes</th>
        <td>
          <div v-if="(typeof (current_lead.raw.sub_section_details.leadinformation.advert_information) !== 'undefined') && current_lead.raw.sub_section_details.leadinformation.advert_information !== ''">
            <div v-for="line_item in  current_lead.raw.sub_section_details.leadinformation.advert_information.split('\n')" :key='line_item' class="projecttablehead">
              {{ line_item }}
            </div>
          </div>
          <br>
          <div v-for="weblink in current_lead.raw.sub_section_details.leadinformation.advertweblinks" :key="weblink.id">
            <a :href="weblink.label" target="_new">{{ weblink_display_text(weblink) }}</a>
          </div>
        </td>
      </tr>
      <tr>
        <th>Source</th>
        <td>
          {{ current_lead.raw.sub_section_details.leadinformation.lead_source }}
        </td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CallAssistCallItemShowCallAim',
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
  methods: {
    weblink_display_text (weblink) {
      if (typeof (weblink.display_text) === 'undefined') {
        return weblink.label
      }
      if (weblink.display_text.length < 1) {
        return weblink.label
      }
      return weblink.display_text
    }
  }
})
</script>

<style>
.CallAssistCallItemShowCallAim-maindiv table {
  background: lightgrey;
  border-color: black;
  border-style: solid;
  border-width: 1px;
}
.CallAssistCallItemShowCallAim-maindiv th {
  vertical-align: top;
}
</style>
