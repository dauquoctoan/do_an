import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import Cookies from 'js-cookie'
import { type } from 'os'
import { useEffect, useState } from 'react'
import Configs from '../../configs'
import R from '../../utils/R'
import message from '../message'
import { IFileBeforeUpload, IPropsUpload } from './interface'

/**
 * This function takes a file and returns a promise that resolves to the base64 representation of that
 * file.
 * @param {RcFile} file - The file to be converted to base64
 */
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const UploadMedia = ({
  title,
  size = Configs._media.default.MAX_SIZE,
  maxCount = Configs._media.default.MAX_COUNT,
  action,
  listType = 'picture-card',
  changeListPath,
  accept = Configs._media.typeUpload.IMAGE(),
  name,
}: IPropsUpload) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [mediaPath, setMediaPath] = useState<Array<string>>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  useEffect(() => {
    changeListPath && changeListPath(mediaPath)
  }, [mediaPath])
  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    let listMediaDone: string[] = []
    newFileList.forEach((fileItem: UploadFile) => {
      if (fileItem.status === 'done') {
        listMediaDone = [...listMediaDone, fileItem.response.data.url]
      }
    })
    setMediaPath(listMediaDone)
    setFileList(newFileList)
  }

  const handleBeforeUpload: UploadProps['beforeUpload'] = (
    file: UploadFile
  ) => {
    if (file?.size === undefined) {
      message({ content: R.strings().upload_image_error_size, type: 'error' })
    } else if (file?.size > size * 1000000) {
      message({ content: R.strings().upload_image_warning_size, type: 'error' })
    } else {
      return true
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{title}</div>
    </div>
  )
  return (
    <>
      <Upload
        name={name}
        accept={accept}
        action={action}
        listType={listType}
        fileList={fileList}
        // headers={{
        //   Authorization: `Bearer ${Cookies.get(Configs._sessionId)}`,
        // }}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default UploadMedia
