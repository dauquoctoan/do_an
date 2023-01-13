import { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  oAgePieChart,
  oChanelGenderPieChart,
  oGenderPieChart,
} from './OptionsChart'
import { Col, Row, Select, Spin } from 'antd'
import styled from 'styled-components'
import {
  getListCustomerPercentageAge,
  getListPercentageGenderCustomer,
  getListCustomerChannelPercentage,
} from '../APICustomerReport'
import { getListEvent } from 'features/event/APIEvent'

const WapperChart = styled.div`
  text-align: center;
  padding: 15px 0 10px 0;
`

function Customers() {
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [optionCustomerAge, setoptionCustomerAge] = useState<any[]>([])
  const [optionGenderCustomer, setoptionGenderCustomer] = useState<any[]>([])
  const [oprionCustomerChanel, setoprionCustomerChanel] = useState<any[]>([])
  const [listEvents, setlistEvents] = useState<any[]>([])
  const [eventId, setEventId] = useState<number>()

  const getData = async (api: any, dataState: any) => {
    setisLoading(true)
    try {
      let res: any
      if (eventId) {
        res = await api
      } else {
        res = await api()
      }
      if (res.data) {
        const data = res.data.map((item: any) => {
          return {
            name: item.name ? item.name : item.gender,
            y: item.percent || item.precent,
          }
        })
        dataState(data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setisLoading(false)
    }
  }

  const getListEvents = async () => {
    setisLoading(true)
    try {
      const res = await getListEvent({})
      if (res.data) {
        setlistEvents(res.data.data)
      }
    } catch (err) {
      console.log('ERROR: ', err)
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    if (eventId) {
      getData(getListCustomerPercentageAge(eventId), setoptionCustomerAge)
      getData(getListPercentageGenderCustomer(eventId), setoptionGenderCustomer)
      getData(
        getListCustomerChannelPercentage(eventId),
        setoprionCustomerChanel
      )
    } else {
      getData(getListCustomerPercentageAge, setoptionCustomerAge)
      getData(getListPercentageGenderCustomer, setoptionGenderCustomer)
      getData(getListCustomerChannelPercentage, setoprionCustomerChanel)
    }
  }, [eventId])

  useEffect(() => {
    getListEvents()
  }, [])

  return (
    <>
      <Row justify="center">
        <Select
          style={{ width: 200 }}
          placeholder="Chọn chiến dịch"
          onChange={(value: number | undefined) => {
            setEventId(value)
          }}
          allowClear
        >
          {listEvents.map((item, index) => (
            <Select.Option value={item.id} key={index}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Row>
      <br />
      <br />
      <Row gutter={[16, 16]}>
        <Col xxl={8} xl={8} md={12} xs={24} sm={24}>
          <Spin spinning={isLoading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={oAgePieChart(optionCustomerAge)}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          </Spin>
        </Col>
        <Col xxl={8} xl={8} md={12} xs={24} sm={24}>
          <Spin spinning={isLoading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={oGenderPieChart(optionGenderCustomer)}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          </Spin>
        </Col>
        <Col xxl={8} xl={8} md={12} xs={24} sm={24}>
          <Spin spinning={isLoading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={oChanelGenderPieChart(oprionCustomerChanel)}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          </Spin>
        </Col>
      </Row>
    </>
  )
}

export default Customers
