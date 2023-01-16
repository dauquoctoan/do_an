import { Button, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useForm } from 'antd/lib/form/Form'
import Configs from 'configs'
import style from 'configs/style'
import { FormStyled } from 'global-styled'
import R from 'utils/R'
import UploadComponent from '../../../commons/uploads'

const Content = () => {
  const [form] = useForm()
  return (
    <div>
        <FormStyled labelAlign={'left'}>
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
    </FormStyled>
    <Button type='primary'>Quay lại</Button>
    </div>
  )
}

export default Content