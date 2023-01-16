import { Button, Switch, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { ButtonAction } from 'commons/button'
import ContentScreen from 'commons/contentScreen'
import FilterHeader from 'commons/filter'
import message from 'commons/message'
import PageHeader from 'commons/pageHeader'
import Table from 'commons/table'
import Configs from 'configs'
import { ContainScreenStyled } from 'global-styled'
import { IPagination } from 'interface'
import { PATH } from 'navigation/Router/config'
import { useEffect, useState } from 'react'
import { renderText } from 'utils/functions'
import history from 'utils/history'
import R from 'utils/R'
import { formatPrice } from 'utils/ruleForm'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { IFormatedVoucherAndGift, IVoucherAndGiftPayload } from './interface'
import {
  getListVoucherAndGift,
  VoucherAndGiftChangeStatus,
  VoucherAndGiftDelete,
} from './VoucherAndGiftAPI'

const VoucherAndGif = () => {
  const columns: ColumnsType<IFormatedVoucherAndGift> = [
    {
      width: 50,
      title: 'STT',
      dataIndex: 'index',
      render: (text: string, record: any, index: number) => (
        <td id={record.id}>{(paging.page - 1) * paging.limit + index + 1}</td>
      ),
    },
    {
      width: 200,
      title: R.strings().voucher_and_gif__table__name,
      dataIndex: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {renderText(text)}
        </Tooltip>
      ),
    },
    {
      width: 150,
      title: R.strings().voucher_and_gif__table__point_swap,
      dataIndex: 'point',
      render: (point) => {
        if (point === 0) {
          return <span>--</span>
        } else return <span>{formatPrice(renderText(point))}</span>
      },
    },
    {
      width: 150,
      title: R.strings().voucher_and_gif__table__type_swap,
      dataIndex: 'type',
      render: (text) => (
        <span>
          {text == 1 ? renderText('Quà tặng') : renderText('Voucher')}
        </span>
      ),
    },
    {
      width: 100,
      title: R.strings().voucher_and_gif__table__quantity,
      dataIndex: 'quantity',
      render: (quantity) => <span>{formatPrice(renderText(quantity))}</span>,
    },
    {
      width: 150,
      title: R.strings().voucher_and_gif__table__create_date,
      dataIndex: 'createDate',
      render: (value) => {
        return <div>{convertTimeStampToString(value)}</div>
      },
    },
    {
      width: 150,
      title: R.strings().voucher_and_gif__table__status,
      dataIndex: '',
      render: (record) => {
        return (
          <Switch
            size="small"
            onClick={async () => {
              await handleChangeStatus(record?.id)
              getData()
            }}
            checked={record?.status === 1 ? true : false}
          />
        )
      },
    },
    {
      title: 'Thao tác',
      width: 80,
      render: (_, record) => (
        <div>
          <ButtonAction
            buttonEdit={{
              tooltipTitle: 'Chỉnh sửa',
              tooltipPlacement: 'topLeft',
            }}
            buttonDetail={
              record.type === 2
                ? {
                    tooltipTitle: 'Chi tiết',
                    tooltipPlacement: 'topLeft',
                  }
                : {}
            }
            buttonDelete={{
              tooltipTitle: 'Xoá',
              tooltipPlacement: 'topLeft',
            }}
            onClick={(title: string) => {
              switch (title) {
                case 'edit':
                  return handleEdit(record)
                case 'detail':
                  return handleDetail(record)
                case 'delete':
                  return ''
              }
            }}
            confirm={{
              title: R.strings().voucher_and_gif__confirm__delete,
              handleConfirm: async () => {
                try {
                  const res = await VoucherAndGiftDelete(record.id)
                  if (res) {
                    message.success('Xóa quà tặng, voucher thành công')
                    getData()
                  }
                } catch (error) {
                  console.error(error)
                }
              },
            }}
          />
        </div>
      ),
    },
  ]

  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    total: 0,
  })
  const [voucherAndGift, setVoucherAndGift] = useState<
    IFormatedVoucherAndGift[]
  >([])
  const [allDataVoucherGift, setallDataVoucherGift] = useState<any>()
  const [isStatus, setisStatus] = useState<boolean | null>()
  const [params, setparams] = useState<IVoucherAndGiftPayload>({
    page: 1,
    limit: 10,
    searchKey: '',
    type: undefined,
    fromDate: undefined,
    toDate: undefined,
  })

  const getData = async () => {
    const res = await getListVoucherAndGift(params)
    if (res.data) {
      setallDataVoucherGift(res.data)
    }
    if (res?.data?.page && res.data?.limit && res.data?.total) {
      setPaging({
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      })
    }
    if (res.data.data) {
      const dataVoucherAndGift = res?.data?.data?.map((item, index) => ({
        ...item,
        key: index,
        index: index + 1,
      }))
      setVoucherAndGift(dataVoucherAndGift)
    }
  }

  useEffect(() => {
    getData()
  }, [params])

  const handleChangeStatus = async (id: number) => {
    try {
      const res = await VoucherAndGiftChangeStatus(id)
      if (res) {
        // message({
        //   content: 'Thay đổi trạng thái thành công',
        //   type: 'success',
        // })
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (record: IFormatedVoucherAndGift) => {
    history.push({
      pathname: PATH.ADD_UPDATE_VOUCHER,
      state: {
        data: record,
      },
    })
  }

  const handleDetail = (record: IFormatedVoucherAndGift) => {
    history.push({
      pathname: `${PATH.VOUCHER_DETAIL}/${record.id}`,
      state: {
        data: record,
      },
    })
  }

  return (
    <ContainScreenStyled>
      <PageHeader
        title="Danh sách quà tặng, voucher"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: PATH.ADD_UPDATE_VOUCHER,
              })
            }}
            children={R.strings().btn__add_new}
          />
        }
      />
      <FilterHeader
        onChangeFilter={(value: any) =>
          setparams({
            ...params,
            page: 1,
            searchKey: value.searchKey,
            type: value.type,
            fromDate: value.fromDate,
            toDate: value.toDate,
          })
        }
        search={{ width: 300, placeholder: 'Tên quà tặng, voucher' }}
        select={[
          {
            width: 300,
            placeholder: 'Loại đổi quà',
            data: { 1: 'Quà tặng', 2: 'Voucher' },
            key: 'type',
          },
        ]}
        datePicker={{ width: 300 }}
      />
      <ContentScreen
        countFilter={allDataVoucherGift?.total || 0}
        loading={false}
      >
        <Table
          border={true}
          columns={columns}
          data={voucherAndGift}
          size={'middle'}
          onChangePram={(page: number) => {
            setparams({ ...params, page })
            setPaging({ ...paging, page: page })
          }}
          pagination={paging}
        />
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default VoucherAndGif
