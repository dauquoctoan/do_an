import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Table,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/lib/table'
import ContentScreen from 'commons/contentScreen'
import EditorComponent from 'commons/customEditor'
import PageHeader from 'commons/pageHeader'
import Configs from 'configs'
import { IS_ACTIVE } from 'configs/constance'
import style from 'configs/style'
import { IVoucherAndGift } from 'features/VoucherAndGif/interface'
import { ContainScreenStyled, FormStyled } from 'global-styled'
import moment from 'moment'
import { PATH_ADMIN } from 'navigation/Router/PathName'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import R from 'utils/R'
import UploadComponent from '../../../commons/uploads'
import {
  createEvent,
  detailEvent,
  getEventDetail,
  getListVoucherAndGift,
  getStalls,
  updateEvent,
} from '../APIEvent'
import { IListStall } from '../InterfaceEvents'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Editor, { EditorContentChanged } from 'commons/quillEditor'

const layoutCol = {
  lg: { span: 11 },
  sm: { span: 24 },
  xs: { span: 24 },
}
interface IProps {
  location: any
}

function AddEditEvents(props: IProps) {
  const targetId = props.location?.state?.id
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = useForm()
  const history = useHistory()
  const [eventDetail, setEventDetail] = useState<any>()
  const [listStall, setlistStall] = useState<IListStall[]>([])
  const [startDate, setStartDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [isAllSpace, setIsAllSpace] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [isGiftChosen, setIsGiftChosen] = useState<boolean>()
  const [listVoucherAndGift, setlistVoucherAndGift] = useState<
    IVoucherAndGift[]
  >([])
  const [GiftList, setGiftList] = useState<any[]>([])

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'index',
    },
    {
      title: 'Tên quà tặng, voucher',
      dataIndex: 'name',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (value, record, index) => {
        return (
          <div
            style={{
              marginTop: 20,
              width: '100%',
            }}
          >
            <Form.Item
              rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
              name={
                record?.id ? 'quantity' + record.id : 'quantity' + record.giftID
              }
              // name={'quantity' + index}
              style={{ width: '100%' }}
              initialValue={value}
            >
              <InputNumber
                defaultValue={value}
                width={'100%'}
                min={1}
                placeholder="Nhập số lượng"
              />
            </Form.Item>
          </div>
        )
      },
    },
  ]

  const getListStall = async () => {
    try {
      const res = await getStalls({
        limit: 10000,
        page: 1,
      })
      if (res.data.data) {
        const formatedList = res?.data?.data?.map((item: any) => ({
          ...item,
          label: item.name,
          value: item.id,
        }))
        setlistStall(formatedList)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDataVoucherGift = async () => {
    try {
      const res = await getListVoucherAndGift({ page: 1, limit: 10000 })
      if (res.data) {
        const listVouchers = res?.data?.data.filter(
          (item: any) => item.type === 1
        )
        const formatedList = listVouchers.map((item: any) => ({
          ...item,
          label: item.name,
          value: item.id + '-' + item.quantity,
        }))

        setlistVoucherAndGift(formatedList)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFinish = async (values: any) => {
    if (isAllSpace) {
      message.error('Vui lòng nhập nội dung')
    } else {
      try {
        setIsLoading(true)
        const listEventGift = values?.listEventGift?.map(
          (item: any, index: any) => {
            return {
              giftID: parseInt(
                item?.value ? item?.value.split('-')[0] : item.split('-')[0]
              ),
              quantity: parseInt(
                item?.value
                  ? values['quantity' + item?.value.split('-')[0]]
                  : values['quantity' + item.split('-')[0]]
              ),
              quantityExchanged: 0,
              stock: 0,
            }
          }
        )
        const listRelatedStall = values.listRelatedStall.map(
          (item: any) => item?.id || item
        )

        if (targetId) {
          const payload = {
            ...values,
            id: targetId,
            listEventGift: listEventGift,
            isNotify: values.isNotify ? IS_ACTIVE.ACTIVE : IS_ACTIVE.INACTIVE,
            isPopup: values.isPopup ? IS_ACTIVE.ACTIVE : IS_ACTIVE.INACTIVE,
            urlImage: Configs.getPathFileListInForm(values.urlImage),
            content: description,
            startDate: startDate,
            endDate: endDate,
            listRelatedStall,
            GiftLimit: values.maxNumber,
          }

          const res = await updateEvent(payload)

          if (res.status === 1) {
            history.push({
              pathname: PATH_ADMIN.EVENT,
              // state: {
              //   data,
              // },
            })
            message.success('Chỉnh sửa sự kiện thành công')
          }
        } else {
          const res = await createEvent({
            ...values,
            content: description,
            listEventGift: listEventGift,
            isNotify: values.isNotify ? IS_ACTIVE.ACTIVE : IS_ACTIVE.INACTIVE,
            isPopup: values.isPopup ? IS_ACTIVE.ACTIVE : IS_ACTIVE.INACTIVE,
            urlImage: Configs.getPathFileListInForm(values.urlImage),
            startDate: startDate,
            endDate: endDate,
            listRelatedStall,
            GiftLimit: values.maxNumber,
          })
          if (res.status === 1) {
            history.push({
              pathname: PATH_ADMIN.EVENT,
              // state: {
              //   data,
              // },
            })
            message.success('Thêm mới sự kiện thành công')
          }
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChangeGift = (value?: any, objValue?: any) => {
    const isSelectedAll =
      objValue.filter((item: any) => item.value === '_SELECT_ALL_OPTION')
        .length > 0

    if (isSelectedAll) {
      setIsGiftChosen(true)
      console.log('listVoucherAndGift select all: ', listVoucherAndGift)
      const data = listVoucherAndGift.map((item: any, index: number) => ({
        id: item.id,
        key: item.id,
        // key: index,
        index: index + 1,
        stock: item.value.split('-')[1],
        // name: item.children,
        name: item.name,
      }))
      setGiftList(data)
    } else {
      if (objValue.length > 0) {
        console.log('listVoucherAndGift NOT select all: ', objValue)
        setIsGiftChosen(true)
        const data = objValue.map((item: any, index: number) => ({
          id: item.id,
          key: item.id,
          // key: index,
          index: index + 1,
          stock: item.value.split('-')[1],
          // name: item.children,
          name: item.name,
        }))
        setGiftList(data)
      } else {
        setGiftList([])
        setIsGiftChosen(false)
      }
    }
  }

  const onGetEventDetail = async () => {
    try {
      setIsLoading(true)
      const res = await getEventDetail(targetId)
      if (res?.status) {
        const newData = {
          title: res?.data?.title,
          listRelatedStall: res?.data?.listRelatedStall,
          maxNumber: res?.data?.giftLimit,
          listEventGift: res?.data?.listEventGift.map(
            (item: any) => item.giftID + '-' + item.stock
          ),
          isPopup: res?.data?.isPopup,
          date: [moment(res?.data?.startDate), moment(res?.data?.endDate)],
          urlImage: Configs.getDefaultFileList(res?.data.urlImage),
        }
        form.setFieldsValue(newData)
        const dataTable = res?.data?.listEventGift?.map(
          (item: any, index: number) => ({ index: index + 1, ...item })
        )
        if (res?.data?.giftLimit) {
          setIsGiftChosen(true)
        }
        setGiftList(dataTable)
        setDescription(res?.data?.content)
        setStartDate(res?.data?.startDate)
        setEndDate(res?.data?.endDate)
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Quà tặng
  const SELECT_ALL_OPTION = {
    label: '--- Chọn tất cả ---',
    value: '_SELECT_ALL_OPTION',
  }

  const useSelectAllOption = (options: any[]) => {
    const optionsWithAllOption: any = useMemo(
      () => [SELECT_ALL_OPTION, ...options],
      [options]
    )

    /** pass this to Form.Item's getValueFromEvent prop */
    const getValueFromEvent = useCallback(
      (value: any, selections: any) => {
        if (!selections?.length) {
          console.log(1111)

          return selections
        }
        if (
          !selections?.some((s: any) => s.value === SELECT_ALL_OPTION.value)
        ) {
          console.log(222222)
          return selections
        }
        const labelInValue = typeof value[0]?.label === 'string'
        // if "Select All" option selected, set value to all options
        // also keep labelInValue in consideration
        return labelInValue ? options : options.map((o: any) => o.value)
      },
      [options]
    )

    return [getValueFromEvent, optionsWithAllOption]
  }

  const [getValueFromEvent, optionsWithAllOption] =
    useSelectAllOption(listVoucherAndGift)

  // Gian hàng liên quan
  const SELECT_ALL_STALL_OPTION = {
    label: '--- Chọn tất cả ---',
    value: '_SELECT_ALL_STALL_OPTION',
  }

  const useSelectAllStallOption = (options: any[]) => {
    const optionsWithAllOption: any = useMemo(
      () => [SELECT_ALL_STALL_OPTION, ...options],
      [options]
    )

    /** pass this to Form.Item's getValueFromEvent prop */
    const getValueFromEvent = useCallback(
      (value: any, selections: any) => {
        if (!selections?.length) {
          return selections
        }
        if (
          !selections?.some(
            (s: any) => s.value === SELECT_ALL_STALL_OPTION.value
          )
        ) {
          return selections
        }
        const labelInValue = typeof value[0]?.label === 'string'
        // if "Chọn tất cả" option selected, set value to all options
        // also keep labelInValue in consideration
        return labelInValue ? options : options.map((o: any) => o.value)
      },
      [options]
    )

    return [getValueFromEvent, optionsWithAllOption]
  }

  const [getStallValueFromEvent, optionsWithAllStallOption] =
    useSelectAllStallOption(listStall)

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html)
  }

  useEffect(() => {
    getDataVoucherGift()
    getListStall()
    // handleChangeGift()
  }, [])

  useEffect(() => {
    if (targetId) onGetEventDetail()
  }, [targetId])

  return (
    <ContainScreenStyled>
      <PageHeader
        title={targetId ? 'Chỉnh sửa chiến dịch' : 'Thêm mới chiến dịch'}
        onBack={() => history.push({ pathname: PATH_ADMIN.EVENT })}
      />
      <ContentScreen loading={isLoading}>
        <FormLayoutStyled>
          <FormStyled
            onFinish={(value: any) => handleFinish(value)}
            form={form}
          >
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label="Tên chiến dịch"
                  name="title"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên chiến dịch' },
                    {
                      min: 1,
                      max: 65,
                      message: 'Tên chiến dịch không quá 65 ký tự',
                    },
                  ]}
                >
                  <Input placeholder="Tên chiến dịch" />
                </Form.Item>
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  getValueFromEvent={getStallValueFromEvent}
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label="Gian hàng liên quan"
                  name={'listRelatedStall'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn gian hàng liên quan',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Gian hàng liên quan"
                    mode="multiple"
                    options={optionsWithAllStallOption}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* ROW 2 */}
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  getValueFromEvent={getValueFromEvent}
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label="Quà tặng"
                  name="listEventGift"
                >
                  <Select
                    placeholder="Quà tặng"
                    mode="multiple"
                    allowClear
                    onChange={handleChangeGift}
                    options={optionsWithAllOption}
                  />
                </Form.Item>
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label="Thời gian diễn ra"
                  name={'date'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn ngày thời gian!',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    value={[startDate, endDate]}
                    style={{ width: '100%' }}
                    format={'DD/MM/YYYY'}
                    placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                    onChange={(dates: any, dateString: any) => {
                      setStartDate(dateString[0].split('/').reverse().join('-'))
                      setEndDate(dateString[1].split('/').reverse().join('-'))
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                {isGiftChosen && (
                  <Form.Item
                    wrapperCol={style.layoutModal.wrapperCol}
                    labelCol={style.layoutModal.labelCol}
                    label="Giới hạn số lượng quà tặng"
                    name={'maxNumber'}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập giới hạn số lượng quà tặng!',
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      controls={false}
                      formatter={(value: any) =>
                        `${value?.toString()}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        )
                      }
                      style={{ width: '100%' }}
                      placeholder={'Giới hạn số lượng quà tặng'}
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            {/* Row 3 */}
            <Row>
              <Table
                style={{ width: '100%' }}
                bordered
                dataSource={GiftList}
                columns={columns}
                pagination={false}
                scroll={{ y: 550 }}
              />
            </Row>
            <br />
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <UploadComponent
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label={'Chọn ảnh chiến dịch'}
                  name={'urlImage'}
                  limit={1}
                  form={form}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn ảnh chiến dịch!',
                    },
                  ]}
                />
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  valuePropName="checked"
                  name={'isPopup'}
                >
                  <Checkbox>Chiến dịch nổi bật</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={12}></Col>
            </Row>
            <Row>
              <Col span={24}>
                <p>
                  <span style={{ color: 'red', fontSize: 10 }}>* </span> Mô tả
                </p>
                <Editor value={description} onChange={onEditorContentChanged} />
              </Col>
            </Row>
            <Row justify="end" style={{ marginTop: 70 }}>
              <Col>
                <Form.Item>
                  <Button
                    style={{ marginRight: '20px' }}
                    danger
                    onClick={() => {
                      history.push({
                        pathname: PATH_ADMIN.EVENT,
                        // state: {
                        //   data,
                        // },
                      })
                    }}
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
  )
}

export default AddEditEvents

const FormLayoutStyled = styled.div`
  width: 100%;
  padding: 20px 15px;
  border: ${style.border};
`
