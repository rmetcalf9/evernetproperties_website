# Card functions

Lists what I need a card to link it into my save system

under the name

emits: ['projectchanged'],


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
    this.$emit('projectchanged')
  }
},
methods: {
  serializer_load_data (data_to_load) {
    this.address = data_to_load.address
    this.postcode = data_to_load.postcode
    this.weblinks = data_to_load.weblinks
  }
}
