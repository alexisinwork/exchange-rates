// 3-rd parties
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom"
// Components
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
// Icons
import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// Routes
import Home from './routes/Home/Home'
import Exchange from './routes/Exchange/Exchange'
// Everything else
import { AppContainer, AppToolbar, RouterLinkButton } from './App.styled'
import { US_DOLLAR, defaultExchanges, defaultPockets } from './shared/constants/exchangeRates'
import { filterExchanges } from './shared/utils/amount'
import { fetchRatesPolling } from './shared/utils/fetchRates'

// Run long-polling
const updateRatesCallback = fetchRatesPolling(US_DOLLAR)

const App = () => {
  const [pockets, setPockets] = useState(defaultPockets)
  const [pocket, setPocket] = useState(defaultPockets[0])
  const [exchanges, setExchanges] = useState(filterExchanges(defaultPockets[0].currency, defaultExchanges))
  const [allExchanges, setAllExchanges] = useState(defaultExchanges)

  const updatePocket = (updatedIdx, updatedPocket) => {
    const updatedPockets = pockets.map((p, i) =>
      i === updatedIdx ? updatedPocket : p
    )

    setPockets(updatedPockets)
    setPocket(updatedPocket)
  }

  const changePocket = (currency) => {
    const newPocket = pockets.find(p => p.currency === currency)

    setExchanges(filterExchanges(newPocket.currency, allExchanges))
    setPocket(newPocket)
  }

  const addExchange = (exchange) => {
    const excs = [ exchange, ...allExchanges ]
    const updatedPockets = pockets.map(p => {
      if (p.currency === exchange.fromPocket) return { ...p, amount: p.amount - exchange.fromAmount }
      if (p.currency === exchange.toPocket) return { ...p, amount: p.amount + exchange.toAmount }
      return p
    })
    const updatedPocket = updatedPockets.find(p => p.currency === exchange.fromPocket)

    setAllExchanges(excs)
    setExchanges(filterExchanges(pocket.currency, excs))
    // Update Pockets
    setPockets(updatedPockets)
    setPocket(updatedPocket)
  }

  return (
    <Router>
      <AppContainer>
        <AppBar position="static">
          <AppToolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <AspectRatioIcon />
            </IconButton>
            <Typography variant="h6">
              <RouterLinkButton color="primary">
                <RouterLink to="/">Home</RouterLink>
              </RouterLinkButton>
              <RouterLinkButton color="primary">
                <RouterLink to="/exchange">Exchange</RouterLink>
              </RouterLinkButton>
            </Typography>
            <Tooltip title="Login" placement="bottom">
              <IconButton disabled={true} edge="start" color="inherit" aria-label="menu">
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </AppToolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Home 
              pocket={pocket}
              pockets={pockets}
              updatePocket={updatePocket}
              changePocket={changePocket}
              exchanges={exchanges}
            />
          </Route>
          <Route path="/exchange">
            <Exchange
              updateRatesCallback={updateRatesCallback}
              pocket={pocket}
              pockets={pockets}
              updatePocket={updatePocket}
              changePocket={changePocket}
              addExchange={addExchange}
            />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  )
}

export default App
