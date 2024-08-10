# Card functions

Lists what I need a card to link it into my save system

under the name

emits: ['projectchanged'],


data
 emit_project_change_notification: true

computed: {
  serializer_card_data () {
    return {
      patch_id: this.patch.id,
      address: this.address,
      postcode: this.postcode,
      weblinks: this.weblinks,
    }
  }
}
watch: {
  serializer_card_data(val) {
    if (this.emit_project_change_notification) {
      this.$emit('projectchanged', 'TODOADDSOURCE')
    }
  }
},
methods: {
  serializer_load_data (data_to_load) {
    this.emit_project_change_notification = false
    this.xxx = data_to_load.xxx

    const TTT = this
    setTimeout(function () {
      TTT.emit_project_change_notification = true
    }, 50)
  }
}

RefurbCost StampDuty OtherCosts Finance Refinance

In BrrCalc:
Add ref like:
<Vision
  ref="Vision"
  @projectchanged="projectchanged"
/>

Add to save_project:
serialized_data () {
  return {
    dealbasicinfo: this.$refs.DealBasicInfo.serializer_card_data,
    vision: this.$refs.Vision.serializer_card_data,
    gdvcard: this.$refs.GdvCard.serializer_card_data,
    purchaseprice: this.$refs.PurchasePrice.serializer_card_data,
    refurbcost: this.$refs.RefurbCost.serializer_card_data,
    stampduty: this.$refs.StampDuty.serializer_card_data,
    othercosts: this.$refs.OtherCosts.serializer_card_data,
    finance: this.$refs.Finance.serializer_card_data,
    refinance: this.$refs.Refinance.serializer_card_data,
  }
}


Add to load_project_into_cards:
load_project_into_cards (project) {
  this.$refs.ProjectSerializer.serializer_load_data(project)
  this.$refs.DealBasicInfo.serializer_load_data(project.sub_section_details.dealbasicinfo)
  if (typeof (project.sub_section_details.vision) !== 'undefined') {
    this.$refs.Vision.serializer_load_data(project.sub_section_details.vision)
  }
},
