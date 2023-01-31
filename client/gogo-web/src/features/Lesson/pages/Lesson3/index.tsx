import { Button, Checkbox, Col, Form, Image, Input, Row } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import UploadImage from 'commons/uploadNotForm'
import style from 'configs/style'
import { COLOR } from 'configs/theme'
import { FormStyled } from 'global-styled'
import { color } from 'highcharts'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAnswers, setAnswersArray } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'
import UploadComponent from '../../../../commons/uploads'

interface IItem {
  title: string
  picture: string
  group: number
}

const Lesson3 = () => {
  const [form] = Form.useForm()
  const [isImage, setIsImage] = useState<boolean>(false)
  const [isMore, setIsMore] = useState<boolean>(true)
  const { answers } = useSelector((state: RootState) => {
    return state.lessonReducer.content
  })
  const dispatch = useDispatch()
  function handleFinish(data: any) {
    const listTemp: any = []
    const index = (answers.length + 2) / 2
    listTemp.push({
      title: data.title1,
      picture: data.picture1 && data?.picture1[0]?.response?.data[0],
      group: index,
    })
    listTemp.push({
      title: data.title1,
      picture: data.picture2 && data?.picture2[0]?.response?.data[0],
      group: index,
    })
    // setList([...list, ...listTemp])
    dispatch(setAnswersArray(listTemp))
    form.resetFields()
    setIsMore(false)
  }
  return (
    <SLesson3>
      <div className="chose_image">
        <Checkbox
          checked={isImage}
          onChange={(e: any) => {
            setIsImage(e.target.checked)
          }}
        />
        <p>Thêm hình ảnh</p>
      </div>
      <div className="result">
        <Row gutter={16}>
          {answers.length > 0 &&
            answers.map((item) => {
              return (
                <Col className="item" span={12}>
                  <p>{item.title}</p>
                  {item.picture && <Image width={50} src={item?.picture} />}
                </Col>
              )
            })}
        </Row>
      </div>
      {isMore && (
        <div className="content">
          <FormStyled labelAlign={'left'} form={form} onFinish={handleFinish}>
            <FormItem
              wrapperCol={style.layoutModal.wrapperCol}
              labelCol={style.layoutModal.labelCol}
              className="form-item"
              name="title1"
              label={'Đáp án A'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền đáp án!',
                },
                {
                  max: 65,
                  message: 'Đáp án không quá 65 ký tự!',
                },
              ]}
            >
              <Input className="form-content" placeholder={'Nhâp đáp án'} />
            </FormItem>
            {isImage && (
              <UploadComponent
                wrapperCol={style.layoutModal.wrapperCol}
                labelCol={style.layoutModal.labelCol}
                label={'Hình ảnh minh họa'}
                name={'picture1'}
                limit={1}
                form={form}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn hinh ảnh minh họa!',
                  },
                ]}
              />
            )}
            <FormItem
              wrapperCol={style.layoutModal.wrapperCol}
              labelCol={style.layoutModal.labelCol}
              className="form-item"
              name="title2"
              label={'Đáp án B'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền đáp án!',
                },
                {
                  max: 65,
                  message: 'Tiêu đề không được quá 65 ký tự!',
                },
              ]}
            >
              <Input className="form-content" placeholder={'Nhâp đáp án'} />
            </FormItem>
            {isImage && (
              <UploadComponent
                wrapperCol={style.layoutModal.wrapperCol}
                labelCol={style.layoutModal.labelCol}
                label={'Hình ảnh minh họa'}
                name={'picture2'}
                limit={1}
                form={form}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn icon học phần!',
                  },
                ]}
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => {
                  form.validateFields().then((Form: any) => {
                    handleFinish(Form)
                  })
                }}
                type="primary"
              >
                Thêm
              </Button>
            </div>
          </FormStyled>
        </div>
      )}
      {!isMore && (
        <div
          onClick={() => {
            setIsMore(true)
          }}
          className="more-answer"
        >
          Thêm đá án ?
        </div>
      )}
    </SLesson3>
  )
}

const SLesson3 = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  .content {
    padding: 10px;
    border: 1px solid #d9d9d9;
  }
  .chose_image {
    display: flex;
    .p {
      margin-right: 10px;
    }
  }
  .message {
    color: ${COLOR.errorColor};
  }
  .result {
    width: 100%;
    height: auto;
    .item {
      border: 1px solid #d9d9d9;
      display: flex;
      /* justify-content: center; */
      align-items: center;
      justify-items: center;
      .p {
        margin-right: 10px;
      }
    }
    margin-bottom: 20px;
  }
  .more-answer {
    cursor: pointer;
    color: ${COLOR.primaryColor};
  }
`
export default Lesson3
