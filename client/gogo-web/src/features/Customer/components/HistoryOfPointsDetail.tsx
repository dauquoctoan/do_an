import { Modal, Image, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { memo, useEffect, useState } from 'react'
import Table from '../../../commons/table'
import Configs from '../../../configs'
import { IPagination } from '../../../interface'
import { formatPrice } from '../../../utils/ruleForm'
import { getHistoryOfPointsDetail } from '../api'
import { IFormatedHisPointDetail } from '../interface'
const { Text } = Typography
interface IProps {
  id?: number
  showModal: boolean
  cancel: () => void
  totalMoney: string | number
}

const HistoryOfPointsDetail = (props: IProps) => {
  const [listHisPointDetail, setlistHisPointDetail] = useState<
    IFormatedHisPointDetail[]
  >([])
  const [paging, setPaging] = useState<any>({
    limit: Configs._limit,
    page: Configs._default_page,
    totalItemCount: 0,
  })
  const columns: ColumnsType<IFormatedHisPointDetail> = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'code',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: 'Tên gian hàng',
      dataIndex: 'stallName',
      render: (value) => <span>{Configs.toString(value)}</span>,
    },
    {
      width: 90,
      title: 'Tổng tiền (VNĐ)',
      dataIndex: 'price',
      align: 'center',
      render: (totalMoney) => (
        <span>{formatPrice(Configs.toString(totalMoney))}</span>
      ),
    },
    {
      width: 120,
      title: 'Ảnh hóa đơn',
      dataIndex: 'image',
      align: 'center',
      render: (image) => <Image width={80} src={image} />,
    },
  ]

  const getData = async () => {
    const res = await getHistoryOfPointsDetail(props.id)
    if (res.data.data) {
      const dataHisPointDetail = res.data.data.map((item, index) => ({
        key: index,
        index: index + 1,
        ...item,
      }))
      setlistHisPointDetail(dataHisPointDetail)
    }
    if (res.data) {
      setPaging({
        limit: res.data.limit,
        page: res.data.page,
        totalItemCount: res.data.totalItemCount,
      })
    }
  }

  useEffect(() => {
    getData()
  }, [props.id])

  return (
    <>
      <Modal
        width={800}
        footer={null}
        title={'DANH SÁCH HOÁ ĐƠN'}
        visible={props.showModal}
        onCancel={() => {
          props.cancel()
        }}
      >
        <Text type="danger">
          Tổng tiền hoá đơn: {formatPrice(props.totalMoney)} đ
        </Text>
        <Table
          border={true}
          size="middle"
          columns={columns}
          data={listHisPointDetail}
          onChangePram={(page: number) => setPaging({ ...paging, page: page })}
          pagination={paging}
        />
      </Modal>
    </>
  )
}

export default memo(HistoryOfPointsDetail)
