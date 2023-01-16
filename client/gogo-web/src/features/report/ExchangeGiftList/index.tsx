import { DatePicker, Input, message, Table } from 'antd'
import ContentScreen from 'commons/contentScreen'
import { useDebounce } from 'commons/hooks/Debounce'
import PageHeader from 'commons/pageHeader'
import moment from 'moment'
import { PATH } from 'navigation/Router/config'
import React from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { getExchangeGiftList } from './ExchangeGiftApi'

export interface IPaging {
  current: number
  pageSize: number
  totalItems: number
}

interface IParams {
  page: number
  SeachKey: string
  fromDate: string
  toDate: string
  limit: number
}

const ExchangeGiftList = () => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => (
        <td id={record.id}>
          {(pagination.current - 1) * pagination.pageSize + index + 1}
        </td>
      ),
    },
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tổng số khách hàng',
      dataIndex: 'totalCustomer',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tổng số lượt đổi quà',
      dataIndex: 'totalExchangedGift',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tổng số quà tặng còn lại',
      dataIndex: 'totalGiftLeft',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tổng số hoá đơn',
      dataIndex: 'totalBill',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Chi tiết',
      dataIndex: 'view',
      render: (text: string, record: any) => {
        return (
          <div
            style={{ border: 'none', cursor: 'pointer' }}
            onClick={() => {
              history.push({
                pathname: PATH.DETAIL_EXCHANGE_GIFT,
                state: {
                  id: record.id,
                  searchKey: searchKey,
                  fromDate: fromDate,
                  toDate: toDate,
                },
              })
            }}
          >
            <BiInfoCircle />
          </div>
        )
      },
    },
  ]

  const location: any = useLocation()
  const history: any = useHistory()
  const [data, setData] = React.useState<any>([])
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [fromDate, setFromDate] = React.useState<string>(
    location?.state?.fromDate
  )
  const [toDate, setToDate] = React.useState<string>(location?.state?.toDate)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [searchKey, setSearchKey] = React.useState<string>(
    location?.state?.searchKey
  )
  const [pagination, setPaginition] = React.useState<any>({
    total: 0,
    current: currentPage,
    pageSize: 10,
  })

  const [params, setParams] = React.useState<IParams>({
    page: currentPage,
    SeachKey: searchKey,
    fromDate: '',
    toDate: '',
    limit: 10,
  })

  const debounceSearch = useDebounce(searchKey, 300)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await getExchangeGiftList(params)
      if (res.code === 200) {
        const data = res?.data?.data.map((item: any) => ({
          id: item?.id,
          name: item.nameCampaign,
          totalCustomer: item.numberCustomer,
          totalBill: item.numberBill,
          totalGiftLeft: item.remainingGift,
          totalExchangedGift: item.giftExchange,
        }))
        setData(data.reverse())
        setPaginition({
          ...pagination,
          total: res?.data?.total,
          current: res?.data?.page,
          limit: 10,
        })
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setParams({
      ...params,
      SeachKey: debounceSearch,
      page: currentPage,
      fromDate: fromDate,
      toDate: toDate,
    })
    console.log(1)
  }, [debounceSearch, currentPage, fromDate])

  React.useEffect(() => {
    getData()
    console.log(2)
  }, [params])

  return (
    <>
      <PageHeader title="Số lượt đổi quà" />
      <SearchBlock
        style={{
          height: 60,
          background: 'white',
          width: '100%',
          marginLeft: 6,
          marginRight: 6,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Input.Search
          placeholder="Tên chiến dịch"
          onChange={(e: any) => setSearchKey(e.target.value)}
          value={searchKey}
          allowClear
          style={{
            width: 200,
            marginLeft: 10,
            marginRight: 30,
          }}
        />
        {/* <DatePicker.RangePicker
          format={'DD/MM/YYYY'}
          style={{ height: 30, width: 300 }}
          defaultValue={
            fromDate
              ? [moment(fromDate, 'DD/MM/YYYY'), moment(toDate, 'DD/MM/YYYY')]
              : undefined
          }
          onChange={(value: any, dateString: [string, string] | string) => {
            setFromDate(dateString[0])
            setToDate(dateString[1])
            setParams({
              ...params,
              fromDate: dateString[0],
              toDate: dateString[1],
            })
          }}
        /> */}
      </SearchBlock>
      <ContentScreen loading={isLoading}>
        <Table
          id="table-exchange-gift-list"
          dataSource={data}
          columns={columns}
          scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          bordered
          pagination={{
            ...pagination,
            showSizeChanger: false,
            onChange: async (page, pageSize) => {
              setCurrentPage(page)
              setParams({ ...params, page })
              const element: any = document.getElementById(
                'table-exchange-gift-list'
              )
              element.scrollIntoView({ block: 'start' })
            },
          }}
        />
      </ContentScreen>
    </>
  )
}

const SearchBlock = styled.div`
  height: 60;
  background-color: white;
  width: 100%;
  margin-left: 6px;
  margin-right: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default ExchangeGiftList
