import { Button, Input, Select } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { useEffect, useState } from 'react'
import UploadComponent from '../../../commons/uploads'
import message from '../../../commons/message'
import Configs from '../../../configs'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import { createTopic, updateTopic } from '../api'
import { IPropAddEdit } from '../interface'
import { getOptionSelect } from 'utils/funcHelper'
import { age_group } from 'configs/constance'
import { getItemLocalStore } from 'utils/localStore'
import ApiClient from 'services'

const AddAndEditAccount = ({
  accountDetail,
  handleCloseModal,
  form,
}: IPropAddEdit) => {
  const course_default = Configs.getSearchParams().get('course')
  const _id = getItemLocalStore('user_info')._id
  const handleFinish = async (formData: any) => {
    const data = { ...formData, picture: formData.picture[0].response.data[0] }
    const result = accountDetail
      ? await updateTopic({ ...data, _id: accountDetail._id })
      : await createTopic(data)
    message.success(result.message)
    form.resetFields()
    handleCloseModal()
  }
  const [course, setCourse] = useState<any>([])

  useEffect(() => {
    form.setFieldsValue({
      ...accountDetail,
      picture: accountDetail?.picture
        ? Configs.getDefaultFileList(accountDetail?.picture)
        : [],
    })
  }, [accountDetail])

  async function getCourse() {
    const res = await ApiClient.get('/courses', { user: _id })
    if (res) {
      setCourse(res.data.map((e: any) => {
        return { ...e, value: e._id, label: e.title }
      }))
    }
  }

  useEffect(() => {
    if (_id) {
      getCourse()
    }
  }, [_id])

  useEffect(() => {
    if (course_default) {
      form.setFieldValue('course', course_default)
    }
  }, [])
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
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="ageGroup"
        label={'Nhóm tuổi'}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn nhóm tuổi',
          },
        ]}
      >
        <Select
          options={getOptionSelect(age_group)}
          // onChange={setSearch}
          placeholder="Vui lòng chọn nhóm tuổi"
          className="form-content"
        />
      </FormItem>


      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="course"
        label={'Khóa học'}
      >
        <Select
          options={course}
          placeholder="Vui lòng chọn khóa học"
          className="form-content"
        />
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
