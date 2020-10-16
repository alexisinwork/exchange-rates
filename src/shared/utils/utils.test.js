import { getAmountDigit, filterExchanges, getAnotherPocket, formatCurrency } from './amount'
import { fetchRatesPolling } from './fetchRates'
import { EURO, US_DOLLAR, GB_POUND, defaultExchanges, defaultPockets } from '../constants/exchangeRates'

describe('utils.test should', () => {
  describe('test amount.js utilities where', () => {
    describe('getAmountDigit should', () => {
      it('return for 302.23 EUR pocket $302.23', () => {
        const amountDigit = getAmountDigit(302.23, US_DOLLAR)
        expect(amountDigit.sign).toEqual('$')
        expect(amountDigit.amount).toEqual('302.')
        expect(amountDigit.cents).toEqual('23')
      })

      it('return for 124.25 EUR pocket €124.25', () => {
        const amountDigit = getAmountDigit(124.25, EURO)
        expect(amountDigit.sign).toEqual('€')
        expect(amountDigit.amount).toEqual('124.')
        expect(amountDigit.cents).toEqual('25')
      })

      it('return for 96.13 EUR pocket £96.13', () => {
        const amountDigit = getAmountDigit(96.13, GB_POUND)
        expect(amountDigit.sign).toEqual('£')
        expect(amountDigit.amount).toEqual('96.')
        expect(amountDigit.cents).toEqual('13')
      })
    })

    describe('filterExchanges should', () => {
      it('return correct number of exchanges using EURO', () => {
        const exchanges = filterExchanges(EURO, defaultExchanges)
        expect(exchanges.length).toEqual(7)
        
        exchanges.forEach(exc => {
          const rule = exc.fromPocket === EURO || exc.toPocket === EURO
          expect(rule).toBeTruthy()
        })
      })

      it('return correct number of exchanges using USD', () => {
        const exchanges = filterExchanges(US_DOLLAR, defaultExchanges)
        expect(exchanges.length).toEqual(8)

        exchanges.forEach(exc => {
          const rule = exc.fromPocket === US_DOLLAR || exc.toPocket === US_DOLLAR
          expect(rule).toBeTruthy()
        })
      })

      it('return correct number of exchanges using GBP', () => {
        const exchanges = filterExchanges(GB_POUND, defaultExchanges)
        expect(exchanges.length).toEqual(3)

        exchanges.forEach(exc => {
          const rule = exc.fromPocket === GB_POUND || exc.toPocket === GB_POUND
          expect(rule).toBeTruthy()
        })
      })
    })

    describe('getAnotherPocket should', () => {
      it('return for EURO pocket USD', () => {
        const anotherPocket = getAnotherPocket(US_DOLLAR, defaultPockets)
        expect(anotherPocket.currency).toEqual(EURO)
      })

      it('return for USD pocket EURO', () => {
        const anotherPocket = getAnotherPocket(EURO, defaultPockets)
        expect(anotherPocket.currency).toEqual(US_DOLLAR)
      })

      it('return for GBP pocket EURO', () => {
        const anotherPocket = getAnotherPocket(GB_POUND, defaultPockets)
        expect(anotherPocket.currency).toEqual(US_DOLLAR)
      })
    })

    describe('formatCurrency should', () => {
      it('format "" into 0.00', () => {
        expect(formatCurrency('')).toEqual('0.00')
      })

      it('format "adasd" into 0.00', () => {
        expect(formatCurrency('adasd')).toEqual('0.00')
      })

      it('format "1" into 0.01', () => {
        expect(formatCurrency('1')).toEqual('0.01')
      })

      it('format "5." into 5.00', () => {
        expect(formatCurrency('5.')).toEqual('0.05')
      })

      it('format "10.4" into 1.04', () => {
        expect(formatCurrency('10.4')).toEqual('1.04')
      })

      it('format "-10" into 0.10', () => {
        expect(formatCurrency('-10')).toEqual('0.10')
      })

      it('format "10.23asd" into 10.23', () => {
        expect(formatCurrency('10.23asd')).toEqual('10.23')
      })

      it('format "10,23" into 10.23', () => {
        expect(formatCurrency('10,23')).toEqual('10.23')
      })

      it('format "10233" into 102.33', () => {
        expect(formatCurrency('10233')).toEqual('102.33')
      })
    })
  })
})
