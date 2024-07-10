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
      }
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
