import FormItem from 'antd/es/form/FormItem'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import Configs from '../../../configs'
import { ICategory, IFormCategory } from '../interface'
import { createCategory, updateCategory } from '../api'
import message from '../../../commons/message'
import { useEffect } from 'react'
import { FormInstance } from 'antd/es/form'
import UploadComponent from '../../../commons/uploads'

const AddEditCategory = ({
  detailCategory,
  form,
  handleCloseModal,
}: {
  detailCategory: ICategory | null
  handleCloseModal: () => void
  form: FormInstance
}) => {
  const handleFinish = async (Form: any) => {
    const data: IFormCategory = {
      name: Form.name,
      imageUrl: Configs.getPathFileListInForm(Form.imageUrl),
      status: !detailCategory ? 1 : Form.status === true ? 1 : 0,
    }
    try {
      const res = detailCategory
        ? await updateCategory({ ...data, id: detailCategory.id })
        : await createCategory(data)
      if (res) {
        message.success('Thêm card hàng thành công')
        form.resetFields()
        handleCloseModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...detailCategory,
      imageUrl:
        detailCategory?.imageUrl?.length > 0
          ? Configs.getDefaultFileList(detailCategory?.imageUrl)
          : [],
      status: detailCategory?.status === 1 ? true : false,
    })
  }, [detailCategory])

  return (
    <FormStyled labelAlign={'left'} form={form} onFinish={handleFinish}>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="name"
        label={'Tên ngành hàng'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên card!',
          },
          {
            max: 65,
            message: 'Tên ngành hàng không quá 65 ký tự!',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp tên ngành hàng'} />
      </FormItem>
      <UploadComponent
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        label={'Ảnh ngành hàng'}
        name={'imageUrl'}
        limit={1}
        form={form}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ảnh ngành hàng!',
          },
        ]}
      />
      {detailCategory && (
        <FormItem
          wrapperCol={style.layoutModal.wrapperCol}
          labelCol={style.layoutModal.labelCol}
          className="form-item"
          name="status"
          valuePropName="checked"
        >
          <Checkbox>Bật trạng thái hoạt động</Checkbox>
        </FormItem>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType="submit" type="primary">
          {detailCategory ? 'Sửa' : 'Thêm'}
        </Button>
      </div>
    </FormStyled>
  )
}

export default AddEditCategory
