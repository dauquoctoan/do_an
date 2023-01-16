import { Button, Input } from 'antd'
import { FormInstance } from 'antd/es/form'
import { FormLayout } from 'antd/es/form/Form'

import FormItem from 'antd/lib/form/FormItem'
import { FormStyled } from '../../../global-styled'

interface IPropAddEdit {
  data?: any
  resetForm?: () => void
  form?: FormInstance
}

const AddAndEditCustomer = ({ data, form }: IPropAddEdit) => {
  const handleFinish = (e: any) => {
    console.log('e', e)
  }

  // const layout: FormLayout = {
  //   labelCol: { span: 8 },
  //   wrapperCol: { span: 8, offset: 8 },
  // }

  return (
    <FormStyled labelAlign={'left'} onFinish={handleFinish} form={form}>
      <FormItem
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        className="form-item"
        name="name"
        label="Họ tên"
        rules={[{ required: true, message: 'Trường bắt buộc nhập!' }]}
      >
        <Input
          className="form-content"
          placeholder="Nhập vào Họ tên khách hàng"
        />
      </FormItem>
      <FormItem
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        name="address"
        label={'Số điện thoại'}
        rules={[{ required: true, message: 'Trường bắt buộc nhập!' }]}
      >
        <Input
          className="form-content"
          placeholder="Nhập vào số điện thoại khách hàng"
        />
      </FormItem>
      <FormItem
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        name="address"
        label="Email"
        rules={[{ required: true, message: 'Trường bắt buộc nhập!' }]}
      >
        <Input
          className="form-content"
          placeholder="Nhập vào email khách hàng"
        />
      </FormItem>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {data ? (
          <Button htmlType="submit" type="primary">
            Sửa
          </Button>
        ) : (
          <Button htmlType="submit" type="primary">
            Thêm
          </Button>
        )}
      </div>
    </FormStyled>
  )
}

export default AddAndEditCustomer
