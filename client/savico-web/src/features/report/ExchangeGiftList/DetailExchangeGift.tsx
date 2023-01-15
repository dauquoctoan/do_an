import { DatePicker, Input, Row, Spin, Table, Tag } from 'antd'
import ContentScreen from 'commons/contentScreen'
import { useDebounce } from 'commons/hooks/Debounce'
import PageHeader from 'commons/pageHeader'
import Configs from 'configs'
import { PATH } from 'navigation/Router/config'
import React from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { useHistory, useLocation } from 'react-router-dom'
import { formatNumber } from 'utils/formatNumber'
import { IPaging } from '.'
import BillListModal from './components/BillListModal'
import { getExchangeGifDetail, getVoucherDetail } from './ExchangeGiftApi'

interface IParams {
  ID: number
  page?: number
  SearchKey?: string
  fromDate?: string
  toDate?: string
  limit?: number
}

const DetailExchangeGift = () => {
  const columns1 = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => (
        <td id={record.id}>
          {(pagination1.current - 1) * pagination1.pageSize + index + 1}
        </td>
      ),
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Số quà tặng đã đổi',
      dataIndex: 'totalExchangedGift',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tên quà tặng',
      dataIndex: 'giftName',
      render: (value: string[]) => {
        const finalCategories: any = []
        value.forEach((item: string) =>
          finalCategories.push(<Tag color="green">{item}</Tag>)
        )
        return finalCategories
      },
    },
    {
      title: 'Tổng tiền hoá đơn',
      dataIndex: 'totalBill',
      render: (text: string) => <span>{formatNumber(text)}</span>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
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
              setIsShowModal(true)
              setCurrentCusId(record?.id)
              setCurrentTotalBill(record?.totalBill)
            }}
          >
            <BiInfoCircle />
          </div>
        )
      },
    },
  ]

  const columns2 = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => (
        <td id={record.id}>
          {(pagination2.current - 1) * pagination2.pageSize + index + 1}
        </td>
      ),
    },
    {
      title: 'Tên quà tặng',
      dataIndex: 'giftName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Số lượng đã đổi',
      dataIndex: 'exchangedQuantity',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Còn lại',
      dataIndex: 'left',
      render: (text: string) => <span>{text}</span>,
    },
  ]

  const history: any = useHistory()
  const location: any = useLocation()

  // TABLE 1
  const [currentCusId, setCurrentCusId] = React.useState<number>(-1)
  const [currentTotalBill, setCurrentTotalBill] = React.useState<number>(0)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isShowModal, setIsShowModal] = React.useState<boolean>(false)
  const [currentPage1, setCurrentPage1] = React.useState<number>(1)
  const [searchKey1, setSearchKey1] = React.useState<string>('')
  const searchDebounce1 = useDebounce(searchKey1, 300)
  const [fromDate, setFromDate] = React.useState<string>('')
  const [toDate, setToDate] = React.useState<string>('')
  const [exchangeGiftDetailList, setExchangeGiftDetailList] = React.useState<
    any[]
  >([])
  const [params1, setParams1] = React.useState<IParams>({
    ID: location?.state?.id,
    page: currentPage1,
    SearchKey: searchKey1,
    fromDate: '',
    toDate: '',
    limit: 10,
  })

  const [pagination1, setPaginition1] = React.useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  })
  // TABLE 2
  const [currentPage2, setCurrentPage2] = React.useState<number>(1)
  const [searchKey2, setSearchKey2] = React.useState<string>('')
  const searchDebounce2 = useDebounce(searchKey2, 300)
  const [voucherList, setVoucherList] = React.useState<any[]>([])
  const [params2, setParams2] = React.useState<any>({
    page: currentPage1,
    ID: location?.state?.id,
    SearchKey: searchKey2,
  })

  const [pagination2, setPaginition2] = React.useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  const getExchangedGiftDetail = async () => {
    try {
      setIsLoading(true)
      const res = await getExchangeGifDetail(params1)
      if (res.status) {
        const data = res?.data?.data.map((item: any) => {
          return {
            id: item?.id,
            customerName: item.nameCus,
            phone: item.phone,
            totalExchangedGift: item.numberGift,
            giftName: item.giftVouchers.map((item: any) => item.name),
            totalBill: item?.totalAmount,
            date: item.date.slice(0, 11).split('-').reverse().join('-'),
          }
        })
        setExchangeGiftDetailList(data)
        setPaginition1({
          ...pagination1,
          total: res?.data?.total,
          current: res?.data?.page,
          pageSize: res?.data?.limit,
        })
      }
      setCurrentPage1(res?.data?.page)
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getVoucherDetailList = async () => {
    try {
      setIsLoading(true)
      const res = await getVoucherDetail(params2)
      if (res.status) {
        const data = res?.data?.data?.map((item: any) => {
          return {
            giftName: item?.name,
            exchangedQuantity: item?.quantityExchanged,
            left: item?.quantity,
          }
        })
        setVoucherList(data)
        setPaginition2({
          ...pagination2,
          total: res?.data?.total,
          current: res?.data?.page,
          pageSize: res?.data?.limit,
        })
        setCurrentPage2(res?.data?.page)
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setParams2({
      ...params2,
      page: currentPage2,
      SearchKey: searchDebounce2,
    })
  }, [searchDebounce2, currentPage2])

  React.useEffect(() => {
    setParams1({
      ...params1,
      page: currentPage1,
      SearchKey: searchDebounce1,
      fromDate: fromDate,
      toDate: toDate,
    })
  }, [searchDebounce1, currentPage1, fromDate, toDate])

  React.useEffect(() => {
    getExchangedGiftDetail()
  }, [params1])

  React.useEffect(() => {
    getVoucherDetailList()
  }, [params2])

  return (
    <>
      <PageHeader
        title="Số lượt đổi quà"
        onBack={() => {
          history.push({
            pathname: PATH.EXCHANGE_GIFT_LIST,
            state: {
              searchKey: location?.state?.searchKey,
              fromDate: location?.state?.fromDate,
              toDate: location?.state?.toDate,
            },
          })
        }}
      />
      <Spin spinning={isLoading}>
        <ContentScreen>
          {/* Bảng 1 */}
          <div>
            {isShowModal && (
              <BillListModal
                showModal={isShowModal}
                setIsShowModal={setIsShowModal}
                totalMoney={currentTotalBill}
                id={currentCusId}
              />
            )}
            <Row style={{ marginBottom: 20, marginTop: 10 }}>
              <Input.Search
                placeholder="Tên, số điện thoại, ..."
                onChange={(e: any) => setSearchKey1(e.target.value)}
                value={searchKey1}
                allowClear
                style={{
                  width: 200,
                  marginRight: 30,
                }}
              />
              <DatePicker.RangePicker
                format={'DD/MM/YYYY'}
                style={{ height: 30, width: 300 }}
                onChange={(
                  value: any,
                  dateString: [string, string] | string
                ) => {
                  setFromDate(dateString[0])
                  setToDate(dateString[1])
                }}
              />
            </Row>
            <Table
              id="table-detail-exchange-gift"
              dataSource={exchangeGiftDetailList}
              columns={columns1}
              scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
              bordered
              pagination={{
                ...pagination1,
                showSizeChanger: false,
                onChange: async (page, pageSize) => {
                  setCurrentPage1(page)
                  const element: any = document.getElementById(
                    'table-detail-exchange-gift'
                  )
                  element.scrollIntoView({ block: 'start' })
                },
              }}
            />
          </div>
          {/* Bảng 2 */}
          <div>
            <Row style={{ marginBottom: 20, marginTop: 10 }}>
              <Input.Search
                placeholder="Tên voucher"
                onChange={(e: any) => setSearchKey2(e.target.value)}
                value={searchKey2}
                allowClear
                style={{
                  width: 200,
                  marginRight: 30,
                }}
              />
            </Row>
            <Table
              id="table-detail-exchange-gift-voucher"
              dataSource={voucherList}
              columns={columns2}
              scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
              bordered
              pagination={{
                ...pagination2,
                showSizeChanger: false,
                onChange: async (page, pageSize) => {
                  setCurrentPage2(page)
                  const element: any = document.getElementById(
                    'table-detail-exchange-gift-voucher'
                  )
                  element.scrollIntoView({ block: 'start' })
                },
              }}
            />
          </div>
        </ContentScreen>
      </Spin>
    </>
  )
}

export default DetailExchangeGift
