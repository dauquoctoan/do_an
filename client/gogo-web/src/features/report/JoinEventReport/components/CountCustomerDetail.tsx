import { Col, DatePicker, Row, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import AutoSearchInput from 'commons/autoSearchInput/AutoSearchInput'
import { ButtonAction } from 'commons/button'
import ContentScreen from 'commons/contentScreen'
import PageHeader from 'commons/pageHeader'
import Table from 'commons/table'
import Configs from 'configs'
import { IPagination } from 'interface'
import moment from 'moment'
import { PATH } from 'navigation/Router/config'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { getListNewCustomerDetail } from '../JoinEventAPI'
import {
  ICounCustomerDetail,
  ICountCustomerDetailPayload,
  IFormatedDetailCountCustomer,
  IListNewCusPayload,
} from '../JoinEventInterface'
const { RangePicker } = DatePicker
const { Text } = Typography

const ContentWapper = styled.div<any>`
  background-color: ${(props) => (props.color ? 'white' : null)};
  margin: 5px;
  padding: 8px 5px;
`
interface IProps {
  location: any
}

function DetailJoinEvent(props: IProps) {
  const location = props.location?.state?.data
  const history = useHistory()
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [listCustomerDetail, setlistCustomerDetail] = useState<
    ICounCustomerDetail[]
  >([])
  const [params, setparams] = useState<ICountCustomerDetailPayload>({
    id: location.id,
    page: 1,
    limit: Configs._limit,
    searchKey: undefined,
    fromDate: undefined,
    toDate: undefined,
  })
  const [paging, setpaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    total: 0,
  })

  const columns: ColumnsType<IFormatedDetailCountCustomer> = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (index) => {
        return <Text>{index}</Text>
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      render: (name) => {
        return <Text>{name}</Text>
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (phone) => {
        return <Text>{phone}</Text>
      },
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createdDate',
      render: (createdDate) => {
        return <Text>{convertTimeStampToString(createdDate)}</Text>
      },
    },
  ]

  const getData = async () => {
    setisLoading(true)
    try {
      const res = await getListNewCustomerDetail(params)
      if (res.data) {
        const dataCountCustomerDetail = res.data.data.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            key: index,
          }
        })
        setlistCustomerDetail(dataCountCustomerDetail)
        setpaging({
          limit: res.data.limit,
          page: res.data.page,
          total: res.data.total,
        })
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

  return (
    <>
      <PageHeader
        onBack={() => {
          history.push({
            pathname: PATH.COUNT_CUSTOMER_EVENT,
            state: {
              data: location,
            },
          })
        }}
        title="Chi tiết số khách hàng"
      />
      <ContentWapper color>
        <Row gutter={[16, 16]}>
          <Col>
            <AutoSearchInput
              width={320}
              placeholder="Tên hoặc số điện thoại khách hàng"
              onSearchSubmit={(value: any) =>
                setparams({ ...params, searchKey: value.trim(), page: 1 })
              }
            />
          </Col>
          <Col>
            <RangePicker
              format={Configs._formatDate}
              allowClear={true}
              className="filter-item"
              onChange={(selectTime: any, timeString: Array<string>) => {
                setparams({
                  ...params,
                  fromDate: timeString[0],
                  toDate: timeString[1],
                  page: 1,
                })
              }}
            />
          </Col>
        </Row>
      </ContentWapper>
      <ContentScreen countFilter={paging.total}>
        <ContentWapper>
          <Table
            border={true}
            columns={columns}
            data={listCustomerDetail}
            pagination={paging}
            onChangePram={(page: number) => setpaging({ ...paging, page })}
          />
        </ContentWapper>
      </ContentScreen>
    </>
  )
}

export default DetailJoinEvent
