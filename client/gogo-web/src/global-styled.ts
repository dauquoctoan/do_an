import { Form, Modal } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import style from './configs/style'
import { COLOR, IColor } from './configs/theme'

export default createGlobalStyle`
  body {
    font-family: Poppins, sans-serif;
    margin: 0;
    padding: 0;
    font-size: ${style.font.middle};
  }
  .notification-success{
  border-left: solid 10px;
  border-color: ${COLOR.successColor};
  }
  .notification-error{
  border-left: solid 10px;
  border-color: ${COLOR.errorColor};
  }
  .notification-warning{
  border-left: solid 10px;
  border-color: ${COLOR.warningColor};
  }
  .notification-info{
  border-left: solid 10px;
  border-color: ${COLOR.infoColor};
  }

  .ant-popover-placement-bottomRight{
    padding-top: 0px;
    .ant-popover-inner-content{
      padding: 0px;
    }
  }

  .ant-row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .ant-input-number {
    width: 100%;
  }
  
  .ant-input-number-in-form-item {
    width: 100%;

  }

  .rdw-embedded-modal {
    background: #fff;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    box-shadow: 3px 3px 5px #bfbdbd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    left: 5px;
    padding: 15px;
    position: absolute;
    top: 35px;
    width: 235px;
    z-index: 100;
  }

  .ant-popover-arrow-content{
    display: none;
  }
  .ant-scroll-number{
    left: 0 !important;
    right: auto;
    width: auto;
  }
  .ant-pagination-options {
    display: none;
  }

  .ant-input-number-group-wrapper {
    width: 100%;
  }
  .ant-menu{
    background-color: ${COLOR.menuDark};
    color: white;
  }
  .ant-layout-sider{
    background-color: ${COLOR.menuDark};
    color: white;
  }
  .ant-menu-sub{
    background-color: #233044 !important;
    color: white !important;
  }
`
export const ContainScreenStyled = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 40px);
  /* min-height: calc(400vh); */
  border: ${style.border};
  /* background-color: ; */
  /* padding: ${style.padding.all}; */
`
export const FormStyled = styled(Form)`
  .ant-form-item-label {
    text-align: left;
  }
`
export const ModalStyled = styled(Modal)<any>`
  .ant-modal-header {
    padding: 12px;
    background-color: #fafafa;
  }

  .ant-modal-close-x {
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    .anticon {
      margin: auto;
    }
  }
  .ant-modal-body {
    padding: ${(props) => (props.padding ? props.padding : '15px')};
  }

  input[type='text'],
  input[type='number'],
  textarea {
    font-size: 16px;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    select,
    textarea,
    input {
      font-size: 16px;
    }
  }
`
export const WrapperExpandStyled = styled.div`
  .ant-table {
    margin: 0px !important;
  }
  .ant-table-bordered {
    margin: 0px !important;
  }

  .ant-pagination-options {
    display: none;
  }
`
export const InfoStyled = styled.div`
  cursor: pointer;
  :hover {
    color: ${COLOR.primaryColor};
  }
  font-weight: 600;
`
