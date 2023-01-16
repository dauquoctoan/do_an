import { Modal, Row } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'
import QRCode from 'qrcode.react'

import React from 'react'

const WEBVIEW_URL = process.env.REACT_APP_WEBVIEW_URL

interface IQRCodeModal {
  isVisible: boolean
  currentTitle: string
  currentId: number
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const QRCodeModal = (props: IQRCodeModal) => {
  const { isVisible, setIsVisible, currentTitle, currentId } = props

  const downloadQRCode = () => {
    console.log('this case')
    // Generate download with use canvas and stream
    const canvas: any = document.getElementById('qr-gen')
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `qrcode_${currentId}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <Modal
      title={currentTitle}
      visible={isVisible}
      onOk={downloadQRCode}
      onCancel={() => setIsVisible(false)}
      okText="Tải QR Code"
      width={400}
    >
      <Row justify="center">
        <QRCodeCanvas
          size={250}
          id="qr-gen"
          value={`${WEBVIEW_URL}/webview/${currentId}`}
        />
      </Row>
    </Modal>
  )
}

export default QRCodeModal
