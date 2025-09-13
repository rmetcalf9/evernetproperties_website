function get_workflow_stage_key (workflow_id, stage_id) {
  return workflow_id + ":" + stage_id
}

function access_workflows_callback(backend_connection_store, dataCachesStore, callback) {
  const callback_int = {
    ok: function (response) {
      callback.ok(response.data.workflows)
    },
    error: callback.error
  }
  dataCachesStore.get({
    backend_connection_store: backend_connection_store,
    object_type: 'static',
    object_id: 'workflows',
    skip_cache: false,
    callback: callback_int
  })
}

// TODO add workflow3 which is ASYNC and migrate everytihng to that

function getWorkflowStage (workflows, workflow_id, stage_id) {
  return workflows[workflow_id].stages[stage_id]
}

function isActiveStage (workflows, workflow_id, stage_id) {
  if (typeof(workflows[workflow_id].stages[stage_id].active) === 'undefined') {
    return false
  }
  return workflows[workflow_id].stages[stage_id].active
}

function get_default_workflow_initial_stage(workflow_id) {
  if (workflow_id==='1') { // Normal
    return '1'
  }
  if (workflow_id==='2') { // Rent
    return '1'
  }
  console.log('unknown hardcoded workflow id', workflow_id)
  return '1'
}

export default {
  default_workflow_id: '1', //Workflow.id, // ID of workflow to give a project that has no workflow
  default_rent_workflow_id: '2', // FirstRentWorkflow.id,
  get_default_workflow_initial_stage: get_default_workflow_initial_stage,
  workflow3: access_workflows_callback, // Returns all possible workflows
  get_workflow_stage_key: get_workflow_stage_key,
  getWorkflowStage: getWorkflowStage,
  isActiveStage: isActiveStage
}
