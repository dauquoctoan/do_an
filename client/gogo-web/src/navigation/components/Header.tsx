import { Popover, Badge, Collapse } from 'antd'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Configs from '../../configs'
import configs from '../../configs'
import style from '../../configs/style'
import { COLOR } from '../../configs/theme'
import history from '../../utils/history'
import R from '../../utils/R'
import ROUTER_CONFIG from '../Router/config'
import { IRouter } from '../Router/interface'
import Notification from './Notification'
const { Panel } = Collapse
const {
  HeaderMenu,
  HeaderNotification,
  HeaderLogout,
  HeaderUserInfo,
  MenuCollapse,
} = R.icons

const Header = ({}) => {
  const [titleHeader, setTitleHeader] = useState<String>('')

  // const [visitableCollapse, setVisitableCollapse] = useState<boolean>(false)

  const handleLogout = () => {
    Cookies.remove(configs._sessionId)
    history.replace('/login')
  }

  useEffect(() => {
    const indexRouter: IRouter | undefined = ROUTER_CONFIG.ROUTERS.find(
      (item: IRouter) => {
        return item?.path === Configs.getPathName()
      }
    )
    setTitleHeader(indexRouter ? indexRouter.title : '')
  }, [Configs.getPathName()])

  return (
    <HeaderStyled>
      <div className="item-left">
        {/* <MenuCollapse
          onClick={() => {
            setVisitableCollapse(!visitableCollapse)
          }}
          className="icon"
        /> */}
        {/* {titleHeader !== ''
          ? titleHeader.toUpperCase()
          : R.strings().menu__home} */}
      </div>
      <ItemRight>
        <Popover
          placement="bottomRight"
          className="popover"
          content={<Notification />}
          trigger="click"
        >
          <Badge size="small" className="badge-notification" count={1111}>
            <HeaderNotification />
          </Badge>
        </Popover>
        <Popover
          placement="bottomRight"
          className="popover"
          content={
            <WrapperPopContentMenu>
              {/* <Collapse ghost>
                <PanelItemStyled
                  colorTheme={colorTheme}
                  header="Chủ đề menu"
                  key="2"
                >
                  <div
                    className="panel-item"
                    onClick={() => {
                      handleSetThemeMenu('dark')
                      localStorage.setItem(Configs._themeMenu, 'dark')
                    }}
                  >
                    <div className="desc-item-dark">Dark theme</div>
                    <div className="color color-dark"></div>
                  </div>
                  <div
                    className="panel-item"
                    onClick={() => {
                      handleSetThemeMenu('light')
                      localStorage.setItem(Configs._themeMenu, 'light')
                    }}
                  >
                    <div className="desc-item-light">Light theme</div>
                    <div className="color color-light"></div>
                  </div>
                </PanelItemStyled>
              </Collapse> */}
              <PopItemStyled className="pop-item">
                <HeaderUserInfo />
                <div className="desc">{R.strings().menu__account}</div>
              </PopItemStyled>
              <PopItemStyled className="pop-item" onClick={handleLogout}>
                <HeaderLogout />
                <div className="desc"> {R.strings().btn__logout}</div>
              </PopItemStyled>
            </WrapperPopContentMenu>
          }
          trigger="click"
        >
          <div className="contain-icon">
            <HeaderMenu className="icon-menu-header" />
          </div>
        </Popover>
      </ItemRight>
    </HeaderStyled>
  )
}

export default Header

const HeaderStyled = styled.div`
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: ${style.border};
  /* border-bottom: ${style.border}; */
  /* border-color: #a8a6a6; */
  padding: 15px;
  /* background-color: #fafafa; */
  .badge-notification {
    margin-right: 40px;
    font-size: 20px;
    cursor: pointer;
  }

  .icon-menu-header {
    font-size: 20px;
  }
  .contain-icon {
    cursor: pointer;
    padding: 5px;
  }
  .collapse-icon {
    font-size: 20px;
    cursor: pointer;
  }
  .item-left {
    display: flex;
    justify-content: center;
    .icon {
      font-size: 20px;
      margin-right: 20px;
    }
  }
`
const ItemRight = styled.div`
  display: flex;
  align-items: center;
`
const PopItemStyled = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    /* background-color: #fafafa; */
    color: ${COLOR.primaryColor};
  }
  .desc {
    margin-left: 10px;
  }
`
const WrapperPopContentMenu = styled.div`
  min-width: 200px;
`
const PanelItemStyled = styled(Panel)<any>`
  .ant-collapse-header-text:hover {
    color: ${COLOR.primaryColor};
  }
  .ant-collapse-content-box {
    padding: 0px !important;
  }
  .panel-item {
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 20px;
    justify-content: space-around;
    :hover {
      color: ${COLOR.primaryColor};
    }
    .color {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left: 20px;
    }
    .color-dark {
      background-color: ${COLOR.menuDark};
      border: 2px solid
        ${(props) =>
          props.colorTheme === 'dark' ? COLOR.primaryColor : 'black'};
    }
    .color-light {
      background-color: white;
      border: 2px solid
        ${(props) =>
          props.colorTheme === 'light' ? COLOR.primaryColor : 'black'};
    }
    .desc-item-light {
      color: ${(props) =>
        props.colorTheme === 'light' ? COLOR.primaryColor : 'black'};
    }
    .desc-item-dark {
      color: ${(props) =>
        props.colorTheme === 'dark' ? COLOR.primaryColor : 'black'};
    }
  }
`
