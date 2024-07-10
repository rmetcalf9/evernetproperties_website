// This is the first workflow I created


export default {
  "id": 1,
  "name": 'BRR Project Workflow',
  "initial_stage": "1",
  "stages": {
    "1": {
      "name": "Lead",
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
      "progression": {
        "failed": "2.1",
        "success": [
          {
            "next_stage": "3"
          }
        ]
      },
      "diagram_notes": "Phone Agent<BR>Is peoperty still available<BR>What is sellers situation"
    },
    "2.1": { "name": "Rejected Lead"},
    "3": {
      "name": "Viewing Booked",
      "progression": {
        "success": [
          {
            "next_stage": "4"
          }
        ]
      },
      "diagram_notes": "Property Condition<BR>Identify Show stoppers<BR>Estimate Refurb cost<BR>Evaluate potential"
    },
    "4": {
      "name": "Viewed",
      "progression": {
        "failed": "4.1",
        "success": [
          {
            "next_stage": "5"
          }
        ]
      },
      "diagram_notes": "Market Comparable<BR>Refurb cost<BR>Identify offer price<BR>Make offer"
    },
    "4.1": { "name": "Unviable"},
    "5": {
      "name": "Offer made",
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
      "draw_col": 1, // Defaults to 0 - unless fail stage defaults to 2
      "progression": {
        "success": [
          {
            "next_stage": "7"
          }
        ]
      },
    },
    "7": { "name": "Accepted offer"},
  }
}
