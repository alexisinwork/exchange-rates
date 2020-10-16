import styled from 'styled-components'
// Components
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'

export const HomeContainer = styled.div`
  max-width: 60%;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HomeHeader = styled(Typography)`
  margin-bottom: 2%;
`

export const DemoAlert = styled(Alert)`
  width: 60%;
  margin-top: 25px;
`
