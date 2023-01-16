import { Popover } from 'antd'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import style from '../../configs/style'
import { COLOR } from '../../configs/theme'

const Notification = () => {
  const [notifications, setNotifications] = useState<any>()
  const timerRef: any = useRef(null)

  const isLoadMore = (event: any) => {
    return (
      event.target.scrollHeight -
        Math.round(event.target.scrollTop) -
        event.target.clientHeight <
      0.001
    )
  }

  const loadMoreNotification = () => {
    timerRef.current = setTimeout(() => {
      console.log('test')
    }, 1000)
  }

  return (
    <WrapperPopContentNtf>
      <div className="header">
        <div className="header-desc">Thông báo</div>
        <Popover
          placement="bottomRight"
          className="popover"
          trigger="click"
          content={
            <WrapperNotification>
              <div className="item">Đọc tất cả thông báo</div>
              <div className="item">Đọc tất cả thông báo</div>
            </WrapperNotification>
          }
        >
          <div className="header-menu">...</div>
        </Popover>
      </div>
      <div
        onScroll={(event: any) => {
          //   if (isLoadMore(event)) {
          //     loadMoreNotification()
          //   }
        }}
        className="content"
      >
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
        <div className="content-item">Thông báo 1</div>
      </div>
      <div className="footer">Footer</div>
    </WrapperPopContentNtf>
  )
}

export default Notification

const WrapperPopContentNtf = styled.div`
  width: 350px;
  height: 65vh;
  .header {
    width: 100%;
    padding: 10px 10px;
    border-bottom: ${style.border};
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    .header-desc {
      color: ${COLOR.primaryColor};
    }
    .header-menu {
      cursor: pointer;
      font-size: 20px;
    }
  }
  .content {
    width: 100%;
    height: calc(65vh - 84px);
    overflow-y: auto;
  }
  .footer {
    height: 40px;
    text-align: center;
  }
  .content-item {
    height: 60px;
    padding: 10px 20px;
    cursor: pointer;
  }
  .content-item:hover {
    background-color: #fafafa;
  }
`

const WrapperNotification = styled.div`
  .item {
    cursor: pointer;
    padding: 5px 10px;
  }
  .item:hover {
    background-color: #fafafa;
  }
`
