import { useState, useEffect } from 'react'
import { message } from 'antd'
import FilterHeader from 'commons/filter'
import PageHeader from 'commons/pageHeader'
import Table from 'commons/table'
import Configs from 'configs'
import {
  IListJoinDay,
  IListUsageFrequency,
  IUsageFrequencyPayload,
} from '../InterfaceUsageFrequency'
import { ColumnsType } from 'antd/lib/table'
import { Typography } from 'antd'
import styled from 'styled-components'
import ContentScreen from 'commons/contentScreen'
import { IPagination } from 'interface'
import { getListUsageFrequency } from '../APIUsageFrequency'
import { convertTimeStampToString } from 'utils/TimerHelper'
const { Text } = Typography
const WapperStyled = styled.div`
  padding: 15px 0;
  background-color: white;
  /* margin: ; */
`

function usageFrequencies() {
  const [listUsageFrequency, setlistUsageFrequency] = useState<
    IListUsageFrequency[]
  >([])
  const [detailListUsageFrequency, setdetailListUsageFrequency] = useState<
    IListJoinDay[]
  >([])
  const [params, setparams] = useState<IUsageFrequencyPayload>({
    page: 1,
    limit: Configs._limit,
    searchKey: undefined,
    fromDate: undefined,
    toDate: undefined,
  })
  const [paging, setpaging] = useState<IPagination>({
    page: Configs._default_page,
    limit: Configs._limit,
    total: 0,
  })
  const columns: ColumnsType<IListUsageFrequency> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (stt) => <Text>{stt}</Text>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      render: (name) => <Text>{Configs.renderText(name)}</Text>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (phone) => <Text>{Configs.renderText(phone)}</Text>,
    },
    {
      title: 'Thời gian sử dụng trung bình',
      dataIndex: 'averageTime',
      render: (averageTime) => (
        <Text>{averageTime ? `${averageTime} giờ` : '---'}</Text>
      ),
    },
    {
      title: 'Số lượt click sự kiện',
      dataIndex: 'sumEventClick',
      render: (sumEventClick) => <Text>{Configs.renderText(sumEventClick)}</Text>,
    },
    {
      title: 'Số lượt click tiện ích',
      dataIndex: 'sumNewsClick',
      render: (sumNewsClick) => <Text>{Configs.renderText(sumNewsClick)}</Text>,
    },
  ]

  const detailColumns: ColumnsType<IListJoinDay> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (stt) => <Text>{stt}</Text>,
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'useDate',
      render: (useDate) => (
        <Text>{Configs.renderText(convertTimeStampToString(useDate))}</Text>
      ),
    },
    {
      title: 'Thời gian sử dụng',
      dataIndex: 'useDuration',
      render: (useDuration) => (
        <Text>{useDuration ? `${useDuration} giờ` : '---'}</Text>
      ),
    },
    {
      title: 'Số lượt click sự kiện',
      dataIndex: 'eventClick',
      render: (eventClick) => <Text>{Configs.renderText(eventClick)}</Text>,
    },
    {
      title: 'Số lượt click tiện ích',
      dataIndex: 'newsClick',
      render: (newsClick) => <Text>{Configs.renderText(newsClick)}</Text>,
    },
  ]

  const getData = async () => {
    try {
      const res = await getListUsageFrequency(params)
      if (res.data) {
        const data = res.data.data.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            key: index,
          }
        })
        setlistUsageFrequency(data)
        setpaging({
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
        })
      }
    } catch (err) {
      message.error('Lỗi truy vấn')
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [paging.page, params])

  const detailUsageFrequency = (record: IListUsageFrequency) => {
    return (
      <WapperStyled>
        <Table
          border
          key={record.phone}
          columns={detailColumns}
          data={record.listJoinDay}
        />
      </WapperStyled>
    )
  }

  return (
    <>
      <PageHeader title="Tần suất sử dụng App" />
      <FilterHeader
        onChangeFilter={(values: any) => setparams(values)}
        search={{
          width: 320,
          placeholder: 'Tên hoặc số điện thoại khách hàng',
        }}
        datePicker={{ width: 300, future: true }}
      />
      <ContentScreen countFilter={paging.total}>
        <Table
          border
          columns={columns}
          data={listUsageFrequency}
          pagination={paging}
          onChangePram={(page) => {
            setparams({ ...params, page: page, limit: paging.limit })
            setpaging({ ...paging, page })
          }}
          expandedRowRender={(record) => detailUsageFrequency(record)}
        />
      </ContentScreen>
    </>
  )
}

export default usageFrequencies
