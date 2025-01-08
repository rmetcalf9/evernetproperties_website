# Scripts

## Script Item Types

### ShowCallAim

Example:
```
{ type: 'ShowCallAim'}
```

Just shows the aim of the call.

### ShowStages

Example:
```
{ type: 'ShowStages'}
```

### ScriptPrompt

Example:
```
{
  type: 'ScriptPrompt',
  lines: [
    'Am I speaking to...',
    'I came across your advert for a room on ....',
    'Is the property still availiable?',
    'Do you mind if I ask some questions about the property?'
  ]
},
```

### ShowLead

Example:
```
{ type: 'ShowLead'}
```

Uses raw lead properties - displays the lead

### CustomVariableDisplay

Example:
```
{
  type: 'CustomVariableDisplay',
  title: 'Story Prompt',
  body: '{{ batchdata.story_prompt }}'
}
```

## Script Action types

## Outcome

Example:
```
type: 'Outcome',
id: 'skip_call',
button_label: 'Skip this lead',
button_color: 'white' (Optional),
button_text_color: 'black' (Optional)
```

Ends the call and produces the outcome callback

Predefined outcomes:
- skip_call


### Next_Stage

Example:
```
{
  type: 'Next_Stage',
  next_stage_id: '123',
  id: 'Make_call',
  button_label: 'Ready to Dial...'
}
```

Used to move a call on to the next stage.
