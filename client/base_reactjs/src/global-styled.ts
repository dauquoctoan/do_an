import { createGlobalStyle } from 'styled-components'
import { IColor } from './configs/theme'

interface IPropsGlobalStyle {
  color: IColor
}

export default createGlobalStyle<IPropsGlobalStyle>`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Nanum+Gothic:wght@400;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
  body {
    font-family: Manrope !important;
    margin: 0;
    padding: 0;
  }
  .notification-success{
    border-left: solid 10px;
    border-color: ${(props) => props.color.successColor};
  }
  .notification-error{
    border-left: solid 10px;
    border-color: ${(props) => props.color.errorColor};
  }
  .notification-warning{
    border-left: solid 10px;
    border-color: ${(props) => props.color.warningColor};
  }
  .notification-info{
    border-left: solid 10px;
    border-color: ${(props) => props.color.infoColor};
  }
`
