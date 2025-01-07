

export default {
  aim: 'Schedule an in person viewing of the property',
  initial_stage_id: '1',
  stages: [
      {
        id: '1',
        name: 'Qualify the lead',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Am I speaking to...',
              'I came across your advert for a room on ....',
              'Is the property still availiable?',
              'Do you mind if I ask some questions about the property?'
            ]
          },
          { type: 'ShowLead'}
        ],
        actions: [
          {
            type: 'Next_Stage',
            next_stage_id: '2',
            id: 'Investigate',
            button_label: 'Next Stage (Investigate Property)'
          }
        ]
      },
      {
        id: '2',
        name: 'Investigate the property',
        items: [],
        actions: []
      },
      {
        id: '3',
        name: 'Identify landlord pain points',
        items: [],
        actions: []
      },
      {
        id: '4',
        name: 'Introduce Myself',
        items: [],
        actions: []
      },
      {
        id: '5',
        name: 'Mention company let',
        items: [],
        actions: []
      },
      {
        id: '6',
        name: 'Close',
        items: [],
        actions: []
      }
  ],
  common_actions: [
    {
      type: 'Outcome',
      id: 'reject_lead',
      button_label: 'Reject Lead'
    }
  ]
}
