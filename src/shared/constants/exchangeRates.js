export const EURO = 'EUR'
export const US_DOLLAR = 'USD'
export const GB_POUND = 'GBP'

export const pollingTimeout = 10000

export const defaultExchanges = [
  { fromPocket: EURO, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.41 },
  { fromPocket: US_DOLLAR, toPocket: GB_POUND, fromAmount: 40, toAmount: 25.42 },
  { fromPocket: GB_POUND, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.43 },
  { fromPocket: EURO, toPocket: GB_POUND, fromAmount: 50, toAmount: 65.44 },
  { fromPocket: EURO, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.42 },
  { fromPocket: EURO, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.41 },
  { fromPocket: EURO, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.42 },
  { fromPocket: EURO, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.43 },
  { fromPocket: EURO, toPocket: US_DOLLAR, fromAmount: 50, toAmount: 65.44 }
]

export const defaultPockets = [
  { amount: 302.23, currency: US_DOLLAR, desc: 'United States Dollar' },
  { amount: 124.24, currency: EURO, desc: 'Euro' },
  { amount: 487.23, currency: GB_POUND, desc: 'British Pound' },
]
