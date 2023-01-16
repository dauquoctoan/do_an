import type { DatePickerProps } from 'antd'
import { Col, DatePicker, message, Row, Select, Space, Spin } from 'antd'
import { getListEvent } from 'features/event/APIEvent'
import { oTotalExchangeGiftLineChart } from 'features/report/StallsInfomation/components/OptionsChart'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { convertTimeStampToString } from 'utils/TimerHelper'
import {
  getCountCustomerByDay,
  getListPercentDistrict,
  getListPercentPrivinces,
  getSumCustomerJoinEvent,
  getSumCustomerJoinEventById,
} from '../APICustomerReport'
import { IDataChart, IFMListPercentResident } from '../InterfaceCustomerReport'
import {
  oCountCustomerLineChart,
  oProvinceVicinitytPieChart,
  oResidentLBColumnChart,
} from './OptionsChart'
const { Option } = Select

type PickerType = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year'

const Wapper = styled.div`
  text-align: center;
  padding: 30px 0;
  width: 100%;
`

const dataSelectSamePriod = [
  {
    value: 'week',
    text: 'Tuần',
  },
  {
    value: 'month',
    text: 'Tháng',
  },
  {
    value: 'quarter',
    text: 'Quý',
  },
  {
    value: 'year',
    text: 'Năm',
  },
]

const dataSelectDate = [
  {
    value: 'date',
    text: 'Ngày',
  },
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

const getWeekDateRange = (value: any) => ({
  fromDate: moment(value).startOf('week').format('DD/MM/YYYY'),
  toDate: moment(value).endOf('week').format('DD/MM/YYYY'),
})

const getMonthDateRange = (year: any, month: any) => {
  const moment = require('moment')

  // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
  // array is 'year', 'month', 'day', etc
  const startDate = moment([year, month - 1])

  // Clone the value before .endOf()
  const endDate = moment(moment(startDate).endOf('month')).add('days', 1)

  // make sure to call toDate() for plain JavaScript date type
  return {
    fromDate: convertTimeStampToString(startDate),
    toDate: convertTimeStampToString(endDate),
  }
}

const getQuarterDateRange = (value: any) => ({
  fromDate: moment(value).startOf('quarter').format('DD/MM/YYYY'),
  toDate: moment(moment(value).endOf('quarter'))
    .add('days', 1)
    .format('DD/MM/YYYY'),
})

const getYearDateRange = (value: any) => ({
  fromDate: moment(value).startOf('year').format('DD/MM/YYYY'),
  toDate: moment(value).endOf('year').format('DD/MM/YYYY'),
})

function Residential() {
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [displayType, setdisplayType] = useState<string>('column')
  const [arrCategories, setarrCategories] = useState<Array<string>>([])
  const [dataChart, setdataChart] = useState<IDataChart[]>([])
  const [calendarType, setcalendarType] = useState<PickerType>('week')
  const [listEvents, setlistEvents] = useState<any[]>([])
  const [eventIdBarChart, setEventIdBarChart] = useState<number>()
  const [eventIdPieChart, setEventIdPieChart] = useState<number>()
  const [totalCustomer, setTotalCustomer] = useState<any[]>([])

  const [rangeTime, setrangeTime] = useState<any>({
    fromDate: moment().startOf('week').format('DD/MM/YYYY'),
    toDate: moment(moment().endOf('week')).format('DD/MM/YYYY'),
  })
  const [dateTime, setdateTime] = useState<any>({
    Date: moment().format('DD/MM/YYYY'),
  })
  const [listResidentDistrict, setdataResidentDistrict] = useState<
    IFMListPercentResident[]
  >([])
  const [dateWeek, setDateWeek] = useState(moment())
  const [listPrecentProvince, setlistPrecentProvince] = useState<any[]>([])
  const [chartData, setChartData] = useState<any>(null)

  // PIE CHART
  const getDataPercentageProvinces = async () => {
    setisLoading(true)
    try {
      const res = await getListPercentPrivinces(eventIdPieChart)
      if (res.data) {
        const data = res.data.map((item) => {
          return {
            name: item.name,
            y: item.percent,
          }
        })
        setlistPrecentProvince(data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setisLoading(false)
    }
  }

  // BAR CHART
  const getDataResidentDistrict = async () => {
    setisLoading(true)
    try {
      const res = await getListPercentDistrict(eventIdPieChart)

      if (res.data) {
        const data = res.data.map((item) => {
          return {
            name: item.name,
            y: Number(item.percent?.toFixed(1)),
          }
        })
        setdataResidentDistrict(data)
      }
    } catch (err) {
      console.log(err)
      message.error('Có lỗi xảy ra')
    } finally {
      setisLoading(false)
    }
  }

  const placeholderDesc = (type: string) => {
    switch (type) {
      case 'date':
        return 'ngày'
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
        allowClear={false}
        value={dateWeek}
        style={{ width: '190px' }}
        placeholder={`Chọn theo ${placeholderDesc(type)}`}
        picker={type}
        onChange={onChange}
        disabled={isDisabled}
        format={'DD-MM-YYYY'}
      />
    )
  }

  const getDataSumCustomer = async () => {
    let categories: Array<string> = []
    setisLoading(true)
    try {
      // chiến dich
      if (eventIdBarChart) {
        const res = await getSumCustomerJoinEventById({ ID: eventIdBarChart })
        if (res.status) {
          const data = res?.data?.map((item: any) => ({
            name: item?.time,
            y: item.amount,
          }))
          setTotalCustomer(data)
        }
      } else {
        const res = await getSumCustomerJoinEvent(rangeTime)
        if (res.data) {
          const curentData = res?.data?.listCustomerWeek?.map((item: any) => {
            if (calendarType == 'quarter' || calendarType == 'year') {
              categories.push('Tháng ' + item.time.split('/')[1])
            } else {
              categories.push(item.time.split(' ')[0])
            }
            return item.amount
          })
          const dataCompare = res?.data?.listCustomerWeekCompare?.map(
            (item: any) => {
              return item.amountCompare
            }
          )

          if (curentData && dataCompare) {
            setarrCategories(categories)
            if (displayType === 'line') {
              setdataChart([{ name: 'Hiện tại', data: curentData }])
            } else {
              console.log('THIS CASE')
              setdataChart([
                { name: 'Hiện tại', data: curentData },
                { name: 'Cùng kỳ', data: dataCompare },
              ])
            }
          }
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setisLoading(false)
    }
  }

  const getDataCustomerByDay = async () => {
    setisLoading(true)
    try {
      if (calendarType === 'date') {
        const res = await getCountCustomerByDay({
          fromDate: dateTime.Date,
          toDate: dateTime.Date,
        })
        if (res.data) {
          const data: any = res.data.map((item: any, index: number) => ({
            name: item?.time,
            y: item.amount,
          }))
          setTotalCustomer(data)
        }
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
        console.log('res.data.data: ', res.data.data)
        setlistEvents(res.data.data)
      }
    } catch (err) {
      console.log('ERROR: ', err)
    } finally {
      setisLoading(false)
    }
  }

  const handleChange = (date?: any, dateString?: any) => {
    setdateTime({ Date: moment(date).format('DD/MM/YYYY') })
    setDateWeek(date)
    const yearSelected = moment(date).format('YYYY')
    const monthSelected = moment(date).format('MM')
    switch (calendarType) {
      case 'date':
        return setrangeTime({
          fromDate: moment(date).format('DD/MM/YYYY'),
          toDate: moment(date).format('DD/MM/YYYY'),
        })
      case 'week':
        return setrangeTime(getWeekDateRange(date))
      case 'month':
        return setrangeTime(getMonthDateRange(yearSelected, monthSelected))
      case 'quarter':
        return setrangeTime(getQuarterDateRange(date))
      case 'year':
        return setrangeTime(getYearDateRange(date))
    }
  }

  useEffect(() => {
    getDataCustomerByDay()
  }, [dateTime, calendarType, displayType])

  useEffect(() => {
    if (rangeTime.fromDate !== rangeTime.toDate || eventIdBarChart) {
      getDataSumCustomer()
    }
  }, [rangeTime, eventIdBarChart, displayType])

  useEffect(() => {
    setChartData(oCountCustomerLineChart(dataChart, arrCategories, displayType))
  }, [dataChart, displayType])

  useEffect(() => {
    getDataResidentDistrict()
    getDataPercentageProvinces()
  }, [eventIdPieChart])

  useEffect(() => {
    getListEvents()
  }, [])

  return (
    <>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Space>
            <Select
              disabled={eventIdBarChart ? true : false}
              style={{ width: 100 }}
              value={calendarType}
              onChange={(value) => {
                setcalendarType(value)

                switch (value) {
                  case 'date':
                    return setrangeTime({
                      fromDate: moment().format('DD/MM/YYYY'),
                      toDate: moment().format('DD/MM/YYYY'),
                    })
                  case 'week':
                    return setrangeTime(
                      getWeekDateRange(moment().format('YYYY-MM-DD'))
                    )
                  case 'month':
                    return setrangeTime(
                      getMonthDateRange(
                        moment().format('YYYY'),
                        moment().format('MM')
                      )
                    )
                  case 'quarter':
                    return setrangeTime(
                      getQuarterDateRange(moment().format('YYYY-MM-DD'))
                    )
                  case 'year':
                    return setrangeTime(
                      getYearDateRange(moment().format('YYYY-MM-DD'))
                    )
                }
              }}
            >
              {(displayType == 'column'
                ? dataSelectSamePriod
                : dataSelectDate
              ).map((item, index) => (
                <Option value={item.value} key={index}>
                  {item.text}
                </Option>
              ))}
            </Select>
            <PickerWithType
              isDisabled={eventIdBarChart ? true : false}
              type={calendarType}
              onChange={handleChange}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Select
              disabled={eventIdBarChart ? true : false}
              style={{ width: 200 }}
              defaultValue={displayType}
              onChange={(value: string) => {
                if (value == 'column') {
                  setcalendarType('week')
                } else {
                  setcalendarType('date')
                  setrangeTime({
                    fromDate: moment().format('DD/MM/YYYY'),
                    toDate: moment().format('DD/MM/YYYY'),
                  })
                  getDataCustomerByDay()
                }
                setdisplayType(value)
              }}
            >
              <Option value={'column'}>Hiển thị theo cùng kỳ</Option>
              <Option value={'line'}>Hiển thị theo ngày</Option>
            </Select>
          </Space>
        </Col>
        <Col>
          <Space>
            <Select
              style={{ width: 200 }}
              placeholder="Chọn chiến dịch"
              onChange={(value: number | undefined) => {
                console.log('value: ', value)
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
      <Wapper>
        <Spin spinning={isLoading}>
          {chartData && !eventIdBarChart && calendarType !== 'date' && (
            <HighchartsReact
              highcharts={Highcharts}
              options={chartData}
              // updateArgs={[true]}
              // containerProps={{
              //   style: { height: '100', width: 'calc(100vw - 340px)' },
              // }}
            />
          )}
          {eventIdBarChart && (
            <HighchartsReact
              highcharts={Highcharts}
              options={oTotalExchangeGiftLineChart(
                totalCustomer,
                'TỔNG SỐ KHÁCH THAM GIA CÁC CHƯƠNG TRÌNH',
                'Tổng số khách hàng'
              )}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          )}
          {calendarType === 'date' && !eventIdBarChart && (
            <HighchartsReact
              highcharts={Highcharts}
              options={oTotalExchangeGiftLineChart(
                totalCustomer,
                'TỔNG SỐ KHÁCH THAM GIA CÁC CHƯƠNG TRÌNH',
                'Tổng số khách hàng'
              )}
              updateArgs={[true]}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          )}
        </Spin>
      </Wapper>
      <br />
      <Row justify="center">
        <Select
          style={{ width: 200 }}
          placeholder="Chọn chiến dịch"
          onChange={(value: number | undefined) => {
            setEventIdPieChart(value)
          }}
          allowClear
        >
          {listEvents.map((item, index) => (
            <Option value={item.id} key={index}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Row>
      <Wapper>
        <br />
        <Row justify="center" gutter={[16, 16]}>
          <Col xxl={12} xl={12} md={12} xs={24} sm={24}>
            <Spin spinning={isLoading}>
              <HighchartsReact
                highcharts={Highcharts}
                options={oProvinceVicinitytPieChart(listPrecentProvince)}
                updateArgs={[true]}
                containerProps={{
                  style: { height: '100%', width: '40vw' },
                }}
              />
            </Spin>
          </Col>
          <Col xxl={12} xl={12} md={12} xs={24} sm={24}>
            <Spin spinning={isLoading}>
              <HighchartsReact
                highcharts={Highcharts}
                options={oResidentLBColumnChart(listResidentDistrict)}
                updateArgs={[true]}
                containerProps={{
                  style: { height: '100%', width: '40vw' },
                }}
              />
            </Spin>
          </Col>
        </Row>
      </Wapper>
    </>
  )
}

export default Residential
