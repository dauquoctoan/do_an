import { Button, message } from 'antd'
import PageHeader from '../../commons/pageHeader'
import ContentScreen from 'commons/contentScreen'
import FilterHeader from 'commons/filter'
import { ContainScreenStyled } from 'global-styled'
import { PATH } from 'navigation/Router/config'
import React from 'react'
import R from 'utils/R'
import history from '../../utils/history'
import QuestionItem from './components/QuestionItem'
import { useDebounce } from 'commons/hooks/Debounce'
import {
  changeSurveyQuestionStatus,
  deleteSurveyQuestion,
  getListQuestions,
} from './service'

interface IAnswer {
  id: number
  answer: string
}

export interface IQuestion {
  id: number
  title: string
  status: number
  isOpenQuestion: boolean
  listAnswers: IAnswer[]
}

const SurveySheet = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [listQuestions, setListQuestions] = React.useState<IQuestion[]>([])
  const [search, setSearch] = React.useState<string>('')
  const searcDebounce = useDebounce(search, 300)

  const getQuestions = async () => {
    try {
      setIsLoading(true)
      const res = await getListQuestions({
        SearchKey: searcDebounce,
      })
      if (res.status) {
        const data = res?.data?.map((item: any) => ({
          id: item.id,
          title: item.question,
          status: item?.status,
          isOpenQuestion: item?.type === 1 ? true : false,
          listAnswers: item.listAnswer.map((itemAnswer: any) => ({
            id: itemAnswer.id,
            answer: itemAnswer.answer,
          })),
        }))
        setListQuestions(data.reverse())
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteQuestion = async (id: number) => {
    try {
      setIsLoading(true)
      const res = await deleteSurveyQuestion(id)
      if (res.status) {
        message.success('Xoá câu hỏi thành công!')
        getQuestions()
      } else {
        message.error('Xoá câu hỏi thất bại!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const changeStatusQuestion = async (id: number) => {
    try {
      setIsLoading(true)
      const res = await changeSurveyQuestionStatus(id)
      if (res.status) {
        message.success('Thay đổi trạng thái câu hỏi thành công!')
        getQuestions()
      } else {
        message.error('Thay đổi trạng thái câu hỏi thất bại!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getQuestions()
  }, [searcDebounce])

  return (
    <ContainScreenStyled>
      <PageHeader
        title="Phiếu khảo sát"
        extra={
          <Button
            onClick={() => {
              history.push(PATH.ADD_EDIT_QUESTION)
            }}
            type="primary"
          >
            {R.strings().btn__add_new}
          </Button>
        }
        fixed={true}
      />
      <FilterHeader
        size="middle"
        search={{
          width: 280,
          placeholder: 'Câu hỏi, câu trả lời',
        }}
        onChangeFilter={(e: any) => {
          setSearch(e.searchKey)
        }}
      />
      <ContentScreen loading={isLoading}>
        {listQuestions.map((item: IQuestion, index: number) => (
          <QuestionItem
            deleteQuestion={deleteQuestion}
            changeStatusQuestion={changeStatusQuestion}
            key={index}
            question={item}
          />
        ))}
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default SurveySheet
