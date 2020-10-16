import React from 'react'
// Components
import Typography from '@material-ui/core/Typography'
// Icons
// Everything else
import { HomeContainer, HomeHeader, DemoAlert } from './Home.styled'
import Pockets from './components/Pockets'

const Home = ({
  pocket,
  pockets,
  updatePocket,
  changePocket,
  exchanges,
}) => {
  return (
    <HomeContainer>
      <HomeHeader variant="h4">Welcome back to the Exchanginjho Ratinjo!</HomeHeader>

      <Typography variant="body1">
        In our #1 exchange converter you can see your 3 pockets (EUR, GBP, USD) 
        and transfer money between them!
      </Typography>

      <DemoAlert severity="warning">
        This is just a demo! So to see your actual account you need to login
      </DemoAlert>

      <Pockets
        pocket={pocket}
        pockets={pockets}
        updatePocket={updatePocket}
        changePocket={changePocket}
        exchanges={exchanges}
      />
    </HomeContainer>
  )
}

export default Home
