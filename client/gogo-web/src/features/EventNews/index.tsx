import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import Table from '../../commons/table'
import Configs from '../../configs'
import { ContainScreenStyled, ModalStyled } from '../../global-styled'
import { Button, Form, Image } from 'antd'
import message from '../../commons/message'
import PageHeader from '../../commons/pageHeader'
import { IPagination } from '../../interface'
import { deleteEventNews, deletePart, getEventNews, getParts, getTopics } from './api'
import AddEditCategory from './components/AddEditCategory'
import FilterHeader from 'commons/filter'
import { IEventNews } from './interface'

const EventNews = () => {
  const [form] = Form.useForm()
  const columns: ColumnsType<IEventNews> = [
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
      title: 'Ảnh',
      dataIndex: 'picture',
      key: 'picture',
      render: (image) => (
        <Image
          width={50}
          src={image || Configs._default_image}
          preview={{
            src: image || Configs._default_image,
          }}
        />
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
              title: 'Bạn có chắc chắn muốn xóa tin tức sự kiện này không?',
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
  const [partDetail, setPartDetail] = useState<IEventNews | null>(null)
  const [partLessons, setPartLessons] = useState<IEventNews[]>([])
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
    const res = await getEventNews({
      page: paging.page,
      limit: paging.limit,
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
      const res = await deleteEventNews({ _id: id })
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
        title={'tin tức sự kiện'}
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
          placeholder: 'Nhập vào tên tin tức sự kiện',
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
            title={partDetail ? 'Sửa tin tức sự kiện' : 'Thêm mới tin tức sự kiện'}
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

export default EventNews
