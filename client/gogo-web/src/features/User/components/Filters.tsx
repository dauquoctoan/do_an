import { Button, Col, Row, Select } from 'antd'
import AutoSearchInput from 'commons/autoSearchInput/AutoSearchInput'
import { IS_ACTIVE, STAFF_STATUS_TEXT } from 'configs/constance'
import { useEffect, useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { IAddress, IFilters } from '../StaffInterface'
import { useHistory } from 'react-router-dom'
import { getListProvince } from '../StaffAPI'
const { Option } = Select

interface IProps {
  submitFieldValue: (value: any) => void
}

function StaffFilters(props: IProps) {
  const [listProvince, setlistProvince] = useState<IAddress[]>([])
  const [values, setvalues] = useState<IFilters>({
    searchKey: undefined,
    status: undefined,
    searchProvince: undefined,
  })

  useEffect(() => {
    if (values) {
      props.submitFieldValue(values)
    }
  }, [values])

  useEffect(() => {
    getDataProvince()
  }, [])

  const getDataProvince = async () => {
    try {
      const res = await getListProvince()
      if (res.data) {
        setlistProvince(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <AutoSearchInput
            onSearchSubmit={(searchKey: string) => {
              setvalues({ ...values, searchKey })
            }}
            placeholder={'Tên hoặc số điện thoại'}
          />
        </Col>
        <Col>
          <Select
            allowClear
            style={{ width: 160 }}
            placeholder="Tỉnh/Thành phố"
            onChange={(searchProvince: number) => {
              setvalues({ ...values, searchProvince })
            }}
          >
            {listProvince.map((item, index) => (
              <Option value={item.code} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Trạng thái"
            style={{ width: 170 }}
            onChange={(status: number) => {
              setvalues({ ...values, status })
            }}
          >
            <Option value={IS_ACTIVE.ACTIVE}>{STAFF_STATUS_TEXT.ACTIVE}</Option>
            <Option value={IS_ACTIVE.INACTIVE}>
              {STAFF_STATUS_TEXT.INACTIVE}
            </Option>
          </Select>
        </Col>
      </Row>
    </>
  )
}

export default StaffFilters
