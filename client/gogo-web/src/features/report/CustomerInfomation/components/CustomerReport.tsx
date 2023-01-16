import { Tabs } from 'antd'
import PageHeader from 'commons/pageHeader'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Customers from './Customers'
import Residential from './Residential'

const Wapper = styled.div`
  margin: 5px;
  padding: 10px;
  background-color: white;
`

function CustomerReport() {
  return (
    <>
      <PageHeader title="Thông tin khách hàng" />
      <Wapper>
        <Tabs>
          <Tabs.TabPane tab="Dân cư" key="1">
            <Residential />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông tin khách hàng" key="2">
            <Customers />
          </Tabs.TabPane>
        </Tabs>
      </Wapper>
    </>
  )
}

export default CustomerReport
