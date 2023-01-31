import { Input } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAnswers } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'
import DnD from '../component/DnD'

const Lesson4 = (form: any): JSX.Element => {
  const dispatch = useDispatch()
  const [answer, setAnswer] = useState<string>('')
  const answers = useSelector((state: RootState) => {
    return state.lessonReducer.content
  })
  return (
    <SLesson4>
      <DnD />
      <div className="wrapper-input">
        <Input
          value={answer}
          onChange={(e: any) => {
            setAnswer(e.target.value)
          }}
          className="input"
          onKeyDown={(e: any) => {
            if (e.keyCode === 13) {
              e.preventDefault()
              answer && dispatch(setAnswers(e.target.value))
              setAnswer('')
            }
          }}
          placeholder="Nhập vào các đáp án"
        />
      </div>
    </SLesson4>
  )
}

export default Lesson4

const SLesson4 = styled.div`
  .wrapper-input {
    padding: 15px 0px;
  }
`
