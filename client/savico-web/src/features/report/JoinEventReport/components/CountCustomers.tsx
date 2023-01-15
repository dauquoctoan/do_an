import { Col, DatePicker, Row, Typography } from 'antd'
import Table from 'commons/table'
import { ColumnsType } from 'antd/es/table'
import AutoSearchInput from 'commons/autoSearchInput/AutoSearchInput'
import { IListFilter } from 'commons/filter/interface'
import Configs from 'configs'
import { IPagination } from 'interface'
import moment from 'moment'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  IFormatedListNewCustomer,
  IListNewCusPayload,
} from '../JoinEventInterface'
import { ButtonAction } from 'commons/button'
import { useHistory } from 'react-router-dom'
import { PATH } from 'navigation/Router/config'
import PageHeader from 'commons/pageHeader'
import ContentScreen from 'commons/contentScreen'
import { getListNewCustomer } from '../JoinEventAPI'
const { RangePicker } = DatePicker
const WapperStyled = styled.div<any>`
  background-color: ${(props) => (props.color ? 'white' : null)};
  margin: 5px;
  padding: 8px 5px;
`
const { Text } = Typography

function ListJoinEvent() {
  const history = useHistory()
  const [listNewCustomer, setlistNewCustomer] = useState<
    IFormatedListNewCustomer[]
  >([])
  const [params, setparams] = useState<IListNewCusPayload>({
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

  const columns: ColumnsType<IFormatedListNewCustomer> = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (index) => {
        return <Text>{index}</Text>
      },
    },
    {
      title: 'Sự kiện',
      dataIndex: 'name',
      render: (eventName) => {
        return <Text>{eventName}</Text>
      },
    },
    {
      title: 'Tổng khách hàng',
      dataIndex: 'number',
      render: (countCustomer) => {
        return <Text>{countCustomer}</Text>
      },
    },
    {
      title: 'Thời gian diễn ra',
      dataIndex: '',
      render: (record) => {
        return (
          <Text>
            {record.fromDate} - {record.toDate}
          </Text>
        )
      },
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      align: 'center',
      render: (record) => {
        return (
          <ButtonAction
            buttonDetail={{
              tooltipTitle: 'Chi tiết',
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.key === '1' ? true : false,
            }}
            onClick={(e: any) =>
              e === 'detail'
                ? history.push({
                    pathname: `${PATH.DETAIL_COUNT_CUSTOMER_EVENT}/${record.id}`,
                    state: {
                      data: record,
                    },
                  })
                : null
            }
          />
        )
      },
    },
  ]
  useEffect(() => {
    getData()
  }, [params])

  const getData = async () => {
    try {
      const res = await getListNewCustomer(params)
      if (res.data) {
        const dataListNewCus = res.data.data.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            key: index,
          }
        })
        setlistNewCustomer(dataListNewCus)
        setpaging({
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
      <PageHeader title="Thống kê số khách hàng" />
      <WapperStyled color>
        <Row gutter={[16, 16]}>
          <Col>
            <AutoSearchInput
              width={300}
              placeholder="Tên sự kiện"
              onSearchSubmit={(value: string) =>
                setparams({ ...params, searchKey: value.trim() })
              }
            />
          </Col>
          <Col>
            <RangePicker
              format={Configs._formatDate}
              allowClear={true}
              disabledDate={(current) => {
                let customDate = moment().format('YYYY-MM-DD')
                return current && current < moment(customDate, 'YYYY-MM-DD')
              }}
              className="filter-item"
              onChange={(selectTime: any, timeString: Array<string>) => {
                setparams({
                  ...params,
                  fromDate: timeString[0],
                  toDate: timeString[1],
                })
              }}
            />
          </Col>
        </Row>
      </WapperStyled>
      <ContentScreen countFilter={paging.total}>
        <WapperStyled>
          <Table
            border={true}
            columns={columns}
            data={listNewCustomer}
            pagination={paging}
            onChangePram={(page: number) => setpaging({ ...paging, page })}
          />
        </WapperStyled>
      </ContentScreen>
    </>
  )
}

export default ListJoinEvent
