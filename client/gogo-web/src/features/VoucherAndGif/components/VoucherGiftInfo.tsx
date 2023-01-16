import { Descriptions, Image, Typography } from 'antd'
import Configs from 'configs'
import { IS_ACTIVE, GIFT_VOUCHER_TYPE } from 'configs/constance'
import React from 'react'
import { formatPrice } from 'utils/ruleForm'
import { convertTimeStampToString } from 'utils/TimerHelper'
import { IFormatedListGiftCode, IVoucherAndGiftDetail } from '../interface'
const { Text } = Typography

interface IProps {
  data?: IVoucherAndGiftDetail
  listGiftCode?: IFormatedListGiftCode[]
}

function VoucherGiftInfo(props: IProps) {
  const voucherDetail = props.data
  const { listGiftCode } = props
  const [leftVouchers, setLeftVouchers] = React.useState<number>()
  const [convertedVouchers, setConvertedVouchers] = React.useState<number>()

  const getVoucherInfo = () => {
    const unusedVouchers = listGiftCode?.filter(
      (item: IFormatedListGiftCode) => item.status === 0
    )

    setLeftVouchers(voucherDetail?.quantity)
    const changedVouchers = listGiftCode?.filter(
      (item: IFormatedListGiftCode) => item.status === 1
    )
    setConvertedVouchers(changedVouchers?.length)
  }

  React.useEffect(() => {
    getVoucherInfo()
  })

  const typeVoucherDesc = (type?: number) => {
    if (type) {
      switch (type) {
        case GIFT_VOUCHER_TYPE.GIFT:
          return <Text>Quà tặng</Text>
        case GIFT_VOUCHER_TYPE.VOUCHER:
          return <Text>Voucher</Text>
        default:
          return '---'
      }
    } else {
      return '---'
    }
  }
  return (
    <>
      <Descriptions>
        <Descriptions.Item label={<b>Tên voucher</b>}>
          {Configs.renderText(voucherDetail?.name)}
        </Descriptions.Item>
        <Descriptions.Item label={<b>Ngày tạo</b>}>
          {Configs.renderText(
            convertTimeStampToString(voucherDetail?.createDate)
          )}
        </Descriptions.Item>
        <Descriptions.Item label={<b>Số điểm đổi</b>}>
          {Configs.renderText(formatPrice(voucherDetail?.point))}
        </Descriptions.Item>
        <Descriptions.Item label={<b>Trạng thái</b>}>
          {voucherDetail?.status == IS_ACTIVE.ACTIVE
            ? 'Đang hoạt động'
            : 'Ngừng hoạt động'}
        </Descriptions.Item>
        {/* <Descriptions.Item label={<b>Loại voucher</b>}>
          {typeVoucherDesc(voucherDetail?.type)}
        </Descriptions.Item> */}
        <Descriptions.Item label={<b>Số lượng đã đổi</b>}>
          {convertedVouchers}
        </Descriptions.Item>
        <Descriptions.Item label={<b>Số lượng còn lại</b>}>
          {leftVouchers}
        </Descriptions.Item>
        <Descriptions.Item label={<b>Ảnh</b>}>
          {voucherDetail?.urlImage.includes('http://') ? (
            <Image width={100} src={voucherDetail?.urlImage} />
          ) : (
            '---'
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default VoucherGiftInfo
