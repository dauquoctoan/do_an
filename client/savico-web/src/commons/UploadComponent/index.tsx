import { UploadOutlined } from '@ant-design/icons'
import { Button, Image, message, Upload } from 'antd'
import type { UploadProps } from 'antd/es/upload'
import { UploadFile, UploadListType } from 'antd/lib/upload/interface'
import { postExcelFile } from 'features/VoucherAndGif/VoucherAndGiftAPI'
import React, { ReactNode } from 'react'

type uploadType = 'single' | 'list'
interface IProps {
  onSuccessUpload: (file: any) => void
  isUploadServerWhenUploading?: boolean
  isShowFileList?: boolean
  children?: ReactNode
  uploadType?: uploadType
  accept?: string
  listType?: UploadListType
  maxLength?: number
  initialFiles?: any
  title?: string
  giftID: number
  getDataCode: any
  setChange?: any
}

const UploadComponent: React.FC<IProps> = ({
  accept = 'image/*',
  listType = 'text',
  uploadType = 'single',
  isShowFileList = true,
  isUploadServerWhenUploading = false,
  onSuccessUpload,
  children,
  maxLength = 1,
  title,
  giftID,
  getDataCode,
  setChange,
  initialFiles = [],
}) => {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const [progress, setProgress] = React.useState(0)
  const [visiblePreview, setVisiblePreview] = React.useState(false)
  const firstLoad = React.useRef(false)
  const [videoSrc, seVideoSrc] = React.useState('')

  React.useEffect(() => {
    if (accept === '.mp4') {
      if (!initialFiles[0]?.url || firstLoad.current) return
      firstLoad.current = true
      setFiles(initialFiles)
      seVideoSrc(initialFiles[0]?.url)
    }
  }, [initialFiles[0]?.url])

  const beforeUploadFile = (file: any): any => {
    let fileSize: number = 20
    if (accept === '.mp4') {
      const isMP4: boolean = file.type === 'video/mp4'
      const validateFileSize: boolean = file.size / 1024 / 1024 > fileSize

      if (!isMP4) {
        message.error('Video không đúng định dạng!')
        return false
      } else if (validateFileSize) {
        message.error('Dung lượng tối đa của video là 20.0 MB')
        return false
      }

      return true
    }
    return true
  }

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options

    if (beforeUploadFile(file)) {
      if (files.length > maxLength) {
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
        return message.error('Vượt quá số lượng cho phép!')
      }

      if (isUploadServerWhenUploading) {
        const fmData = new FormData()
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
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
          const res: any = await postExcelFile(giftID, file)

          if (res.status) {
            setFiles([file])
            onSuccessUpload(res?.data as string)
            onSuccess('ok')
            getDataCode()
            setChange((value: any) => value + 1)
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
        setTimeout(() => onSuccess('ok'), 500)
      }
    }
  }

  const handleOnChange: UploadProps['onChange'] = ({
    file,
    fileList,
    event,
  }: any) => {
    if (file.status !== 'error') {
      setFiles(fileList)
      if (accept === '.mp4' && file.status !== 'removed') {
        seVideoSrc(URL.createObjectURL(file.originFileObj))
      }
    }

    if (file.status !== 'removed') {
      !isUploadServerWhenUploading && onSuccessUpload(file)
    } else {
      if (uploadType === 'single') {
        setFiles([])
        seVideoSrc('')
        onSuccessUpload([])
      }
    }
  }

  const handlePreview = async (file: UploadFile) => {
    setVisiblePreview(true)
    return
  }

  React.useEffect(() => {
    if (!initialFiles[0]?.url || firstLoad.current) return
    firstLoad.current = true
    setFiles(initialFiles)
  }, [initialFiles[0]?.url])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Upload
        accept={accept}
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType={'picture'}
        // fileList={isShowFileList ? files : []}
        fileList={[]}
        className="image-upload-grid"
        onPreview={handlePreview}
        beforeUpload={beforeUploadFile}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  )
}

export default UploadComponent
