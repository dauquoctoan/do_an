import { Segmented, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentScreen from '../../../commons/contentScreen'
import PageHeader from '../../../commons/pageHeader'
import Configs from '../../../configs'
import style from '../../../configs/style'
import { COLOR } from '../../../configs/theme'
import { ContainScreenStyled, ModalStyled } from '../../../global-styled'
import R from '../../../utils/R'
import { getCustomerDetail } from '../api'
import CustomerInfo from '../components/CustomerInfo'
import HistoryExchangePoints from '../components/HistoryExchangePoints'
import HistoryOfPoints from '../components/HistoryOfPoints'
import HistoryOfPointsDetail from '../components/HistoryOfPointsDetail'
import { ICustomerDetail } from '../interface'

interface IProps {
  location: any
}

const CustomerDetail = (props:IProps) => {
  const [id, setid] = useState<number>(props.location.state.id)
  const [historyOfPointsDetail, setHistoryOfPointsDetail] = useState<any>([])
  const [detailCustomer, setDetailCustomer] = useState<ICustomerDetail>({
    districtName: '',
    dob: '',
    id: 0,
    identityCard: '',
    job: '',
    name: '',
    phone: '',
    point: 0,
    provinceName: '',
    wardName: '',
  })

  useEffect(() => {
    getData()
  }, [id])

  const getData = async () => {
    try {
      const res = await getCustomerDetail({
        id: id,
      })
      if (res) {
        setDetailCustomer(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContainScreenStyled>
      <PageHeader
        title={R.strings().detail_customer__page_header__customer_detail}
        onBack={() => {
          Configs.onBack()
        }}
      />
      <ContentScreen loading={false}>
        <CustomerInfoStyled>
          <div className="header">
            {R.strings().detail_customer__title__customer_info}
          </div>
          <CustomerInfo detailCustomer={detailCustomer} />
        </CustomerInfoStyled>
        <ContainerTabsStyled>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Lịch sử tích điểm" key="1">
              <HistoryOfPoints detailCustomer={detailCustomer} customerID={props.location.state.id}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử đổi điểm" key="2">
              <HistoryExchangePoints detailCustomer={detailCustomer} customerID={props.location.state.id} />
            </Tabs.TabPane>
          </Tabs>
        </ContainerTabsStyled>
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default CustomerDetail

const CustomerInfoStyled = styled.div`
  .header {
    padding: 5px 25px;
    background-color: ${COLOR.primaryColor};
    font-size: ${style.font.middle.size};
    font-weight: ${style.font.middle.weight};
    border-radius: 10px 10px 0px 0px;
    color: white;
  }
`
const ContainerTabsStyled = styled.div`
  margin-top: 10px;
  border: ${style.border};
  padding: 10px;
`
