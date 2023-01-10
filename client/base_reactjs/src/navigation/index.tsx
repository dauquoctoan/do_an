import { Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Router/PrivateRouter'
import { Divider, Layout, Menu } from 'antd'
import Nav from './components/Nav'
import ROUTER_CONFIG from './Router/config'
import Header from './components/Header'
import styled from 'styled-components'
import Login from '../features/Auth'
import history from '../utils/history'
import R from '../utils/R'

const { Sider, Content } = Layout

const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={'/login'} exact component={Login} />
        <PrivateRoute path="/" component={MainNavigator} />
      </Switch>
    </Router>
  )
}

const MainNavigator = () => {
  function handleClick(e: any) {
    history.push(e.key)
  }

  function handleGetCurrentRouter() {
    return window.location.pathname
  }
  const items = [
    { label: R.strings().menu_home, key: ROUTER_CONFIG.PATH.Home },
    { label: R.strings().menu_product, key: ROUTER_CONFIG.PATH.Product },
  ]

  return (
    <Layout>
      <Sider
        breakpoint="xl"
        collapsible
        theme="light"
        className="main-sider"
        style={{
          overflow: 'auto',
          height: '100vh',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
          }}
        ></div>
        <Divider style={{ margin: '10px 0' }} />
        <MenuStyled
          triggerSubMenuAction="click"
          onClick={handleClick}
          mode="inline"
          selectedKeys={[handleGetCurrentRouter()]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <ContentStyled>
          <Nav />
        </ContentStyled>
      </Layout>
    </Layout>
  )
}

export default Navigation

const MenuStyled = styled(Menu)`
  overflow: auto;
  height: calc(100vh - 200px);
  ::-webkit-scrollbar {
    display: none !important;
  }
`

const ContentStyled = styled(Content)`
  overflow: auto;
  height: calc(100vh - 60px);
  ::-webkit-scrollbar {
    display: none;
  }
`
