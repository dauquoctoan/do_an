import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import ContentScreen from '../../commons/contentScreen'
import FilterHeader from '../../commons/filter'
import Table from '../../commons/table'
import { DataType } from '../../commons/table/interface'
import Configs from '../../configs'
import {
  ContainScreenStyled,
  InfoStyled,
  ModalStyled,
} from '../../global-styled'
import R from '../../utils/R'
import AddAndEditCustomer from './components/AddAndEditCustomer'
import { useForm } from 'antd/lib/form/Form'
import { IPagination } from '../../interface'
import history from '../../utils/history'
import { PATH } from '../../navigation/Router/config'
import { ChangeStatusCustomer, exportExcel, getCustomers } from './api'
import message from '../../commons/message'
import { Button, Switch } from 'antd'
import moment from 'moment'
import PageHeader from '../../commons/pageHeader'
import { CUSTOMER_ORIGIN, STATUS } from '../../configs/constance'
import { ButtonAdd } from 'commons/button'
import { formatNumber } from 'utils/formatNumber'

interface ICustomer {
  id: number
  name: string
  address: string
  phone: string
  province: any
  district: any
  ward: any
  gender: any
  email: any
  status: 1
  createDate: string
  note: string
}
const { TableInfo } = R.icons

const renderCustom = (value: number) => {
  switch (value) {
    case 1:
      return 'Sử dụng App'
    case 2:
      return 'PG tạo'

    default:
      break
  }
}

const Customer = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (value) => <span>{Configs.renderText(value)}</span>,
    },
    {
      title: 'Nguồn khách hàng',
      dataIndex: 'originCustomer',
      key: 'originCustomer',
      render: (value) => <span>{renderCustom(value) || '---'}</span>,
    },
    {
      title: 'Tổng sự kiện tham gia',
      dataIndex: 'eventParticipantCount',
      key: 'eventParticipantCount',
      render: (value) => <span>{formatNumber(value) || '---'}</span>,
    },
    {
      title: 'Phiên đăng nhập cuối cùng',
      dataIndex: 'lastLoginDate',
      key: 'lastLoginDate',
      render: (value) => <span>{value || '---'}</span>,
    },
    {
      width: 90,
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (status: any, record: any) => {
        return (
          <div>
            <Switch
              size="small"
              loading={
                record.id === loadingStatus.id && loadingStatus.loading === true
                  ? true
                  : false
              }
              onClick={async () => {
                await handleChangeStatus(record.id)
                getData()
              }}
              checked={status === 1 ? true : false}
            />
          </div>
        )
      },
    },
    {
      width: 120,
      title: 'Ngày tạo',
      key: 'createDate',
      dataIndex: 'createDate',
      render: (date: any, record: any) => {
        return (
          <div>
            {Configs.renderText(moment(date).format(Configs._formatDate))}
          </div>
        )
      },
    },
    {
      width: 80,
      align: 'center',
      key: 'id',
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <InfoStyled>
            <TableInfo
              style={{ fontSize: 20 }}
              onClick={() => {
                history.push({
                  pathname: `${PATH.CUSTOMER_DETAIL}/${id}`,
                  state: {
                    id,
                  },
                })
              }}
            />
          </InfoStyled>
        )
      },
    },
  ]
  const [form] = useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [customer, setCustomer] = useState<ICustomer[]>([])
  const [visible, setVisible] = useState<boolean>()
  const [detailCustomer, setDetailCustomer] = useState<any | null>(null)
  const [filter, setFilter] = useState({})
  const [loadingStatus, setLoadingStatus] = useState({
    id: 0,
    loading: false,
  })
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    total: 0,
  })

  useEffect(() => {
    getData()
  }, [paging.page, filter])

  const getData = async () => {
    setLoading(true)
    try {
      const res = await getCustomers(filter)
      if (res) {
        setCustomer(res.data.data)
        setPaging({
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangeStatus = async (id: number) => {
    setLoadingStatus({
      id: id,
      loading: true,
    })
    try {
      const res = await ChangeStatusCustomer({ ID: id })
      if (res) {
        // message({ content: 'Thay đổi trạng thái khách hàng thành công' })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStatus({
        id: 0,
        loading: false,
      })
    }
  }

  const exportCustomer = async () => {
    try {
      setLoading(true)
      const res = await exportExcel()
      if (res?.status) {
        window.open(res.data)
      } else {
        // message({
        //   type: 'error',
        //   content: 'Đã có lỗi xảy ra!',
        // })
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContainScreenStyled>
      <PageHeader
        title="Khách hàng"
        fixed={true}
        extra={[
          <Button onClick={exportCustomer} type="primary">
            Xuất excel
          </Button>,
        ]}
      />
      <FilterHeader
        size="middle"
        datePicker={{
          width: 300,
          // disabledDate: (current) => current && current < moment('7/25/2022'),
        }}
        search={{ width: 280, placeholder: 'Nhập vào Họ tên, só điện thoại' }}
        onChangeFilter={(e: any) => {
          setFilter({ ...e, page: 1 })
        }}
        select={[
          {
            width: 190,
            key: 'status',
            placeholder: 'Trạng thái hoạt động',
            data: STATUS,
          },
        ]}
        selectOriginCustomer={[
          {
            width: 180,
            key: 'originCustomer',
            placeholder: 'Nguồn khách hàng',
            data: CUSTOMER_ORIGIN,
          },
        ]}
      />
      <ContentScreen loading={loading} countFilter={paging.total}>
        <div>
          <Table
            border={true}
            size="middle"
            columns={columns}
            data={customer}
            onChangePram={(page: number) => {
              setPaging({ ...paging, page: page })
              setFilter({ ...filter, page: page })
            }}
            pagination={paging}
            // doubleClickRow={(item: any) => {
            //   history.push(PATH.CUSTOMER_DETAIL.concat(`?id=${item.id}`))
            // }}
          />
        </div>
        <ModalStyled
          width={500}
          footer={null}
          title={detailCustomer ? 'Sửa tài khoản' : 'Thêm mới tài khoản'}
          visible={visible}
          onCancel={() => {
            setVisible(false)
            setDetailCustomer(null)
            form.resetFields()
          }}
          children={<AddAndEditCustomer data={detailCustomer} form={form} />}
        />
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default Customer
