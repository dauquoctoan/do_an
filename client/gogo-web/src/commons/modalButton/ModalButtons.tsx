import { Row, Col, Button } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const SaveButton = styled(Button)`
  font-weight: 800;
  border-radius: 5px;
  background-color: #00abba;
  border-color: #00abba;
  height: 35px;
`

const CancelButton = styled(Button)`
  font-weight: 800;
  border-radius: 5px;
  height: 35px;
`

type IModalButton = {
  isLoading?: boolean
  onCancel?: any
  text: string
}

const ModalButtons = ({
  isLoading: isLoading,
  onCancel,
  text,
}: IModalButton) => {
  return (
    <Row gutter={16} justify="end">
      <Col>
        <CancelButton
          danger
          onClick={() => {
            onCancel()
          }}
        >
          <CloseCircleOutlined />
          Huỷ
        </CancelButton>
      </Col>
      <Col>
        <SaveButton type="primary" loading={isLoading} htmlType="submit">
          <CheckCircleOutlined />
          {text}
        </SaveButton>
      </Col>
    </Row>
  )
}

export default ModalButtons
