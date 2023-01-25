import FormItem from 'antd/es/form/FormItem'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import style from '../../../configs/style'
import { FormStyled } from '../../../global-styled'
import R from '../../../utils/R'
import Configs from '../../../configs'
import { createCategory, getTopics, updateCategory } from '../api'
import message from '../../../commons/message'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd/es/form'
import UploadComponent from '../../../commons/uploads'
import { ITopic } from 'store/lesson/lessonSlice'
import { ITopics } from 'features/Account/interface'
import { IPart } from '../interface'

const AddEditCategory = ({
  detailCategory,
  form,
  handleCloseModal,
}: {
  detailCategory: any
  handleCloseModal: () => void
  form: FormInstance
}) => {
  const [search, setSearch] = useState<string>('')
  const [topics, setTopics] = useState<ITopics[]>([])

  const onSelect = (data: any) => {
    const topicSelected: any = topics.find((item: any) => {
      if (item.name === data) {
        const itemSlect: ITopic = {
          name: item.name || null,
          desc: item.desc || null,
          picture: item.picture || null,
          _id: item._id || null,
        }
        return itemSlect
      }
    })
  }

  const getTopic = async () => {
    try {
      const res = await getTopics({
        search: search,
      })
      if (res) {
        const options = res?.data?.map((e: any) => {
          return { ...e, value: e.name, title: e.name }
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
    console.log('Form', Form)
    const data: IPart = {
      title: Form.title,
      topic: Form.topic,
      picture: Form.picture,
      desc: Form.desc
    }
    try {
      // const res = detailCategory
      //   ? await updateCategory({ ...data, id: detailCategory.id })
      //   : await createCategory(data)
      // if (res) {
      //   message.success('Thêm card hàng thành công')
      //   form.resetFields()
      //   handleCloseModal()
      // }
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
        name="title"
        label={'Tên học phần'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên học phần!',
          },
          {
            max: 65,
            message: 'Tên học phần không được quá 65 ký tự!',
          },
        ]}
      >
        <Input className="form-content" placeholder={'Nhâp tên học phần'} />
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
        name="topic"
        label={'Chủ đề'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập chủ đề!',
          }
        ]}
      >
        <Select
          options={topics}
          onSelect={onSelect}
          onChange={setSearch}
          placeholder="Nhập vào tên chủ đề"
          className="autocomplete"
        />
      </FormItem>
      <UploadComponent
        wrapperCol={style.layoutModal.wrapperCol}
        labelCol={style.layoutModal.labelCol}
        label={'Icon học phần'}
        name={'picture'}
        limit={1}
        form={form}
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn icon học phần!',
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
