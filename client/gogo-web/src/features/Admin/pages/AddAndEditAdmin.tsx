import FormItem from 'antd/es/form/FormItem'
import { Button, Checkbox, Form, Input, Select, InputNumber } from 'antd'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import Configs from '../../../configs'
import message from '../../../commons/message'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd/es/form'
import UploadComponent from '../../../commons/uploads'
import { IAdmin, IFormAdmin } from '../interface'
import { type_account_admin } from 'configs/constance'
import { getOptionSelect } from 'utils/funcHelper'
import { createAUser, updateAUser } from '../api'

const AddEditAdmin = ({
  detailPartLesson,
  form,
  handleCloseModal,
}: {
  detailPartLesson: IAdmin | null
  handleCloseModal: () => void
  form: FormInstance
}) => {
  const handleFinish = async (Form: any) => {
    delete Form['confirm']
    if (!Form?.password) {
      delete Form['password']
    }

    detailPartLesson
      ? await updateAUser({
          _id: detailPartLesson._id,
          ...Form,
          picture: Form.picture && Form.picture[0]?.response?.data[0],
        })
      : await createAUser({
          ...Form,
          picture: Form.picture && Form.picture[0]?.response?.data[0],
        })
    message.success(
      detailPartLesson
        ? 'Sửa admin thành công !'
        : 'Thêm mới admin thành công !'
    )
    handleCloseModal()
  }

  useEffect(() => {
    if (detailPartLesson) {
      form.setFieldsValue({
        ...detailPartLesson,
        password: '',
        picture:
          Configs.getDefaultFileList(detailPartLesson?.picture || '') || [],
      })
    }
  }, [detailPartLesson])

  return (
    <FormStyled
      autoComplete="off"
      labelAlign={'left'}
      form={form}
      onFinish={handleFinish}
    >
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="name"
        label={'Tên'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên',
          },
          {
            max: 65,
            message: 'Tên không được quá 65 ký tự!',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp tên'} />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="age"
        label={'Tuổi'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập vào tuổi!',
          },
        ]}
      >
        <InputNumber
          autoComplete="off"
          min={0}
          max={100}
          className="form-content"
          placeholder={'Nhâp vào tuổi'}
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="email"
        label={'Email'}
        rules={[
          {
            required: false,
          },
          {
            pattern: Configs._reg.email,
            message: ' Email không đúng định giạng',
          },
        ]}
      >
        <Input
          autoComplete="off"
          className="form-content"
          placeholder={'Nhâp email'}
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="password"
        label={'Mật khẩu'}
        rules={[
          {
            required: detailPartLesson ? false : true,
            message: 'Mật khẩu bắt buộc điền !',
          },
          {
            pattern: Configs._reg.pass,
            message: 'Mât khẩu không đúng định giạng',
          },
        ]}
        hasFeedback
      >
        <Input.Password
          className="form-content"
          placeholder={'Nhâp mật khẩu'}
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: detailPartLesson ? false : true,
            message: 'Vui lòng xác nhận mật khẩu',
          },
          ({ getFieldValue, setFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Mật khẩu không khớp vui lòng nhập lại!')
              )
            },
          }),
        ]}
      >
        <Input.Password
          className="form-content"
          placeholder={'Nhâp mật khẩu'}
        />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="role"
        label={'Quyền'}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn quyền !',
          },
        ]}
      >
        <Select
          options={getOptionSelect(type_account_admin)}
          className="form-content"
          placeholder={'Chọn Quyền'}
        />
      </FormItem>
      <UploadComponent
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        label={'Ảnh đại diện'}
        name={'picture'}
        limit={1}
        form={form}
        rules={[
          {
            required: false,
          },
        ]}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType="submit" type="primary">
          {detailPartLesson ? 'Sửa' : 'Thêm'}
        </Button>
      </div>
    </FormStyled>
  )
}

export default AddEditAdmin
