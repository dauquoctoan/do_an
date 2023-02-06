import { AutoComplete, Button, Descriptions, Image, Select } from 'antd'
import Configs from 'configs'
import { getTopics } from 'features/Topic/api'
import { ITopics } from 'features/Topic/interface'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITopic, next, setTopic } from 'store/lesson/lessonSlice'
import { RootState } from 'store/store'
import styled from 'styled-components'
import history from 'utils/history'

const ChoseTopic = () => {
  const dispatch = useDispatch()
  const course = Configs.getSearchParams().get('course')
  const [search, setSearch] = useState<string>('')
  const [topics, setTopics] = useState<ITopics[]>([])
  const selected = useSelector((state: RootState) => {
    return state.lessonReducer.topic
  })

  const onSelect = (data: any) => {
    const topicSelected: any = topics.find((item: any) => {
      if (item.name === data) {
        const itemSlect: ITopic = {
          name: item.name || null,
          desc: item.desc || null,
          picture: item.picture || null,
          _id: item._id || null,
        }
        return itemSlect
      }
    })
    dispatch(setTopic(topicSelected))
  }

  const getData = async () => {
    try {
      const res = await getTopics({
        search: search, course: course
      })
      if (res) {
        const options = res?.data?.map((e: any) => {
          return { ...e, value: e.name, title: e.name }
        })
        setTopics(options)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [search])

  return (
    <SChoseTopic>
      <Select
        options={topics}
        style={{ width: 200, flex: 2 }}
        onSelect={onSelect}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          (option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        onChange={setSearch}
        placeholder="Nhập vào tên chủ đề"
        className="autocomplete"
      />
      <div className="info">
        {selected && (
          <Descriptions title="Thông tin chủ đề">
            <Descriptions.Item label="Tên">
              {Configs.renderText(selected.name)}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {Configs.renderText(selected.desc)}
            </Descriptions.Item>
            <Descriptions.Item label="logo">
              {selected.picture && (
                <Image preview={true} src={selected.picture} width={100} />
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
      {selected && (
        <Button
          className="btn"
          onClick={() => {
            dispatch(next())
          }}
          type="primary"
        >
          Tiếp theo
        </Button>
      )}
      {
        topics.length === 0 && (<Button
          className="btn"
          style={{ marginLeft: 10 }}
          onClick={() => {
            history.push('/topic?course=' + course)
          }}
          type="primary"
        >
          Thêm mới chủ đề
        </Button>)
      }
    </SChoseTopic>
  )
}

export default ChoseTopic

const SChoseTopic = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0px;
  display: flex;
  .info {
    flex: 7;
    margin-left: 10px;
  }
  .autocomplete {
    flex: 1;
  }
`
