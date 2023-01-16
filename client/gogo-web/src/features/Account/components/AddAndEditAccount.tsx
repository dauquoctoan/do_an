import { Button, Input, Select } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { useEffect } from 'react'
import UploadComponent from '../../../commons/uploads'
import message from '../../../commons/message'
import Configs from '../../../configs'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import {  createTopic } from '../api'
import {  IPropAddEdit } from '../interface'

const AddAndEditAccount = ({
  accountDetail,
  handleCloseModal,
  form,
}: IPropAddEdit) => {
  const handleFinish = async (formData: any) => {
    const data = { ...formData, picture: formData.picture[0].response.data[0] }
    const result = await createTopic(data)
    message.success(result.message)
    form.resetFields()
    handleCloseModal()
  }

  useEffect(() => {
    form.setFieldsValue({
      ...accountDetail,
      picture: accountDetail?.picture
        ? Configs.getDefaultFileList(accountDetail?.picture)
        : [],
    })
  }, [accountDetail])

  return (
    <FormStyled labelAlign={'left'} onFinish={handleFinish} form={form}>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="name"
        label="Tên chủ đề"
        rules={[
          {
            required: true,
            message: 'vui lòng nhập vào tên chủ đề',
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
        className="form-item"
        name="desc"
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Nhập vào mô tả',
          },
        ]}
      >
        <Input className="form-content" placeholder="Nhập vào mô tả" />
      </FormItem>
      <UploadComponent
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        label={'Logo'}
        name={'picture'}
        limit={1}
        form={form}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn logo cho chủ đề',
          },
        ]}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType="submit" type="primary">
          {accountDetail ? 'Sửa chủ đề' : 'Thêm mới chủ đề'}
        </Button>
      </div>
    </FormStyled>
  )
}

export default AddAndEditAccount
