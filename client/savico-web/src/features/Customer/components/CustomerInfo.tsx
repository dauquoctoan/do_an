import { Descriptions, Typography } from 'antd'
import styled from 'styled-components'
import Configs from '../../../configs'
import style from '../../../configs/style'
import {convertTimeStampToString } from '../../../utils/TimerHelper'
import { ICustomerDetail } from '../interface'

const CustomerInfo = ({
  detailCustomer,
}: {
  detailCustomer: ICustomerDetail
}) => {
  return (
    <WraperInfoStyled>
      <Descriptions
        style={{ border: '1px solid rgba(0, 0, 0, 0.09)', padding: '20px' }}
        column={2}
        contentStyle={{ fontWeight: 600 }}
        // title="Thông tin khách hàng"
      >
        <Descriptions.Item label="Họ Tên">
          {Configs.toString(detailCustomer.name)}
        </Descriptions.Item>
        <Descriptions.Item label="Số CMND/CCCD">
          {Configs.toString(detailCustomer.identityCard)}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {Configs.toString(detailCustomer.phone)}
        </Descriptions.Item>
        <Descriptions.Item label="Tỉnh thành phố">
          {Configs.toString(detailCustomer.provinceName)}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {convertTimeStampToString(detailCustomer.dob)}
        </Descriptions.Item>
        <Descriptions.Item label="Quận huyện">
          {Configs.toString(detailCustomer.districtName)}
        </Descriptions.Item>
        <Descriptions.Item label="Nghề nghiệp">
          {Configs.toString(detailCustomer.job)}
        </Descriptions.Item>
        <Descriptions.Item label="Xã phường">
          {Configs.toString(detailCustomer.wardName)}
        </Descriptions.Item>
      </Descriptions>
    </WraperInfoStyled>
  )
}

export default CustomerInfo

const WraperInfoStyled = styled.div`
  /* min-height: calc(100vh - 130px); */
  width: 100%;
`
