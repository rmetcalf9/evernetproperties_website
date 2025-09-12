/*
This contains atomic project changes and then allows them to save.
Usage:
startChange({backend_connection_store: xx, projectId: '123'}).then(
  function ({active_change_object}) {
    active_change_object.complete()
  },
  function (error) {
    console.log('ERR')
  }
}
}
)
change.save()
*/
import Workflow_main from './components/Workflow/Workflow_main.js'
import utils from './components/utils.js'
import { uuidv4 } from 'node-common-library'

function change_workflow_state(proj, {workflow_id, workflow_stage}) {
  proj.workflow.workflow_used_id = workflow_id
  proj.workflow.current_stage = workflow_stage
}
function log_activity(proj, {type, text, head_notes}) {
  proj.activity_log.push({
    id: uuidv4(),
    type: type,
    timestamp: (new Date()).toISOString(),
    text: text,
    head_notes: head_notes
  })
}
function change_address(proj, {address, postcode}) {
  if (proj.type==='rent') {
    proj.sub_section_details.leadinformation.address = address
    proj.sub_section_details.leadinformation.postcode = postcode
  }
  console.log('change_address proj', proj)
}
function change_viewing_information(proj, {viewing_timestamp, call_timestamp, call_notes}) {
  if ( typeof (proj.sub_section_details.viewinginformation) === 'undefined') {
    proj.sub_section_details.viewinginformation = {
      viewing_timestamp: '',
      call_timestamp: undefined,
      call_notes: ''
    }
  }
  if ( typeof (viewing_timestamp) !== 'undefined') {
    if ( typeof (proj.sub_section_details.viewinginformation.viewing_timestamp) === 'undefined') {
      proj.sub_section_details.viewinginformation.viewing_timestamp = ''
    }
    proj.sub_section_details.viewinginformation.viewing_timestamp = viewing_timestamp
  }
  if ( typeof (call_timestamp) !== 'undefined') {
    if ( typeof (proj.sub_section_details.viewinginformation.call_timestamp) === 'undefined') {
      proj.sub_section_details.viewinginformation.call_timestamp = undefined
    }
    proj.sub_section_details.viewinginformation.call_timestamp = call_timestamp
  }
  if ( typeof (call_notes) !== 'undefined') {
    if ( typeof (proj.sub_section_details.viewinginformation.call_notes) === 'undefined') {
      proj.sub_section_details.viewinginformation.call_notes = ''
    }
    proj.sub_section_details.viewinginformation.call_notes = call_notes
  }
}

function startChange({backend_connection_store, dataCachesStore, projectId}) {
  return new Promise(function(successFn, errorFn) {
    const callback = {
      ok: function (response) {
        let proj = response.data
        const active_change_object = {
          complete: function (successFn2) {
            const savecallback = {
              ok: function (response) {
                if (typeof (successFn2) !== 'undefined') {
                  successFn2(response)
                }
              },
              error: errorFn
            }
            // backend_connection_store.call_api({
            //   apiprefix: 'privateUserAPIPrefix',
            //   url: '/projects',
            //   method: 'POST',
            //   data: proj,
            //   callback: savecallback
            // })
            dataCachesStore.save({
              backend_connection_store: this.backend_connection_store,
              object_type: 'projects',
              object_data: proj,
              callback: savecallback
            })

          },
          change_workflow_state: function ({workflow_id, workflow_stage, notes}) {
            const orig_workflow_used_id = proj.workflow.workflow_used_id
            const orig_current_stage = proj.workflow.current_stage
            change_workflow_state(proj, {workflow_id: workflow_id, workflow_stage: workflow_stage})
            const text = 'From ' + Workflow_main.workflow2(backend_connection_store, dataCachesStore)[orig_workflow_used_id].stages[orig_current_stage].name + ' to ' + Workflow_main.workflow2(backend_connection_store, dataCachesStore)[workflow_id].stages[workflow_stage].name + '<BR>' + notes
            log_activity(proj, {type: 'wf_move', text: text, head_notes: 'Progressed through workflow'})
          },
          change_address: function ({address, postcode}) {
            change_address(proj, {address: address, postcode: postcode})
          },
          change_viewing_information: function ({viewing_timestamp, call_timestamp, call_notes}) {
            change_viewing_information(proj, {viewing_timestamp: viewing_timestamp, call_timestamp: call_timestamp, call_notes: call_notes})
          }
        }
        successFn({active_change_object})
      },
      error: errorFn
    }
    dataCachesStore.get({
      backend_connection_store: backend_connection_store,
      object_type: 'projects',
      object_id: projectId,
      skip_cache: false,
      callback: callback
    })
    // backend_connection_store.call_api({
    //   apiprefix: 'privateUserAPIPrefix',
    //   url: '/projects/' + projectId,
    //   method: 'GET',
    //   data: undefined,
    //   callback: callback
    // })
  })
}

export default {
  startChange: startChange
}
