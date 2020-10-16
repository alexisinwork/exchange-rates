import styled from 'styled-components'
// Components
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

export const AppContainer = styled.div``

export const AppToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`

export const RouterLinkButton = styled(Button)`
  a {
    font-weight: bold;
    text-decoration: none;
    color: white;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    
    &:hover {
      background-color: rgba(0,0,0,0.2)
    }

    &:focus, 
    &:visited {
      color: white
    }

    &.active {
      background-color: rgba(0,0,0,0.2)
    }
  }
`
