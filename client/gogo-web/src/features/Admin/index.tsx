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
import { useForm } from 'antd/lib/form/Form'
import { IPagination } from '../../interface'
import history from '../../utils/history'
import { PATH } from '../../navigation/Router/config'
import {
  exportExcel,
  createAUser,
  getAUsers,
  changeStatusAUser,
  deleteAUser,
} from './api'
import message from '../../commons/message'
import { Button, Image, Switch } from 'antd'
import moment from 'moment'
import PageHeader from '../../commons/pageHeader'
import { STATUS, type_account_admin } from '../../configs/constance'
import { ButtonAction } from 'commons/button'
import AddEditAdmin from './pages/AddAndEditAdmin'
import Tag from 'antd/lib/tag'

const Customer = () => {
  const [adminDetail, setAdminDetail] = useState<any>(null)
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (stt) => <span>{Configs.renderText(stt)}</span>,
    },
    {
      title: 'Tên quản trị',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (value) => <span>{Configs.renderText(value)}</span>,
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'picture',
      key: 'picture',
      width: 90,
      render: (value) => (
        <span>
          <Image
            width={50}
            src={value || Configs._default_image}
            preview={{
              src: value || Configs._default_image,
            }}
          />
        </span>
      ),
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
                record._id === loadingStatus.id &&
                loadingStatus.loading === true
                  ? true
                  : false
              }
              onClick={async () => {
                await handleChangeStatus(record._id, record.status)
                getData()
              }}
              checked={status === '1' ? true : false}
            />
          </div>
        )
      },
    },
    {
      width: 120,
      title: 'Quyền',
      key: 'role',
      dataIndex: 'role',
      render: (role: string) => {
        switch (role) {
          case '1':
            return (
              <Tag color={'cyan'}>
                {Configs.renderText(type_account_admin[role])}
              </Tag>
            )
          case '0':
            return (
              <Tag color={'red'}>
                {Configs.renderText(type_account_admin[role])}
              </Tag>
            )
        }
      },
    },
    {
      width: 120,
      title: 'Ngày tạo',
      key: 'createDate',
      dataIndex: 'createDate',
      render: (createdAt: any, record: any) => {
        return (
          <div>
            {Configs.renderText(moment(createdAt).format(Configs._formatDate))}
          </div>
        )
      },
    },
    {
      width: 70,
      render: (_, record: any) => (
        <div>
          <ButtonAction
            buttonEdit={{
              tooltipTitle: 'Chỉnh sửa ngành hàng',
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.key === '1' ? true : false,
            }}
            buttonDelete={{
              tooltipTitle: 'Xóa ngành hàng',
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => (e === 'edit' ? handleEdit(record) : null)}
            confirm={{
              title: 'Bạn có chắc chắn muốn xóa học phần này không?',
              handleConfirm: async () => {
                await handleDelete(record._id)
                getData()
              },
            }}
          />
        </div>
      ),
    },
  ]
  const [form] = useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [admin, setAdmin] = useState<any[]>([])
  const [visible, setVisible] = useState<boolean>()
  const [filter, setFilter] = useState<any>({})
  const [loadingStatus, setLoadingStatus] = useState({
    id: '',
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
    const res = await getAUsers({
      page: paging.page,
      limit: paging.limit,
      ...filter,
    })
    setAdmin(res.data)
    setLoading(false)
  }

  const handleChangeStatus = async (id: string, status: string) => {
    setLoadingStatus({
      id: id,
      loading: true,
    })

    await changeStatusAUser({ _id: id, status: status === '1' ? '0' : '1' })
    setLoadingStatus({
      id: '',
      loading: false,
    })
  }

  const handleCloseModal = () => {
    setVisible(false)
    form.resetFields()
    setAdminDetail(null)
    getData()
  }

  const handleEdit = (record: any) => {
    setAdminDetail(record)
    setVisible(true)
  }
  const handleDelete = async (id: string) => {
    await deleteAUser({ _id: id })
    message.success('Xóa thành công !')
  }
  return (
    <ContainScreenStyled>
      <PageHeader
        title="Quản trị"
        fixed={true}
        extra={[
          <Button
            onClick={() => {
              setVisible(true)
            }}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />
      <FilterHeader
        size="middle"
        // datePicker={{
        //   width: 300,
        // }}
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
          {
            width: 190,
            key: 'role',
            placeholder: 'Trạng thái hoạt động',
            data: type_account_admin,
          },
        ]}
      />
      <ContentScreen loading={loading} countFilter={paging.total}>
        <div>
          <Table
            border={true}
            size="middle"
            columns={columns}
            data={admin}
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
        {visible && (
          <ModalStyled
            width={500}
            footer={null}
            title={adminDetail ? 'Sửa Administrator' : 'Thêm mới Administrator'}
            visible={visible}
            onCancel={() => {
              form.resetFields()
              setAdminDetail(null)
              setVisible(false)
            }}
            children={
              <AddEditAdmin
                handleCloseModal={handleCloseModal}
                detailPartLesson={adminDetail}
                form={form}
              />
            }
          />
        )}
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default Customer
