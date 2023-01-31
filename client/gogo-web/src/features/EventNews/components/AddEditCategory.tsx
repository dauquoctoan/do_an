import FormItem from 'antd/es/form/FormItem'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import Configs from '../../../configs'
import { createEventNews, createPart, getTopics, updateEventNews, updateParts } from '../api'
import message from '../../../commons/message'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd/es/form'
import UploadComponent from '../../../commons/uploads'
import { IEventNews } from '../interface'

const AddEditCategory = ({
  detailPartLesson,
  form,
  handleCloseModal,
}: {
  detailPartLesson: IEventNews | null
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
    const data: IEventNews = {
      title: Form.title,
      link: Form.link,
      picture: Form.picture[0].response.data[0],
      desc: Form.desc,
    }
    const res = detailPartLesson
      ? await updateEventNews({ ...data, _id: detailPartLesson._id })
      : await createEventNews(data)
    message.success(res.message)
    handleCloseModal()
  }

  useEffect(() => {
    form.setFieldsValue({
      ...detailPartLesson,
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
        label={'Tên tin tức sự kiện'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên tin tức sự kiện!',
          },
          {
            max: 65,
            message: 'Tên tin tức sự kiện không được quá 65 ký tự!',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp tên tin tức sự kiện'} />
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
        name="link"
        label={'Link'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập link!',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp vào link'} />
      </FormItem>
      <UploadComponent
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        label={'Icon tin tức sự kiện'}
        name={'picture'}
        limit={1}
        form={form}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn icon tin tức sự kiện!',
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
