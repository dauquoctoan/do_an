import { Button, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import message from 'commons/message'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ILesson, resetLesson, setLesson } from 'store/lesson/lessonSlice'
import rootReducer from 'store/rootReducer'
import { RootState } from 'store/store'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import FilterHeader from '../../commons/filter'
import PageHeader from '../../commons/pageHeader'
import Table from '../../commons/table'
import Configs from '../../configs'
import { STATUS, TYPE_LESSON, LEVEL, type_key } from '../../configs/constance'
import { ContainScreenStyled } from '../../global-styled'
import { IPagination } from '../../interface'
import { PATH } from '../../navigation/Router/config'
import { renderText } from '../../utils/functions'
import history from '../../utils/history'
import R from '../../utils/R'
import { DataType } from '../Stalls/interface'
import {
  changeStatusNews,
  deleteNews,
  delteLesson,
  getLessons,
  getNews,
} from './api'
import { INews } from './interface'

interface ILoadingChecked {
  id: null | number
  loading: boolean
}
const News = () => {
  const dispatch = useDispatch()
  // const { content, index, topic, type } = useSelector((state: RootState) => {
  //   return state.lessonReducer
  // })
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: Configs._default_page,
    total: 0,
  })
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState<boolean>(false)
  const [lessons, setLessons] = useState<INews[]>([])

  const columns: ColumnsType<INews> = [
    {
      width: 10,
      title: 'STT',
      dataIndex: 'stt',
      key: '',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{renderText(text)}</span>,
    },
    {
      width: 150,
      title: 'Loại bài tập',
      dataIndex: 'type',
      key: 'type',
      render: (key: number) => (
        <span>{renderText(TYPE_LESSON[String(key)])}</span>
      ),
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <span>{Configs.renderText(LEVEL[String(level)])}</span>
      ),
    }, {
      title: 'Khóa học',
      key: 'part',
      dataIndex: 'part',
      render: (part: any, record: any) => (
        <span>{renderText(part?.topic?.course?.title)}</span>
      ),
    },
    {
      title: 'Chủ đề',
      key: 'part',
      dataIndex: 'part',
      render: (part: any, record: any) => (
        <span>{renderText(part?.topic?.name)}</span>
      ),
    },

    {
      title: 'Học phần',
      key: 'part',
      dataIndex: 'part',
      render: (part: any, record: any) => (
        <span>{renderText(part?.title)}</span>
      ),
    },
    {
      width: 15,
      render: (_, record: any) => (
        <div>
          <ButtonAction
            buttonEdit={{
              tooltipTitle: 'Sửa tin tức',
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.id === 1 ? true : false,
            }}
            buttonDelete={{
              tooltipTitle: 'Xoá tin tức',
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => {
              e === 'edit' ? handleEdit(record) : handleDelete(record.key)
            }}
            confirm={{
              title: 'Bạn có chắc chắn muốn xoá bài tập này không?',
              handleConfirm: async () => {
                try {
                  await delteLesson({ _id: record._id })
                  message.success('Xóa thành công !')
                  getData()
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
  const handleEdit = (item: any) => {
    console.log('item', item)
    let data: ILesson
    if (
      item.type === type_key.choose_one_of_4_image ||
      item.type === type_key.choose_one_of_4
    ) {
      data = {
        topic: item?.part?.topic,
        part: item?.part,
        content: {
          picture: item?.picture,
          audio: item?.audio,
          level: item.level,
          title: item.title,
          options: [
            { title: item.options[0].title, picture: item.options[0].picture },
            { title: item.options[1].title, picture: item.options[1].picture },
            { title: item.options[2].title, picture: item.options[2].picture },
            { title: item.options[3].title, picture: item.options[3].picture },
          ],
          answer: item.answer,
          answers: [],
        },
        index: 1,
        type: item.type,
      }
    } else if (item.type === type_key.sort) {
      data = {
        topic: item?.part?.topic,
        part: item?.part,
        content: {
          picture: item?.picture,
          audio: item?.audio,
          level: item.level,
          title: item.title,
          options: item.answers,
          answer: item.answer,
          answers: item.answers,
        },
        index: 1,
        type: item.type,
      }
    } else if (item.type === type_key.choose_a_pair) {
      data = {
        topic: item?.part?.topic,
        part: item?.part,
        content: {
          picture: item?.picture,
          audio: item?.audio,
          level: item.level,
          title: item.title,
          options: item.answers,
          answer: item.answer,
          answers: item.answers,
        },
        index: 1,
        type: item.type,
      }
    } else {
      data = {
        topic: null,
        part: null,
        content: {
          level: null,
          title: null,
          options: [],
          answer: null,
          answers: [],
        },
        index: 1,
        type: null,
      }
    }
    dispatch(setLesson(data))
    history.push('/lesson/add-update?id=' + item._id)
  }
  const getData = async () => {
    setLoading(true)
    try {
      const res = await getLessons({
        page: paging.page,
        limit: paging.limit,
        ...filter,
      })
      setLessons(res.data)
      setPaging(res.paging)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [filter, paging.page])

  const handleDelete = (e: any) => { }

  return (
    <ContainScreenStyled>
      <PageHeader
        title="bài tập"
        extra={
          <Button
            onClick={() => {
              dispatch(resetLesson())
              history.push(PATH.LESSON_ADD_UPDATE)
            }}
            type="primary"
          >
            Thêm mới
          </Button>
        }
        fixed={true}
      />
      <FilterHeader
        search={{ placeholder: 'Tìm kiếm' }}
        select={[
          {
            width: 200,
            placeholder: 'Loại bài tập',
            key: 'type',
            data: TYPE_LESSON,
          },
        ]}
        datePicker={{ width: 300 }}
        onChangeFilter={(e: any) => {
          setFilter({ ...e, page: 1 })
        }}
      />
      <ContentScreen loading={loading} countFilter={lessons.length}>
        <Table
          border={true}
          columns={columns}
          data={lessons}
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
