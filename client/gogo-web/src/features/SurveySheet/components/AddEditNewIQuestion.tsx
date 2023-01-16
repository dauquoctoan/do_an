import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Col, Input, message, Row, Space, Table } from 'antd'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import ContentScreen from 'commons/contentScreen'
import PageHeader from 'commons/pageHeader'
import { ContainScreenStyled } from 'global-styled'
import { PATH } from 'navigation/Router/config'
import React, { useId } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import R from 'utils/R'
import history from '../../../utils/history'
import { addSurveyQuestion, updateSurveyQuestion } from '../service'
import CustomInput from './CustomInput'

interface IAnswer {
  id: string | number
  answer: string
}

interface IAddEditNewIQuestion {
  question: any
}

const AddEditNewIQuestion = () => {
  const columns = [
    {
      width: 100,
      title: 'Stt',
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: 'Câu trả lời',
      dataIndex: 'answer',
      render: (value: any, record: any) => (
        <CustomInput record={record} handleChangeAnswer={handleChangeAnswer} />
      ),
    },
    {
      width: 50,
      title: '',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <Button
          onClick={() => deleteAnswer(record.id)}
          danger
          shape="circle"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ]

  const location: any = useLocation()
  const question = location?.state?.question
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [listAnswers, setListAnswers] = React.useState<IAnswer[]>(
    question ? question.listAnswers : []
  )
  const [isOpenQuestion, setIsOpenQuestion] = React.useState<boolean>(
    question ? question.isOpenQuestion : false
  )
  const [questionTitle, setQuestionTitle] = React.useState<string>(
    question ? question.title : undefined
  )
  const [isQuestionError, setIsQuestionError] = React.useState<boolean>(false)

  const onChange = (e: CheckboxChangeEvent) => {
    setIsOpenQuestion(e.target.checked)
  }

  const addAnswer = () => {
    const newAnswer = {
      id: Math.floor(Math.random() * 100000000),
      answer: '',
    }
    const newListAnswers = [...listAnswers, newAnswer]
    setListAnswers(newListAnswers)
  }

  const deleteAnswer = (id: number) => {
    console.log('id: ', id)
    const newList = listAnswers.filter((item: any) => item.id !== id)
    console.log('newList: ', newList)
    setListAnswers(newList)
  }

  const helpFoundIndex = (list: any[], id: number) => {
    return list.findIndex((item: any) => item.id === id)
  }

  const handleChangeAnswer = (record: any, value: string) => {
    const indexFounded = helpFoundIndex(listAnswers, record?.id)
    if (indexFounded !== -1) {
      let newArray = [...listAnswers]
      let newData = { ...listAnswers[indexFounded] }
      newData.answer = value
      newArray[indexFounded] = newData
      setListAnswers(newArray)
    }
  }

  const onFinish = async () => {
    try {
      // Cập nhật
      setIsLoading(true)
      if (validateValue()) {
        if (question) {
          const payload = {
            question: questionTitle,
            status: 1,
            type: isOpenQuestion ? 1 : 0,
            listAnswer: listAnswers.map((item: any) => item.answer),
            id: question.id,
          }
          const res = await updateSurveyQuestion(payload)
          if (res.status) {
            message.success('Cập nhật câu hỏi mới thành công!')
            history.push(PATH.SURVEY_SHEET)
          } else {
            message.error('Cập nhật câu hỏi mới thất bại!')
          }
        } else {
          // Thêm mới
          const payload = {
            question: questionTitle,
            status: 1,
            type: isOpenQuestion ? 1 : 0,
            listAnswer: listAnswers.map((item: any) => item.answer),
          }
          const res = await addSurveyQuestion(payload)
          if (res.status) {
            message.success('Thêm câu hỏi mới thành công!')
            history.push(PATH.SURVEY_SHEET)
          } else {
            message.error('Thêm câu hỏi mới thất bại!')
          }
        }
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkEmptyAnswer = () => {
    for (let i = 0; i < listAnswers.length; i++) {
      if (!listAnswers[i].answer || listAnswers[i].answer.length === 0) {
        message.error('Vui lòng nhập câu trả lời!')
        console.log('listAnswers[i]: ', listAnswers[i].id)
        document
          .getElementById(`answer_${listAnswers[i].id}`)
          ?.parentElement?.classList.add('ant-input-affix-wrapper-status-error')
        return false
      }
    }
    return true
  }

  const validateValue = () => {
    if (!questionTitle || questionTitle.length === 0) {
      message.error('Vui lòng nhập câu hỏi!')
      setIsQuestionError(true)
      return false
    } else setIsQuestionError(false)

    if (!listAnswers || listAnswers.length === 0) {
      message.error('Vui lòng thêm câu trả lời cho câu hỏi!')
      return false
    }

    if (!checkEmptyAnswer()) return false

    return true
  }

  return (
    <ContainScreenStyled>
      <PageHeader
        title={question ? 'Chỉnh sửa câu hỏi' : 'Thêm mới câu hỏi'}
        extra={
          <Button onClick={onFinish} type="primary">
            {R.strings().btn__save}
          </Button>
        }
        fixed={true}
        onBack={() => {
          history.push(PATH.SURVEY_SHEET)
        }}
      />
      <ContentScreen loading={isLoading}>
        <QuestionBlock>
          <Row>
            <Col span={18}>
              <Input
                value={questionTitle}
                onChange={(e: any) => {
                  if (e.target.value) {
                    setIsQuestionError(false)
                  } else setIsQuestionError(true)
                  setQuestionTitle(e.target.value)
                }}
                allowClear
                placeholder="Nhập câu hỏi"
                status={isQuestionError ? 'error' : undefined}
              />
            </Col>
            <Col span={2} />
            <Col
              span={4}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Checkbox
                checked={isOpenQuestion}
                value={isOpenQuestion}
                onChange={onChange}
              >
                Câu hỏi mở
              </Checkbox>
            </Col>
          </Row>
          <br />
          <Row>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={addAnswer}
            >
              Thêm mới câu trả lời
            </Button>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Table
                bordered
                columns={columns}
                dataSource={listAnswers}
                pagination={false}
              />
            </Col>
          </Row>
        </QuestionBlock>
      </ContentScreen>
    </ContainScreenStyled>
  )
}

const QuestionBlock = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 20px 30px;
  background-color: #f7f7f7;
  margin-bottom: 20px;
`

export default AddEditNewIQuestion
