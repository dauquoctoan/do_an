import { Input } from 'antd'
import React from 'react'

interface ICustomInput {
  record: any
  handleChangeAnswer: (record: any, value: string) => void
}

const CustomInput = (props: ICustomInput) => {
  const { record, handleChangeAnswer } = props
  const [isEmpty, setIsEmpty] = React.useState<boolean>(false)
  return (
    <Input
      allowClear
      id={`answer_${record.id}`}
      width={'100%'}
      placeholder={'Nhập câu trả lời'}
      value={record.answer}
      onChange={(e: any) => {
        handleChangeAnswer(record, e.target.value)
        if (e.target.value.length === 0) {
          setIsEmpty(true)
        } else setIsEmpty(false)
      }}
      status={isEmpty ? 'error' : undefined}
    />
  )
}

export default CustomInput
