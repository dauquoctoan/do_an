import { Col, message, Row, Select, Space, Table } from 'antd'
import ContentScreen from 'commons/contentScreen'
import PageHeader from 'commons/pageHeader'
import { getListQuestions } from 'features/SurveySheet/service'
import { IQuestion } from 'features/SurveySheet/SurveySheet'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IPagination } from 'interface'
import React from 'react'
import styled from 'styled-components'
import { IFormatData } from '../StallsInfomation/InterfaceStallInfo'
import { AnswerReportBarChart } from './components/OptionCharts'
import { getChartData, getOtherOpinions } from './service'

const SurveyReport = () => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'cusName',
    },
    {
      title: 'Ý kiến khách hàng',
      dataIndex: 'answer',
    },
  ]
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [listQuestions, setListQuestions] = React.useState<IQuestion[]>([])
  const [currentId, setCurrentId] = React.useState<number>()
  const [data, setData] = React.useState<any[]>([])
  const [dataTable, setDataTable] = React.useState<any[]>([])
  const [paging, setPaging] = React.useState<any>({
    limit: 12,
    page: 1,
    totalItemCount: 0,
  })

  const getQuestions = async () => {
    try {
      setIsLoading(true)
      const res = await getListQuestions({})
      if (res.status) {
        const data = res?.data?.map((item: any) => ({
          id: item.id,
          title: item.question,
          status: item?.status,
          isOpenQuestion: item?.type === 1 ? true : false,
          listAnswers: item.listAnswer.map((itemAnswer: any) => ({
            id: itemAnswer.id,
            answer: itemAnswer.answer,
          })),
        }))
        setListQuestions(data.reverse())
        setCurrentId(data.reverse()[0].id)
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await getChartData(currentId)
      if (res?.status) {
        const data = res?.data?.map((item: any) => ({
          name: item?.answer,
          y: item?.count,
        }))
        setData(data)
      } else {
        message.error('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOtherAnswersData = async () => {
    try {
      setIsLoading(true)
      const payload = {
        ID: currentId,
        page: paging.page,
        limit: 1000,
      }
      const res = await getOtherOpinions(payload)
      if (res.status) {
        const data = res?.data?.map((item: any) => ({
          id: item?.id,
          cusName: item?.customerName,
          answer: item?.content?.length === 0 ? '---' : item?.content,
        }))
        setDataTable(data)
      }
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getQuestions()
  }, [])

  React.useEffect(() => {
    getData()
  }, [currentId])
  React.useEffect(() => {
    getOtherAnswersData()
  }, [currentId, paging.page])

  return (
    <>
      <PageHeader title="Phiếu khảo sát khách hàng" />
      <ContentScreen loading={isLoading}>
        <WrapperStyled>
          <br />
          <Row justify="center" gutter={[16, 16]}>
            <Col span={12}>
              <Select
                value={currentId}
                onChange={(value: number) => setCurrentId(value)}
                style={{ width: '100%' }}
              >
                {listQuestions.map((item: IQuestion, index: number) => (
                  <Select.Option key={index} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <br />
          <HighchartsReact
            highcharts={Highcharts}
            options={AnswerReportBarChart(data)}
            updateArgs={[true]}
            containerProps={{ style: { height: '100%', width: '100%' } }}
          />
          <br />
          <br />
          <Row>
            <Table
              style={{ width: '98%', marginLeft: '1%' }}
              dataSource={dataTable}
              scroll={{ y: 600, scrollToFirstRowOnChange: true }}
              columns={columns}
              bordered
              pagination={false}
              // pagination={{
              //   ...paging,
              //   showSizeChanger: false,
              //   onChange: async (page: number) => {
              //     setPaging({ ...paging, page })
              //     const element: any = document.getElementById('table-customer')
              //     element.scrollIntoView({ block: 'start' })
              //   },
              // }}
            />
          </Row>
        </WrapperStyled>
      </ContentScreen>
    </>
  )
}

const WrapperStyled = styled.div`
  padding-top: 10px;
  margin: 0px 5px 10px 5px;
  background-color: white;
`

export default SurveyReport
