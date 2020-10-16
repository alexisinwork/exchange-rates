import React from 'react'
import { shallow } from 'enzyme'
import Pockets from './Pockets'
import { defaultExchanges, defaultPockets } from '../../../shared/constants/exchangeRates'

describe('renders <Pockets />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Pockets
      pocket={defaultPockets[0]}
      pockets={defaultPockets}
      updatePocket={() => {}}
      changePocket={() => {}}
      exchanges={defaultExchanges}
    />)
  })

  it('correctly', () => {
    expect(wrapper).toBeDefined()
  })

  it('with correct pocket sign', () => {
    const pocketSign = wrapper.find('[data-test="pocket-sign"]')
    expect(pocketSign.text()).toEqual('$')
  })

  it('with correct pocket amount', () => {
    const pocketAmount = wrapper.find('[data-test="pocket-amount"]')
    expect(pocketAmount.text()).toEqual('302.')
  })

  it('with correct pocket cents', () => {
    const pocketAmount = wrapper.find('[data-test="pocket-cents"]')
    expect(pocketAmount.text()).toEqual('23')
  })

  it('with 3 pockets', () => {
    const pockets = wrapper.find('[data-test="pocket"]')
    expect(pockets.length).toEqual(3)
  })

  it('with 3 pockets', () => {
    const pockets = wrapper.find('[data-test="pocket"]')
    expect(pockets.length).toEqual(3)
  })

  it('on currency change update the pocket', () => {
    const currencyBtn = wrapper.find('[data-test="pocket-switcher"]').last()
    currencyBtn.simulate('click')

    wrapper.setProps({ pocket: defaultPockets[2] })

    const pocketSign = wrapper.find('[data-test="pocket-sign"]')
    const pocketAmount = wrapper.find('[data-test="pocket-amount"]')
    const pocketCents = wrapper.find('[data-test="pocket-cents"]')

    expect(pocketSign.text()).toEqual('£')
    expect(pocketAmount.text()).toEqual('487.')
    expect(pocketCents.text()).toEqual('23')
  })
})
