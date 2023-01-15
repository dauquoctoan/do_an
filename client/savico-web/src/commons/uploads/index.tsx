import React, { useEffect, useRef, useState } from 'react'
import { Form, FormInstance, Modal, Upload } from 'antd'
import Configs from '../../configs'
import message from '../message'
import Cookies from 'js-cookie'
import { IFile, IProps } from './interface'

const DEFINE_STATUS_FILE = {
  DONE: 'done',
  ERROR: 'error',
  UPLOADING: 'uploading',
}

const UploadComponent: React.FC<IProps> = ({
  type = 'picture-card',
  limit = 5,
  nameUpload = 'image',
  path = Configs._pathUploadImage,
  size = 10,
  placeholder = 'Tải ảnh',
  accept = '.jpg, .png',
  minSecondDuration = 10,
  maxSecondDuration = 60,
  isDisplayImgError = false,
  isMultiple = false,
  logger,
  setFileListProps,
  defaultData,
  form,
  ...rest
}) => {
  const [fileList, setFileList] = useState<IFile[]>([])
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>()
  const formInstances = useRef<FormInstance>()
  console.log('fileList', fileList)
  const UploadButton = () => {
    return (
      <div>
        <div style={{ color: 'gray' }}>
          {placeholder ? placeholder : 'Tải ảnh'}
        </div>
      </div>
    )
  }
  const beforeUploadFile = (file: any): any => {
    let fileSize: number = size
    if (accept === '.mp4') {
      const isMP4: boolean = file.type === 'video/mp4'
      const validateFileSize: boolean = file.size / 1024 / 1024 > fileSize
      let minDuration: number = minSecondDuration || 0
      let maxDuration: number = maxSecondDuration || 0
      let isDurationInvalid: boolean = minDuration || maxDuration ? false : true

      let promise = new Promise((resolve) => {
        let vid = document.createElement('video')
        let fileURL = URL.createObjectURL(file)
        vid.src = fileURL
        let duration: number = 0
        vid.ondurationchange = function () {
          duration = vid.duration
          isDurationInvalid = duration > minDuration && duration < maxDuration
          resolve(isDurationInvalid && isMP4 && !validateFileSize)
        }
      })

      promise.then((value) => {
        if (!isMP4) {
          message.error('Video không đúng định dạng.')
        } else if (validateFileSize) {
          message.error(`Dung lượng video tối đa là ${fileSize} MB`)
        } else if (!isDurationInvalid) {
          message.error(
            `Độ dài video giới hạn ${minDuration} - ${maxDuration} giây.`
          )
        }
      })

      return promise
    } else {
      const isJpgOrPng: boolean =
        file.type === 'image/jpeg' || file.type === 'image/png'
      const fileSizeIvalid: boolean = file.size / 1024 / 1024 > fileSize

      if (!isJpgOrPng) {
        message.error('ảnh không đúng định dạng.')
      }
      if (fileSizeIvalid) {
        message.error(`Dung lượng ảnh tối đa là ${fileSize} MB.`)
      }

      return isJpgOrPng && !fileSizeIvalid
    }
  }

  const handlePreview = async (file: any) => {
    const getBase64 = (file: any): Promise<any> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewVisible(true)
    setPreviewImage(file.url ? file.url : file.preview)
  }

  const handleChange = (values: any) => {
    let fileList = values.fileList.filter((value: any) => {
      return value.status === DEFINE_STATUS_FILE.DONE
    })

    values?.fileList?.forEach((file: any, index: number) => {
      if (!file.status) {
        isDisplayImgError
          ? (values.fileList[index].status = 'error')
          : values.fileList.splice(index, 1)
      }
      if (file.response && file.response.status === 0) {
        // message({
        //   type: 'error',
        //   content: file.response.message,
        // })
      }
    })

    logger && logger(fileList)
    setFileList(values.fileList)
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onSetFileList = (data: IFile[]) => {
    setFileList(data)
  }

  useEffect(() => {
    setFileListProps && setFileListProps(onSetFileList)
    formInstances.current = form
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFileList(
        formInstances.current?.getFieldValue({ ...rest }.name as string) || []
      )
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    defaultData && setFileList(defaultData)
  }, [defaultData])

  return (
    <>
      <Form.Item
        valuePropName={'fileList'}
        getValueFromEvent={normFile}
        {...rest}
      >
        <Upload
          accept={accept}
          action={path}
          name={nameUpload}
          listType={type}
          headers={
            {
              // Authorization: `Bearer ${Cookies.get(Configs._sessionId)}`,
            }
          }
          iconRender={() => <div>Đang tải...</div>}
          multiple={isMultiple}
          beforeUpload={beforeUploadFile}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {limit > fileList.length || fileList === undefined ? (
            <UploadButton />
          ) : null}
        </Upload>
      </Form.Item>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt={'img'} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default React.memo(UploadComponent)
