import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd'
import styled from 'styled-components'

export const InputStyled = styled(Input)`
  border-radius: 8px;
  height: 45px;
  background-color: white;
  .ant-input-focused .ant-input:focus {
    outline: none !important;
  }
`

export const InputNumberStyled = styled(InputNumber)`
  border-radius: 8px;
  width: 100%;
  margin-right: 10px;
  .ant-input-number-input {
    height: 45px;
  }
  background-color: white;
  .ant-input-focused .ant-input:focus {
    outline: none !important;
  }
`

export const DatePickerStyled = styled(DatePicker)`
  border-radius: 8px;
  height: 45px;
  background-color: white;
  .ant-input-focused .ant-input:focus {
    outline: none !important;
  }
`

export const SelectStyled = styled(Select)`
  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-item {
    line-height: 45px !important;
  }
  .ant-select-selector {
    height: 45px !important;
    border-radius: 8px !important;
  }
  .ant-select-selection-placeholder {
    /* color: #647C9C; */
    line-height: 45px !important;
  }
`

export const DivWapper = styled.div`
  background-color: #efefef52;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`
export const ButtonStyled = styled(Button)`
  height: 43px;
  width: 100%;
  background-color: #0686f8;
  border: none !important;
  border-radius: 8px;
`
export const CardStyled = styled(Card)`
  width: 400px;
  border: none;
  box-shadow: 0 0 10px #ecf0f1;
  border-radius: 8px;
`
