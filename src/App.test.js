import React from 'react'
import { mount } from 'enzyme'
import App from './App'

describe('renders <App />', () => {
  it('correctly', () => {
    const wrapper = mount(<App />)
    expect(wrapper).toBeDefined()
  })
})
