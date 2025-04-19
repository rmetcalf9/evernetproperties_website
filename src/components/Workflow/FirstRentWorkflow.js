// This is the first workflow I created for the rent project type

const workflow_data = {
  "id": "2",
  "name": 'Rent Project Workflow',
  "initial_stage": "1",
  "stages": {
    "1": {
      "_viewing_not_arranged": true,
      "name": "Lead",
      "active": true,
      "progression": {
        "failed": "1.1",
        "success": [
          {
            "next_stage": "2"
          }
        ]
      },
      "diagram_notes": "Identify Lead<BR>Contact landlord<BR>Arrange viewing"
    },
    "1.1": {
      "_viewing_not_arranged": true,
      "name": "Rejected Lead"
    },
    "2": {
      "_viewing_not_held": true,
      "name": "Viewing Arranged",
      "active": true,
      "progression": {
        "failed": "2.1",
        "success": [
          {
            "next_stage": "3"
          }
        ]
      },
      "diagram_notes": "Create Vision<BR>Initial numbers"
    },
    "2.1": {
      "_viewing_not_held": true,
      "name": "Cancelled Viewing"
    },
    "3": {
      "_viewing_not_held": true,
      "name": "Ready to view",
      "active": true,
      "progression": {
        "failed": undefined,
        "success": [
          {
            "next_stage": "4"
          }
        ]
      },
      "diagram_notes": "Prepare Viewing Checklist"
    },
    "4": {
      "name": "Viewed",
      "active": true,
      "progression": {
        "failed": "4.1",
        "success": [
          {
            "next_stage": "5"
          }
        ]
      },
      "diagram_notes": "Prepare Viewing Checklist"
    },
    "4.1": { "name": "Not Viable"},
    "5": {
      "name": "Negotiation",
      "active": true,
      "progression": {
        "failed": "5.1",
        "success": [
          {
            "next_stage": "6"
          }
        ]
      },
      "diagram_notes": "Full DD<BR>Prepare Contracts<BR>Contracts Signed"
    },
    "5.1": { "name": "Failed Negotiation"},
    "6": {
      "name": "Complete",
      "active": false,
      "progression": {
        "failed": undefined,
        "success": []
      },
      "diagram_notes": "Start Rent to Rent<BR>Sell deal"
    },
  },
}

function true_if_set(value) {
  if (typeof (value) === 'undefined') {
    return false
  }
  if (value) return true
  return false
}

export const stage_calc_fn = function (stage_id) {
  const isViewingArranged = !true_if_set(workflow_data.stages[stage_id]._viewing_not_arranged)
  let isViewingHeld = false
  if (isViewingArranged) {
    isViewingHeld = !true_if_set(workflow_data.stages[stage_id]._viewing_not_held)
  }
  return {
    isViewingArranged: isViewingArranged,
    isViewingHeld: isViewingHeld
  }
}


export default workflow_data
