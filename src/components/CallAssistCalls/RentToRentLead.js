

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
              'I came across your advert for a room on .... ({{ current_lead.raw.sub_section_details.leadinformation.lead_source }})',
              'Is the property still availiable?',
              'Do you mind if I ask some questions about the property?'
            ]
          }
        ],
        actions: [
          {
            type: 'Next_Stage',
            next_stage_id: '2',
            id: 'Investigate',
            button_label: 'Next Stage (Investigate Property)'
          }
        ],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: '2',
        name: 'Investigate the property',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'General condition',
              'Are you looking for long term or short term tenant?',
              'Is it furnished or unfurnished?',
              'Does it have wifi?',
              'Could it have office or working space for remote working'
            ]
          },
        ],
        actions: [
          {
            type: 'Next_Stage',
            next_stage_id: '3',
            id: 'landlord_pain',
            button_label: 'Next Stage (Identify landlord pain points)'
          }
        ],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: '3',
        name: 'Identify Landlord Pain Points',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'How long has it been vacant?',
              'What kind of Tenants do you get in this property? (Professional, student, nurses, etc.)',
            ]
          },
        ],
        actions: [
          {
            type: 'Next_Stage',
            next_stage_id: '4',
            id: 'landlord_pain',
            button_label: 'Next Stage (Introduce Myself)'
          }
        ],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: '4',
        name: 'Introduce Myself',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Can I tell you about myself?',
            ]
          },
          {
            type: 'CustomVariableDisplay',
            title: 'My Introduction',
            body: '{{ batchdata.story_prompt }}'
          }
        ],
        actions: [
          {
            type: 'Next_Stage',
            next_stage_id: '5',
            id: 'close',
            button_label: 'Next Stage (Close whilst mentioning company let)'
          }
        ],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: '5',
        name: 'Close whilst Mentioning company let',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'It would be great to view the property and discuss further.',
              'It won’t be me staying in the property myself and I am looking for a company let <NO PAUSE>',
            ]
          },
          {
            type: 'ArrangeAppointment',
            prompt_text: 'I am going to be in the area and I am free on {{ option1 }} and {{ option2 }}, which of these works for you?',
            slot_var: 'batchdata.slots',
            viewing_day_var: 'batchdata.viewing_days',
            unique_id: 'appointment'
          }
        ],
        actions: [{
          type: 'Outcome',
          id: 'complete',
          button_label: 'Complete Call - viewing arranged'
        }],
        post_action_items: [{ type: 'ShowLead'}]
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
