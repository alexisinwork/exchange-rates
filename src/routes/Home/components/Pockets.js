import React from 'react'
import { useHistory } from 'react-router-dom'
// Components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// Icons
import AutorenewIcon from '@material-ui/icons/Autorenew'
import AddIcon from '@material-ui/icons/Add'
// Everything else
import { getAmountDigit } from '../../../shared/utils/amount'

import {
  PocketsWrapper,
  Pocket,
  PocketTitle,
  SmallTypography,
  Exchanges,
  OtherPocketsWrapper,
  PocketBlock,
  OperationsWrapper,
  ExchangeWrapper,
  ExchangeTitle,
  ExchangeInfo,
  ExchangeFrom,
  ExchangeTo,
} from './Pockets.styled'

const Pockets = ({ pocket, updatePocket, changePocket, exchanges, pockets }) => {
  const { amount, currency } = pocket

  const history = useHistory()

  const goToExchangePage = () => history.push('/exchange')

  const handleTopUp = () => {
    const updatedPocket = pockets.find((p) => p.currency === currency)
    const updatedIndex = pockets.findIndex((p) => p.currency === currency)

    updatePocket(updatedIndex, { ...updatedPocket, amount: updatedPocket.amount + 10 })
  }

  return (
    <PocketsWrapper>
      <Typography variant="h5">Pockets</Typography>

      <Pocket>
        <PocketTitle>
          <SmallTypography variant="h5" data-test="pocket-sign">
            {getAmountDigit(amount, currency).sign}
          </SmallTypography>
          <Typography variant="h3" data-test="pocket-amount">
            {getAmountDigit(amount, currency).amount}
          </Typography>
          <SmallTypography variant="h5" data-test="pocket-cents">
            {getAmountDigit(amount, currency).cents}
          </SmallTypography>
        </PocketTitle>

        <OtherPocketsWrapper>
          {pockets.map((pocket, i) => (
            <PocketBlock key={i} isActive={pocket.currency === currency} data-test="pocket">
              <Typography variant="body2" data-test="pocket-another-amount">
                {pocket.amount.toFixed(2)}
              </Typography>
              <Button data-test="pocket-switcher" onClick={() => changePocket(pocket.currency)}>
                {pocket.currency}
              </Button>
            </PocketBlock>
          ))}
        </OtherPocketsWrapper>

        <OperationsWrapper>
          <Tooltip title="Top Up" placement="bottom">
            <IconButton
              onClick={handleTopUp}
              data-test="top-up"
              edge="start"
              color="inherit"
              aria-label="top-up"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Exchange" placement="bottom">
            <IconButton
              onClick={goToExchangePage}
              data-test="go-to-exchange"
              edge="start"
              color="inherit"
              aria-label="renew"
            >
              <AutorenewIcon />
            </IconButton>
          </Tooltip>
        </OperationsWrapper>
      </Pocket>

      <Exchanges>
        {exchanges.map((exc, i) => (
          <ExchangeWrapper key={i} data-test="exchange" elevation={1}>
            <ExchangeTitle>
              <IconButton edge="start" color="inherit" aria-label="renew">
                <AutorenewIcon />
              </IconButton>

              <Typography variant="body1" data-test="exchange-info">
                Exchanged {exc.toPocket === currency ? 'to' : 'from'} {pocket.currency}
              </Typography>
            </ExchangeTitle>

            <ExchangeInfo>
              {exc.toPocket === currency ? (
                <>
                  <ExchangeFrom data-test="exchange-from">+ {exc.toAmount.toFixed(2)}</ExchangeFrom>
                  <ExchangeTo data-test="exchange-to">
                    - {exc.fromAmount} {exc.fromPocket}
                  </ExchangeTo>
                </>
              ) : (
                <>
                  <ExchangeFrom data-test="exchange-from">- {exc.fromAmount}</ExchangeFrom>
                  <ExchangeTo data-test="exchange-to">
                    + {exc.toAmount.toFixed(2)} {exc.toPocket}
                  </ExchangeTo>
                </>
              )}
            </ExchangeInfo>
          </ExchangeWrapper>
        ))}
      </Exchanges>
    </PocketsWrapper>
  )
}

export default Pockets
