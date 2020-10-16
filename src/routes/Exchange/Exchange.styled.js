import styled from 'styled-components'
// Components
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

export const ExchangeWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CurrencyRates = styled.div`
  margin-top: 10px;
`

export const ExchangeRates = styled.div`
  display: flex;
  width: 40%;
  margin-top: 40px;
  justify-content: space-between;
  align-items: center;
`

export const RateFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const RateSelect = styled(Select)`
  width: 80px;
  margin-bottom: 20px;
`

export const RateAmount = styled(Typography)`
  margin-top: 10px;
`

export const Highlighted = styled.span`
  ${({ isHighlighted }) => isHighlighted && 'color: red'}
`

export const ExchangeOperations = styled.div`
  dislay: flex;
  align-items: center;
`
