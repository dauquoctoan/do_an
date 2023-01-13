import { Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import FilterHeader from '../../../commons/filter'
import Table from '../../../commons/table'
import Configs from '../../../configs'
import style from '../../../configs/style'
import { COLOR } from '../../../configs/theme'
import R from '../../../utils/R'
import { formatPrice } from '../../../utils/ruleForm'
import { convertTimeStampToString } from '../../../utils/TimerHelper'
import { getHistoryOfPoints } from '../api'
import {
  ICustomerDetail,
  IFormatedHisPoint,
  IHistoryPointPayload,
} from '../interface'
import HistoryOfPointsDetail from './HistoryOfPointsDetail'
const { TableInfo } = R.icons
const { Text } = Typography
interface IProps {
  customerID: number
  detailCustomer: ICustomerDetail
}

const HistoryOfPoints = (props: IProps) => {
  const [idEvent, setidEvent] = useState<number>()
  const [visible, setVisible] = useState<boolean>(false)
  const [paging, setPaging] = useState<any>({
    limit: Configs._limit,
    page: Configs._default_page,
    totalItemCount: 10,
  })
  const [params, setparams] = useState<IHistoryPointPayload>({
    limit: Configs._limit,
    page: Configs._default_page,
    type: 1,
    customerID: props.customerID,
    EventName: '',
    fromDate: undefined,
    toDate: undefined,
  })
  const [listHistoryPoint, setlistHistoryPoint] = useState<any[]>([])
  const [totalMoney, setTotalMoney] = useState<any>()

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      width: 60,
      dataIndex: 'index',
      render: (text) => <Text>{Configs.toString(text)}</Text>,
    },
    {
      title: 'Sự kiện',
      dataIndex: 'eventName',
      ellipsis: true,
      render: (eventName) => (
        <Tooltip placement="topLeft" title={eventName}>
          <Text>{Configs.toString(eventName)}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Nhân viên',
      dataIndex: 'staffName',
      width: 120,
      ellipsis: true,
      render: (text) => <Text>{text || '---'}</Text>,
    },
    {
      title: 'Số đơn',
      width: 80,
      dataIndex: 'countBill',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalMoney',
      width: 100,
      render: (totalMoney) => <Text>{formatPrice(totalMoney)}</Text>,
    },
    {
      title: 'Số điểm',
      dataIndex: 'point',
      width: 80,
      render: (point) => <Text>{formatPrice(Configs.toString(point))}</Text>,
    },
    {
      title: 'Số dư',
      width: 80,
      dataIndex: 'balance',
      render: (balance) => (
        <Text>{formatPrice(Configs.toString(balance))}</Text>
      ),
    },
    {
      title: 'Ngày tích điểm',
      dataIndex: 'createDate',
      width: 130,
      render: (createDate) => (
        <Text>{convertTimeStampToString(createDate)}</Text>
      ),
    },
    {
      title: 'Thao tác',
      width: 80,
      dataIndex: 'id',
      align: 'center',
      render: (id) => {
        return (
          <div
            onClick={() => {
              setVisible(true)
              if (id) {
                setidEvent(id)
                const targetItem = listHistoryPoint.filter(
                  (item: any) => item.id === id
                )
                setTotalMoney(targetItem[0].totalMoney)
              }
            }}
            style={{ padding: '2px' }}
          >
            <Tooltip title={'Chi tiết'}>
              <TableInfo style={{ fontSize: 20, cursor: 'pointer' }} />
            </Tooltip>
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    getData()
  }, [paging.page, params])

  const getData = async () => {
    try {
      const res = await getHistoryOfPoints(params)
      if (res.data.data) {
        const dataHistoryPoint = res.data.data.map((item, index) => ({
          index: index + 1,
          key: index,
          ...item,
        }))
        setlistHistoryPoint(dataHistoryPoint)
      }
      if (res.data) {
        setPaging({
          limit: res.data.limit,
          page: res.data.page,
          totalItemCount: res.data.totalItemCount,
        })
      }
    } catch (error) {}
  }

  return (
    <>
      {console.log(paging)}
      <WrapperHistoryOfPoints>
        <FilterHeader
          search={{ placeholder: 'Tên sự kiện' }}
          datePicker={{ width: 300 }}
          totalItem={{
            style: { color: 'red', fontSize: 18, marginLeft: '100px' },
            desc: 'Tổng điểm hiện tại:',
            total: formatPrice(props.detailCustomer.point),
            suffix: 'điểm',
          }}
          onChangeFilter={(value: any) => {
            setparams({
              ...params,
              EventName: value.searchKey,
              fromDate: value.fromDate,
              toDate: value.toDate,
            })
          }}
        />
        <Table
          border={true}
          size="middle"
          columns={columns}
          data={listHistoryPoint}
          onChangePram={(page: number) => setPaging({ ...paging, page: page })}
          pagination={paging}
          // doubleClickRow={(item: any) => {
          //   history.push(PATH.CUSTOMER_DETAIL.concat(`?id=${item.id}`))
          // }}
        />
        {visible ? (
          <HistoryOfPointsDetail
            id={idEvent}
            showModal={visible}
            cancel={() => setVisible(false)}
            totalMoney={totalMoney}
          />
        ) : null}
      </WrapperHistoryOfPoints>
    </>
  )
}

export default HistoryOfPoints

const WrapperHistoryOfPoints = styled.div`
  .header {
    padding: 5px 25px;
    background-color: ${COLOR.primaryColor};
    font-size: ${style.font.middle.size};
    font-weight: ${style.font.middle.weight};
  }
  .filter {
    margin: 5px 0px;
  }
`
