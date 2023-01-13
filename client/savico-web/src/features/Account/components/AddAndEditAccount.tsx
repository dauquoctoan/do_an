import { Button, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import { useEffect, useMemo } from 'react'
import message from '../../../commons/message'
import Configs from '../../../configs'
import { TYPE_ACCOUNT } from '../../../configs/constance'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import { createAccount, updateAccount } from '../api'
import { IFormAddUpdateAccount, IPropAddEdit } from '../interface'

const AddAndEditAccount = ({
  accountDetail,
  handleCloseModal,
  form,
}: IPropAddEdit) => {
  const handleFinish = async (formData: any) => {
    if (formData.password === formData.confirm_password) {
      const data: IFormAddUpdateAccount = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      }

      try {
        const res = accountDetail
          ? await updateAccount({
              ...data,
              id: accountDetail.id,
              status: accountDetail.status,
              roleId: data.role,
            })
          : await createAccount(data)
        if (res) {
          message({
            content: accountDetail
              ? '! Sửa tài khoản thành công'
              : `! Thêm mới tài khoản thành công`,
            type: 'success',
          })
          handleCloseModal()
          form.resetFields()
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      message({
        content: `! Mật khẩu không khớp`,
        type: 'success',
      })
    }
  }

  useMemo(() => {
    if (accountDetail) {
      form.setFieldsValue(accountDetail)
    }
  }, [accountDetail])

  return (
    <FormStyled labelAlign={'left'} onFinish={handleFinish} form={form}>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="name"
        label={R.strings().account_and_customer__title__name}
        rules={[
          {
            required: true,
            message: R.strings().account_and_customer__warring__name,
            pattern: Configs._reg.name,
          },
        ]}
      >
        <Input
          className="form-content"
          placeholder={R.strings().account_and_customer__placeholder__name}
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        name="phone"
        label={R.strings().account_and_customer__title__phone_number}
        rules={[
          {
            required: true,
            message: R.strings().account_and_customer__warring__phone_number,
            pattern: Configs._reg.phone,
          },
        ]}
      >
        <Input
          className="form-content"
          placeholder={
            R.strings().account_and_customer__placeholder__phone_number
          }
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        name="email"
        label={R.strings().account_and_customer__title__email}
        rules={[
          {
            required: true,
            message: R.strings().account_and_customer__warring__email,
            pattern: Configs._reg.email,
          },
        ]}
      >
        <Input
          className="form-content"
          placeholder={R.strings().account_and_customer__placeholder__email}
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        name="role"
        label={R.strings().account_and_customer__title__position}
        rules={[
          {
            required: true,
            message: R.strings().account_and_customer__warring__position,
          },
        ]}
      >
        <Select
          className="form-content"
          style={{ width: '100%' }}
          placeholder={
            R.strings().account_and_customer__placeholder__type_account
          }
        >
          {Object.keys(TYPE_ACCOUNT).map((key: string) => {
            return (
              <Select.Option value={Number(key)}>
                {TYPE_ACCOUNT[key]}
              </Select.Option>
            )
          })}
        </Select>
      </FormItem>
      {!accountDetail && (
        <FormItem
          wrapperCol={style.layoutModal.wrapperCol}
          labelCol={style.layoutModal.labelCol}
          name="password"
          label={R.strings().account_and_customer__title__password}
          rules={[
            {
              required: true,
              message: R.strings().account_and_customer__warring__password,
              pattern: Configs._reg.pass,
            },
          ]}
        >
          <Input.Password
            className="form-content"
            placeholder={
              R.strings().account_and_customer__placeholder__password
            }
          />
        </FormItem>
      )}
      {!accountDetail && (
        <FormItem
          wrapperCol={style.layoutModal.wrapperCol}
          labelCol={style.layoutModal.labelCol}
          name="confirm_password"
          label={R.strings().account_and_customer__title__confirm_password}
          rules={[
            {
              required: true,
              message: R.strings().account_and_customer__warring__password,
              pattern: Configs._reg.pass,
            },
          ]}
        >
          <Input.Password
            className="form-content"
            placeholder={
              R.strings().account_and_customer__placeholder__password
            }
          />
        </FormItem>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType="submit" type="primary">
          {accountDetail ? R.strings().btn__edit : R.strings().btn__add}
        </Button>
      </div>
    </FormStyled>
  )
}

export default AddAndEditAccount
