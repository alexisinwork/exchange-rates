import { pollingTimeout } from '../constants/exchangeRates'

export const fetchRatesPolling = (base) => {
  let baseStored = base
  let rates = null
  let error = null
  let isStarted = false

  async function fetchRates() {
    if (isStarted) {
      let response = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseStored}`)
      error = null
  
      if (response.status === 502) {
        console.error('502', response)
        await fetchRates(baseStored)
      } else if (response.status !== 200) {
        error = await response.json()
        await new Promise(resolve => setTimeout(resolve, pollingTimeout))
        await fetchRates(baseStored)
      } else {
        rates = await response.json()
        await new Promise(resolve => setTimeout(resolve, pollingTimeout))
        await fetchRates(baseStored)
      }
    }
  }
  // Always run first time
  fetchRates(baseStored, isStarted)

  return (newBase, isStartTriggered = false) => {
    baseStored = newBase
    // We the value actually changed AND is became positive we start long-polling
    if (isStarted !== isStartTriggered) {
      isStarted = isStartTriggered
      if (isStarted) fetchRates(baseStored, isStarted)
    }

    return { rates, error }
  }
}

export async function fetchRatesPromise(base) {
  const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)

  if (response.status !== 200) {
    const error = await response.json()
    return { rates: null, error }
  } else {
    const rates = await response.json()
    return { rates, error: null }
  }
}
