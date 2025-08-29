import utils from './utils.js'


function address (project) {
  // for display - can include postcode
  if (project.type === 'purchase') {
    if ( typeof (project.sub_section_details.dealbasicinfo.postcode) !== 'undefined') {
      return project.sub_section_details.dealbasicinfo.address + ', ' + project.sub_section_details.dealbasicinfo.postcode
    }
    return project.sub_section_details.dealbasicinfo.address
  }
  if ( typeof (project.sub_section_details.leadinformation.postcode) !== 'undefined') {
    return project.sub_section_details.leadinformation.address + ', ' + project.sub_section_details.leadinformation.postcode
  }
  return project.sub_section_details.leadinformation.address
}

function dealsource (project) {
  if (project.type === 'purchase') {
    return utils.get_source_text(project.sub_section_details.dealbasicinfo.deal_source)
  }
  return project.sub_section_details.leadinformation.lead_source
}

function sellingAgent (project, dataCachesStore) {
  if (project.type === 'purchase') {
    if (typeof (project.sub_section_details.dealbasicinfo.selling_agent_id) === 'undefined') {
      return utils.get_agent_text(project.sub_section_details.dealbasicinfo.selling_agent)
    }
    if (project.sub_section_details.dealbasicinfo.selling_agent_id === '') {
      return utils.get_agent_text(project.sub_section_details.dealbasicinfo.selling_agent)
    }
    const agents = dataCachesStore.get_direct_from_cache({
      object_type: 'patchagents',
      object_id: project.patch_id
    })
    if (typeof (agents) === 'undefined') {
      return ''
    }
    if (typeof (agents.agents) === 'undefined') {
      return ''
    }
    if (typeof (agents.agents[project.sub_section_details.dealbasicinfo.selling_agent_id]) === 'undefined') {
      return ''
    }
    return agents.agents[project.sub_section_details.dealbasicinfo.selling_agent_id].agent_name + ' (📋)'
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
