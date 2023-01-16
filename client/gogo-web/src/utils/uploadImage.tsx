import { Image, Upload } from 'antd'
import type { UploadProps } from 'antd/es/upload'
import { UploadFile, UploadListType } from 'antd/lib/upload/interface'
import axios from 'axios'
import React, { ReactNode } from 'react'
import { FaPlus } from 'react-icons/fa'
import styled from 'styled-components'
type uploadType = 'single' | 'list'
interface IProps {
  onSuccessUpload: any
  isUploadServerWhenUploading?: boolean
  isShowFileList?: boolean
  children?: ReactNode
  uploadType?: uploadType
  accept?: string
  listType?: UploadListType
  maxLength?: number
  fileList?: any
}

const UploadComponent: React.FC<IProps> = ({
  accept = 'image/*',
  listType = 'text',
  uploadType = 'single',
  isShowFileList = true,
  isUploadServerWhenUploading = false,
  onSuccessUpload,
  children,
  maxLength = 5,
  fileList = [],
}) => {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const [progress, setProgress] = React.useState(0)
  const [visiblePreview, setVisiblePreview] = React.useState(false)

  const firstLoad = React.useRef(false)

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options
    if (isUploadServerWhenUploading) {
      const fmData = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event: any) => {
          const percent = Math.floor((event.loaded / event.total) * 100)
          setProgress(percent)
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000)
          }
          onProgress({ percent: (event.loaded / event.total) * 100 })
        },
      }
      fmData.append('images', file)
      try {
        const res = await axios.post(
          'http://dev.savicoapi.winds.vn/api/web/Upload/UploadImage',
          fmData,
          config
        )
        if (res.status) {
          onSuccessUpload(res.data, files)
          onSuccess('Ok')
        } else {
          file.status = 'error'
          const error = new Error('Some error')
          if (uploadType === 'single') {
            setFiles([file])
          } else {
            setFiles((f) => [
              ...f.filter((_f) => _f.status !== 'uploading'),
              file,
            ])
          }
          onError({ error })
        }
      } catch (err) {
        file.status = 'error'
        const error = new Error('Some error')
        if (uploadType === 'single') {
          setFiles([file])
        } else {
          setFiles((f) => [
            ...f.filter((_f) => _f.status !== 'uploading'),
            file,
          ])
        }
        onError({ error })
      }
    } else {
      setTimeout(() => onSuccess('ok'), 1000)
    }
  }

  React.useEffect(() => {
    if (firstLoad && firstLoad.current) return
    if (fileList.length > 0) {
      setFiles(fileList)
      firstLoad.current = true
    }
  }, [fileList])

  const handleOnChange: UploadProps['onChange'] = ({
    file,
    fileList,
    event,
  }: any) => {
    if (file.status !== 'error') {
      setFiles(fileList)
    }
    !isUploadServerWhenUploading &&
      file.status === 'done' &&
      onSuccessUpload(file, fileList)

    if (file.status !== 'removed') {
      !isUploadServerWhenUploading && onSuccessUpload(file, fileList)
    }

    if (file.status === 'removed') {
      setFiles([])
      onSuccessUpload([])
      return
    }
  }

  const handlePreview = async (file: UploadFile) => {
    if (file) {
      setVisiblePreview(true)
    }
  }

  return (
    <>
      <UploadStyled
        accept={accept}
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType={listType}
        fileList={isShowFileList ? files : []}
        className="image-upload-grid"
        onPreview={handlePreview}
      >
        {files.length >= maxLength ? null : uploadType === 'single' &&
          files.length >= 1 ? null : listType === 'text' ? (
          children
        ) : (
          <FaPlus style={{ color: 'gray' }} />
        )}
      </UploadStyled>
      {listType !== 'text' && (
        <Image.PreviewGroup
          preview={{
            visible: visiblePreview,
            onVisibleChange: (visible) => setVisiblePreview(visible),
          }}
        >
          {files.map((file: UploadFile, index: number) => {
            return (
              <Image
                key={file.uid}
                src={file?.thumbUrl || file.url}
                width={0}
                style={{ display: 'none' }}
              />
            )
          })}
        </Image.PreviewGroup>
      )}
    </>
  )
}

const UploadStyled = styled(Upload)`
  & img {
    /* object-fit: none !important; */
  }
  & .ant-upload-list-picture-card .ant-upload-list-item,
  .ant-upload-list-picture .ant-upload-list-item {
    padding: 2px;
  }
`

export default UploadComponent
