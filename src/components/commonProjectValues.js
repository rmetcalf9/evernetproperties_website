import utils from './utils.js'


function address (project) {
  if (project.type === 'purchase') {
    return project.sub_section_details.dealbasicinfo.address
  }
  return project.sub_section_details.leadinformation.address
}

function dealsource (project) {
  if (project.type === 'purchase') {
    return utils.get_source_text(project.sub_section_details.dealbasicinfo.deal_source)
  }
  return project.sub_section_details.leadinformation.lead_source
}

function sellingAgent (project) {
  if (project.type === 'purchase') {
    return utils.get_agent_text(project.sub_section_details.dealbasicinfo.selling_agent)
  }
  return '' // DOn't know what to use here
}

function devplan (project) {
  if (project.type === 'purchase') {
    return project.sub_section_details.vision.devplan
  }
  return ''
}

function notes (project) {
  if (project.type === 'purchase') {
    return project.sub_section_details.dealbasicinfo.notes
  }
  return ''
}

export default {
  address: address,
  dealsource: dealsource,
  sellingAgent: sellingAgent,
  devplan: devplan,
  notes: notes
}
