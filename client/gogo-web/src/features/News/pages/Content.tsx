import { Button, Input, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useForm } from 'antd/lib/form/Form'
import message from 'commons/message'
import style from 'configs/style'
import { FormStyled, ModalStyled } from 'global-styled'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IContent, prev, setContent } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'
import { createLesson } from '../api'
import Lesson1 from './Lesson1'

const Content = () => {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector((e:RootState)=>{
    return e.lessonReducer
  })
  function handleFinish(form: any) {
    const data: IContent = {
      answer: form.answer,
      level: form.level,
      options: [
        {
          picture: form.picture_1[0].response.data[0],
          title: form.option_1,
        },
        {
          picture: form.picture_2[0].response.data[0],
          title: form.option_2,
        },
        {
          picture: form.picture_3[0].response.data[0],
          title: form.option_3,
        },
        {
          picture: form.picture_4[0].response.data[0],
          title: form.option_4,
        },
      ],
      title: form.title,
    }
    console.log(data)
    dispatch(setContent(data))
    setVisible(true)
  }
  
 async function  handleCreteLesson(){
  const lesson = {
    title: state?.content?.title,
    type: state?.type?._id,
    options: [{picture:state.content?.options[0].picture,title:state.content?.options[0].title },{picture:state.content?.options[1].picture,title:state.content?.options[1].title },{picture:state.content?.options[2].picture,title:state.content?.options[2].title },{picture:state.content?.options[3].picture,title:state.content?.options[3].title }],
    answer: state.content?.answer,
    level: state.content?.level,
    topic: state.topic?._id,
  }
  const result = await  createLesson(lesson)
  message.success(result.message)
 }
  
  return (
    <SContent>
      <FormStyled className="form" onFinish={handleFinish} labelAlign={'left'}>
        <div className="wrapper-content" style={{ display: 'flex' }}>
          <div className="wrap-form-item">
            <FormItem
              wrapperCol={style.layoutModal.wrapperCol}
              labelCol={style.layoutModal.labelCol}
              className="form-item"
              name="title"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: 'vui lòng nhập vào tiêu đề',
                  // pattern: Configs._reg.name,
                },
              ]}
            >
              <Input className="form-content" placeholder="Nhập vào tiêu đề" />
            </FormItem>
            <FormItem
              wrapperCol={style.layoutModal.wrapperCol}
              labelCol={style.layoutModal.labelCol}
              className="form-item"
              name="level"
              label="Lựa chọn cấp độ"
              rules={[
                {
                  required: true,
                  message: 'Trường cấp độ không được bỏ trống',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Lựa chọn cấp độ"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 1,
                    label: 'Dễ',
                  },
                  {
                    value: 2,
                    label: 'Trung bình',
                  },
                  {
                    value: 3,
                    label: 'Khó',
                  },
                  {
                    value: 4,
                    label: 'Cực khó',
                  },
                ]}
              />
            </FormItem>
            <Lesson1 form={form} />
            <FormItem
              wrapperCol={style.layoutModal.wrapperCol}
              labelCol={style.layoutModal.labelCol}
              className="form-item"
              name="answer"
              label="Chọn đáp án đúng"
              rules={[
                {
                  required: true,
                  message: 'Trường đáp án không được bỏ trống',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn đáp án đúng"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 1,
                    label: 'Đáp án 1',
                  },
                  {
                    value: 2,
                    label: 'Đáp án 2',
                  },
                  {
                    value: 3,
                    label: 'Đáp án 3',
                  },
                  {
                    value: 4,
                    label: 'Đáp án 4',
                  },
                ]}
              />
            </FormItem>
          </div>
          <div className="wrap-action">
            <Button
              onClick={() => {
                dispatch(prev())
              }}
              type="primary"
            >
              Quay lại
            </Button>
          </div>
        </div>
        <Button
          style={{ width: '100%' }}
          htmlType="submit"
          type="primary"
        >
          Xong
        </Button>
      </FormStyled>
      <ModalStyled
        width={500}
        footer={null}
        title={'Hoàn thành'}
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        children={
          <div>
            Bạn có muốn xem lại bài tập đã tạo ?
            <div
              style={{
                paddingTop: 10,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button style={{ width: 100 }} type="ghost">
                Xem lại
              </Button>
              <Button onClick={(handleCreteLesson)} style={{ width: 100 }} type="primary">
                Tạo
              </Button>
              <Button style={{ width: 100 }} danger type="primary">
                Hủy bỏ
              </Button>
            </div>
          </div>
        }
      />
    </SContent>
  )
}
export default Content

const SContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  .form {
    width: 100%;
    .wrapper-content {
      width: 100%;
      margin-right: 10px;
      display: flex;
      .wrap-form-item {
        flex: 1;
      }
      .wrap-action {
        margin-left: 10px;
      }
    }
  }
`
