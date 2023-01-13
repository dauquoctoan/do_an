import {
  Button,
  Card,
  Descriptions,
  message,
  Popconfirm,
  Spin,
  Switch,
  Tag,
  Typography,
} from 'antd'
import { EditOutlined, DeleteFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import Table from 'commons/table'
import Configs from 'configs'
import { GENDER, IS_ACTIVE } from 'configs/constance'
import { IPagination } from 'interface'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { changeStatus, deleteStaff, getListStaff } from '../StaffAPI'
import {
  IFilters,
  IFormatedListStaff,
  IListStaffPayload,
} from '../StaffInterface'
import StaffFilters from './Filters'
import { useHistory } from 'react-router-dom'
import PageHeader from 'commons/pageHeader'
import ContentScreen from 'commons/contentScreen'
import R from 'utils/R'
const { Text } = Typography

const StyledDiv = styled.div`
  background-color: white;
  padding: 8px 5px;
  margin: 5px;
`
const StyledCard = styled(Card)`
  background-color: white;
  border-color: '#1890ff';
  border-top: 'none';
`
const TextStyled = styled(Text)`
  padding-left: 10px;
`

function Staffs() {
  const [params, setparams] = useState<IListStaffPayload>({
    page: 1,
    limit: 10,
    status: undefined,
    searchKey: undefined,
    searcProvince: undefined,
  })
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    totalItemCount: 0,
  })
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [listStaff, setlistStaff] = useState<IFormatedListStaff[]>([])
  const history = useHistory()
  const columns: ColumnsType<IFormatedListStaff> = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (index) => <Text>{Configs.toString(index)}</Text>,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      render: (index) => <Text>{Configs.toString(index)}</Text>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (phone) => <Text>{Configs.toString(phone)}</Text>,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (gender) => <Text>{gender == GENDER.MALE ? 'Nam' : 'Nữ'}</Text>,
    },
    {
      width: 130,
      title: 'Địa chỉ',
      dataIndex: 'provinceName',
      render: (index) => <Text>{Configs.toString(index)}</Text>,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      render: (dob) => (
        <Text>{convertTimeStampToString(Configs.toString(dob))}</Text>
      ),
    },
    {
      width: 160,
      align: 'center',
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case IS_ACTIVE.ACTIVE:
            return <Tag color={'cyan'}>Đang hoạt động</Tag>
          case IS_ACTIVE.INACTIVE:
            return <Tag color={'red'}>Ngừng hoạt động</Tag>
        }
      },
    },
  ]

  const getData = async () => {
    setisLoading(true)
    try {
      const res = await getListStaff(params)
      if (res.data) {
        const dataStaff = res.data?.data.map((item, index) => ({
          ...item,
          key: index,
          index: index + 1,
        }))
        setPaging({
          page: res.data?.page,
          limit: res.data?.limit,
          totalItemCount: res.data?.totalItemCount,
        })
        setlistStaff(dataStaff)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [params])

  const handleChangeStatus = async (id: number) => {
    try {
      const res = await changeStatus(id)
      if (res.message == 'Thành công') {
        getData()
        message.success('Thay đổi trạng thái thành công')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteStaff = async (id: number) => {
    try {
      const res = await deleteStaff(id)
      if (res.message == 'Thành công') {
        getData()
        message.success('Xoá nhân viên thành công')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const staffInfo = (record: IFormatedListStaff) => {
    return (
      <StyledCard
        bordered
        actions={[
          <>
            <Switch
              size="small"
              checked={record.status == IS_ACTIVE.ACTIVE ? true : false}
              onChange={() => handleChangeStatus(record.id)}
            />
            {record.status == IS_ACTIVE.ACTIVE ? (
              <TextStyled type="success"> Đang hoạt động </TextStyled>
            ) : (
              <TextStyled type="danger">Ngừng hoạt động </TextStyled>
            )}
          </>,
          <Button
            type="text"
            size="large"
            icon={<EditOutlined />}
            style={{ color: '#1abc9c' }}
            onClick={() =>
              history.push({
                pathname: `/staff/add-edit`,
                state: {
                  data: record,
                },
              })
            }
          >
            Chỉnh sửa
          </Button>,
          <Popconfirm
            title={'Bạn chắc chắn muốn xoá?'}
            onConfirm={async () => {
              handleDeleteStaff(record.id)
            }}
            okText="Xoá"
            cancelText="Quay lại"
            okButtonProps={{
              danger: true,
              type: 'primary',
            }}
          >
            <Button
              type="text"
              size="large"
              icon={<DeleteFilled />}
              style={{ color: 'red' }}
            >
              Xoá nhân viên
            </Button>
          </Popconfirm>,
        ]}
      >
        <Descriptions>
          <Descriptions.Item label="Tên nhân viên">
            {Configs.toString(record.name)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh" span={3}>
            {Configs.toString(convertTimeStampToString(record.dob))}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {Configs.toString(record.phone)}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={3}>
            {record.status == IS_ACTIVE.INACTIVE
              ? 'Ngừng hoạt động'
              : 'Đang hoạt động'}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {record.gender == GENDER.MALE ? 'Nam' : 'Nữ'}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {`${Configs.toString(record.wardName)}, ${Configs.toString(
              record.districtName
            )}, ${Configs.toString(record.provinceName)}`}
          </Descriptions.Item>
        </Descriptions>
      </StyledCard>
    )
  }

  return (
    <>
      <PageHeader
        title="Nhân viên"
        fixed={true}
        extra={
          <Button
            onClick={() => {
              history.push(`/staff/add-edit`)
            }}
            type="primary"
          >
            {R.strings().btn__add_new}
          </Button>
        }
      />
      <StyledDiv>
        <StaffFilters
          submitFieldValue={(value: IFilters) => setparams(value)}
        />
      </StyledDiv>
      <ContentScreen countFilter={paging.totalItemCount}>
        <StyledDiv>
          <Spin spinning={isLoading}>
            <Table
              border
              data={listStaff}
              columns={columns}
              expandedRowRender={(record) => staffInfo(record)}
              onChangePram={(page: number) => {
                setparams({ ...params, page: page })
                setPaging({ ...paging, page })
              }}
              pagination={paging}
            />
          </Spin>
        </StyledDiv>
      </ContentScreen>
    </>
  )
}

export default Staffs
function useDebounce(searchTerm: any, arg1: number) {
  throw new Error('Function not implemented.')
}
