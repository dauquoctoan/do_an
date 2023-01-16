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
import { Button, Switch, Form } from 'antd'
import { IAccount, IFormAddUpdateAccount, ILoadingSwitch } from './interface'
import { ChangeStatusAccount, deleteAccount, getAccounts } from './api'
import { STATUS, TYPE_ACCOUNT } from '../../configs/constance'

const Account = () => {
  const columns: ColumnsType<IAccount> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: R.strings().account_and_customer__title__name,
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: R.strings().account_and_customer__title__phone_number,
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: R.strings().account_and_customer__title__position,
      dataIndex: 'roleID',
      key: 'roleID',
      render: (text) => <span>{Configs.toString(TYPE_ACCOUNT[text])}</span>,
    },
    {
      title: R.strings().account_and_customer__title__email,
      key: 'email',
      dataIndex: 'email',
      render: (text: string) => <span>{Configs.toString(text)}</span>,
    },
    {
      title: R.strings().account_and_customer__title__status,
      key: 'status',
      dataIndex: 'status',
      render: (status: number, record: IAccount) => (
        <span>
          <Switch
            onClick={async () => {
              await handleChangeStatus(record.id)
              getData()
            }}
            loading={
              loadingSwitch.id === record.id && loadingSwitch.loading === true
            }
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
              tooltipTitle: R.strings().account__title__add,
              tooltipPlacement: 'topLeft',
              tooltipDisable: record.key === '1' ? true : false,
            }}
            buttonDelete={{
              tooltipTitle: R.strings().account__title__delete,
              tooltipPlacement: 'topLeft',
            }}
            onClick={(e: any) => (e === 'edit' ? handleEdit(record) : null)}
            confirm={{
              title: R.strings().account__title__confirm_delete,
              handleConfirm: async () => {
                const res = await deleteAccount({ ID: record.id })
                if (res) {
                  message({
                    content: R.strings().account__title__success_delete,
                    type: 'success',
                  }),
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
  const [accountDetail, setAccountDetail] =
    useState<IFormAddUpdateAccount | null>(null)
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [filter, setFilter] = useState({})
  const [paging, setPaging] = useState<IPagination>({
    limit: Configs._limit,
    page: 1,
    totalItemCount: 0,
  })
  const [loadingSwitch, setLoadingSwitch] = useState<ILoadingSwitch>({
    loading: false,
    id: 0,
  })
  useEffect(() => {
    getData()
  }, [paging.page, filter])

  const handleEdit = (account: IAccount) => {
    const dataInit: IFormAddUpdateAccount = {
      id: account.id,
      email: account.email,
      name: account.username,
      phone: account.phone,
      role: account.roleID,
      status: account.status,
    }
    setAccountDetail(dataInit)
    setVisible(true)
  }
  const typeAccount: { key: number; value: string }[] = Object.keys(
    TYPE_ACCOUNT
  ).map((key: string) => {
    return { key: Number(key), value: TYPE_ACCOUNT[key] }
  })
  const getData = async () => {
    setLoading(true)
    try {
      const res = await getAccounts({
        ...filter,
        page: paging.page,
        limit: paging.limit,
      })
      if (res) {
        setAccounts(res.data.data)
        setPaging({
          page: res.data.page,
          limit: res.data.limit,
          totalItemCount: res.data.totalItemCount,
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

  const handleChangeStatus = async (id: number) => {
    setLoadingSwitch({
      loading: true,
      id: id,
    })
    try {
      const res = await ChangeStatusAccount({ ID: id })
      if (res) {
        message({ content: R.strings().account__title__success_change_status })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingSwitch({
        loading: false,
        id: 0,
      })
    }
  }
  return (
    <ContainScreenStyled>
      <PageHeader
        title={R.strings().menu__account}
        extra={
          <Button
            onClick={() => {
              setVisible(true)
            }}
            type="primary"
          >
            {R.strings().btn__add_new}
          </Button>
        }
      />
      <FilterHeader
        size="middle"
        datePicker={{
          width: 300,
          // disabledDate: (current) => current && current < moment('7/25/2022'),
        }}
        search={{
          placeholder: R.strings().account_and_customer__filter__title__search,
        }}
        select={[
          {
            width: 200,
            key: 'role',
            placeholder:
              R.strings().account_and_customer__filter__title__type_account,
            data: TYPE_ACCOUNT,
          },
          {
            width: 200,
            key: 'status',
            placeholder:
              R.strings().account_and_customer__filter__title__status,
            data: STATUS,
          },
        ]}
        onChangeFilter={(filter: any) => {
          setFilter(filter)
        }}
      />
      <ContentScreen loading={loading} countFilter={paging.totalItemCount}>
        <div>
          <Table
            border={true}
            columns={columns}
            data={accounts}
            size={'middle'}
            onChangePram={(page: number) =>
              setPaging({ ...paging, page: page })
            }
            pagination={paging}
          />
        </div>
        {
          <ModalStyled
            width={500}
            footer={null}
            title={
              accountDetail
                ? R.strings().account__title__edit
                : R.strings().account__title__add
            }
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
        }
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default Account
