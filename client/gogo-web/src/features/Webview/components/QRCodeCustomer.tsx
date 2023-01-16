import { Modal, Image } from 'antd'
import QRCode from 'qrcode.react'
import styled from 'styled-components'
import { logos } from 'utils/logo'
import { IfieldData } from '../interfaceWebview'

const TextStyled = styled.p<any>`
  font-size: ${(props) => (props.size ? '17px' : '13px')};
  font-style: italic;
  color: gray;
  margin-top: 20px !important;
`

const ImageStyled = styled(Image)`
  width: 150px;
  margin-bottom: 15px;
`

const ContentWapper = styled.div`
  text-align: center;
  padding-bottom: 20px;
`
const QRContainer = styled.div`
  /* border: 5px solid #07031a; */
  border-radius: 8px;
  /* box-shadow: 0 0 10px #57575752;   */
  width: max-content;
  margin: auto;
  padding: 15px;
`

interface IProps {
  data?: IfieldData
  isShowModal: boolean
  cancel: () => void
  code: string
}

function QRCodeCustomer(props: IProps) {
  const data = props.data
  return (
    <>
      <Modal
        visible={props.isShowModal}
        onCancel={() => props.cancel()}
        footer={null}
        destroyOnClose
        maskClosable={false}
        style={{ textAlign: 'center' }}
      >
        {data && (
          <>
            <ContentWapper>
              {/* <TextStyled size={true}>{data.name}</TextStyled>
              <TextStyled>Số điện thoại: {data.phone}</TextStyled>
              <TextStyled>
                Địa chỉ:{' '}
                {`${data.provinceName}, ${data.districtName}, ${data.wardName}`}
              </TextStyled> */}
              <ImageStyled src={logos.logoLogIn} preview={false} />
            </ContentWapper>
            <QRContainer>
              <QRCode value={props.code} renderAs="canvas" size={150} />
              <TextStyled>* Vui lòng đưa mã QR cho nhân viên</TextStyled>
            </QRContainer>
          </>
        )}
      </Modal>
    </>
  )
}

export default QRCodeCustomer
