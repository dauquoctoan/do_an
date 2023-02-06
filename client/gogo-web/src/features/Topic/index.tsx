import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { ButtonAction } from '../../commons/button'
import ContentScreen from '../../commons/contentScreen'
import FilterHeader from '../../commons/filter'
import Table from '../../commons/table'
import { DataType } from '../../commons/table/interface'
import Configs from '../../configs'
import { ContainScreenStyled, ModalStyled } from '../../global-styled'
import R from '../../utils/R'
import AddAndEditAccount from './components/AddAndEditAccount'
import { IPagination } from '../../interface'
import message from '../../commons/message'
import PageHeader from '../../commons/pageHeader'
import { Button, Switch, Form, Image } from 'antd'
import { ITopics, IFormAddUpdateAccount, ILoadingSwitch } from './interface'
import {
  ChangeStatusAccount,
  deleteAccount,
  deleteTopic,
  getTopics,
} from './api'
import { STATUS, TYPE_ACCOUNT } from '../../configs/constance'
import ApiClient from 'services'
import { getItemLocalStore } from 'utils/localStore'

const Account = () => {
  const columns: ColumnsType<ITopics> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
      render: (text) => <span>{Configs.renderText(text)}</span>,
    },
    {
      title: 'Logo',
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
              tooltipTitle: 'Thêm mới chủ đề',
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.key === '1' ? true : false,
            }}
            buttonDelete={{
              tooltipTitle: 'Xóa chủ đề',
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => (e === 'edit' ? handleEdit(record) : null)}
            confirm={{
              title: 'Bạn Đã chắc chắn xóa chủ đề ?',
              handleConfirm: async () => {
                const res = await deleteTopic({ _id: record._id })
                if (res) {
                  message.success('Xóa thành công')
                  getData()
                }
              },
            }}
          />
        </div>
      ),
    },
  ]
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>()
  const [accountDetail, setAccountDetail] = useState<ITopics | null>(null)
  const [filter, setFilter] = useState<any>({})
  const [topics, setTopics] = useState<ITopics[]>([])
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: 1,
    total: 0,
  })
  const [options, setOptions] = useState({})

  useEffect(() => {
    getData()
  }, [paging.page, filter])

  const handleEdit = (topic: ITopics) => {
    const dataInit: any = {
      _id: topic._id,
      desc: topic.desc,
      name: topic.name,
      ageGroup: topic.ageGroup || '1',
      picture: topic.picture,
    }
    setAccountDetail(dataInit)
    setVisible(true)
  }

  const getData = async () => {
    setLoading(true)
    try {
      const res = await getTopics({
        ...filter,
        page: paging.page,
        limit: paging.limit,
      })
      if (res) {
        setTopics(res.data)
        setPaging({
          page: res.paging.page,
          limit: res.paging.limit,
          total: res.paging.total,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    form.resetFields()
    setAccountDetail(null)
    getData()
    setVisible(false)
  }



  const getCourse = async () => {
    try {
      const res = await ApiClient.get('/courses', {
        user: getItemLocalStore('user_info')._id
      })
      if (res) {
        let option = {}
        res?.data?.forEach((e: any) => {
          option = { ...option, [e._id]: e.title }
        })
        setOptions(option)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    () => {
      getCourse()
    }, []
  )

  return (
    <ContainScreenStyled>
      <PageHeader
        title="Chủ đề"
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
          placeholder: 'Nhập vào tên chủ đề',
        }}
        onChangeFilter={(filter: any) => {
          setFilter(filter)
        }}
        // options
        select={[
          {
            width: 200,
            placeholder: 'Khóa học',
            key: 'course',
            data: options,
          },
        ]}
      />
      <ContentScreen loading={loading} countFilter={paging.total}>
        <div>
          <Table
            border={true}
            columns={columns}
            data={topics}
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
            title={accountDetail ? 'Sửa chủ đề' : 'Thêm chủ đề'}
            visible={visible}
            onCancel={() => {
              form.resetFields()
              setAccountDetail(null)
              setVisible(false)
            }}
            children={
              <AddAndEditAccount
                accountDetail={accountDetail}
                handleCloseModal={handleCloseModal}
                form={form}
              />
            }
          />
        )}
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default Account
