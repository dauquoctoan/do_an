import { Col, Row, Select, Space } from 'antd'
import PageHeader from 'commons/pageHeader'
import { getListEvent } from 'features/event/APIEvent'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import styled from 'styled-components'
import { getSumBillCategory } from '../StallsInfomation/APIStallStatistic'
import { oTotalOrderColumnChart } from '../StallsInfomation/components/OptionsChart'

const CategoryReportPage = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [typeOrder, settypeOrder] = React.useState<number>(1)
  const [listEvents, setlistEvents] = React.useState<any[]>([])
  const [eventIdBarChart, setEventIdBarChart] = React.useState<number>()
  const [dataSumBill, setdataSumBill] = React.useState<any[]>([])

  const getData = async () => {
    try {
      const res = await getSumBillCategory(typeOrder, eventIdBarChart)
      if (res.data) {
        const data = res.data.map((item: any) => {
          return {
            name: item.name,
            y: item.averageBillPrice,
          }
        })
        setdataSumBill(data)
      }
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  const getListEvents = async () => {
    setIsLoading(true)
    try {
      const res = await getListEvent({})
      if (res.data) {
        setlistEvents(res.data.data)
      }
    } catch (err) {
      console.log('ERROR: ', err)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getListEvents()
  }, [])

  React.useEffect(() => {
    getData()
  }, [typeOrder, eventIdBarChart])

  return (
    <>
      <PageHeader title="Thông tin ngành hàng" />
      <WrapperStyled>
        <br />
        <Row justify="center" gutter={[16, 16]}>
          <Col>
            <Space>
              <Select
                defaultValue={1}
                onChange={(value: number) => settypeOrder(value)}
              >
                <Select.Option value={1}>
                  Top 10 nhiều hoá đơn nhất
                </Select.Option>
                <Select.Option value={2}>Top 10 ít hoá đơn nhất</Select.Option>
              </Select>
              <Select
                style={{ width: 200 }}
                placeholder="Chọn chiến dịch"
                onChange={(value: number | undefined) => {
                  setEventIdBarChart(value)
                }}
                allowClear
              >
                {listEvents.map((item, index) => (
                  <Select.Option value={item.id} key={index}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Col>
        </Row>
        <br />
        <HighchartsReact
          highcharts={Highcharts}
          options={oTotalOrderColumnChart(
            dataSumBill,
            'TỔNG GIÁ TRỊ HOÁ ĐƠN TRUNG BÌNH CỦA CÁC NGÀNH HÀNG',
            'Ngành hàng',
            'Giá trị hoá đơn',
            'Giá trị hoá đơn'
          )}
          updateArgs={[true]}
          containerProps={{ style: { height: '100%', width: '100%' } }}
        />
      </WrapperStyled>
    </>
  )
}

const WrapperStyled = styled.div`
  padding-top: 10px;
  margin: 0px 5px 10px 5px;
  background-color: white;
`

export default CategoryReportPage
