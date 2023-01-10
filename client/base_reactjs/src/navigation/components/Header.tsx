import { Button } from 'antd'
import Cookies from 'js-cookie'
import { useState } from 'react'
import styled from 'styled-components'
import configs from '../../configs'
import history from '../../utils/history'

const Header = () => {
  const handleLogout = () => {
    Cookies.remove(configs._sessionId)
    history.replace('/login')
  }

  return (
    <HeaderStyled>
      <Button onClick={handleLogout}>Đăng xuất</Button>
    </HeaderStyled>
  )
}

export default Header

const HeaderStyled = styled.div`
  height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
