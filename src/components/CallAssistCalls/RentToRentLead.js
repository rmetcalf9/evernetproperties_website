

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
                next_stage_id: 'obj_granuteerent',
                id: 'obj_granuteerent',
                button_label: 'How can you guarantee the rent?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_agent',
                id: 'obj_agent',
                button_label: 'Are you an agent?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_bills',
                id: 'obj_bills',
                button_label: 'Who takes care of the bills?',
                button_color: 'negative'
              },
              {
                type: 'Next_Stage',
                next_stage_id: 'obj_airbnb',
                id: 'obj_airbnb',
                button_label: 'Will it be on Airbnb?',
                button_color: 'negative'
              },
            ]
          },
          {
            type: 'InlineActionList',
            title: 'Other useful notes',
            body: undefined,
            actions: [
              {
                type: 'Next_Stage',
                next_stage_id: 'oth_landlordbenefits',
                id: 'oth_landlordbenefits',
                button_label: 'Benefits to landlords',
                button_color: 'primary'
              }
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
          {
            type: 'Field',
            unique_id: 'address',
            label: 'Address',
            default: '{{ current_lead.raw.sub_section_details.leadinformation.address }}'
          },
          {
            type: 'Field',
            unique_id: 'postcode',
            label: 'Postcode',
            default: '{{ current_lead.raw.sub_section_details.leadinformation.postcode }}'
          },
          {
            type: 'ScriptPrompt',
            lines: [
              'Ok looking forward to seeing you {{ calldata.item_data_vals.appointment.selection_day.name }} at {{ calldata.item_data_vals.appointment.selection_time }}'
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
      {
        id: 'obj_granuteerent',
        hide_from_plan: true,
        name: 'How can you guarantee the rent?',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Empathise and state concern: I am glad you asked, it’s important you can rely on consistent regular rent payments so you don’t have the stress of wondering if you are getting paid.',
              'Here\'s how you can be confident in the arrangement',
              'Company Let Agreement - We will be entering into a company let agreement, where my company rents your property for a fixed period. This means that the responsibility for rent payments falls on my company, not individual tenants.',
              'Regular Rent Payments - You will receive a fixed rent every month, regardless of whether the property is occupied or not. This means you have a guaranteed income from your property each month.',
              'Handling Tenant Issues - My company will handle all tenant issues, maintenance, and even void periods. This means you won\'t have to worry about unpaid rent due to tenant issues.',
              'Financial Stability - My company has a strong financial standing and the ability to cover the rent payments. This means you can have peace of mind knowing that your rent will be paid on time, every time.',
              'Legal Obligations - As per our agreement, my company has a legal obligation to pay the rent. This provides an additional layer of security for you as the landlord, ensuring that your rent will be paid as agreed.',
              'Easy Eviction - If for any reason my company fails to pay the rent, you have the right to evict us immediately. This is because we are a commercial tenant, and the laws are more favorable towards landlords in commercial agreements. This provides you with an extra layer of security and control over your property.',
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
      {
        id: 'obj_agent',
        hide_from_plan: true,
        name: 'Are you an agent?',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'No, I\'m not an estate agent. I\'m a property investor',
              'I run a property management company',
              'We work with landlords to manage their properties, ensuring they receive a guaranteed rent each month and have a hands-off experience.',
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
      {
        id: 'obj_bills',
        hide_from_plan: true,
        name: 'Who takes care of the bills?',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Our company will take care of all the bills in the same way a tenant would.',
              'This includes utilities like gas, electricity, and council tax.',
              'This means you won\'t have to worry about any unexpected costs or unpaid bills.',
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
      {
        id: 'obj_airbnb',
        hide_from_plan: true,
        name: 'Will it be on Airbnb?',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              'Yes, the property will be listed on Airbnb as well as other similar platforms.',
              'This is part of our strategy to ensure maximum occupancy and income.',
              'However, we handle all aspects of this, including managing bookings, guest communication, and property maintenance.',
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
      {
        id: 'oth_landlordbenefits',
        hide_from_plan: true,
        name: 'Benefits to landlords',
        items: [
          {
            type: 'ScriptPrompt',
            lines: [
              "Guaranteed Rent", "No Management Hassles", "No Agency Fees", "Property Care", "Legal Protection", "Bill Payment", "High Occupancy"
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
