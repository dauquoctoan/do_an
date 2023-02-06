import FormItem from 'antd/es/form/FormItem'
import { Button, Checkbox, Form, Input, Select, InputNumber } from 'antd'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import Configs from '../../../configs'
import { createPart, getTopics, updateParts } from '../api'
import message from '../../../commons/message'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd/es/form'
import UploadComponent from '../../../commons/uploads'
import { ITopic } from 'store/lesson/lessonSlice'
import { ITopics } from 'features/Topic/interface'
import { IPart } from '../interface'
import { apis } from 'configs/api'
import ApiClient from 'services'
import { getItemLocalStore } from 'utils/localStore'

const AddEditCategory = ({
  detailPartLesson,
  form,
  handleCloseModal,
}: {
  detailPartLesson: IPart | null
  handleCloseModal: () => void
  form: FormInstance
}) => {
  const [search, setSearch] = useState<string>('')
  const [topics, setTopics] = useState<{ value: string; label: string }[]>([])

  const getTopic = async () => {
    try {
      const res = await getTopics({
        search: search,
      })
      if (res) {
        const options = res?.data?.map((e: any) => {
          return { value: e._id, label: e.name }
        })
        setTopics(options)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTopic()
  }, [search])



  const handleFinish = async (Form: any) => {
    let user: any = getItemLocalStore('user_info')
    const data: any = {
      title: Form.title,
      desc: Form.desc,
      picture: Form.picture[0].response.data[0],
      price: Form.price,
      user: user?._id
    }
    const res = detailPartLesson
      ? await ApiClient.put('/course', { ...data, _id: detailPartLesson._id })
      : await ApiClient.post('/course', data)
    message.success(res.message)
    handleCloseModal()
  }

  useEffect(() => {
    form.setFieldsValue({
      ...detailPartLesson,
      topic:
        typeof detailPartLesson?.topic !== 'string' &&
        detailPartLesson?.topic?._id,
      picture: detailPartLesson
        ? Configs.getDefaultFileList(detailPartLesson?.picture)
        : [],
    })
  }, [detailPartLesson])
  return (
    <FormStyled labelAlign={'left'} form={form} onFinish={handleFinish}>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="title"
        label={'Tên khóa học'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên khóa học!',
          },
          {
            max: 65,
            message: 'Tên khóa học không được quá 65 ký tự!',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp tên khóa học'} />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="desc"
        label={'Mô tả'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập vào mô tả!',
          },
          {
            max: 500,
            message: 'Mô tả không được quá 500 ký tự',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp vào mô tả'} />
      </FormItem>
      <FormItem
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        className="form-item"
        name="price"
        label={'Giá'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập chủ đề!',
          },
        ]}
      >
        <InputNumber
          type={'number'}
          placeholder="Nhập vào giá"
          className="form-content"
        />
      </FormItem>
      <UploadComponent
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        label={'Hình ảnh khóa học'}
        name={'picture'}
        limit={1}
        form={form}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn icon khóa học!',
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

export default AddEditCategory
