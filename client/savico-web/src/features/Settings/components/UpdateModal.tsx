import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { PHONE_REGEX } from 'configs/constance'
import React from 'react'
import { IContactInfo } from '../page'

interface IUpdateModal {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentIndex: number
  updateContactInfo: () => Promise<void>
  hotline: string
  setHotline: React.Dispatch<React.SetStateAction<string>>
  linkFacebook: string
  setLinkFacebook: React.Dispatch<React.SetStateAction<string>>
  websiteLink: string
  setWebsiteLink: React.Dispatch<React.SetStateAction<string>>
  contactInfo: IContactInfo[]
}

const UpdateModal = (props: IUpdateModal) => {
  const {
    isModalOpen,
    setIsModalOpen,
    currentIndex,
    updateContactInfo,
    hotline,
    setHotline,
    linkFacebook,
    setLinkFacebook,
    websiteLink,
    setWebsiteLink,
    contactInfo,
  } = props

  return (
    <Modal
      title="Chỉnh sửa thông tin liên hệ của khách hàng"
      width={'50%'}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false)
        setHotline(contactInfo[0].content)
        setLinkFacebook(contactInfo[1].content)
        setWebsiteLink(contactInfo[2].content)
      }}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={updateContactInfo}
        autoComplete="off"
      >
        {currentIndex === 0 && (
          <>
            <Form.Item label="Phương thức" name="method">
              <Input disabled defaultValue={'Hotline'} />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              initialValue={hotline}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
                { max: 10, message: 'Vui lòng nhập đúng 10 ký tự!' },
                {
                  message: 'Số điện thoại không đúng định dạng!',
                  validator: (_, value) => {
                    if (
                      PHONE_REGEX.test(value) ||
                      !value ||
                      value.length > 10
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                defaultValue={'096463568952'}
                allowClear
                value={hotline}
                onChange={(e: any) => {
                  setHotline(e.target.value)
                }}
              />
            </Form.Item>
          </>
        )}
        {currentIndex === 1 && (
          <>
            <Form.Item label="Phương thức" name="method">
              <Input disabled defaultValue={'Facebook'} />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              initialValue={linkFacebook}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập link facebook!',
                },
              ]}
            >
              <Input
                placeholder="Nhập link facebook"
                defaultValue={'096463568952'}
                allowClear
                value={linkFacebook}
                onChange={(e: any) => {
                  setLinkFacebook(e.target.value)
                }}
              />
            </Form.Item>
          </>
        )}
        {currentIndex === 2 && (
          <>
            <Form.Item label="Phương thức" name="method">
              <Input disabled defaultValue={'Website'} />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              initialValue={websiteLink}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập link website!',
                },
              ]}
            >
              <Input
                placeholder="Nhập link website"
                defaultValue={'096463568952'}
                allowClear
                value={websiteLink}
                onChange={(e: any) => {
                  setWebsiteLink(e.target.value)
                }}
              />
            </Form.Item>
          </>
        )}
        <br />
        <Row justify="end">
          <Button
            type="default"
            onClick={() => {
              setIsModalOpen(false)
              setHotline(contactInfo[0].content)
              setLinkFacebook(contactInfo[1].content)
              setWebsiteLink(contactInfo[2].content)
            }}
            style={{ marginRight: 20 }}
          >
            Huỷ
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default UpdateModal
