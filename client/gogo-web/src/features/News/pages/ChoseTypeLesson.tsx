import { AutoComplete, Descriptions, Button } from 'antd'
import Configs from 'configs'
import { useDispatch, useSelector } from 'react-redux'
import { next, prev, setTypeTopic } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'

const ChoseTypeLesson = () => {
  const dispatch = useDispatch()
  const lesson = useSelector((state: RootState) => {
    return state.lessonReducer
  })
  const options = [
    { _id: 1, value: 'Chọn một trong 4 đáp án' },
    { _id: 2, value: 'Sắp xếp từ thành câu có nghĩa' },
    { _id: 3, value: 'Chọn các cặp đáp án' },
  ]
  function onSelect(value: any) {
    const option = options.find((item: any) => {
      if (item.value === value) {
        return item
      }
    })
    dispatch(setTypeTopic(option))
  }
  return (
    <IChoseTypeLesson>
      <AutoComplete
        options={options}
        style={{ width: 300 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="level"
      />
      <div className="content">
        <Descriptions title="Loại bài tập đã chọn">
          <Descriptions.Item label="Loại">
            {Configs.renderText(lesson.type?.value)}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="action">
        <Button
          type="primary"
          onClick={() => {
            dispatch(prev())
          }}
        >
          Quay lại
        </Button>
        {lesson.type && (
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            onClick={() => {
              dispatch(next())
            }}
          >
            Tiếp theo
          </Button>
        )}
      </div>
    </IChoseTypeLesson>
  )
}

export default ChoseTypeLesson

const IChoseTypeLesson = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  .content {
    flex: 1;
    margin-left: 10px;
  }
  .action {
    display: flex;
    flex-direction: column;
  }
`
