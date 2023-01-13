import { Button, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import FilterHeader from '../../commons/filter'
import message from '../../commons/message'
import PageHeader from '../../commons/pageHeader'
import Table from '../../commons/table'
import Configs from '../../configs'
import { FLOOR, STATUS } from '../../configs/constance'
import { ContainScreenStyled } from '../../global-styled'
import { IPagination } from '../../interface'
import { PATH } from '../../navigation/Router/config'
import { renderText } from '../../utils/functions'
import history from '../../utils/history'
import R from '../../utils/R'
import {
  changeStatusStall,
  deleteStall,
  getDataTypeStalls,
  getStalls,
} from './api'
import { ICategory, ILoadingChecked, IStalls } from './interface'

const Stalls = () => {
  const columns: ColumnsType<IStalls> = [
    {
      width: 10,
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      width: 120,
      title: R.strings().stalls__table__stalls_code,
      dataIndex: 'code',
      key: 'code',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      width: 150,
      title: R.strings().stalls__table__stalls_name,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      width: 100,
      title: R.strings().stalls__table__stalls_position,
      dataIndex: 'floor',
      key: 'floor',
      render: (text) => <span>{renderText(FLOOR[text])}</span>,
    },
    {
      title: R.strings().stalls__table__stalls_contact,
      key: 'phone',
      dataIndex: 'phone',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      title: 'Thứ tự hiển thị',
      key: 'index',
      dataIndex: 'index',
      render: (index) => <span>{index || '--'}</span>,
    },
    {
      title: 'Ngày tạo',
      key: 'createdDate',
      dataIndex: 'createdDate',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      width: 120,
      title: R.strings().stalls__table__stalls_type,
      key: 'categoryID',
      dataIndex: 'categoryID',
      render: (text) => <span>{renderText(categoryFilter[text])}</span>,
    },
    {
      width: 90,
      title: R.strings().stalls__table__stalls_status,
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (status: any, record: any) => {
        return (
          <div>
            <Switch
              size="small"
              loading={
                record.id === loadingChecked.id &&
                loadingChecked.loading === true
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
      width: 15,
      render: (_, record: any) => (
        <div>
          <ButtonAction
            buttonEdit={{
              tooltipTitle: R.strings().stalls__edit_stalls,
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.id === 1 ? true : false,
            }}
            buttonDelete={{
              tooltipTitle: R.strings().stalls__delete_stalls,
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => (e === 'edit' ? handleEdit(record) : null)}
            confirm={{
              title: R.strings().stalls__confirm_delete,
              handleConfirm: async () => {
                try {
                  const res = await deleteStall({ ID: record.id })
                  if (res) {
                    message({
                      content: 'Xóa gian hàng thàn công!',
                      type: 'success',
                    })
                    getData()
                  }
                } catch (error) {
                  console.log(error)
                }
              },
            }}
          />
        </div>
      ),
    },
  ]
  const [loading, setLoading] = useState<boolean>(false)
  const [stalls, setStalls] = useState<IStalls[]>([])
  const [filter, setFilter] = useState({})
  const [categoryFilter, setCategoryFilter] = useState<any>({})
  const [category, setCategory] = useState<ICategory[]>([])
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: 1,
    totalItemCount: 0,
  })
  const [loadingChecked, setLoadingChecked] = useState<ILoadingChecked>({
    id: null,
    loading: false,
  })
  const handleChangeStatus = async (id: number) => {
    setLoadingChecked({ id: id, loading: true })
    try {
      const res = await changeStatusStall({ ID: id })
      if (res) {
        message({
          content: R.strings().stalls__success__change_status,
          type: 'success',
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingChecked({ id: id, loading: false })
    }
  }

  const handleEdit = (e: any) => {
    history.push(PATH.STALLS_ADD_UPDATE.concat(`?id=${e.id}`))
  }

  useEffect(() => {
    getTypeStalls()
  }, [])

  useEffect(() => {
    getData()
  }, [paging.page, filter])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await getStalls(filter)
      setStalls(res?.data?.data)
      setPaging({
        ...paging,
        totalItemCount: res.data.totalItemCount,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const getTypeStalls = async () => {
    try {
      setLoading(true)
      const res: any = await getDataTypeStalls()
      if (res) {
        let data: { [key: string]: string } = {}
        res?.data?.data.forEach((item: ICategory) => {
          data = { ...data, [item.id]: item.name }
        })
        setCategoryFilter(data)
      }
    } catch (error) {
      console.log('error: Lỗi truy vẫn loại gian hàng', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <ContainScreenStyled>
      <PageHeader
        title="Gian hàng"
        extra={
          <Button
            onClick={() => {
              history.push(PATH.STALLS_ADD_UPDATE)
            }}
            type="primary"
          >
            {R.strings().btn__add_new}
          </Button>
        }
        fixed={true}
      />
      <FilterHeader
        size="middle"
        search={{
          width: 280,
          placeholder: R.strings().stalls__placeholder_search,
        }}
        select={[
          {
            width: 220,
            key: 'type',
            placeholder: R.strings().stalls__placeholder_type_stalls,
            data: categoryFilter,
            showSearch: true,
          },
          {
            width: 220,
            key: 'status',
            placeholder: R.strings().stalls__placeholder_status,
            data: STATUS,
          },
          {
            width: 220,
            key: 'floor',
            placeholder: R.strings().stalls__placeholder_floor,
            data: FLOOR,
          },
        ]}
        onChangeFilter={(e: any) => {
          setFilter({ ...e, page: 1 })
        }}
      />
      <ContentScreen loading={loading} countFilter={paging.totalItemCount}>
        <div>
          <Table
            border={true}
            columns={columns}
            data={stalls}
            size={'middle'}
            onChangePram={(page: number) => {
              setFilter({ ...filter, page: page })
              setPaging({ ...paging, page: page })
            }}
            pagination={paging}
          />
        </div>
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default Stalls
