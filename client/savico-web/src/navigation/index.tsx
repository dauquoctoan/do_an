import { Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Router/PrivateRouter'
import { Divider, Layout, Menu } from 'antd'
import Nav from './components/Nav'
import ROUTER_CONFIG, { PATH } from './Router/config'
import Header from './components/Header'
import styled from 'styled-components'
import Login from '../features/Auth'
import history from '../utils/history'
import style from '../configs/style'
import R from '../utils/R'
import { useState } from 'react'
import { COLOR } from '../configs/theme'
import Configs from '../configs'
import Webview from 'features/Webview'
import NotFoundPage from 'features/NotFound/NotFoundPage'

const { Sider, Content } = Layout

const Navigation = () => {
  return (
    <Switch>
      <Route path={'/login'} exact component={Login} />
      {/* <Route path={'/webview'} exact component={Webview} /> */}
      <Route path={'/webview/:id'} exact component={Webview} />
      <PrivateRoute path="/" component={MainNavigator} />
      <Route path={'*'} exact component={NotFoundPage} />
    </Switch>
  )
}

const MainNavigator = () => {
  const [menuTheme, setMenuTheme] = useState<any>(
    localStorage.getItem(Configs._themeMenu) !== null
      ? localStorage.getItem(Configs._themeMenu)
      : 'light'
  )

  const handleSetThemeMenu = (colorTheme: 'dark' | 'light') => {
    setMenuTheme(colorTheme)
  }

  function handleClick(index: any) {
    history.push(index.key)
  }

  function handleGetCurrentRouter() {
    return Configs.getPathName()
  }

  function handleGetCurrentSelectedRouter() {
    const pathName = Configs.getPathName()
    if (pathName === PATH.GIFT || pathName === PATH.VOUCHER) {
      return PATH.GIFT_AND_VOUCHER
    } else if (
      pathName === PATH.ONLINE_FREQUENCY ||
      pathName === PATH.COUNT_CUSTOMER_EVENT
    ) {
      return PATH.STATISTICAL
    } else {
      return ''
    }
  }

  return (
    <Layout>
      <SideOutStyled
        collapsible
        theme_collapsible={menuTheme}
        collapsedWidth={55}
        breakpoint="xl"
        theme={menuTheme}
        width={230}
      >
        <InfoStyled>
          {/* <img className="logo" src={R.logos.logoInfo} /> */}
        </InfoStyled>
        <Divider style={{ margin: '1px' }} />
        <MenuStyled
          theme={menuTheme}
          triggerSubMenuAction="click"
          onClick={handleClick}
          mode="inline"
          defaultOpenKeys={[handleGetCurrentSelectedRouter()]}
          selectedKeys={[handleGetCurrentRouter()]}
          items={ROUTER_CONFIG.MENUS}
        />
      </SideOutStyled>
      <LayoutItemStyled>
        <Header
          colorTheme={menuTheme}
          handleSetThemeMenu={handleSetThemeMenu}
        />
        <ContentStyled>
          <Nav />
        </ContentStyled>
      </LayoutItemStyled>
    </Layout>
  )
}

export default Navigation

const MenuStyled = styled(Menu)`
  overflow: auto;
  height: calc(100vh - 150px);
  border-right: none;
  font-size: ${style.font.middle.size};
  font-weight: ${style.font.middle.weight};
  ::-webkit-scrollbar {
    display: none !important;
  }
  li:first-child {
    margin-top: 0px;
  }
`

const ContentStyled = styled(Content)`
  overflow: auto;
  height: calc(100vh - 60px);
  ::-webkit-scrollbar {
    display: none;
  }
`
const InfoStyled = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  background-color: ${COLOR.menuDark};
  .logo {
    margin: auto;
    width: 100%;
    height: 50px;
    object-fit: contain;
  }
`
const SideOutStyled = styled(Sider)<any>`
  width: 150px;
  padding-bottom: 0px;
  .ant-layout-sider-trigger {
    background-color: ${(prop) =>
      prop.theme_collapsible === 'dark' ? COLOR.menuDark : COLOR.menuLight};
  }
`
const LayoutItemStyled = styled(Layout)`
  width: 150px;
  height: 100vh;
`
