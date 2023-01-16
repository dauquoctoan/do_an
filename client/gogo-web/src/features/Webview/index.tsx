import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Collapse,
  Form,
  Image,
  PageHeader,
  Radio,
  Row,
  Select,
} from 'antd'
import { Rule } from 'antd/lib/form'
import { getListEvent } from 'features/event/APIEvent'
import {
  getListDistrict,
  getListProvince,
  getListWard,
} from 'features/Staff/StaffAPI'
import { IAddress } from 'features/Staff/StaffInterface'
import { FormStyled } from 'global-styled'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { errorNumber, errorWhiteSpace, validPhoneNumber } from 'utils/functions'
import { formatPrice } from 'utils/ruleForm'
import { logos } from '../../utils/logo'
import { CustomerInfo, getChanels, getEvents, getStalls } from './APIWebview'
import QRCodeCustomer from './components/QRCodeCustomer'
import {
  ButtonStyled,
  CardStyled,
  DatePickerStyled,
  DivWapper,
  InputNumberStyled,
  InputStyled,
  SelectStyled,
} from './components/Style/Styled'
import './components/Style/Styles.css'
import { IDataUpdateCusomer, IEvent, IfieldData } from './interfaceWebview'
const { Option } = Select
const { Panel } = Collapse

const layoutModal = {
  wrapperCol: {},
  labelCol: { span: 5 },
}

const TitleEvent = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-top: 16px;
`

interface IProps {
  location?: any
}

const Webview = (props: IProps) => {
  const params: any = useParams()

  const [form] = Form.useForm()
  const [fieldVal, setfieldVal] = useState<any>()
  const [provinces, setprovinces] = useState<IAddress[]>([])
  const [districts, setdistricts] = useState<IAddress[]>([])
  const [wards, setwards] = useState<IAddress[]>([])
  const [provinceId, setprovinceId] = useState<number>()
  const [districtId, setdistrictId] = useState<number>()
  const [provinceName, setprovinceName] = useState<string>('')
  const [districtName, setdistrictName] = useState<string>('')
  const [wardName, setWardName] = useState<string>()
  const [dataCusomer, setdataCusomer] = useState<IfieldData>()
  const [codeCustomer, setcodeCustomer] = useState<string>('')
  const [isShowModal, setisShowModal] = useState<boolean>(false)
  const [listStall, setlistStall] = useState<IDataUpdateCusomer[]>([])
  const [listChanel, setlistChanel] = useState<IDataUpdateCusomer[]>([])
  const [eventData, seteventData] = useState<IEvent>()
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [title, setTitle] = useState<string>()

  useEffect(() => {
    getDataEvent()
  }, [])

  const getDataEvent = async () => {
    try {
      const res = await getEvents()
      if (res.data) {
        res?.data?.map((item, index) => {
          seteventData({
            id: item.id,
            name: item.name,
          })
        })
        const targetEvent = res?.data?.filter(
          (item: any) => item.id === +params?.id
        )

        setTitle(targetEvent?.[0]?.name)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDataProvinces()
    getDataStall()
    getDataChanel()
  }, [])

  const getDataProvinces = async () => {
    try {
      const res = await getListProvince()
      if (res.data) {
        setprovinces(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDataDistricts = async () => {
    try {
      if (provinceId) {
        const res = await getListDistrict(provinceId)
        if (res.data) {
          setdistricts(res.data)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDataWard = async () => {
    try {
      if (districtId) {
        const res = await getListWard(districtId)
        if (res.data) {
          setwards(res.data)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDataStall = async () => {
    try {
      const res = await getStalls()
      if (res.data) {
        setlistStall(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDataChanel = async () => {
    try {
      const res = await getChanels()
      if (res.data) {
        setlistChanel(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFinish = async (values: any) => {
    try {
      if (values) {
        values?.listBill?.forEach((bill: any) => {
          bill.price = +bill.price
          if (!bill.price) bill.price = undefined
        })
        const res = await CustomerInfo({
          ...values,
          listBill: values?.listBill ? values?.listBill : [],
          eventID: Number(params.id),
          totalPrice: Number(totalPrice),
        })
        if (res.data) {
          setcodeCustomer(res.data)
          setisShowModal(true)
          setdataCusomer({
            ...values,
            districtName,
            wardName,
            provinceName,
          })
        }
      } else {
        console.log('hihi')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDataWard()
  }, [districtId])

  useEffect(() => {
    getDataDistricts()
  }, [provinceId])

  return (
    <>
      <Wapper>
        <ImageStyled src={logos.logoLogIn} preview={false} />
        <TitleEvent>{title}</TitleEvent>
      </Wapper>
      <DivWapper>
        <CardStyled title="Thông tin khách hàng">
          <FormStyled
            onFinish={handleFinish}
            form={form}
            onValuesChange={(value, allValue: any) => {
              const keys = Object.keys(value)

              if (keys[0] === 'listBill') {
                allValue.listBill.forEach((element: any) => {
                  // form.setFieldsValue({
                  //   ...element,
                  //   price: '919191',
                  // })

                  // Chưa nhập gì hết
                  if (!element) {
                    return {
                      ...element,
                      code: '',
                      price: 0,
                      stallID: undefined,
                    }
                  } else {
                    return {
                      ...element,
                    }
                  }
                })

                const total = allValue.listBill
                  .filter((item: any) => item)
                  .reduce(
                    (prev: any, next: any) => {
                      return +prev + +next.price
                    },
                    [0]
                  )
                setTotalPrice(!total ? 0 : total)
                form.setFieldsValue({ totalPrice: `${!total ? 0 : total} VNĐ` })
              }
            }}
          >
            <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="name"
              rules={[
                {
                  whitespace: true,
                  message: 'Vui lòng không nhập nhiều khoảng trắng!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên',
                },
                {
                  max: 256,
                  message: 'Họ và tên không quá 256 ký tự',
                },
                errorNumber('Họ và tên'),
              ]}
            >
              <InputStyled placeholder="Họ và tên *" />
            </Form.Item>
            <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại',
                },
                {
                  validator: (_, value) => validPhoneNumber(_, value),
                  message: 'Số điện thoại không hợp lệ',
                },
              ]}
            >
              <InputStyled placeholder="Số điện thoại *" />
            </Form.Item>
            <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="provinceID"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tỉnh/thành phố',
                },
              ]}
            >
              <SelectStyled
                allowClear
                placeholder="Tỉnh/Thành phố *"
                showSearch
                optionFilterProp="children"
                onChange={(value: any, objValue: any) => {
                  form.setFieldsValue({
                    districtID: undefined,
                    wardID: undefined,
                  })
                  setprovinceName(objValue?.children)
                  setprovinceId(value)
                }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {provinces.map((item, index) => (
                  <Select.Option value={item.code} key={index}>
                    {item.name}
                  </Select.Option>
                ))}
              </SelectStyled>
            </Form.Item>
            <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="districtID"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập quận/huyện',
                },
              ]}
            >
              <SelectStyled
                allowClear
                placeholder="Quận/Huyện *"
                showSearch
                optionFilterProp="children"
                onChange={(value: any, objValue: any) => {
                  form.setFieldsValue({ wardID: undefined })
                  setdistrictId(value)
                  setdistrictName(objValue?.children)
                }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {districts.map((item, index) => (
                  <Select.Option value={item.code} key={index}>
                    {item.name}
                  </Select.Option>
                ))}
              </SelectStyled>
            </Form.Item>
            <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="wardID"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập phường/xã',
                },
              ]}
            >
              <SelectStyled
                allowClear
                placeholder="Phường/Xã *"
                showSearch
                optionFilterProp="children"
                onChange={(value: any, objValue: any) => {
                  setWardName(objValue?.children)
                }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {wards.map((item, index) => (
                  <Select.Option value={item.code} key={index}>
                    {item.name}
                  </Select.Option>
                ))}
              </SelectStyled>
            </Form.Item>
            {/* <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="dob"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày sinh',
                },
              ]}
            >
              <DatePickerStyled
                format={'DD/MM/YYYY'}
                placeholder="Ngày sinh *"
                style={{ width: '100%' }}
              />
            </Form.Item> */}
            {/* <Form.Item
              name={'gender'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính',
                },
              ]}
            >
              <SelectStyled
                style={{ width: '100%' }}
                placeholder={'Chọn giới tính'}
                // onChange={handleChange}
              >
                <Option value={0}>Nam</Option>
                <Option value={1}>Nữ</Option>
              </SelectStyled>
            </Form.Item> */}
            {/* <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="identityCard"
              rules={[
                errorWhiteSpace,
                {
                  validator(_: Rule, value: string) {
                    if (
                      value ||
                      value == '' ||
                      value == null ||
                      value == undefined
                    ) {
                      return Promise.resolve()
                    } else if (value.match(/[a-z]/i)) {
                      return Promise.reject(new Error(`CCCD/CMND không hợp lệ`))
                    }
                  },
                },
              ]}
            >
              <InputStyled
                style={{ width: '100%' }}
                placeholder="Nhập số CCCD/CMND"
              />
            </Form.Item> */}
            {/* <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="job"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nghề nghiệp',
                },
                {
                  max: 256,
                  message: 'Nghề nghiệp không quá 256 ký tự',
                },
                errorNumber('Nghề nghiệp'),
              ]}
            >
              <InputStyled placeholder="Nghề nghiệp *" />
            </Form.Item> */}
            <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="eventChannelID"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn kênh thông tin',
                },
              ]}
            >
              <SelectStyled placeholder="Bạn biết thông tin qua kênh nào?">
                {listChanel.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </SelectStyled>
            </Form.Item>
            <Form.List name="listBill">
              {(fields, { add, remove }) => (
                <OrderWapper>
                  <PageHeader title="Thông tin đơn hàng" extra={[]}>
                    {fields.map(({ key, name, ...restField }) => {
                      return (
                        <Collapse defaultActiveKey={[key]} accordion key={key}>
                          <Panel
                            showArrow
                            header={'Đơn hàng số ' + (name + 1)}
                            key={key}
                          >
                            <Form.Item
                              {...restField}
                              wrapperCol={layoutModal.wrapperCol}
                              labelCol={layoutModal.labelCol}
                              name={[name, 'code']}
                              rules={[errorWhiteSpace]}
                            >
                              <InputStyled placeholder="Số hoá đơn" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              wrapperCol={layoutModal.wrapperCol}
                              labelCol={layoutModal.labelCol}
                              name={[name, 'price']}
                              rules={[errorWhiteSpace]}
                            >
                              <InputNumberStyled
                                formatter={(value: any) =>
                                  `${value?.toString()}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                  )
                                }
                                onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                                controls={false}
                                placeholder="Số tiền"
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              wrapperCol={layoutModal.wrapperCol}
                              labelCol={layoutModal.labelCol}
                              name={[name, 'stallID']}
                            >
                              <SelectStyled
                                allowClear
                                showSearch
                                placeholder={'Tên gian hàng'}
                                filterOption={(input, option) =>
                                  (option!.children as unknown as string)
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                              >
                                {listStall.map((item, index) => (
                                  <Option value={item.id} key={index}>
                                    {item.name}
                                  </Option>
                                ))}
                              </SelectStyled>
                            </Form.Item>
                            <Button danger onClick={() => remove(name)} block>
                              Xoá đơn hàng
                            </Button>
                          </Panel>
                        </Collapse>
                      )
                    })}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{ margin: '10px 0' }}
                    >
                      Thêm đơn
                    </Button>
                  </PageHeader>
                </OrderWapper>
              )}
            </Form.List>
            {/* <Form.Item
              wrapperCol={layoutModal.wrapperCol}
              labelCol={layoutModal.labelCol}
              name="totalPrice"
            >
              <InputNumberStyled
                formatter={(value: any) =>
                  `${value?.toString()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                disabled
                controls={false}
                placeholder="Tổng tiền"
              />
            </Form.Item> */}
            <Row justify="end">
              <p>
                Tổng:{' '}
                <span style={{ color: '#EC4C28' }}>
                  {formatPrice(totalPrice)} đ
                </span>
              </p>
            </Row>
            <Form.Item style={{ textAlign: 'center', paddingTop: '20px' }}>
              <ButtonStyled htmlType="submit" type="primary">
                Hoàn tất
              </ButtonStyled>
            </Form.Item>
          </FormStyled>
        </CardStyled>
      </DivWapper>
      <QRCodeCustomer
        data={dataCusomer}
        code={codeCustomer}
        isShowModal={isShowModal}
        cancel={() => setisShowModal(false)}
      />
    </>
  )
}

export default Webview

const ImageStyled = styled(Image)`
  width: 150px;
`
const Wapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`
const OrderWapper = styled.div`
  padding: 10px;
  /* text-align: end; */
  border: 1px solid #ececec;
  border-radius: 6px;
  margin: 0 0 10px 0;
`
