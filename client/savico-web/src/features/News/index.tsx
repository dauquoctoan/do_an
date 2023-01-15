import { Button, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import FilterHeader from '../../commons/filter'
import message from '../../commons/message'
import PageHeader from '../../commons/pageHeader'
import Table from '../../commons/table'
import Configs from '../../configs'
import { POST_NEW_STATUS, STATUS, NEWS_TYPE } from '../../configs/constance'
import { ContainScreenStyled } from '../../global-styled'
import { IPagination } from '../../interface'
import { PATH } from '../../navigation/Router/config'
import { renderText } from '../../utils/functions'
import history from '../../utils/history'
import R from '../../utils/R'
import { DataType } from '../Stalls/interface'
import { changeStatusNews, deleteNews, getNews } from './api'
import { INews } from './interface'

interface ILoadingChecked {
  id: null | number
  loading: boolean
}
const News = () => {
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    total: 0,
  })
  const [filter, setFilter] = useState({})
  const [params, setParams] = useState({
    ...filter,
    page: 1,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [news, setNews] = useState<INews[]>([])
  const [loadingChecked, setLoadingChecked] = useState<ILoadingChecked>({
    id: 0,
    loading: false,
  })
  const columns: ColumnsType<INews> = [
    {
      width: 10,
      title: 'STT',
      dataIndex: 'stt',
      key: '',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      title: R.strings().news__table__news_title,
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      width: 150,
      title: R.strings().news__table__news_type,
      dataIndex: 'type',
      key: 'type',
      render: (key: number) => <span>{renderText(NEWS_TYPE[key])}</span>,
      // render: (key: number) => <span>{key}</span>,
    },
    {
      title: R.strings().news__table__news_post_status,
      dataIndex: 'typePost',
      key: 'typePost',
      render: (typePost) => (
        <span>{Configs.toString(POST_NEW_STATUS[typePost])}</span>
      ),
    },
    {
      title: 'Thứ tự hiển thị',
      dataIndex: 'index',
      key: 'index',
      render: (index: number) => <span>{index || '--'}</span>,
    },
    {
      title: R.strings().news__table__news_create_date,
      key: 'startDate',
      dataIndex: 'startDate',
      render: (startDate: string, record: any) => (
        <span>{renderText(Configs.formatDate(record.createDate))}</span>
      ),
    },
    {
      width: 90,
      // title: R.strings().news__table__news_status,
      title: 'Trạng thái hoạt động',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (status: any, record: any) => {
        return (
          <div>
            <Switch
              size="small"
              loading={
                loadingChecked.loading === true &&
                loadingChecked.id === record.id
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
            buttonEdit={
              // record.typePost !== 2
              //   ? {
              //       tooltipTitle: 'Sửa tin tức',
              //       tooltipPlacement: 'topLeft',
              //       tooltipDisable: record.id === 1 ? true : false,
              //     }
              //   : undefined
              {
                tooltipTitle: 'Sửa tin tức',
                tooltipPlacement: 'topLeft',
                tooltipDisable: record.id === 1 ? true : false,
              }
            }
            buttonDelete={{
              tooltipTitle: 'Xoá tin tức',
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => {
              e === 'edit' ? handleEdit(record) : handleDelete(record.key)
            }}
            confirm={{
              title: 'Bạn có chắc chắn muốn xoá tin này không?',
              handleConfirm: async () => {
                try {
                  const res = await deleteNews({ ID: record.id })
                  if (res) {
                    // message({
                    //   content: R.strings().news__add_edit__success__delete_news,
                    //   type: 'success',
                    // })
                    getData()
                  }
                } catch (error) {}
              },
            }}
          />
        </div>
      ),
    },
  ]
  const handleEdit = (e: any) => {
    history.push(PATH.LESSON_ADD_UPDATE.concat(`?id=${e.id}`))
  }

  const getData = async () => {
    setLoading(true)
    try {
      const res = await getNews(filter)
      if (res) {
        setNews(res.data.data)
        setPaging({
          limit: res.data.limit,
          page: res.data.page,
          total: res.data.total,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [filter, paging.page])
  const handleDelete = (e: any) => {}

  const handleChangeStatus = async (id: number) => {
    setLoadingChecked({ id: id, loading: true })
    try {
      const res = await changeStatusNews({ ID: id })
      if (res) {
        // message({
        //   content: R.strings().stalls__success__change_status,
        //   type: 'success',
        // })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingChecked({ id: id, loading: false })
    }
  }
  return (
    <ContainScreenStyled>
      <PageHeader
        title="bài học"
        extra={
          <Button
            onClick={() => {
              history.push(PATH.LESSON_ADD_UPDATE)
            }}
            type="primary"
          >
            Thêm mới bài học
          </Button>
        }
        fixed={true}
      />
      <FilterHeader
        search={{ placeholder: 'Tìm kiếm' }}
        select={[
          {
            width: 200,
            placeholder: R.strings().news__filter__news_type,
            key: 'type',
            data: NEWS_TYPE,
          },
          {
            width: 200,
            placeholder: R.strings().news__filter__status,
            key: 'status',
            data: STATUS,
          },
        ]}
        datePicker={{ width: 300 }}
        onChangeFilter={(e: any) => {
          setFilter({ ...e, page: 1 })
        }}
      />
      <ContentScreen loading={loading} countFilter={paging.total}>
        <Table
          border={true}
          columns={columns}
          data={news}
          size={'middle'}
          onChangePram={(page: number) => {
            setFilter({ ...filter, page: page })
            setPaging({ ...paging, page: page })
          }}
          pagination={paging}
        />
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default News
