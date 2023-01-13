import {
  Col,
  Row,
  Select,
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  message,
  Image,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ContentScreen from 'commons/contentScreen'
import SunEditorComponent from 'commons/editor'
import PageHeader from 'commons/pageHeader'
import Configs from 'configs'
import style from 'configs/style'
import { ContainScreenStyled, FormStyled } from 'global-styled'
import R from 'utils/R'
import {
  VoucherAndGiftAdd,
  VoucherAndGiftDetail,
  VoucherAndGiftUpdate,
} from '../VoucherAndGiftAPI'
import UploadComponent from 'utils/uploadImage'
import moment from 'moment'
import React from 'react'
import EditorComponent from 'commons/customEditor'
import Editor, { EditorContentChanged } from 'commons/quillEditor'
interface IProps {
  location?: any
}

const TYPE_VOUCHER = {
  gift: 1,
  voucher: 2,
}

const AddUpdateVoucherAndGif = (props: IProps) => {
  const voucherDetail = props?.location?.state?.data
  console.log(
    '🚀 ~ file: AddUpdateVoucherAndGif.tsx:43 ~ AddUpdateVoucherAndGif ~ voucherDetail',
    voucherDetail
  )

  const [isShowField, setisShowField] = useState<boolean>(true)
  const layoutCol = {
    lg: { span: 10 },
    sm: { span: 24 },
    xs: { span: 24 },
  }
  const layoutModal = {
    wrapperCol: { span: 13 },
    labelCol: { span: 11 },
  }
  const id = Configs.getSearchParams().get('id')
  const userInfo = Configs.getUserInfo()
  const [form] = Form.useForm()
  const gift = Form.useWatch('type', form)
  const [startDate, setStartDate] = useState<any>(voucherDetail?.fromDate)
  const [endDate, setEndDate] = useState<any>(voucherDetail?.toDate)
  const [loading, setLoading] = useState<boolean>(false)
  const [isAllSpace, setIsAllSpace] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [imagevoucher, setimagevoucher] = useState<string>(
    voucherDetail?.urlImage
  )
  const [isGiftChosen, setIsGiftChosen] = React.useState<boolean | undefined>(
    voucherDetail ? (voucherDetail.type === 1 ? true : false) : undefined
  )

  const handleFinish = async (value: any) => {
    if (isAllSpace) {
      message.error('Vui lòng nhập mô tả')
    } else {
      // Thêm mới
      if (!voucherDetail) {
        try {
          const payload = {
            ...value,
            status: 1,
            urlImage: imagevoucher,
            createDate: new Date().toISOString(),
            point: value.point ? value.point : 0,
            quantity: value.quantity ? value.quantity : 0,
            number: value.quantity ? value.quantity : 0,
            description: description,
            fromDate: startDate,
            toDate: endDate,
          }
          const res = await VoucherAndGiftAdd(payload)
          if (res) {
            message.success('Thêm quà tặng, voucher thành công')
            window.history.back()
          }
        } catch (err) {
          console.error(err)
        }
      } else {
        // Chỉnh sửa
        const payload = {
          ...value,
          status: 1,
          urlImage: imagevoucher,
          createDate: new Date().toISOString(),
          point: value.point ? value.point : 0,
          quantity: value.quantity ? value.quantity : 0,
          number: value.quantity ? value.quantity : 0,
          id: voucherDetail.id,
          description: description,
          fromDate: startDate,
          toDate: endDate,
        }

        try {
          const res = await VoucherAndGiftUpdate(payload)
          if (res) {
            message.success('Chỉnh sửa quà tặng, voucher thành công')
            window.history.back()
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html)
  }

  React.useEffect(() => {
    setDescription(voucherDetail?.description)
  }, [voucherDetail])

  return (
    <>
      <ContainScreenStyled>
        <PageHeader
          onBack={() => {
            window.history.back()
          }}
          title={
            voucherDetail
              ? 'Sửa quà tặng, voucher'
              : 'Thêm mới quà tặng, voucher'
          }
          fixed={true}
        />
        <ContentScreen loading={loading}>
          <FormLayoutStyled>
            <FormStyled
              initialValues={
                voucherDetail
                  ? {
                      ...voucherDetail,
                      date: [
                        moment(voucherDetail?.fromDate),
                        moment(voucherDetail?.toDate),
                      ],
                    }
                  : {}
              }
              onFinish={(value: any) => handleFinish(value)}
              form={form}
            >
              <Row justify="space-between">
                <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                  <Form.Item
                    wrapperCol={layoutModal.wrapperCol}
                    labelCol={layoutModal.labelCol}
                    label={'Tên quà tặng/voucher'}
                    name={'name'}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Vui lòng nhập tên quà tặng, voucher.',
                      },
                      {
                        max: 65,
                        message:
                          'Tên quà tặng/voucher không chứa quá 65 ký tự!',
                      },
                    ]}
                  >
                    <Input placeholder="Tên quà tặng, voucher" />
                  </Form.Item>
                  {/* <Form.Item
                    wrapperCol={layoutModal.wrapperCol}
                    labelCol={layoutModal.labelCol}
                    label={'Ngày áp dụng'}
                    name="fromDate"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập ngày áp dụng',
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Chọn ngày áp dụng"
                      format={Configs._formatDate}
                      style={{ width: '100%' }}
                      onChange={(selectTime: any, dateTime: string) => {
                        setdateVoucher({ ...dateVoucher, fromDate: dateTime })
                      }}
                    />
                  </Form.Item> */}
                  {isGiftChosen !== undefined && !isGiftChosen && (
                    <Form.Item
                      wrapperCol={layoutModal.wrapperCol}
                      labelCol={layoutModal.labelCol}
                      label={'Số điểm đổi'}
                      name={'point'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điểm đổi !',
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        controls={false}
                        formatter={(value) =>
                          `${value?.toString()}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )
                        }
                        style={{ width: '100%' }}
                        placeholder={'Nhập số điểm đổi'}
                      />
                    </Form.Item>
                  )}

                  <Form.Item
                    wrapperCol={layoutModal.wrapperCol}
                    labelCol={layoutModal.labelCol}
                    label={
                      <p>
                        <span style={{ color: 'red', fontSize: 11 }}>* </span>
                        Ảnh
                      </p>
                    }
                    name={'urlImage'}
                  >
                    <>
                      <UploadComponent
                        uploadType="list"
                        listType="picture-card"
                        maxLength={1}
                        isUploadServerWhenUploading
                        onSuccessUpload={(res: any) => {
                          console.log('RES: ', res)
                          setimagevoucher(res?.data?.[0])
                        }}
                        fileList={
                          imagevoucher
                            ? [
                                {
                                  id: '1',
                                  url: imagevoucher,
                                },
                              ]
                            : []
                        }
                      />
                    </>
                  </Form.Item>
                </Col>
                <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                  <Form.Item
                    wrapperCol={layoutModal.wrapperCol}
                    labelCol={layoutModal.labelCol}
                    label={'Loại đổi quà'}
                    name={'type'}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn loại đổi quà!',
                      },
                    ]}
                  >
                    <Select
                      style={{ width: '100%' }}
                      disabled={voucherDetail}
                      placeholder={'Chọn loại đổi quà'}
                      onChange={(value: any) => {
                        if (value == 2) {
                          setisShowField(false)
                          setIsGiftChosen(false)
                        } else {
                          setisShowField(true)
                          setIsGiftChosen(true)
                        }
                      }}
                    >
                      <Select.Option value={1}>Quà tặng</Select.Option>
                      <Select.Option value={2}>Voucher</Select.Option>
                    </Select>
                  </Form.Item>
                  {isGiftChosen && (
                    <Form.Item
                      wrapperCol={layoutModal.wrapperCol}
                      labelCol={layoutModal.labelCol}
                      label={'Số lượng quà tặng'}
                      name={'quantity'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số lượng quà tặng !',
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        controls={false}
                        formatter={(value) =>
                          `${value?.toString()}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )
                        }
                        style={{ width: '100%' }}
                        placeholder={'Nhập số lượng voucher, quà tặng'}
                      />
                    </Form.Item>
                  )}
                  {gift !== TYPE_VOUCHER.gift && (
                    <Form.Item
                      wrapperCol={layoutModal.wrapperCol}
                      labelCol={layoutModal.labelCol}
                      label={'Thời gian diễn ra'}
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn thời gian diễn ra!',
                        },
                      ]}
                    >
                      <DatePicker.RangePicker
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                        placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                        onChange={(dates: any, dateString: any) => {
                          setStartDate(
                            dateString[0].split('/').reverse().join('-')
                          )
                          setEndDate(
                            dateString[1].split('/').reverse().join('-')
                          )
                        }}
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Editor
                    value={description}
                    onChange={onEditorContentChanged}
                  />
                </Col>
              </Row>

              <Row justify="end" style={{ marginTop: 70 }}>
                <Col>
                  <Form.Item>
                    <Button
                      style={{ marginRight: '20px' }}
                      danger
                      // type="primary"
                      onClick={() => {
                        window.history.back()
                      }}
                      // children={R.strings().btn__cancel}
                      children={'Huỷ'}
                    />
                    <Button
                      type="primary"
                      htmlType="submit"
                      children={R.strings().btn__save}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </FormStyled>
          </FormLayoutStyled>
        </ContentScreen>
      </ContainScreenStyled>
    </>
  )
}

export default AddUpdateVoucherAndGif
const FormLayoutStyled = styled.div`
  width: 100%;
  padding: 20px 15px;
  border: ${style.border};
`
