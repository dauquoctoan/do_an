import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentScreen from '../../../commons/contentScreen'
import FilterHeader from '../../../commons/filter'
import Table from '../../../commons/table'
import Configs from '../../../configs'
import { IPagination } from '../../../interface'
import { formatPrice } from '../../../utils/ruleForm'
import { convertTimeStampToString } from '../../../utils/TimerHelper'
import { getHistoryExchangePoints } from '../api'
import {
  ICustomerDetail,
  IFormatedChangeHistory,
  IFormatedPaging,
  IChangeHisPayload,
} from '../interface'
const { Text } = Typography

interface IProps {
  customerID: number
  detailCustomer: ICustomerDetail
}

const HistoryExchangePoints = (props: IProps) => {
  const [dataExchangeHis, setdataExchangeHis] = useState<
    IFormatedChangeHistory[]
  >([])
  const [paging, setPaging] = useState<any>({
    limit: Configs._limit,
    page: Configs._default_page,
    totalItemCount: 10,
  })
  const [params, setparams] = useState<IChangeHisPayload>({
    limit: Configs._limit,
    page: Configs._default_page,
    type: 2,
    customerID: props.customerID,
  })

  const columns: ColumnsType<IFormatedChangeHistory> = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (index) => <Text>{index}</Text>,
    },
    {
      title: 'Tên voucher quà tặng',
      dataIndex: 'giftName',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: 'Loại đổi điểm',
      dataIndex: 'type',
      render: (type) => <span>{type == 2 ? 'Quà tặng' : 'Voucher'}</span>,
    },
    {
      title: 'Số điểm đổi',
      dataIndex: 'point',
      render: (point) => <span>{formatPrice(Configs.toString(point))}</span>,
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      render: (balance) => (
        <span>{formatPrice(Configs.toString(balance))}</span>
      ),
    },
    {
      title: 'Ngày đổi điểm',
      dataIndex: 'createDate',
      render: (createDate) => (
        <span>{convertTimeStampToString(createDate)}</span>
      ),
    },
  ]

  useEffect(() => {
    getData()
  }, [params])

  const getData = async () => {
    try {
      const res = await getHistoryExchangePoints(params)
      if (res.data?.data) {
        const dataTable = res.data?.data.map((item, index) => ({
          ...item,
          key: index,
          index: index + 1,
        }))
        setdataExchangeHis(dataTable)
      }
      if (res.data) {
        setPaging({
          totalItemCount: res.data.totalItemCount,
          page: res.data.page,
          limit: res.data.limit,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <WrapperHistoryExchangePoints>
      <FilterHeader
        search={{ placeholder: 'Tên voucher, quà tặng' }}
        datePicker={{ width: 300 }}
        totalItem={{
          style: { color: 'red', fontSize: 20, marginLeft: '100px' },
          desc: 'Tổng điểm hiện tại:',
          total: formatPrice(props.detailCustomer.point),
          suffix: 'điểm',
        }}
        onChangeFilter={(value: any) => {
          setparams({
            ...params,
            searchKey: value.searchKey,
            fromDate: value.fromDate,
            toDate: value.toDate,
          })
        }}
      />
      <Table
        border={true}
        size="middle"
        columns={columns}
        data={dataExchangeHis}
        onChangePram={(page: number) => {
          setPaging({ ...paging, page: page })
          setparams({ ...params, page })
        }}
        pagination={paging}
      />
    </WrapperHistoryExchangePoints>
  )
}

export default HistoryExchangePoints

const WrapperHistoryExchangePoints = styled.div``
