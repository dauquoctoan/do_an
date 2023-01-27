import { Modal, Image, Typography, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Table from 'commons/table'
import Configs from 'configs'
import { getBillList, getHistoryOfPointsDetail } from 'features/Admin/api'
import { IFormatedHisPointDetail } from 'features/Admin/interface'
import React, { memo, useEffect, useState } from 'react'
import { formatPrice } from 'utils/ruleForm'

const { Text } = Typography
interface IProps {
  id: number
  showModal: boolean
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
  totalMoney: string | number
}

const BillListModal = (props: IProps) => {
  const [listHisPointDetail, setlistHisPointDetail] = useState<
    IFormatedHisPointDetail[]
  >([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [paging, setPaging] = useState<any>({
    limit: 10000,
    page: currentPage,
    total: 0,
  })

  const columns: ColumnsType<IFormatedHisPointDetail> = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'code',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Tên gian hàng',
      dataIndex: 'stallName',
      render: (value) => <span>{Configs.renderText(value)}</span>,
    },
    {
      width: 120,
      title: 'Tổng tiền (VNĐ)',
      dataIndex: 'price',
      align: 'center',
      render: (totalMoney) => (
        <span>{formatPrice(Configs.renderText(totalMoney))}</span>
      ),
    },
    {
      width: 240,
      title: 'Ảnh hóa đơn',
      dataIndex: 'image',
      align: 'center',
      render: (image) => <Image width={80} src={image} />,
    },
  ]

  const getData = async () => {
    const res = await getBillList({
      id: props.id,
      page: currentPage,
      limit: 10000,
    })
    if (res?.status) {
      const data = res?.data?.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
      }))
      setlistHisPointDetail(data)
    } else {
      message.error('Đã có lỗi xảy ra!')
    }
  }

  useEffect(() => {
    getData()
  }, [props.id])

  return (
    <>
      <Modal
        width={1200}
        footer={null}
        title={'DANH SÁCH HOÁ ĐƠN'}
        visible={props.showModal}
        onCancel={() => {
          props.setIsShowModal(false)
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
        />
      </Modal>
    </>
  )
}

export default memo(BillListModal)
