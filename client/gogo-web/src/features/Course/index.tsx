import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import Table from '../../commons/table'
import Configs from '../../configs'
import { ContainScreenStyled, ModalStyled } from '../../global-styled'
import { Button, Form } from 'antd'
import message from '../../commons/message'
import PageHeader from '../../commons/pageHeader'
import { IPagination } from '../../interface'
import { deletePart, getParts, getTopics } from './api'
import AddEditCategory from './components/AddEditCategory'
import { IPart } from './interface'
import FilterHeader from 'commons/filter'
import { TYPE_LESSON } from 'configs/constance'
import { apis } from 'configs/api'
import ApiClient from 'services'
import { formatNumber } from 'utils/formatNumber'
import { color } from 'highcharts'
import { constants } from 'buffer'
import history from 'utils/history'
import { useDispatch } from 'react-redux'
import { setCourse } from 'store/lesson/lessonSlice'

const Course = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const columns: ColumnsType<IPart> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Mô tả',
      key: 'desc',
      dataIndex: 'desc',
      render: (desc: any, record: any) => (
        <span>{Configs.renderText(desc)}</span>
      ),
    },
    {
      title: 'giá',
      key: 'price',
      dataIndex: 'price',
      render: (desc: any) => (
        <span>{Configs.renderText(formatNumber(desc))} VND</span>
      ),
    },
    {
      width: 50,
      title: 'Tạo khóa học',
      key: '_id',
      dataIndex: '_id',
      render: (_id: any, record: any) => (
        <Button onClick={() => {
          dispatch(setCourse('_id'))
          history.push('/lesson/add-update?course=' + _id)
        }} type='primary'>Thêm bài học</Button>
      ),
    },
    {
      width: 70,
      render: (_, record: any) => (
        <div>
          <ButtonAction
            buttonEdit={{
              tooltipTitle: 'Chỉnh sửa ngành hàng',
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.key === '1' ? true : false,
            }}
            buttonDelete={{
              tooltipTitle: 'Xóa ngành hàng',
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => (e === 'edit' ? handleEdit(record) : null)}
            confirm={{
              title: 'Bạn có chắc chắn muốn xóa khóa học này không?',
              handleConfirm: async () => {
                await handleDelete(record._id)
                getData()
              },
            }}
          />
        </div>
      ),
    },
  ]
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>()
  const [partDetail, setPartDetail] = useState<IPart | null>(null)
  const [partLessons, setPartLessons] = useState<IPart[]>([])
  const [filter, setFilter] = useState({})
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: 1,
    total: 0,
  })


  useEffect(() => {
    getData()
  }, [paging.page, filter])

  const getData = async () => {
    setLoading(true)
    let user: any = localStorage.getItem('user_info')
    if (user) {
      user = JSON.parse(user)
    }
    const res = await ApiClient.get('/courses', {
      page: paging.page,
      limit: paging.limit,
      user: user?._id,
      ...filter,
    })
    setPartLessons(res.data)
    setLoading(false)
  }

  const handleCloseModal = () => {
    setVisible(false)
    form.resetFields()
    setPartDetail(null)
    getData()
  }

  const handleEdit = (record: any) => {
    setPartDetail(record)
    setVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await ApiClient.delete('/course', { _id: id })
      if (res) {
        message.success(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ContainScreenStyled>
      <PageHeader
        title={'khóa học'}
        extra={
          <Button
            onClick={() => {
              setVisible(true)
            }}
            type="primary"
          >
            Thêm mới
          </Button>
        }
      />
      <FilterHeader
        size="middle"
        search={{
          placeholder: 'Nhập vào tên khóa học',
        }}
        onChangeFilter={(filter: any) => {
          setFilter(filter)
        }}

      />
      <ContentScreen loading={loading} countFilter={partLessons.length}>
        <div>
          <Table
            border={true}
            columns={columns}
            data={partLessons}
            size={'middle'}
            onChangePram={(page: number) =>
              setPaging({ ...paging, page: page })
            }
            pagination={paging}
          />
        </div>
        {visible && (
          <ModalStyled
            width={500}
            footer={null}
            title={partDetail ? 'Sửa khóa học' : 'Thêm mới Khóa học'}
            visible={visible}
            onCancel={() => {
              form.resetFields()
              setPartDetail(null)
              setVisible(false)
            }}
            children={
              <AddEditCategory
                handleCloseModal={handleCloseModal}
                detailPartLesson={partDetail}
                form={form}
              />
            }
          />
        )}
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default Course
