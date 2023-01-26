import { Button, Input, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useForm } from 'antd/lib/form/Form'
import message from 'commons/message'
import Configs from 'configs'
import { type_key } from 'configs/constance'
import style from 'configs/style'
import { FormStyled, ModalStyled } from 'global-styled'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  IContent,
  prev,
  resetLesson,
  setContent,
} from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'
import history from 'utils/history'
import { createLesson, updateLesson } from '../api'
import Lesson1 from './Lesson1'
import Lesson3 from './Lesson3'

const Content = () => {
  const id = Configs.getSearchParams().get('id')
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const { content, topic, type, part } = useSelector((state: RootState) => {
    return state.lessonReducer
  })

  function handleFinish(form: any) {
    if (
      type === type_key.choose_one_of_4_image ||
      type === type_key.choose_one_of_4
    ) {
      const data: IContent = {
        answer: form.answer,
        level: form.level,
        options: [
          {
            picture: form?.picture_1?.shift()?.response?.data?.shift() || null,
            title: form?.option_1,
          },
          {
            picture: form?.picture_2?.shift()?.response?.data?.shift() || null,
            title: form?.option_2,
          },
          {
            picture: form?.picture_3?.shift()?.response?.data?.shift() || null,
            title: form?.option_3,
          },
          {
            picture: form?.picture_4?.shift()?.response?.data?.shift() || null,
            title: form?.option_4,
          },
        ],
        answers: [],
        title: form.title,
      }
      dispatch(setContent(data))
    }
    if (type === type_key.sort) {
      const data: IContent = {
        answer: form.answer,
        level: form.level,
        options: [],
        answers: content.answers,
        title: form.title,
      }
      dispatch(setContent(data))
    }
    setVisible(true)
  }

  async function handleCreteLesson() {
    let lesson = null
    if (
      type === type_key.choose_one_of_4 ||
      type === type_key.choose_one_of_4_image
    ) {
      lesson = {
        title: content?.title,
        type: type,
        options: [
          {
            picture: content?.options && content?.options[0]?.picture,
            title: content?.options && content?.options[0]?.title,
          },
          {
            picture: content?.options && content?.options[1]?.picture,
            title: content?.options && content?.options[1]?.title,
          },
          {
            picture: content?.options && content?.options[2]?.picture,
            title: content?.options && content?.options[2]?.title,
          },
          {
            picture: content?.options && content?.options[3]?.picture,
            title: content?.options && content?.options[3]?.title,
          },
        ],
        answer: Number(content?.answer),
        level: content?.level,
        part: part,
      }
    }
    if (type === type_key.sort) {
      lesson = {
        title: content?.title,
        type: type,
        options: content.answers,
        answers: content.answers,
        level: content?.level,
        part: part,
      }
    }
    const result = id
      ? await updateLesson({ ...lesson, _id: id })
      : await createLesson(lesson)
    message.success(result.message)
    dispatch(resetLesson())
    setVisible(false)
    history.push('/lesson')
  }
  useEffect(() => {
    if (
      id &&
      content.title &&
      (type === type_key.choose_one_of_4_image ||
        type === type_key.choose_one_of_4)
    ) {
      form.setFieldsValue({
        title: content?.title,
        level: content?.level,
        answer: String(content?.answer),
        option_1: content?.options && content?.options[0]?.title,
        picture_1:
          content?.options && content?.options[0]?.picture
            ? Configs.getDefaultFileList(content?.options[0].picture)
            : [],
        option_2: content?.options && content?.options[1]?.title,
        picture_2:
          content?.options && content?.options[1]?.picture
            ? Configs.getDefaultFileList(content?.options[1].picture)
            : [],
        option_3: content?.options && content?.options[2].title,
        picture_3:
          content?.options && content?.options[2].picture
            ? Configs.getDefaultFileList(content?.options[2].picture)
            : [],
        option_4: content?.options && content?.options[3].title,
        picture_4:
          content?.options && content?.options[3].picture
            ? Configs.getDefaultFileList(content?.options[3].picture)
            : [],
      })
    }
    if (id && content.title && type === type_key.sort) {
      form.setFieldsValue({
        title: content?.title,
        level: content?.level,
      })
    }
  }, [id])

  return (
    <SContent>
      <FormStyled
        className="form"
        form={form}
        onFinish={handleFinish}
        labelAlign={'left'}
      >
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
            {(type === '1' || type === '2') && (
              <Lesson1 form={form} type={type} />
            )}
            {type === '4' && <Lesson3 form={form} />}
            {type !== '4' && (
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
                      value: '1',
                      label: 'Đáp án 1',
                    },
                    {
                      value: '2',
                      label: 'Đáp án 2',
                    },
                    {
                      value: '3',
                      label: 'Đáp án 3',
                    },
                    {
                      value: '4',
                      label: 'Đáp án 4',
                    },
                  ]}
                />
              </FormItem>
            )}
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
          onClick={() => {
            id && setVisible(true)
          }}
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
            {'Bạn có muốn xem lại bài tập đã' + (id ? ' sửa ?' : ' tạo ?')}
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
              <Button
                onClick={handleCreteLesson}
                style={{ width: 100 }}
                type="primary"
              >
                {id ? 'Sửa' : 'Tạo'}
              </Button>
              <Button
                onClick={() => {
                  dispatch(resetLesson())
                  history.goBack()
                }}
                style={{ width: 100 }}
                danger
                type="primary"
              >
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
