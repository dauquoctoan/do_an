import { AutoComplete, Descriptions, Image } from 'antd'
import { getTopics } from 'features/Account/api'
import { ITopics } from 'features/Account/interface'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ChoseTopic = () => {
  const [search, setSearch] = useState<string>('')
  const [topics, setTopics] = useState<ITopics[]>([])
  const [selected, setSelected] = useState<ITopics | undefined>(undefined)

  const onSelect = (data: any) => {
    const topicSelected: ITopics | undefined = topics.find((item: any) => {
      return (item.name = data)
    })
    setSelected(topicSelected)
  }
  const getData = async () => {
    try {
      const res = await getTopics({
        search: search,
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
      <AutoComplete
        options={topics}
        style={{ width: 200, flex: 2 }}
        onSelect={onSelect}
        onChange={setSearch}
        placeholder="Nhập vào tên chủ đề"
      />
      <div className="info">
        {selected && (
          <Descriptions title="Thông tin chủ đề">
            <Descriptions.Item label="Tên">{selected.name}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{selected.desc}</Descriptions.Item>
            <Descriptions.Item label="logo">
              <Image preview={true} src={selected.picture} width={100} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
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
`
