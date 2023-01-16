import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, message, Popconfirm, Row, Switch } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { PATH } from 'navigation/Router/config'
import React from 'react'
import styled from 'styled-components'
import history from 'utils/history'
import { IQuestion } from '../SurveySheet'

interface IQuestionItem {
  question: IQuestion
  deleteQuestion: (id: number) => Promise<void>
  changeStatusQuestion: (id: number) => Promise<void>
}

const QuestionItem = (props: IQuestionItem) => {
  const { question, deleteQuestion, changeStatusQuestion } = props
  return (
    <QuestionBlock>
      <Row>
        <Col span={19}>{question.title}</Col>
        <Col span={5}>
          <Row justify={'center'}>
            <Col span={6} />
            <Col
              span={12}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Switch
                checked={question.status ? true : false}
                onChange={() => changeStatusQuestion(question.id)}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  history.push(PATH.ADD_EDIT_QUESTION, { question: question })
                }}
              />
              <Popconfirm
                placement="topLeft"
                title={'Bạn có chắc chắn muốn xoá câu hỏi này?'}
                onConfirm={() => deleteQuestion(question.id)}
                okText="Xoá"
                cancelText="Huỷ"
                okButtonProps={{
                  type: 'primary',
                  danger: true,
                }}
              >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          {question.listAnswers.map((item: any, index: number) => (
            <Col key={index} span={4}>
              <Checkbox value={item.id}>{item.answer}</Checkbox>
            </Col>
          ))}
          {question.isOpenQuestion && (
            <Col key={1000} span={4}>
              <Checkbox value={1000}>Khác...</Checkbox>
            </Col>
          )}
        </Row>
      </Checkbox.Group>
    </QuestionBlock>
  )
}

const QuestionBlock = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 20px 30px;
  background-color: #f7f7f7;
  margin-bottom: 20px;
`

export default QuestionItem
