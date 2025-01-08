import { describe, expect, it, test } from 'vitest';
import mustach_utils from '../../../src/components/CallAssist/mustach_utils.js'

const sample_context = {
  str: 'string',
  int: 1,
  nest: {
    neststr: 'neststrval',
    nestint: 123,
    again: {
      neststr: 'neststrvalagain',
      nestint: 1234,
    }
  }
}

test('Empty Eval', () => {
  expect(mustach_utils.evalmustachstragainstcontext('',sample_context)).toBe('')
})

test('No mustach', () => {
  expect(mustach_utils.evalmustachstragainstcontext('Test Str',sample_context)).toBe('Test Str')
})

test('Single not a  mustach', () => {
  expect(mustach_utils.evalmustachstragainstcontext('Test{}Str',sample_context)).toBe('Test{}Str')
})

test('Open Only', () => {
  expect(mustach_utils.evalmustachstragainstcontext('Test Str {{ something',sample_context)).toBe('Test Str {{ something')
})

test('Empty Mustach eval to nothing', () => {
  expect(mustach_utils.evalmustachstragainstcontext('Tes{{}}t S{{ }}tr sa{{       }}df',sample_context)).toBe('Test Str sadf')
})

test('Empty only', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{}}',sample_context)).toBe('')
})

test('Simple string', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{   str}}',sample_context)).toBe('string')
})

test('Simple int', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{   int   }}',sample_context)).toBe('1')
})

test('1 level nested', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{nest.neststr   }} and {{ nest.nestint }}',sample_context)).toBe('neststrval and 123')
})

test('2 level nested', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{nest.again.neststr   }} and {{ nest.again.nestint }}',sample_context)).toBe('neststrvalagain and 1234')
})

test('Invalid var name', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{ invalid}}',sample_context)).toBe('undefined')
})

test('Invalid nestedvar name', () => {
  expect(mustach_utils.evalmustachstragainstcontext('{{ nest.invalid}}',sample_context)).toBe('undefined')
})
