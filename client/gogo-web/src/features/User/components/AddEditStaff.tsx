import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  PageHeader,
  message,
  Radio,
  Row,
  Select,
} from 'antd'
import ContentScreen from 'commons/contentScreen'
import { GENDER } from 'configs/constance'
import style from 'configs/style'
import { FormStyled } from 'global-styled'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { validPhoneNumber } from 'utils/functions'
import {
  CreateStaff,
  getListDistrict,
  getListProvince,
  getListWard,
  UpdateStaff,
} from '../StaffAPI'
import { IAddress } from '../StaffInterface'

const FormLayoutStyled = styled.div`
  width: 100%;
  padding: 20px 15px;
  border: ${style.border};
`
const DivWapper = styled.div`
  background-color: white;
  padding: 5px;
  margin: 5px;
`
const layoutCol = {
  lg: { span: 10 },
  sm: { span: 24 },
  xs: { span: 24 },
}
const layoutModal = {
  wrapperCol: { span: 13 },
  labelCol: { span: 11 },
}
interface IProps {
  location?: any
}

function StaffAddEdit(props: IProps) {
  const staffInfo = props.location?.state?.data
  console.log(staffInfo)
  const history = useHistory()
  const [form] = Form.useForm()
  const [provinces, setprovinces] = useState<IAddress[]>([])
  const [districts, setdistricts] = useState<IAddress[]>([])
  const [provinceId, setprovinceId] = useState<number>(staffInfo?.provinceID)
  const [districtId, setdistrictId] = useState<number>(staffInfo?.districtID)
  const [wards, setwards] = useState<IAddress[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const res = await getListProvince()
      if (res.data) {
        setprovinces(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFinish = async (values: any) => {
    if (values) {
      try {
        if (staffInfo) {
          const res = await UpdateStaff({
            id: staffInfo.id,
            name: values.name,
            dob: values.dob.toISOString(),
            wardID: values.wardID,
            districtID: values.districtID,
            provinceID: values.provinceID,
            address: '',
            gender: values.gender,
          })
          if (res.message == 'Thành công') {
            message.success('Sửa nhân viên thành công')
          }
        } else {
          const res = await CreateStaff({
            phone: values.phone,
            name: values.name,
            dob: values.dob.toISOString(),
            wardID: values.wardID,
            districtID: values.districtID,
            provinceID: values.provinceID,
            address: '',
            gender: values.gender,
          })
          if (res.message == 'Thành công') {
            message.success('Thêm nhân viên thành công')
          }
        }
        history.goBack()
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    handleChangeDistrict()
  }, [provinceId])

  const handleChangeDistrict = async () => {
    try {
      const res = await getListDistrict(provinceId)
      if (res.data) {
        setdistricts(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleChangeWard()
  }, [districtId])

  const handleChangeWard = async () => {
    try {
      const res = await getListWard(districtId)
      if (res.data) {
        setwards(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <DivWapper>
        <PageHeader
          title={staffInfo ? 'Sửa nhân viên' : 'Thêm mới nhân viên'}
          onBack={() => {
            history.push('/staff')
          }}
        />
      </DivWapper>

      <ContentScreen>
        <FormLayoutStyled>
          <FormStyled
            initialValues={
              staffInfo ? { ...staffInfo, dob: moment(staffInfo.dob) } : {}
            }
            onFinish={(values: any) => handleFinish(values)}
            form={form}
          >
            <Row gutter={[16, 16]} justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Tên nhân viên"
                  name={'name'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên nhân viên',
                    },
                    {
                      whitespace: true,
                      message: 'Tên nhân viên đang chỉ chứa khoảng trắng!',
                    },
                    {
                      max: 65,
                      message: 'Tên nhân viên không quá 65 ký tự',
                    },
                  ]}
                >
                  <Input placeholder="Tên nhân viên" />
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Số điện thoại"
                  name={'phone'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại',
                    },
                    {
                      max: 10,
                      message: 'Số điện thoại chỉ bao gồm 10 ký tự!',
                    },
                    {
                      validator: (_, value) => validPhoneNumber(_, value),
                      message: 'Định dạng số điện thoại không hợp lệ!',
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Số điện thoại"
                    disabled={staffInfo}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Ngày sinh"
                  name={'dob'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập ngày sinh',
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={(current) =>
                      current.isAfter(moment().subtract(0, 'day'))
                    }
                    format={'DD/MM/YYYY'}
                    placeholder="Ngày sinh"
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Giới tính"
                  name={'gender'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập giới tính',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={GENDER.MALE}> Nam </Radio>
                    <Radio value={GENDER.FEMALE}> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Tỉnh/Thành phố"
                  name={'provinceID'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tỉnh thành phố',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Tỉnh/Thành phố"
                    showSearch
                    optionFilterProp="children"
                    onChange={(value: number) => {
                      form.setFieldsValue({
                        districtID: undefined,
                        wardID: undefined,
                      })
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
                  </Select>
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Quận/Huyện"
                  name={'districtID'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập quận/huyện',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Quận/Huyện"
                    showSearch
                    optionFilterProp="children"
                    onChange={(value: number) => {
                      form.setFieldsValue({ wardID: undefined })

                      setdistrictId(value)
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
                  </Select>
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label="Phường/Xã"
                  name={'wardID'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập phường/xã',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Phường/Xã"
                    showSearch
                    optionFilterProp="children"
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
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                style={{ float: 'right', marginTop: '20px' }}
                htmlType="submit"
                type="primary"
              >
                Lưu
              </Button>
            </Form.Item>
          </FormStyled>
        </FormLayoutStyled>
      </ContentScreen>
    </>
  )
}

export default StaffAddEdit
