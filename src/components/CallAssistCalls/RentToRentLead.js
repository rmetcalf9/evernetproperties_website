

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
              'Is the property still availiable? (If not ask if landlord has others)',
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
          },
          {
            type: 'Outcome',
            id: 'notavailaible',
            button_label: 'Complete Call - no longer availiable'
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
            viewing_day_var: 'batchdata.viewing_days',
            unique_id: 'appointment',
            success_outcome_ids: ['complete']
          },
          {
            type: 'InlineActionList',
            title: 'Handle Objections',
            body: undefined,
            actions: [
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_subletting',
                id: 'obj_subletting',
                button_label: 'Is this subletting?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_who',
                id: 'obj_who',
                button_label: 'Who is going to be living here?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_how',
                id: 'obj_how',
                button_label: 'So how does it all work?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_callback',
                id: 'obj_callback',
                button_label: 'Can you send me an email?/Can I call you back?/Can I think about it?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: '4',
                id: 'obj_granuteerent',
                button_label: 'How can you guarantee the rent?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: '4',
                id: 'obj_agent',
                button_label: 'Are you an agent?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: '4',
                id: 'obj_bills',
                button_label: 'Who takes care of the bills?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: '4',
                id: 'obj_airbnb',
                button_label: 'Will it be on Airbnb?',
                button_color: 'negative'
              },
            ]
          }
        ],
        actions: [{
          type: 'Next_Stage',
          next_stage_id: '6',
          id: 'confirm_address',
          button_label: 'Confirm Address'
        }],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: '6',
        name: 'Confirm address',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Can I confirm the address'
            ]
          },
        ],
        actions: [{
          type: 'Outcome',
          id: 'complete',
          button_label: 'Complete Call - viewing arranged'
        },{
          type: 'Next_Stage',
          next_stage_id: '5',
          id: 'close',
          button_label: 'Alter appointment'
        }],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: 'obj_subletting',
        hide_from_plan: true,
        name: 'Handle Subletting Objection',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Empathise: I can understand how some people will think it’s subletting',
              'That term normally describes where the letting is done secretly without the landlord knowledge',
              'In fact this is a common way of letting property',
              'Lots of landlords do this as a way of guaranteeing rent',
              'We do do checks to make sure your property is suitable',
              'It’s much easier to discuss in person, let\'s get this viewing booked in….. (BACK TO CLOSE)'
            ]
          },
        ],
        actions: [{
          type: 'Next_Stage',
          next_stage_id: '5',
          id: 'close',
          button_label: 'Back to Close Stage'
        }],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: 'obj_who',
        hide_from_plan: true,
        name: 'Explain who is going to be living here',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Empathise: It’s vital to know who will be staying in the property',
              'It will be a mix of people depending on who needs it at the time but your one point of contact will be me',
              'I will be paying the rent every month',
              '(BACK TO CLOSE)'
            ]
          },
        ],
        actions: [{
          type: 'Next_Stage',
          next_stage_id: '5',
          id: 'close',
          button_label: 'Back to Close Stage'
        }],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: 'obj_how',
        hide_from_plan: true,
        name: 'Explain how the arrangement works',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'We enter into a company let agreement where my company rents your property for a fixed period, typically 3-5 years.',
              'We then take care of the property, maintain it, and rent it out to tenants.',
              'We handle all the tenant issues, maintenance, and even void periods.',
              'You get a guaranteed rent every month, regardless of whether the property is occupied or not.',
              'It\'s a hands-off experience for you as a landlord.',
              '(BACK TO CLOSE)'
            ]
          },
        ],
        actions: [{
          type: 'Next_Stage',
          next_stage_id: '5',
          id: 'close',
          button_label: 'Back to Close Stage'
        }],
        post_action_items: [{ type: 'ShowLead'}]
      },
      {
        id: 'obj_callback',
        hide_from_plan: true,
        name: 'Can you send email/callback/Can I think about it',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Empathise: Of course, it’s important fully understand this arrangement',
              'Can I be totally honest with you? There are only three things to think about, do you mind if I share them with you?',
              '1 Serious Intentions: Are you seriously considering this arrangement? If not, what are your reservations?',
              '2 Affordability: Is the proposed rent within your budget? If not, what would be a more comfortable figure for you?',
              '3 Perceived Value: Do you see the value in this arrangement? If not, what aspects are you unsure about?',
              '(BACK TO CLOSE - and pick other objections)'
            ]
          },
        ],
        actions: [{
          type: 'Next_Stage',
          next_stage_id: '5',
          id: 'close',
          button_label: 'Back to Close Stage'
        }],
        post_action_items: [{ type: 'ShowLead'}]
      },

  ],
  common_actions: [
    {
      type: 'Outcome',
      id: 'reject_lead',
      button_label: 'Reject Lead'
    }
  ]
}
