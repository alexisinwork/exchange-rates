import styled from 'styled-components'
// Components
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

export const PocketsWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Pocket = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`

export const PocketTitle = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: rgba(33, 150, 243, 1);
  padding: 60px 20px;
  width: 175px;
  height: 175px;
  box-sizing: border-box;
  border-radius: 50%;
  color: white;
`

export const SmallTypography = styled(Typography)`
  margin-bottom: 4px;
  font-family: 'Roboto';
`

export const Exchanges = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: center;
  margin-top: 25px;
`

export const OtherPocketsWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const PocketBlock = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  margin-rigth: 8px;
  margin-top: 20px;

  ${({ isActive }) => isActive && 'background-color: rgba(33, 150, 243, 0.4)'}
`

export const OperationsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  > * {
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(33, 150, 243, 1);
  }

  > *:last-child {
    margin-left: 25px;
  }
`

export const ExchangeWrapper = styled(Paper)`
  width: 100%;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

export const ExchangeTitle = styled.div`
  display: flex;
  align-items: center;
`

export const ExchangeInfo = styled(Typography)`
  display: flex;
  flex-direction: column;
`

export const ExchangeFrom = styled.span`
  font-size: 20px;
`

export const ExchangeTo = styled.span`
  font-size: 12px;
`
