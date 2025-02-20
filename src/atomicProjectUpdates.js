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


function change_workflow_state(proj, {workflow_id, workflow_stage}) {
  proj.workflow.workflow_used_id = workflow_id
  proj.workflow.current_stage = workflow_stage
}
function log_activity(proj, {type, text, head_notes}) {
  proj.activity_log.push({
    id: utils.uuidv4(),
    type: type,
    timestamp: (new Date()).toISOString(),
    text: text,
    head_notes: head_notes
  })
}

function startChange({backend_connection_store, projectId}) {
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
            backend_connection_store.call_api({
              apiprefix: 'privateUserAPIPrefix',
              url: '/projects',
              method: 'POST',
              data: proj,
              callback: savecallback
            })
          },
          change_workflow_state: function ({
              workflow_id: workflow_id,
              workflow_stage: workflow_stage,
              notes: notes
          }) {
            const orig_workflow_used_id = proj.workflow.workflow_used_id
            const orig_current_stage = proj.workflow.current_stage
            change_workflow_state(proj, {workflow_id: workflow_id, workflow_stage: workflow_stage})
            const text = 'From ' + Workflow_main.workflows[orig_workflow_used_id].stages[orig_current_stage].name + ' to ' + Workflow_main.workflows[workflow_id].stages[workflow_stage].name + '<BR>' + notes
            log_activity(proj, {type: 'wf_move', text: text, head_notes: 'Progressed through workflow'})
          }
        }
        successFn({active_change_object})
      },
      error: errorFn
    }
    backend_connection_store.call_api({
      apiprefix: 'privateUserAPIPrefix',
      url: '/projects/' + projectId,
      method: 'GET',
      data: undefined,
      callback: callback
    })
  })
}

export default {
  startChange: startChange
}
