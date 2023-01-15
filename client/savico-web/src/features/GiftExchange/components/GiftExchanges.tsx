import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import ContentScreen from 'commons/contentScreen'
import FilterHeader from 'commons/filter'
import PageHeader from 'commons/pageHeader'
import Table from 'commons/table'
import { ContainScreenStyled } from 'global-styled'
import { IPagination } from 'interface'
import { useEffect, useState } from 'react'
import { renderText } from 'utils/functions'
import { formatPrice } from 'utils/ruleForm'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { getListExchangeGift } from '../GiftExchangeAPI'
import {
  IExchangeGiftPayload,
  IFormatedListExchangeGift,
  IListExchangeGift,
} from '../GiftExchangeInterface'
const { Text } = Typography

function GiftExchanges() {
  const [paging, setPaging] = useState<IPagination>({
    limit: 10,
    page: 1,
    total: 0,
  })
  const [params, setParams] = useState<IExchangeGiftPayload>({
    page: 1,
    limit: 10,
    type: undefined,
    searchKey: undefined,
    fromDate: undefined,
    toDate: undefined,
  })
  const [listGiftExchange, setlistGiftExchange] = useState<IListExchangeGift[]>(
    []
  )
  const columns: ColumnsType<IFormatedListExchangeGift> = [
    {
      width: 10,
      title: 'STT',
      dataIndex: 'index',
      render: (text: any, record: any, index: any) => (
        <td id={record.id}>{(paging.page - 1) * paging.limit + index + 1}</td>
      ),
    },
    {
      width: 120,
      title: 'Khách hàng',
      dataIndex: 'customerName',
      render: (customerName) => <Text>{renderText(customerName)}</Text>,
    },
    {
      title: 'Tên quà tặng - voucher',
      dataIndex: 'giftName',
      render: (giftName) => <Text>{renderText(giftName)}</Text>,
    },
    // {
    //   width: 150,
    //   title: 'Loại đổi quà',
    //   dataIndex: 'type',
    //   render: (type) => (
    //     <Text>{type == GIFT_VOUCHER_TYPE.GIFT ? 'Quà tặng' : 'Voucher'}</Text>
    //   ),
    // },
    {
      title: 'Số điểm đổi',
      dataIndex: 'point',
      render: (point) => <Text>{formatPrice(point)}</Text>,
    },
    {
      title: 'Ngày đổi điểm',
      dataIndex: 'createDate',
      render: (createDate) => (
        <Text>{convertTimeStampToString(createDate)}</Text>
      ),
    },
  ]

  useEffect(() => {
    getData()
  }, [params])

  const getData = async () => {
    try {
      const res = await getListExchangeGift(params)
      if (res.data) {
        const dataGiftExchange = res.data.data.map((item, index) => ({
          ...item,
          key: index,
          index: index + 1,
        }))
        setlistGiftExchange(dataGiftExchange)
        setPaging({
          limit: res.data.limit,
          page: res.data.page,
          total: res.data.total,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ContainScreenStyled>
        <PageHeader title="Danh sách đổi voucher" />
        <FilterHeader
          onChangeFilter={(value: any) => {
            setParams({
              ...params,
              page: 1,
              searchKey: value.searchKey,
              type: value.type,
              fromDate: value.fromDate,
              toDate: value.toDate,
            })
          }}
          search={{
            placeholder: 'Tên khách hàng, voucher',
            width: 320,
          }}
          datePicker={{
            width: 300,
          }}
        />
        <ContentScreen countFilter={paging.total} loading={false}>
          <Table
            border={true}
            columns={columns}
            data={listGiftExchange}
            size={'middle'}
            onChangePram={(page: number) => {
              setPaging({ ...paging, page: page })
              setParams({ ...params, page })
            }}
            pagination={paging}
          />
        </ContentScreen>
      </ContainScreenStyled>
    </>
  )
}

export default GiftExchanges
