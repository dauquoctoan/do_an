import { Col, Row, Steps } from 'antd'
import ContentScreen from 'commons/contentScreen'
import React from 'react'
import styled from 'styled-components'
import { ContainScreenStyled } from '../../global-styled'
import { getOverview } from './service'
import PageHeader from '../../commons/pageHeader'

const Home = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [customer, setCustomer] = React.useState<number>(0)
  const [stall, setStall] = React.useState<number>(0)
  const [event, setEvent] = React.useState<number>(0)

  const listItems = [
    {
      id: 1,
      value: customer,
      icon: 'https://cdn-icons-png.flaticon.com/128/3239/3239045.png',
      title: 'Khách hàng',
      background: '#f2cecb',
    },
    {
      id: 2,
      value: stall,
      icon: 'https://cdn-icons-png.flaticon.com/128/3275/3275219.png',
      title: 'Gian hàng',
      background: '#d7f2cb',
    },
    {
      id: 1,
      value: event,
      icon: 'https://cdn-icons-png.flaticon.com/128/2558/2558957.png',
      title: 'Sự kiện đang diễn ra',
      background: '#cdc9f2',
    },
  ]

  const renderItem = (item: any) => {
    return (
      <ItemBlock style={{ background: item.background }}>
        <Col span={8}>
          <Row justify="center">
            <img
              className="img-custom"
              src={item.icon}
              alt={`Icon ${item.title}`}
            />
          </Row>
        </Col>
        <Col span={16}>
          <Row>
            <p style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</p>
          </Row>
          <Row>{item.value}</Row>
        </Col>
      </ItemBlock>
    )
  }

  const getStatistic = async () => {
    try {
      setIsLoading(true)
      const res = await getOverview({})
      if (res.status) {
        setCustomer(res?.data?.customer)
        setStall(res?.data?.stall)
        setEvent(res?.data?.eventActive)
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getStatistic()
  }, [])

  return (
    <ContainScreenStyled>
      <PageHeader title="Tổng quan" fixed={true} />
      <ContentScreen loading={isLoading}>
        <CustomRow gutter={16}>
          {listItems.map(
            (
              item: any,

              index: number
            ) => (
              <Col key={index} span={8}>
                {renderItem(item)}
              </Col>
            )
          )}
        </CustomRow>
      </ContentScreen>
    </ContainScreenStyled>
  )
}

const CustomRow = styled(Row)`
  width: 100%;
  /* height: 100px; */
  padding: 50px 10px;
  background-color: white;
  margin-left: 0px;
  margin-right: 0px;
`

const ItemBlock = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  height: 100px;

  .img-custom {
    width: 50px;
    height: 50px;
    margin-top: 16px;
  }
`

export default Home
