import Workflow from './FirstWorkflow.js'


function get_workflows () {
  let ret_val = {}
  ret_val[Workflow.id] = Workflow
  return ret_val
}

function get_workflow_stage_key (workflow_id, stage_id) {
  return workflow_id + ":" + stage_id
}

function getWorkflowStage (workflow_id, stage_id) {
  return get_workflows()[workflow_id].stages[stage_id]
}

export default {
  default_workflow_id: '1', // ID of workflow to give a project that has no workflow
  workflows: get_workflows(),
  get_workflow_stage_key: get_workflow_stage_key,
  getWorkflowStage: getWorkflowStage
}
