import { Form, Input, Modal, message } from 'antd'
import ModalButtons from 'commons/modalButton/ModalButtons'
import { errorWhiteSpace } from 'utils/functions'
import R from 'utils/R'
import { IFormatedListGiftCode } from '../interface'
import { createGiftCode, updateGiftCode } from '../VoucherAndGiftAPI'

interface IProps {
  getData: any
  giftId: any
  showModal: boolean
  data?: IFormatedListGiftCode
  cancel: () => void
}

function AddEditGiftCode(props: IProps) {
  const handleFinish = async (value: any) => {
    try {
      if (props.data) {
        const res = await updateGiftCode({
          code: value.code,
          id: props.data?.id,
        })
        if (res.message == 'Thành công') {
          props.getData()
          message.success('Chỉnh sửa mã thành công')
        }
      } else {
        const res = await createGiftCode({
          code: value.code,
          giftID: props.giftId,
        })
        if (res.message == 'Thành công') {
          props.getData()
          message.success('Thêm mới mã thành công')
        }
      }
      props.cancel()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Modal
        title={props.data ? 'Sửa mã voucher' : 'Thêm mã voucher'}
        visible={props.showModal}
        destroyOnClose
        maskClosable={false}
        onCancel={() => props.cancel()}
        footer={null}
      >
        <Form
          onFinish={(value: any) => {
            handleFinish(value)
          }}
          initialValues={props.data && { code: props.data?.code }}
        >
          <Form.Item
            name={'code'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã voucher',
              },
              {
                min: 3,
                message: 'Vui lòng nhập ít nhất 3 ký tự',
              },
              {
                message: 'Mã voucher không hợp lệ',
                validator: (_, value) => {
                  const reg = /^[a-zA-Z0-9_.-]*$/
                  if (reg.test(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject()
                },
              },
            ]}
          >
            <Input placeholder="Mã voucher" />
          </Form.Item>
          <ModalButtons onCancel={() => props.cancel()} text={'Lưu'} />
        </Form>
      </Modal>
    </>
  )
}

export default AddEditGiftCode
