import Workflow from './FirstWorkflow.js'
import {stage_calc_fn as firstworkflow_stage_calc_fn} from './FirstWorkflow.js'
import FirstRentWorkflow from './FirstRentWorkflow.js'
import {stage_calc_fn as firstrentworkflow_stage_calc_fn} from './FirstRentWorkflow.js'

function get_workflows () {
  let ret_val = {}
  ret_val[Workflow.id] = Workflow
  ret_val[Workflow.id]._stage_calc_fn = firstworkflow_stage_calc_fn
  ret_val[FirstRentWorkflow.id] = FirstRentWorkflow
  ret_val[FirstRentWorkflow.id]._stage_calc_fn = firstrentworkflow_stage_calc_fn
  return ret_val
}

const workflows = get_workflows()

function get_workflow_stage_key (workflow_id, stage_id) {
  return workflow_id + ":" + stage_id
}

function access_workflows_callback(backend_connection_store, dataCachesStore, callback) {
    callback.ok(workflows)
}

// TODO add workflow3 which is ASYNC and migrate everytihng to that

function getWorkflowStage (workflow_id, stage_id) {
  return workflows[workflow_id].stages[stage_id]
}

function isActiveStage (workflow_id, stage_id) {
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
  getWorkflowStage: getWorkflowStage, // TODO REFACTOR depends on local json
  isActiveStage: isActiveStage // TODO REFACTOR depends on local json
}
