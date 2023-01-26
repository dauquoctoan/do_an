import { message, Typography, Switch, Button } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ButtonAction } from 'commons/button'
import ContentScreen from 'commons/contentScreen'
import FilterHeader from 'commons/filter'
import PageHeader from 'commons/pageHeader'
import Table from 'commons/table'
import Configs from 'configs'
import { IS_ACTIVE } from 'configs/constance'
import { IPagination } from 'interface'
import { PATH } from 'navigation/Router/config'
import { PATH_ADMIN } from 'navigation/Router/PathName'
import React from 'react'
import { useState, useEffect } from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { formatNumber } from 'utils/formatNumber'
import R from 'utils/R'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { changeStatusEvent, deleteEvent, getListEvent } from '../APIEvent'
import { IListEventPayload } from '../InterfaceEvents'
import QRCodeModal from './QRCodeModal'

const { Text } = Typography

function Events() {
  const history = useHistory()
  const [listEvent, setlistEvent] = useState<any[]>([])
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [params, setparams] = useState<IListEventPayload>({
    limit: Configs._limit,
    page: Configs._default_page,
    searchKey: undefined,
    status: undefined,
    fromDate: undefined,
    toDate: undefined,
  })
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    total: 0,
  })
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [currentTitle, setCurrentTitle] = React.useState<string>('')
  const [currentId, setCurrentId] = React.useState<number>(-1)

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (stt) => <Text>{stt}</Text>,
    },
    {
      title: 'Tên chiến dịch',
      dataIndex: 'title',
      render: (title) => <Text>{title}</Text>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createDate',
      render: (createDate) => (
        <Text>{convertTimeStampToString(createDate)}</Text>
      ),
    },
    {
      title: 'Số lượng quà tặng',
      dataIndex: 'totalGift',
      render: (value: any) => <Text>{formatNumber(value || 0)}</Text>,
    },
    {
      align: 'center',
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, record) => (
        <Switch
          disabled={isLoading}
          size="small"
          checked={status == IS_ACTIVE.ACTIVE}
          onClick={async () => {
            try {
              const res = await changeStatusEvent(record.id)
              if (res.message) {
                getData()
                message.success('Thay đổi trạng thái thành công')
              }
            } catch (err) {
              console.log(err)
            }
          }}
        />
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      render: (record) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              style={{ width: 20, height: 20, border: 'none' }}
              icon={<BiInfoCircle />}
              onClick={() => {
                setCurrentTitle(record.title)
                setIsVisible(true)
                setCurrentId(record.id)
              }}
            />
            <ButtonAction
              onClick={(e: any) => {
                if (e === 'edit') {
                  history.push({
                    pathname: `${PATH_ADMIN.EVENT_ADD_UPDATE}`,
                    state: {
                      id: record.id,
                    },
                  })
                }
                if (e === 'detail') {
                  history.push({
                    pathname: `${PATH_ADMIN.EVENT_DETAIL}/${record.id}`,
                    state: {
                      data: record,
                    },
                  })
                }
              }}
              buttonEdit={{
                tooltipTitle: 'Chỉnh sửa chiến dịch',
                tooltipPlacement: 'topLeft',
                tooltipDisable: record.key === '1' ? true : false,
              }}
              buttonDelete={{
                tooltipTitle: 'Xóa chiến dịch',
                tooltipPlacement: 'topLeft',
              }}
              confirm={{
                title: 'Bạn chắc chắn muốn xoá chiến dịch này?',
                handleConfirm: () => handleDelete(record),
              }}
            />
          </div>
        )
      },
    },
  ]

  const handleDelete = async (record: any) => {
    try {
      const res = await deleteEvent(record.id)
      if (res.message == 'Thành công') {
        getData()
        message.success('Xoá thành công')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [params])

  const getData = async () => {
    setisLoading(true)
    try {
      const res = await getListEvent(params)
      if (res.data) {
        setlistEvent(res.data.data)
        setPaging({
          limit: res.data.limit,
          page: res.data.page,
          total: res.data.total,
        })
      }
    } catch (err) {
      console.log(err)
      message.error('Có lỗi xảy ra')
    } finally {
      setisLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Chiến dịch"
        extra={
          <Button
            onClick={() => {
              history.push(PATH_ADMIN.EVENT_ADD_UPDATE)
            }}
            type="primary"
          >
            {R.strings().btn__add_new}
          </Button>
        }
        fixed
      />
      <FilterHeader
        search={{ placeholder: 'Tên chiến dịch' }}
        select={[
          {
            width: 200,
            key: 'status',
            placeholder: 'Trạng thái hoạt động',
            data: { 1: 'Đang hoạt động', 0: 'Ngừng hoạt động' },
          },
        ]}
        datePicker={{ width: 300 }}
        onChangeFilter={(filter: any) => {
          setparams({
            ...params,
            page: 1,
            searchKey: filter.searchKey,
            status: filter.status,
            fromDate: filter.fromDate,
            toDate: filter.toDate,
          })
        }}
        button={{
          width: 130,
          type: 'add',
          title: 'Thêm mới',
          onClick: () =>
            history.push({ pathname: PATH_ADMIN.EVENT_ADD_UPDATE }),
        }}
      />
      <ContentScreen loading={isLoading} countFilter={paging.total}>
        <Table
          data={listEvent}
          columns={columns}
          pagination={paging}
          border
          onChangePram={(page) => setparams({ ...params, page })}
        />
        <QRCodeModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          currentTitle={currentTitle}
          currentId={currentId}
        />
      </ContentScreen>
    </>
  )
}

export default Events
