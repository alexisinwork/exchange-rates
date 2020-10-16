export const getAmountDigit = (amount, currency) => {
  const val = amount.toLocaleString("en-US", {style:"currency", currency: currency})

  return {
    sign: val[0],
    amount: val.slice(1, -2),
    cents: val.slice(-2)
  }
}

export const filterExchanges = (currency, exchanges) =>
  exchanges.filter(exc => exc.fromPocket === currency || exc.toPocket === currency)

export const getAnotherPocket = (currency, pockets) => {
  const anotherPocket = pockets.filter(p => p.currency !== currency)[0]

  return anotherPocket
}

export const formatCurrency = (amount) => {
  const validatedValue =  parseFloat(
    amount.replace(/(.*){1}/, '0$1').replace(/[^\d]/g, '').replace(/(\d\d?)$/, '.$1')
  ).toFixed(2)

  return validatedValue
}
