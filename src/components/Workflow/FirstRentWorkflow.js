// This is the first workflow I created for the rent project type

export default {
  "id": "2",
  "name": 'Rent Project Workflow',
  "initial_stage": "1",
  "stages": {
    "1": {
      "name": "Lead",
      "active": true,
      "progression": {
        "failed": undefined,
        "success": []
      },
      "diagram_notes": "A<BR>B"
    }
  }
}
