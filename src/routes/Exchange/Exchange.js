import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// Components
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Alert from '@material-ui/lab/Alert'
// Icons
import AutorenewIcon from '@material-ui/icons/Autorenew'
import HomeIcon from '@material-ui/icons/Home'
// Everything else
import { fetchRatesPromise } from '../../shared/utils/fetchRates'
import { getAnotherPocket, formatCurrency } from '../../shared/utils/amount'
import { EURO, US_DOLLAR, GB_POUND, pollingTimeout } from '../../shared/constants/exchangeRates'
import {
  ExchangeWrapper,
  CurrencyRates,
  RateFormControl,
  RateSelect,
  ExchangeRates,
  RateAmount,
  Highlighted,
} from './Exchange.styled'
import { OperationsWrapper } from '../Home/components/Pockets.styled'

const Exchange = ({
  updateRatesCallback,
  pocket,
  pockets,
  updatePocket,
  changePocket,
  addExchange,
}) => {
  const [rates, setRates] = useState({})
  const [pocketTo, setPocketTo] = useState(pockets[1])
  const [amountFrom, setAmountFrom] = useState('')
  const [fetchError, setFetchError] = useState(null)

  const isExchangeBlocked = amountFrom > pocket.amount
  const isEmptyValue = amountFrom === '' || amountFrom === '0.00'

  const history = useHistory()

  const localRatesUpdate = useCallback(
    (base, isStarted = true) => {
      const curRates = updateRatesCallback(base, isStarted)

      if (curRates.rates) setRates(curRates.rates)
      setFetchError(curRates.fetchError)
    },
    [updateRatesCallback]
  )

  // Each time we receive new pocket - we instantly update rates with a new base
  useEffect(() => {
    const getRatesOnPocketChange = async () => {
      const curRates = await fetchRatesPromise(pocket.currency)
      setPocketTo(getAnotherPocket(pocket.currency, pockets))

      if (!!curRates.rates) setRates(curRates.rates)
      setFetchError(curRates.fetchError)
    }

    getRatesOnPocketChange()
  }, [pocket.currency])

  // Updating rates every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => localRatesUpdate(pocket.currency), pollingTimeout)
    
    // componenWillUnmount - clearInterval and cancel long-polling
    return () => {
      clearInterval(timer)
      localRatesUpdate(pocket.currency, false)
    }
  }, [localRatesUpdate, pocket.currency])

  const updateRateBase = (base) => {
    // Callback is needed to update to a newBase
    localRatesUpdate(base)
    changePocket(base)
  }

  const goToHome = () => {
    history.push('/')
  }

  const handleExchange = () => {
    const exchange = {
      fromPocket: pocket.currency,
      toPocket: pocketTo.currency,
      fromAmount: amountFrom,
      toAmount: rates.rates[pocketTo.currency] * amountFrom,
    }

    addExchange(exchange)
    history.push('/')
  }

  if (!(rates && rates.rates)) return 'Loading rates...'

  return (
    <ExchangeWrapper>
      <Typography variant="h3">Exchange Rates</Typography>

      {rates && rates.rates ? (
        <ExchangeRates>
          <RateFormControl>
            <RateSelect
              data-test="exchange-from-currency"
              value={pocket.currency}
              onChange={(e) => updateRateBase(e.target.value)}
            >
              <MenuItem data-test="from-option-USD" value={US_DOLLAR}>
                USD
              </MenuItem>
              <MenuItem data-test="from-option-EUR" value={EURO}>
                EUR
              </MenuItem>
              <MenuItem data-test="from-option-GBP" value={GB_POUND}>
                GBP
              </MenuItem>
            </RateSelect>

            <TextField
              variant="outlined"
              value={amountFrom}
              data-test="exchange-from-amount"
              onChange={(e) => setAmountFrom(formatCurrency(e.target.value))}
            />

            <RateAmount variant="body1">
              You have{' '}
              <Highlighted data-test="pocket-from-amount" isHighlighted={isExchangeBlocked}>
                {pocket.amount.toFixed(2)}
              </Highlighted>
            </RateAmount>

            <CurrencyRates>
            {
              rates.rates[pocketTo.currency] 
                ?
                  <Chip
                    data-test="pocket-from-rate"
                    label={`1 ${pocket.currency} = 
                        ${rates.rates[pocketTo.currency].toFixed(4)} ${pocketTo.currency}`}
                  />
                : <Chip
                    data-test="pocket-from-rate"
                    label="Loading rate..."
                  />
            }
            </CurrencyRates>
          </RateFormControl>

          <RateFormControl>
            <RateSelect
              data-test="exchange-to-currency"
              value={pocketTo.currency}
              onChange={(e) => setPocketTo(pockets.find((p) => p.currency === e.target.value))}
            >
              <MenuItem
                data-test="to-option-USD"
                value={US_DOLLAR}
                disabled={pocket.currency === US_DOLLAR}
              >
                USD
              </MenuItem>
              <MenuItem data-test="to-option-EUR" value={EURO} disabled={pocket.currency === EURO}>
                EUR
              </MenuItem>
              <MenuItem
                data-test="to-option-GBP"
                value={GB_POUND}
                disabled={pocket.currency === GB_POUND}
              >
                GBP
              </MenuItem>
            </RateSelect>

            <TextField
              data-test="exchange-to-amount"
              variant="outlined"
              value={(rates.rates[pocketTo.currency] * amountFrom).toFixed(2)}
              disabled={true}
            />

            <RateAmount variant="body1" data-test="pocket-to-amount">
              You have {pocketTo.amount.toFixed(2)}
            </RateAmount>

            <CurrencyRates>
              <Chip
                data-test="pocket-to-rate"
                label={`1 ${pocketTo.currency} = ${(1 / rates.rates[pocketTo.currency]).toFixed(
                  4
                )} ${pocket.currency}`}
                variant="secondary"
                disabled={true}
              />
            </CurrencyRates>
          </RateFormControl>
        </ExchangeRates>
      ) : (
        <Chip label="Exchange rates are loading..." variant="secondary" disabled={true} />
      )}

      {fetchError && (
        <Alert severity="danger">
          Sorry, but looks like there is an error loading rates: {fetchError}
        </Alert>
      )}

      <OperationsWrapper>
        <Tooltip title="Go Home" placement="bottom">
          <IconButton
            onClick={goToHome}
            data-test="go-home"
            edge="start"
            color="inherit"
            aria-label="home"
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Exchange" placement="bottom">
          <IconButton
            onClick={handleExchange}
            data-test="exchange-done"
            disabled={isExchangeBlocked || isEmptyValue}
            edge="start"
            color="inherit"
            aria-label="exchange"
          >
            <AutorenewIcon />
          </IconButton>
        </Tooltip>
      </OperationsWrapper>
    </ExchangeWrapper>
  )
}

export default Exchange
