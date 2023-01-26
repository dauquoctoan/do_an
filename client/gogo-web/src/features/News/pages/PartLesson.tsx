import { Select, Descriptions, Button } from 'antd'
import Configs from 'configs'
import { getDataTypeStalls } from 'features/Stalls/api'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { next, prev, setPart } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'
import { getPartLessons } from '../api'

const PartLesson = () => {
  const [options, setOptions] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const { topic, part } = useSelector((state: RootState) => {
    return state.lessonReducer
  })
  const dispatch = useDispatch()
  async function getData() {
    const res = await getPartLessons({ topic: topic?._id })
    let tmpOptions: any[] = []
    res.data.forEach((item: any) => {
      tmpOptions.push({ value: item._id, label: item.title })
    })
    setTopics(res.data)
    setOptions(tmpOptions)
  }

  useEffect(() => {
    getData()
  }, [topic?._id])

  return (
    <SPartLesson>
      <Select
        showSearch
        style={{ width: 200, flex: 2 }}
        placeholder="Chọn học phần"
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={options}
        onSelect={(value: string) => {
          dispatch(setPart(value))
        }}
      />
      <div className="content">
        {part && (
          <Descriptions title="Loại bài tập đã chọn">
            <Descriptions.Item label="Loại">
              {part &&
                Configs.renderText(
                  topics.find((item) => {
                    return item._id === part
                  })?.title
                )}
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
        {part && (
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
    </SPartLesson>
  )
}

export default PartLesson

const SPartLesson = styled.div`
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
