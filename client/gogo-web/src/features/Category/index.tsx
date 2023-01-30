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

const Category = () => {
  const [form] = Form.useForm()
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
      title: 'topic',
      key: 'topic',
      dataIndex: 'topic',
      render: (topic: any, record: any) => (
        <span>{Configs.renderText(topic?.name)}</span>
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
              title: 'Bạn có chắc chắn muốn xóa học phần này không?',
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
  const [options, setOptions] = useState({})

  const getTopic = async () => {
    try {
      const res = await getTopics({
        // search: search,
      })
      if (res) {
        let option = {}
        res?.data?.forEach((e: any) => {
          option = { ...option, [e._id]: e.name }
          // option =
        })
        setOptions(option)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [paging.page, filter])

  const getData = async () => {
    setLoading(true)
    const res = await getParts({
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
      const res = await deletePart({ _id: id })
      if (res) {
        message.success(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTopic()
  }, [])
  return (
    <ContainScreenStyled>
      <PageHeader
        title={'Học phần'}
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
          placeholder: 'Nhập vào tên học phần',
        }}
        onChangeFilter={(filter: any) => {
          setFilter(filter)
        }}
        select={[
          {
            width: 200,
            placeholder: 'Chủ đề',
            key: 'type',
            data: options,
          },
        ]}
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
            title={partDetail ? 'Sửa học phần' : 'Thêm mới học phần'}
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

export default Category
