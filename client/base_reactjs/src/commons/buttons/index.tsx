import { Button } from 'antd'
import styled from 'styled-components'

export const ButtonStyled = styled(Button)`
  /* border: none; */
  :hover {
    transform: scale(1.02);
  }
`

export const ButtonAdd = () => {
  return <ButtonStyled>Thêm</ButtonStyled>
}
