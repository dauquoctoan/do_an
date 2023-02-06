import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Input,
  InputNumber,
  message,
  Row,
  Table,
  Tabs,
} from 'antd'
import ContentScreen from 'commons/contentScreen'
import PageHeader from 'commons/pageHeader'
import { IPaging } from 'interface'
import React from 'react'
import styled from 'styled-components'
import UpdateModal from '../components/UpdateModal'
import {
  getContact,
  getEvent,
  getSurveyLink,
  updateContact,
  updateEvent,
  updateSurveyLink,
} from '../service'

export interface IContactInfo {
  id: number
  method: string
  content: string
}

const SettingPage = () => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => (
        <td id={record.id}>
          {(pagination.current - 1) * pagination.pageSize + index + 1}
        </td>
      ),
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
    },
    {
      title: 'Thao tác',
      width: 100,
      dataIndex: 'action',
      render: (value: any, record: any, index: number) => {
        return (
          <>
            <a
              onClick={() => {
                setIsModalOpen(true)
                getContactInfo()
                setCurrentIndex(index)
              }}
            >
              <EditOutlined />
            </a>
          </>
        )
      },
    },
  ]
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1)
  const [googleFormLink, setGoogleFormLink] = React.useState<string>('')
  const [contactInfo, setContactInfo] = React.useState<IContactInfo[]>([])
  const [hotline, setHotline] = React.useState<string>('')
  const [websiteLink, setWebsiteLink] = React.useState<string>('')
  const [linkFacebook, setLinkFacebook] = React.useState<string>('')
  const [isLinkError, setIsLinkError] = React.useState<boolean>(false)
  const [addedPoints, setAddedPoints] = React.useState<number | null>()
  const [isPointsError, setIsPointsError] = React.useState<boolean>(false)
  const [totalBill, setTotalBill] = React.useState<number | null>()
  const [isBillError, setIsBillError] = React.useState<boolean>(false)
  const [pagination, setPagination] = React.useState<IPaging>({
    current: 1,
    pageSize: 12,
    total: 0,
  })

  const onChangeTab = () => {
    getLink()
    getContactInfo()
    getEventInfo()
    setIsLinkError(false)
    setIsBillError(false)
    setIsPointsError(false)
  }

  const getLink = async () => {
    try {
      setIsLoading(true)
      const res = await getSurveyLink()
      if (res.status) {
        setGoogleFormLink(res?.data?.linkSurvery)
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLink = async () => {
    try {
      if (isLinkError) {
        message.error('Vui lòng nhập đầy đủ các trường bắt buộc!')
      } else {
        setIsLoading(true)
        const payload = {
          linkSurvery: googleFormLink,
        }
        const res = await updateSurveyLink(payload)
        if (res?.status) {
          message.success('Cập nhật link khảo sát thành công!')
          getLink()
        } else {
          message.error('Cập nhật link khảo sát thất bại!')
        }
      }
    } catch (error: any) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getContactInfo = async () => {
    try {
      setIsLoading(true)
      const res = await getContact()
      if (res.status) {
        const data = [
          {
            id: 1,
            method: 'Hotline',
            content: res?.data?.linkHotline,
          },
          {
            id: 2,
            method: 'Facebook',
            content: res?.data?.linkHotFacebook,
          },
          {
            id: 3,
            method: 'Website',
            content: res?.data?.linkWebsite,
          },
        ]
        setHotline(res?.data?.linkHotline)
        setWebsiteLink(res?.data?.linkWebsite)
        setLinkFacebook(res?.data?.linkHotFacebook)
        setContactInfo(data)
      }
    } catch (error: any) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateContactInfo = async () => {
    try {
      setIsLoading(true)
      const payload = {
        linkHotLine: hotline,
        linkWebsite: websiteLink,
        linkFacebook: linkFacebook,
      }
      const res = await updateContact(payload)
      if (res.status) {
        message.success('Cập nhật thông tin liên hệ thành công!')
        getContactInfo()
        setIsModalOpen(false)
      } else {
        message.error('Cập nhật thông tin liên hệ thất bại!')
      }
    } catch (error: any) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEventInfo = async () => {
    try {
      setIsLoading(true)
      const res = await getEvent()
      if (res.status) {
        setAddedPoints(res?.data?.pointAdd)
        setTotalBill(res?.data?.orderValue)
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateEventInfo = async () => {
    try {
      if (isPointsError || isBillError) {
        message.error('Vui lòng nhập đầy đủ các trường bắt buộc!')
      } else {
        setIsLoading(true)
        const payload = {
          pointAdd: addedPoints,
          orderValue: totalBill,
        }
        const res = await updateEvent(payload)
        if (res.status) {
          message.success('Cập nhật thông tin chiến dịch thành công!')
          getEventInfo()
        } else {
          message.error('Cập nhật thông tin chiến dịch thất bại!')
        }
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getLink()
    getContactInfo()
    getEventInfo()
  }, [])

  return (
    <>
      <PageHeader title="Cấu hình" />
      <ContentScreen loading={isLoading}>
        <Tabs defaultActiveKey="1" onChange={onChangeTab}>
          <Tabs.TabPane tab="Thông tin liên hệ của khách hàng" key="2">
            <br />
            <Table
              id="table-exchange-gift-list"
              dataSource={contactInfo}
              columns={columns}
              scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
              bordered
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab="Thông tin chiến dịch"
            key="3"
            style={{ paddingBottom: 30 }}
          >
            <Row justify="end">
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={updateEventInfo}
              >
                Lưu
              </Button>
            </Row>
            <br />
            <Row gutter={32}>
              <Col span={12}>
                <p>
                  Số điểm cộng
                  <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                </p>
                <InputNumber
                  placeholder="Nhập số điểm cộng"
                  min={0}
                  addonAfter={'điểm'}
                  value={addedPoints}
                  status={isPointsError ? 'error' : undefined}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  onChange={(value: number | null) => {
                    if (value) {
                      setIsPointsError(false)
                    } else setIsPointsError(true)
                    setAddedPoints(value)
                  }}
                />
              </Col>
              <Col span={12}>
                <p>
                  Giá trị hoá đơn
                  <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                </p>
                <InputNumber
                  min={0}
                  placeholder="Nhập giá trị hoá đơn"
                  addonAfter={'USD'}
                  value={totalBill}
                  status={isBillError ? 'error' : undefined}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  onChange={(value: number | null) => {
                    if (value) {
                      setIsBillError(false)
                    } else setIsBillError(true)
                    setTotalBill(value)
                  }}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
        {isModalOpen && (
          <UpdateModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            currentIndex={currentIndex}
            updateContactInfo={updateContactInfo}
            hotline={hotline}
            setHotline={setHotline}
            linkFacebook={linkFacebook}
            setLinkFacebook={setLinkFacebook}
            websiteLink={websiteLink}
            setWebsiteLink={setWebsiteLink}
            contactInfo={contactInfo}
          />
        )}
      </ContentScreen>
    </>
  )
}

const CustomCol = styled(Col)`
  margin-right: 30px;
`

export default SettingPage
