import { AutoComplete, Descriptions, Button, Select } from 'antd'
import Configs from 'configs'
import { type } from 'configs/constance'
import { useDispatch, useSelector } from 'react-redux'
import { next, prev, setTypeTopic } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'

const ChoseTypeLesson = () => {
  const dispatch = useDispatch()

  const lesson = useSelector((state: RootState) => {
    return state.lessonReducer
  })

  const options = Object.keys(type).map((item) => {
    return { _id: item, value: type[item] }
  })

  function onSelect(value: any) {
    const option: any = options.find((item) => {
      if (item.value === value) {
        return item
      }
    })
    dispatch(setTypeTopic(option._id))
  }

  return (
    <IChoseTypeLesson>
      <Select
        options={options}
        clearIcon
        allowClear
        style={{ width: 300 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="Chọn loại câu hỏi"
      />
      <div className="content">
        {lesson.type && (
          <Descriptions title="Loại bài tập đã chọn">
            <Descriptions.Item label="Loại">
              {Configs.renderText(type[lesson.type])}
            </Descriptions.Item>
          </Descriptions>
        )}
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