import { Button, Card, message, Spin, Switch, Tag, Typography } from 'antd'
import { EditOutlined, DeleteFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import Table from 'commons/table'
import Configs from 'configs'
import { GENDER, IS_ACTIVE, type_account } from 'configs/constance'
import { IPagination } from 'interface'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { changeStatus, deleteStaff, getListStaff, getUsers } from '../StaffAPI'
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
import FilterHeader from 'commons/filter'
const { Text } = Typography

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
    total: 0,
  })
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<any[]>([])
  const history = useHistory()
  const columns: ColumnsType<IFormatedListStaff> = [
    {
      width: 10,
      title: 'STT',
      dataIndex: 'stt',
      key: '',
      render: (index) => <span>{Configs.renderText(index)}</span>,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      render: (name) => <Text>{Configs.renderText(name)}</Text>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email) => <Text>{Configs.renderText(email)}</Text>,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (gender) => <Text>{gender == GENDER.MALE ? 'Nam' : 'Nữ'}</Text>,
    },
    {
      width: 130,
      title: 'Tuổi',
      dataIndex: 'age',
      render: (age) => <Text>{Configs.renderText(age)}</Text>,
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'typeAccount',
      render: (typeAccount) => (
        <Text>{Configs.renderText(type_account[typeAccount])}</Text>
      ),
    },
    {
      width: 160,
      align: 'center',
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case '1':
            return <Tag color={'cyan'}>Đang hoạt động</Tag>
          case '0':
            return <Tag color={'red'}>Ngừng hoạt động</Tag>
        }
      },
    },
  ]

  const getData = async () => {
    setisLoading(true)
    const res = await getUsers({ limit: paging.limit, page: paging.page })
    setUsers(res.data)
    setisLoading(false)
  }

  useEffect(() => {
    getData()
  }, [params])

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
      <FilterHeader
        size="middle"
        search={{
          placeholder: 'Nhập vào tên học phần',
        }}
        onChangeFilter={(filter: any) => {
          // setFilter(filter)
        }}
        // select={[
        //   {
        //     width: 200,
        //     placeholder: 'Chủ đề',
        //     key: 'type',
        //     data: options,
        //   },
        // ]}
      />
      <ContentScreen countFilter={paging.total}>
        <StyledDiv>
          <Spin spinning={isLoading}>
            <Table
              border={true}
              columns={columns}
              data={users}
              size={'middle'}
              onChangePram={(page: number) =>
                setPaging({ ...paging, page: page })
              }
              pagination={paging}
            />
          </Spin>
        </StyledDiv>
      </ContentScreen>
    </>
  )
}

export default Staffs

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
