import { defaultPockets } from '../../src/shared/constants/exchangeRates'

describe('<Home />', () => {
  const pocketCurrency = () => cy.get('[data-test="pocket-sign"]')
  const pocketAmount = () => cy.get('[data-test="pocket-amount"]')
  const pocketCents = () => cy.get('[data-test="pocket-cents"]')
  const pockets = () => cy.get('[data-test="pocket"]')
  const pocketSwitcher = () => cy.get('[data-test="pocket-switcher"]')
  const exchangeBlock = () => cy.get('[data-test="exchange"]')

  it('url is found', () => {
    cy.visit('http://localhost:3000')

    cy.url().should('include', '/')
  })

  it('current pocket is $302.23', () => {
    pocketCurrency().should('have.text', '$')
    pocketAmount().should('have.text', '302.')
    pocketCents().should('have.text', '23')
  })

  it('another pockets are correct', () => {
   pockets().each(($el, i) => {
      cy.wrap($el)
        .find('[data-test="pocket-another-amount"]')
        .should('have.text', defaultPockets[i].amount)
      cy.wrap($el)
        .find('[data-test="pocket-switcher"]')
        .should('have.text', defaultPockets[i].currency)
    })
  })

  it('after clicking on another pocket should update current pocket', () => {
    pocketSwitcher().last().click()

    pocketCurrency().should('have.text', '£')
    pocketAmount().should('have.text', '487.')
    pocketCents().should('have.text', '23')

    pocketSwitcher().eq(1).click()

    pocketCurrency().should('have.text', '€')
    pocketAmount().should('have.text', '124.')
    pocketCents().should('have.text', '24')
  })

  it('after clicking top up should update pocket with +10', () => {
    cy.get('[data-test="top-up"]').click()
    pocketAmount().should('have.text', '134.')
   pockets().eq(1).should('have.text', '134.24EUR')
    // Switch to another pocket
    pocketSwitcher().eq(0).click()
    cy.get('[data-test="top-up"]').click()
    pocketAmount().should('have.text', '312.')
   pockets().eq(0).should('have.text', '312.23USD')
  })

  it('should show all exchanges regarding current pocket', () => {
    exchangeBlock().should('have.length', 8)
    pocketSwitcher().eq(1).click()
    exchangeBlock().should('have.length', 7)
    pocketSwitcher().eq(2).click()
    exchangeBlock().should('have.length', 3)
  })
})
