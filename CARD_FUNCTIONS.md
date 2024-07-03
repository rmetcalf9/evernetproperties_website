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
      this.$emit('projectchanged')
    }
  }
},
methods: {
  serializer_load_data (data_to_load) {
    this.emit_project_change_notification = false
    this.address = data_to_load.address
    this.postcode = data_to_load.postcode
    this.weblinks = data_to_load.weblinks

    const TTT = this
    setTimeout(function () {
      TTT.emit_project_change_notification = true
    }, 50)
  }
}


In BrrCalc:
Add ref like:
<Vision
  ref="Vision"
  @projectchanged="projectchanged"
/>

Add to save_project:
const dict_of_card_info = {
  dealbasicinfo: this.$refs.DealBasicInfo.serializer_card_data,
  vision: this.$refs.Vision.serializer_card_data
}

Add to load_project_into_cards:
load_project_into_cards (project) {
  this.$refs.ProjectSerializer.serializer_load_data(project)
  this.$refs.DealBasicInfo.serializer_load_data(project.sub_section_details.dealbasicinfo)
  if (typeof (project.sub_section_details.vision) !== 'undefined') {
    this.$refs.Vision.serializer_load_data(project.sub_section_details.vision)
  }
},
