import { Collapse, Space } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentScreen from '../../../commons/contentScreen'
import PageHeader from '../../../commons/pageHeader'
import Configs from '../../../configs'

import { ContainScreenStyled, FormStyled } from '../../../global-styled'
import ChoseTopic from './ChoseTopic'

const AddAndEditNews = () => {
  const id = Configs.getSearchParams().get('id')
  const [loading, setLoading] = useState<boolean>(false)
  const { Panel } = Collapse
  const [indexOrder, setIndexOrder] = useState(1)

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `
  return (
    <ContainScreenStyled>
      <PageHeader
        onBack={() => {
          window.history.back()
        }}
        title={id ? 'Sửa bài học' : 'Thêm mới bài học'}
      />
      <ContentScreen loading={loading}>
        <SCreateLesson>
          <Space style={{ width: '100%' }} direction="vertical">
            <Collapse
              style={{ width: '100%' }}
              collapsible={indexOrder !== 1 ? 'disabled' : 'icon'}
              defaultActiveKey={indexOrder === 1 ? ['1'] : ['']}
            >
              <Panel header="Chọn chủ đề" key="1">
                <ChoseTopic />
              </Panel>
            </Collapse>
            <Collapse
              collapsible={indexOrder !== 2 ? 'disabled' : 'icon'}
              defaultActiveKey={indexOrder === 2 ? ['1'] : ['']}
            >
              <Panel
                header="This panel can only be collapsed by clicking icon"
                key="1"
              >
                <p>{text}</p>
              </Panel>
            </Collapse>
            <Collapse
              collapsible={indexOrder !== 3 ? 'disabled' : 'icon'}
              defaultActiveKey={indexOrder === 3 ? ['1'] : ['']}
            >
              <Panel header="This panel can't be collapsed" key="1">
                <p>{text}</p>
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
  height: 100vh;
`
