

const todo_item_types = [
  {label: 'Call Agent', value: 'agent'},
  {label: 'Call Sourcer', value: 'sourcer'},
  {label: 'Other', value: 'other'}
]

// Project types. These constants match values in constants.py in the backend
const project_type_purchase = 'purchase'
const project_type_rent = 'rent'
const project_types = [project_type_purchase, project_type_rent]
const project_type_constants = {
  project_type_purchase: project_type_purchase,
  project_type_rent: project_type_rent,
  project_types: project_types
}



export default {
  todo_item_types: todo_item_types,
  project_type_constants: project_type_constants
}
