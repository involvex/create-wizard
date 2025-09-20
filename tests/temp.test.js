/** @format */

import { describe, it, expect } from 'vitest'
import { main } from '../scripts/create-app.js'

describe('temp', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
}),
describe('main', () => {
  it('should be a function', () => {
    expect(typeof main).toBe('function')
  })
})
