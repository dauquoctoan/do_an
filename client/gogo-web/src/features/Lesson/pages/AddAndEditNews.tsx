import { Collapse, Space, Button } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { TYPE_LESSON } from 'configs/constance'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import styled from 'styled-components'
import history from 'utils/history'
import ContentScreen from '../../../commons/contentScreen'
import PageHeader from '../../../commons/pageHeader'
import Configs from '../../../configs'
import { ContainScreenStyled } from '../../../global-styled'
import ChoseTopic from './ChoseTopic'
import ChoseTypeLesson from './ChoseTypeLesson'
import Content from './Content'
import PartLesson from './PartLesson'

const AddAndEditNews = () => {
  const id = Configs.getSearchParams().get('id')
  const [loading, setLoading] = useState<boolean>(false)
  const { Panel } = Collapse
  const lesson = useSelector((state: RootState) => {
    return state.lessonReducer
  })

  useEffect(() => {
    if (id && !lesson.content) {
      history.push('/lesson')
    }
  }, [])

  return (
    <ContainScreenStyled>
      <PageHeader
        onBack={() => {
          window.history.back()
        }}
        title={id ? 'Sửa bài tập' : 'Thêm mới bài tập'}
      />
      <ContentScreen loading={loading}>
        <SCreateLesson>
          <Space style={{ width: '100%' }} direction="vertical">
            <Collapse
              style={{ width: '100%' }}
              collapsible={lesson.index < 1 ? 'disabled' : 'icon'}
              activeKey={lesson.index === 1 ? ['1'] : ['']}
            >
              <Panel header="Chọn chủ đề" key="1">
                <ChoseTopic />
              </Panel>
            </Collapse>
            <Collapse
              collapsible={lesson.index < 2 ? 'disabled' : 'icon'}
              activeKey={lesson.index === 2 ? ['1'] : ['']}
            >
              <Panel header="Chọn học phần" key="1">
                <PartLesson />
              </Panel>
            </Collapse>
            <Collapse
              collapsible={lesson.index < 3 ? 'disabled' : 'icon'}
              activeKey={lesson.index === 3 ? ['1'] : ['']}
            >
              <Panel header="Chọn loại bài tập" key="1">
                <ChoseTypeLesson />
              </Panel>
            </Collapse>
            <Collapse
              collapsible={lesson.index < 4 ? 'disabled' : 'icon'}
              activeKey={lesson.index === 4 ? ['1'] : ['']}
            >
              <Panel
                header={(lesson.type && TYPE_LESSON[lesson.type]) || 'card'}
                key="1"
              >
                <Content />
              </Panel>
            </Collapse>
          </Space>
        </SCreateLesson>
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default AddAndEditNews

const SCreateLesson = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  .button {
    margin-top: 10px;
  }
`