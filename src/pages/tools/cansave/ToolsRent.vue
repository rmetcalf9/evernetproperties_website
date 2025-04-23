<template>
  <q-page class="toolsrentclass">
    <div class="toolsrent-headingdiv">
      <h1>Rental Projects Menu</h1>
      <q-btn round icon="arrow_back" @click="$router.push('/tools')" />
    </div>
    <div>This is the rental projects menu. This contains the functionality around the rental property strategies - Rent to HMO, Rent to Serviced Accommodation, etc. These functions allow you to enter leads, make calls to landlords and manage the viewing calendar.</div>
    <div class="row">
      <q-card
        inline class="q-ma-sm card-style toolsrent-tool-card" @click="$router.push('/tools/rentproject/enterlead')">
        <q-card-section>
          <div class="text-h6">Enter Rental Lead</div>
          <div class="row">
            <div>
              <img
                alt="Item Picture"
                src="~assets/enter_rental_lead.png"
                class="toolsrent-tool-picture"
              >
            </div>
            <div class="col q-ma-sm">
              <div style="height: 150px;">Enter a lead for the rent to SA or rent to HMO strategy. A lead is a landlord you want to approach to find out if they are interested in renting their property. Leads can be obtained by looking at rental adverts on gumtree, spareroom, facebook, or any other platform that enables you to get in contact with landlords with rooms to rent.</div>
              <div align="right">
                <q-btn round  color="primary" icon="info" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card
        inline class="q-ma-sm card-style toolsrent-tool-card" @click="$router.push('/tools/rentproject/callleads')"
      >
        <q-card-section>
          <div class="text-h6">Call Rental Leads</div>
          <div class="row">
            <div>
              <img
                alt="Item Picture"
                src="~assets/enter_rental_lead.png"
                class="toolsrent-tool-picture"
              >
            </div>
            <div class="col q-ma-sm">
              <div style="height: 150px;">You have leads to call! Make calls to generate new rent-to-rent opportunities</div>
              <div align="right">
                <q-btn round  color="primary" icon="info" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card
        inline class="q-ma-sm card-style toolsrent-tool-card" @click="$router.push('/tools/rentproject/showviewings')">
        <q-card-section>
          <div class="text-h6">Show Rental Viewing List</div>
          <div class="row">
            <div>
              <img
                alt="Item Picture"
                src="~assets/enter_rental_lead.png"
                class="toolsrent-tool-picture"
              >
            </div>
            <div class="col q-ma-sm">
              <div style="height: 150px;">View and manage all your upcoming rental appointments in one place. This section lists your viewings in date order and provides tools and resources to help you complete your due diligence before each viewing.</div>
              <div align="right">
                <q-btn round  color="primary" icon="info" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolsRentPage',
  data () {
    return {
    }
  }
})
</script>

<style>
.toolsrent-tool-card {
  max-width: 500px;
}
.toolsrent-tool-picture {
  width: 200px;
  height: 200px;
  padding: 20px;
  border-style: solid;
}
.toolsrent-headingdiv {
  margin-bottom: 30px;
}

.toolsrent-headingdiv h1 {
  margin-bottom: 0px;
}

</style>
