import Workflow from './FirstWorkflow.js'


function get_workflows () {
  let ret_val = {}
  ret_val[Workflow.id] = Workflow
  return ret_val
}

export default {
  default_workflow_id: 1, // ID of workflow to give a project that has no workflow
  workflows: get_workflows()
}
