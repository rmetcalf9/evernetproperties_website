// This is the first workflow I created

// For a stage is active is MISSING it is assumed false
// Note workflow ID of "1" and stage id of "1" are used in backend and should not be changed

export const stage_calc_fn = function (stage_id) {
  return {
  }
}

export default {
  "id": "1",
  "name": 'BRR Project Workflow',
  "initial_stage": "1",
  "stages": {
    "1": {
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
      "diagram_notes": "Identify profitable strategy<BR>Find on Streetview<BR>Identify full address"
    },
    "1.1": { "name": "Rejected Lead"},
    "2": {
      "name": "Potential",
      "active": true,
      "progression": {
        "failed": "2.1",
        "success": [
          {
            "next_stage": "2.2"
          },
          {
            "next_stage": "3"
          }
        ]
      },
      "diagram_notes": "Phone Agent<BR>Is property still available<BR>What is sellers situation"
    },
    "2.2": {
      "name": "Need to view",
      "draw_col": 1, // Defaults to 0 - unless fail stage defaults to 2
      "active": true,
      "progression": {
        "failed": "2.1",
        "success": [
          {
            "next_stage": "3"
          },
          {
            "next_stage": "2"
          }
        ]
      },
      "diagram_notes": "Phone Agent<BR>Is property still available<BR>What is sellers situation"
    },
    "2.1": { "name": "Rejected Lead"},
    "3": {
      "name": "Viewing Booked",
      "active": true,
      "progression": {
        "failed": "3.1",
        "success": [
          {
            "next_stage": "4"
          }
        ]
      },
      "diagram_notes": "Market Comparables<BR>Property Condition<BR>Identify Deal Breakers<BR>Evaluate potential"
    },
    "3.1": { "name": "Cancelled Viewing"},
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
      "diagram_notes": "Refurb cost (Quotes)<BR>Identify offer price<BR>Make offer"
    },
    "4.1": { "name": "Unviable"},
    "5": {
      "name": "Offer made",
      "active": true,
      "progression": {
        "success": [
          {
            "next_stage": "6"
          },
          {
            "next_stage": "7"
          }
        ]
      },
      "diagram_notes": "Negotiation"
    },
    "6": {
      "name": "Rejected offer",
      "active": true,
      "draw_col": 1, // Defaults to 0 - unless fail stage defaults to 2
      "progression": {
        "failed": "6.1",
        "success": [
          {
            "next_stage": "7"
          }
        ]
      },
    },
    "6.1": { "name": "Off Market"},
    "7": {
      "name": "Accepted offer",
      "active": true
    },
  }
}
