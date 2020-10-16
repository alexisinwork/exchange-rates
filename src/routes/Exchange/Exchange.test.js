import React from 'react'
import { shallow } from 'enzyme'
import Exchange from './Exchange'
import { defaultExchanges, defaultPockets } from '../../shared/constants/exchangeRates'

const defaultRates = {
  error: null,
  rates: {
    base: 'GBP',
    date: '2020-10-15',
    rates: {
      EUR: 1.1045452035,
      GBP: 1,
      USD: 1.2920969791
    }
  }
}

describe('renders <Exchange />', () => {
  let wrapper

  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState])

  beforeEach(() => {
    wrapper = shallow(<Exchange
      updateRatesCallback={() => defaultRates}
      pocket={defaultPockets[0]}
      pockets={defaultPockets}
      updatePocket={() => {}}
      changePocket={() => {}}
      addExchange={() => {}}
    />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('correctly', () => {
    expect(wrapper).toBeDefined()
  })
})
