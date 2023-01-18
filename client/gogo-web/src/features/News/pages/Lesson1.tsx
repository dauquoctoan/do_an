import { Collapse, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import style from 'configs/style'
import React from 'react'
import styled from 'styled-components'
import UploadComponent from '../../../commons/uploads'
const { Panel } = Collapse

const Lesson1 = ({ form }: { form: any }) => {
  const options = [
    {
      name: 'option_1',
      picture: 'picture_1',
    },
    {
      name: 'option_2',
      picture: 'picture_2',
    },
    {
      name: 'option_3',
      picture: 'picture_3',
    },
    {
      name: 'option_4',
      picture: 'picture_4',
    },
  ]
  return (
    <SLesson1>
      <Collapse style={{ width: '100%' }} collapsible={'icon'}>
        {options.map((item, i) => {
          const index = i + 1
          return (
            <Panel header={'Đáp án ' + index} key={index}>
              <FormItem
                wrapperCol={style.layoutModal.wrapperCol}
                labelCol={style.layoutModal.labelCol}
                className="form-item"
                name={item.name}
                label="tiêu đề"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung đáp án',
                  },
                ]}
              >
                <Input
                  className="form-content"
                  placeholder="Nhập vào tiêu đề"
                />
              </FormItem>
              <UploadComponent
                wrapperCol={style.layoutModal.wrapperCol}
                labelCol={style.layoutModal.labelCol}
                label={'Hình ảnh'}
                name={item.picture}
                limit={1}
                form={form}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọ hình ảnh minh họa',
                  },
                ]}
              />
            </Panel>
          )
        })}
      </Collapse>
    </SLesson1>
  )
}

export default Lesson1

const SLesson1 = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`
