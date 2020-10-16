import { defaultPockets } from '../../src/shared/constants/exchangeRates'
import { fetchRatesPromise } from '../../src/shared/utils/fetchRates'

describe('<Exchange />', () => {
  let rates, newBase = 'USD', oldBase = 'EUR'
  // Basically bullet-proof check that we async get rates
  beforeEach((done) => {
    if (rates && newBase === oldBase) {
      done()
    } else {
      cy.wrap(fetchRatesPromise(newBase)).then(res => {
        rates = res.rates.rates
        oldBase = newBase
        done()
      })
    }
  })

  it('url is found', () => {
    cy.visit('http://localhost:3000')

    cy.url().should('include', '/')
  })

  it('current pocket is $302.23', () => {
    cy.get('[data-test="pocket-sign"]').should('have.text', '$')
    cy.get('[data-test="pocket-amount"]').should('have.text', '302.')
    cy.get('[data-test="pocket-cents"]').should('have.text', '23')
  })

  it('go to /exchange', () => {
    cy.get('[data-test="go-to-exchange"]').click()

    cy.url().should('include', '/exchange')
  })

  describe('testing exchanging with recent rates', () => {
    const fromCurrency = () => cy.get('[data-test="exchange-from-currency"]')
    const fromAmount = () => cy.get('[data-test="pocket-from-amount"]')
    const fromRate = () => cy.get('[data-test="pocket-from-rate"]')
    const fromInput = () => cy.get('[data-test="exchange-from-amount"] input')

    const toCurrency = () => cy.get('[data-test="exchange-to-currency"]')
    const toAmount = () => cy.get('[data-test="pocket-to-amount"]')
    const toRate = () => cy.get('[data-test="pocket-to-rate"]')
    const toInput = () => cy.get('[data-test="exchange-to-amount"] input')

    const exchangeDoneBtn = () => cy.get('[data-test="exchange-done"]')

    it('current pocket and toPocket are USD and EUR with correct rates', () => {
      fromCurrency().should('have.text', 'USD')
      fromAmount().should('have.text', '302.23')
      fromRate().should('have.text', `1 USD = \n                    ${rates['EUR'].toFixed(4)} EUR`)
  
      toCurrency().should('have.text', 'EUR')
      toAmount().should('have.text', 'You have 124.24')
      toRate().should('have.text', `1 EUR = ${(1 / rates['EUR']).toFixed(4)} USD`)
    })
  
    it('user can type exchange value and see exchanged result', () => {
      fromInput().type('1244').should('have.value', '12.44')
      toInput().should('have.value', `${(rates['EUR'] * 12.44).toFixed(2)}`)
    })

    it('user can see that pocket amount is less then provided value', () => {
      fromInput().type('12').should('have.value', '1244.12')
      fromAmount().should('have.css', 'color').and('equal', 'rgb(255, 0, 0)')
      exchangeDoneBtn().should('have.attr', 'disabled', 'disabled')
      toInput().should('have.value', `${(rates['EUR'] * 1244.12).toFixed(2)}`)
    })

    it('user can change pockets', () => {
      fromInput().clear().type('12559').should('have.value', '125.59')
      fromCurrency().click()
      cy.get('[data-test="from-option-EUR"]').click()

      newBase = 'EUR'

      fromCurrency().should('have.text', 'EUR')
      fromAmount().should('have.text', '124.24')
      fromAmount().should('have.css', 'color').and('equal', 'rgb(255, 0, 0)')
    })

    it('rates should be updated with a new base', () => {
      fromRate().should('have.text', `1 EUR = \n                    ${rates['USD'].toFixed(4)} USD`)

      toCurrency().should('have.text', 'USD')
      toAmount().should('have.text', 'You have 302.23')
      toRate().should('have.text', `1 USD = ${(1 / rates['USD']).toFixed(4)} EUR`)
  
      toInput().should('have.value', `${(rates['USD'] * 125.59).toFixed(2)}`)
    })

    it('should rerender rates when toCurrency changed', () => {
      toCurrency().click()
      cy.get('[data-test="to-option-GBP"]').click()
      toCurrency().should('have.text', 'GBP')

      toAmount().should('have.text', 'You have 487.23')
      toRate().should('have.text', `1 GBP = ${(1 / rates['GBP']).toFixed(4)} EUR`)
  
      toInput().should('have.value', `${(rates['GBP'] * 125.59).toFixed(2)}`)
    })

    it('should go to home page and update the pocket', () => {
      const pocketCurrency = () => cy.get('[data-test="pocket-sign"]')
      const pocketAmount = () => cy.get('[data-test="pocket-amount"]')
      const pocketCents = () => cy.get('[data-test="pocket-cents"]')

      fromInput().clear().type('1214').should('have.value', '12.14')
      exchangeDoneBtn().should('not.have.attr', 'disabled')
      exchangeDoneBtn().click()

      cy.url().should('not.include', 'exchange')

      pocketCurrency().should('have.text', '€')
      pocketAmount().should('have.text', '112.')
      pocketCents().should('have.text', '10')
    })

    it('at home page and add the latest exchange on top', () => {
      const exchangeBlock = () => cy.get('[data-test="exchange"]')
      const exchangeInfo = (parent) => parent.find('[data-test="exchange-info"]')
      const exchangeFrom = (parent) => parent.find('[data-test="exchange-from"]')
      const exchangeTo = (parent) => parent.find('[data-test="exchange-to"]')

      exchangeBlock().should('have.length', 8)
      exchangeInfo(exchangeBlock().first()).should('have.text', 'Exchanged from EUR')
      exchangeFrom(exchangeBlock().first()).should('have.text', '- 12.14')
      exchangeTo(exchangeBlock().first()).should('have.text', '+10.99 GBP')
    })
  })
})
