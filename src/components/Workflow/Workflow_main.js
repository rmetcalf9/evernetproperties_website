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

function get_workflow_stage_key (workflow_id, stage_id) {
  return workflow_id + ":" + stage_id
}

function getWorkflowStage (workflow_id, stage_id) {
  return get_workflows()[workflow_id].stages[stage_id]
}

function isActiveStage (workflow_id, stage_id) {
  if (typeof(get_workflows()[workflow_id].stages[stage_id].active) === 'undefined') {
    return false
  }
  return get_workflows()[workflow_id].stages[stage_id].active
}

export default {
  default_workflow_id: Workflow.id, // ID of workflow to give a project that has no workflow
  default_rent_workflow_id: FirstRentWorkflow.id,
  workflows: get_workflows(),
  get_workflow_stage_key: get_workflow_stage_key,
  getWorkflowStage: getWorkflowStage,
  isActiveStage: isActiveStage
}
