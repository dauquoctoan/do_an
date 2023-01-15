import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import Table from '../../commons/table'
import Configs from '../../configs'
import { ContainScreenStyled, ModalStyled } from '../../global-styled'
import R from '../../utils/R'
// import AddAndEditAccount from './components/AddAndEditAccount'
import { Button, Form, Switch } from 'antd'
import message from '../../commons/message'
import PageHeader from '../../commons/pageHeader'
import { IPagination } from '../../interface'
// import { IAccount, IFormAddUpdateAccount, ILoadingSwitch } from './interface'
// import { ChangeStatusAccount, deleteAccount, getAccounts } from './api'
import { deleteCategory, getCategories, updateCategory } from './api'
import AddEditCategory from './components/AddEditCategory'
import { ICategory } from './interface'

const Category = () => {
  const [form] = Form.useForm()
  const columns: ColumnsType<ICategory> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status: number, record: any) => (
        <span>
          <Switch
            onClick={() => {
              changeStatus(record)
            }}
            size="small"
            checked={status === 1 ? true : false}
          />
        </span>
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
              // title: R.strings().account__title__confirm_delete,
              title: 'Bạn có chắc chắn muốn xoá ngành hàng này không?',
              handleConfirm: async () => {
                await handleDelete(record.id)
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
  const [categoryDetail, setCategoryDetail] = useState<ICategory | null>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
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
    try {
      const res = await getCategories({
        // ...filter,
        page: paging.page,
        limit: paging.limit,
      })
      if (res) {
        setCategories(res.data.data)
        setPaging({
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleCloseModal = () => {
    setVisible(false)
    getData()
  }
  const handleEdit = (record: any) => {
    setCategoryDetail(record)
    setVisible(true)
  }
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCategory({ ID: id })
      if (res) {
        // message({ type: 'success', content: 'Xóa thành công ngành hàng' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const changeStatus = async (record: any) => {
    try {
      setLoading(true)
      const updatedRecord = { ...record, status: record?.status === 1 ? 0 : 1 }
      const res = await updateCategory(updatedRecord)
      if (res.status) {
        message.error('Chỉnh sửa trạng thái ngành hàng thành công')
        getData()
      } else {
        message.error('Chỉnh sửa trạng thái ngành hàng thất bại')
      }
    } catch (error) {
      console.log('ERROR')
    } finally {
      setLoading(false)
    }
  }
  return (
    <ContainScreenStyled>
      <PageHeader
        title={'Card'}
        extra={
          <Button
            onClick={() => {
              setVisible(true)
            }}
            type="primary"
          >
            Thêm mới cards
          </Button>
        }
      />
      <ContentScreen loading={loading} countFilter={paging.total}>
        <div>
          <Table
            border={true}
            columns={columns}
            data={categories}
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
            title={categoryDetail ? 'Sửa ngành hàng' : 'Thêm mới ngành hàng'}
            visible={visible}
            onCancel={() => {
              form.resetFields()
              setCategoryDetail(null)
              setVisible(false)
            }}
            children={
              <AddEditCategory
                handleCloseModal={handleCloseModal}
                detailCategory={categoryDetail}
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
///
