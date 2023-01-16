import { useEffect, useState } from 'react'
import PageHeader from 'commons/pageHeader'
import { Col, DatePicker, Row, Select, Space, DatePickerProps } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  oTotalExchangeGiftEventLineChart,
  oTotalExchangeGiftLineChart,
  oTotalOrderColumnChart,
} from './OptionsChart'
import styled from 'styled-components'
import { IFormatData, ISumBillOrder } from '../InterfaceStallInfo'
import {
  getSumBillStall,
  getTotalExchangedBill,
  getTotalGiftBills,
} from '../APIStallStatistic'
import moment from 'moment'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { getListEvent } from 'features/event/APIEvent'
const { Option } = Select

type PickerType = 'week' | 'month' | 'year'

const getWeekDateRange = (value: any) => ({
  fromDate: moment(value).startOf('week').format('DD/MM/YYYY'),
  toDate: moment(value).endOf('week').format('DD/MM/YYYY'),
})

const getMonthDateRange = (year: any, month: any) => {
  const moment = require('moment')
  const startDate = moment([year, month - 1])
  const endDate = moment(moment(startDate).endOf('month')).add('days', 1)
  console.log('endDate', startDate, endDate)

  return {
    fromDate: convertTimeStampToString(startDate),
    toDate: convertTimeStampToString(endDate),
  }
}

const getYearDateRange = (value: any) => ({
  fromDate: moment(value).startOf('year').format('DD/MM/YYYY'),
  toDate: moment(value).endOf('year').format('DD/MM/YYYY'),
})

const dataSelect = [
  {
    value: 'week',
    text: 'Tuần',
  },
  {
    value: 'month',
    text: 'Tháng',
  },
  {
    value: 'year',
    text: 'Năm',
  },
]
function StallsStatistic() {
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [typeOrder, settypeOrder] = useState<number>(1)
  const [dataSumBill, setdataSumBill] = useState<IFormatData[]>([])
  const [type, setType] = useState<PickerType>('week')

  const [rangeTime, setRangeTime] = useState<any>({
    fromDate: moment().startOf('week').format('DD/MM/YYYY'),
    toDate: moment(moment().endOf('week')).format('DD/MM/YYYY'),
  })
  const [dateWeek, setDateWeek] = useState(moment())
  const [listEvents, setlistEvents] = useState<any[]>([])
  const [exchangedGiftBillData, setExchangedGiftBillData] = useState<any[]>([])
  const [totalExchangedBills, setTotalExchangedBills] = useState<any[]>([])
  const [eventIdLineChart, setEventIdLineChart] = useState<number>()
  const [eventIdBarChart, setEventIdBarChart] = useState<number>()

  const handleChange = (date?: any) => {
    setDateWeek(date)
    const yearSelected = moment(date).format('YYYY')
    const monthSelected = moment(date).format('MM')

    switch (type) {
      case 'week':
        return setRangeTime(getWeekDateRange(date))
      case 'month':
        return setRangeTime(getMonthDateRange(yearSelected, monthSelected))
      case 'year':
        return setRangeTime(getYearDateRange(date))
    }
  }

  const PickerWithType = ({
    type,
    onChange,
    isDisabled,
  }: {
    type: PickerType
    isDisabled?: boolean
    onChange: DatePickerProps['onChange']
  }) => {
    return (
      <DatePicker
        disabled={isDisabled}
        style={{ width: '190px' }}
        placeholder={`Chọn kỳ theo ${placeholderDesc(type)}`}
        picker={type}
        onChange={onChange}
        value={dateWeek}
      />
    )
  }

  const placeholderDesc = (type: string) => {
    switch (type) {
      case 'week':
        return 'tuần'
      case 'month':
        return 'tháng'
      case 'quarter':
        return 'quý'
      case 'year':
        return 'năm'
      default:
        return
    }
  }

  const getDataSumOrder = async () => {
    try {
      const res = await getSumBillStall(typeOrder, eventIdBarChart)
      if (res.data) {
        const data = res.data.map((item) => {
          return {
            name: item.name,
            y: item.sumBill,
          }
        })
        setdataSumBill(data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setisLoading(false)
    }
  }

  const getTotaExchangedlGiftBills = async () => {
    try {
      if (eventIdLineChart) {
        const res = await getTotalGiftBills({
          EventID: eventIdLineChart,
        })
        if (res.status) {
          const data = res?.data?.map((item: any) => ({
            name: item?.time,
            y: item.values,
          }))
          setExchangedGiftBillData(data)
        }
      } else {
        const res = await getTotalGiftBills(rangeTime)

        if (res.status) {
          const data = res?.data?.map((item: any) => ({
            name: item?.time.slice(0, 5),
            y: item.values,
          }))
          setExchangedGiftBillData(data)
        }
      }
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  const getTotalExchangedBills = async () => {
    try {
      if (eventIdLineChart) {
        const res = await getTotalExchangedBill({
          EventID: eventIdLineChart,
        })

        if (res.status) {
          const data = res?.data?.map((item: any) => ({
            name: item?.time,
            y: item.values,
          }))
          setTotalExchangedBills(data)
        }
      } else {
        const res = await getTotalExchangedBill(rangeTime)

        if (res.status) {
          const data = res?.data?.map((item: any) => ({
            name: item?.time.slice(0, 5),
            y: item.values,
          }))
          setTotalExchangedBills(data)
        }
      }
    } catch (error) {
      console.log('ERROR: ', error)
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
    getListEvents()
  }, [])

  // useEffect(() => {
  //   handleChange()
  // }, [type])

  useEffect(() => {
    getDataSumOrder()
  }, [typeOrder, eventIdBarChart])

  useEffect(() => {
    getTotaExchangedlGiftBills()
    getTotalExchangedBills()
  }, [rangeTime, type, eventIdLineChart])

  return (
    <>
      <PageHeader title="Thông tin gian hàng" />
      <WapperStyled>
        <br />
        <Row justify="center" gutter={[16, 16]}>
          <Col>
            <Space>
              <Select
                defaultValue={1}
                onChange={(value: number) => settypeOrder(value)}
              >
                <Option value={1}>Top 10 nhiều hoá đơn nhất</Option>
                <Option value={2}>Top 10 ít hoá đơn nhất</Option>
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
                  <Option value={item.id} key={index}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
        </Row>
        <br />
        <HighchartsReact
          highcharts={Highcharts}
          options={oTotalOrderColumnChart(dataSumBill)}
          updateArgs={[true]}
          containerProps={{ style: { height: '100%', width: '100%' } }}
        />
      </WapperStyled>
      <WapperStyled>
        <WapperFilter>
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Space>
                <Select
                  disabled={eventIdLineChart ? true : false}
                  value={type}
                  onChange={(value) => {
                    setType(value)
                    const yearSelected = moment(moment()).format('YYYY')
                    const monthSelected = moment(moment()).format('MM')
                    switch (value) {
                      case 'week':
                        return setRangeTime(getWeekDateRange(moment()))
                      case 'month':
                        return setRangeTime(
                          getMonthDateRange(yearSelected, monthSelected)
                        )
                      case 'year':
                        return setRangeTime(getYearDateRange(moment()))
                    }
                  }}
                >
                  {dataSelect.map((item, index) => (
                    <Option value={item.value} key={index}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
                <PickerWithType
                  isDisabled={eventIdLineChart ? true : false}
                  type={type}
                  onChange={handleChange}
                />
                <Select
                  style={{ width: 200 }}
                  placeholder="Chọn chiến dịch"
                  onChange={(value: number | undefined) => {
                    setEventIdLineChart(value)
                  }}
                  allowClear
                >
                  {listEvents.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>
          </Row>
        </WapperFilter>
        <Row gutter={[16, 16]}>
          <Col xxl={12} xl={12} md={12} xs={24} sm={24}>
            <HighchartsReact
              highcharts={Highcharts}
              options={oTotalExchangeGiftLineChart(exchangedGiftBillData)}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          </Col>
          <Col xxl={12} xl={12} md={12} xs={24} sm={24}>
            <HighchartsReact
              highcharts={Highcharts}
              options={oTotalExchangeGiftEventLineChart(totalExchangedBills)}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          </Col>
        </Row>
      </WapperStyled>
    </>
  )
}

const WapperStyled = styled.div`
  padding-top: 10px;
  margin: 0px 5px 10px 5px;
  background-color: white;
`

const WapperFilter = styled.div`
  padding: 10px 0 20px 0;
  text-align: center;
`

export default StallsStatistic
