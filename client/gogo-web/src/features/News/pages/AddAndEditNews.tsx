import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd'
import Editor, { EditorContentChanged } from 'commons/quillEditor'
import { getListVoucherAndGift } from 'features/event/APIEvent'
import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentScreen from '../../../commons/contentScreen'
import message from '../../../commons/message'
import PageHeader from '../../../commons/pageHeader'
import UploadComponent from '../../../commons/uploads'
import Configs from '../../../configs'
import {
  NEWS_TYPE,
  POST_NEW_STATUS,
  POST_NEW_STATUS_DEFINE,
} from '../../../configs/constance'
import style from '../../../configs/style'
import { ContainScreenStyled, FormStyled } from '../../../global-styled'
import { PATH } from '../../../navigation/Router/config'
import history from '../../../utils/history'
import R from '../../../utils/R'
import { createNews, getNewsDetail, getStalls, updateNews } from '../api'
import { IDetailNews, IForm, IStalls } from '../interface'

const AddAndEditNews = () => {
  const userId: any = Configs.getUserInfo()
  const id = Configs.getSearchParams().get('id')
  const [form] = Form.useForm()
  const typeNew = Form.useWatch('type', form)
  const [startDate, setStartDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()

  const [loading, setLoading] = useState<boolean>(false)
  const [stalls, setStalls] = useState<IStalls[]>([])
  const [isDraftChosen, setIsDraftChosen] = useState<boolean>(true)
  const [isAllSpace, setIsAllSpace] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [isHighlightNews, setIsHighlightNews] = useState<boolean>(false)
  const [vouchers, setVouchers] = useState<any[]>([])
  const [detailNews, setDetailNews] = useState<IDetailNews>({
    content: '',
    listRelatedStall: [0],
    title: '',
    isBanner: 0,
    type: 0,
    typePost: 0,
    urlImage: '',
    status: 0,
    IsPopup: 0,
    date: [moment, moment],
    ListGiftNews: [],
  })

  const getDetailNews = async () => {
    setLoading(true)
    try {
      const res = await getNewsDetail({ ID: id })

      if (res?.data) {
        const data: IDetailNews = {
          content: res?.data?.content,
          listRelatedStall: res?.data?.listRelatedStall.map(
            (item: any) => item.id
          ),
          ListGiftNews: res?.data?.listGiftNews?.map((item: any) => item.id),
          title: res?.data?.title,
          IsNotify: res?.data?.IsNotify ? 1 : 0,
          isBanner: res?.data?.isBanner,
          type: res?.data?.type,
          typePost: res?.data?.typePost,
          index: res?.data?.index,
          urlImage: Configs.getDefaultFileList(res?.data?.urlImage),
          status: res?.data?.status,
          date: [
            res?.data?.startDate &&
              moment(res?.data?.startDate?.slice(0, 10).split('-').join('/')),
            res?.data?.endDate &&
              moment(res?.data?.endDate?.slice(0, 10).split('-').join('/')),
          ],
        }
        setStartDate(
          moment(res?.data?.startDate?.slice(0, 10).split('-').join('/'))
        )
        setEndDate(
          moment(res?.data?.endDate?.slice(0, 10).split('-').join('/'))
        )
        if (res?.data?.typePost === 2) {
          setIsDraftChosen(false)
        } else setIsDraftChosen(true)
        setIsHighlightNews(res?.data?.isPopup === 1 ? true : false)
        setDescription(res?.data?.content)
        setDetailNews(res?.data)
        form.setFieldsValue(data)
        console.log('data: ', res?.data?.urlImage)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getListStalls = async () => {
    try {
      const res: any = await getStalls({ page: 1, limit: 1000000 })
      if (res) {
        const activeStall = res?.data?.data?.filter(
          (item: any) => item.status === 1
        )
        setStalls(activeStall)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html)
  }

  const getListVouchers = async () => {
    const res = await getListVoucherAndGift({})
    if (res.status) {
      const listVoucher = res?.data?.data?.filter(
        (item: any) => item.type === 2
      )
      setVouchers(listVoucher)
    }
  }

  const handleFinish = async (form: any) => {
    if (isAllSpace) {
      message({
        type: 'error',
        content: 'Vui lòng nhập nội dung bài viết',
      })
    } else {
      const data: IForm = {
        userID: userId.id,
        // content: form.content,
        content: description,
        listRelatedStall: form?.listRelatedStall ? form?.listRelatedStall : [],
        status: form?.status ? 1 : 0,
        IsNotify: form?.IsNotify ? 1 : 0,
        isBanner: form?.isBanner ? 1 : 0,
        title: form?.title,
        type: form?.type,
        typePost: Number(form?.typePost),
        urlImage: Configs.getPathFileListInForm(form?.urlImage),
        startDate: startDate,
        endDate: endDate,
        IsPopup: isHighlightNews ? 1 : 0,
        ListGiftNews: form?.ListGiftNews ? form?.ListGiftNews : [],
        index: form?.index,
      }
      try {
        const res = id
          ? await updateNews({
              ...data,
              id: Number(id),
            })
          : await createNews(data)
        if (res) {
          message({
            content: id
              ? 'Cập nhật tin tức thành công'
              : 'Thêm mới tin tức thành công',
            type: 'success',
          })
          history.push(PATH.NEWS)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const layoutCol = {
    lg: { span: 10 },
    sm: { span: 24 },
    xs: { span: 24 },
  }

  useEffect(() => {
    getListStalls()
    getListVouchers()
    if (id) {
      getDetailNews()
    }
  }, [id])

  return (
    <ContainScreenStyled>
      <PageHeader
        onBack={() => {
          window.history.back()
        }}
        title={id ? 'Chỉnh sửa tin tức' : 'Thêm mới tin tức'}
      />
      <ContentScreen loading={loading}>
        <FormLayoutStyled>
          <FormStyled onFinish={handleFinish} form={form}>
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label={R.strings().news__add_edit__label__name}
                  name={'title'}
                  rules={[
                    {
                      whitespace: true,
                      message: 'Tiêu đề đang chỉ chứa khoảng trắng!',
                    },
                    {
                      required: true,
                      message: R.strings().news__add_edit__placeholder__name,
                    },
                    {
                      min: 1,
                      max: 65,
                      message: 'Tiêu đề không thể quá 65 ký tự!',
                    },
                    // {
                    //   pattern: Configs._reg.nameUnicode65,
                    //   message: 'Tiêu đề không đúng định dạng!',
                    // },
                  ]}
                >
                  <Input
                    placeholder={R.strings().news__add_edit__warning__name}
                  />
                </Form.Item>
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label={R.strings().news__add_edit__label__post_status}
                  name={'typePost'}
                  rules={[
                    {
                      required: true,
                      message: R.strings().news__add_edit__warning__post_status,
                    },
                  ]}
                >
                  <Select
                    disabled={
                      detailNews.typePost === POST_NEW_STATUS_DEFINE.POST
                        ? true
                        : false
                    }
                    placeholder={
                      R.strings().news__add_edit__placeholder__post_status
                    }
                    onChange={(value: number) => {
                      if (value === 1) {
                        setIsDraftChosen(true)
                      } else setIsDraftChosen(false)
                    }}
                  >
                    {Object.keys(POST_NEW_STATUS).map((key: string) => {
                      return (
                        <Select.Option value={Number(key)}>
                          {POST_NEW_STATUS[key]}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label={'Loại tin tức'}
                  name={'type'}
                  rules={[
                    {
                      required: true,
                      message: R.strings().news__add_edit__warning__type_news,
                    },
                  ]}
                >
                  <Select
                    placeholder={
                      R.strings().news__add_edit__placeholder__type_news
                    }
                    onChange={(value: number) => console.log('Value: ', value)}
                  >
                    {Object.keys(NEWS_TYPE).map((key: string) => {
                      return (
                        <Select.Option value={Number(key)}>
                          {NEWS_TYPE[key]}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  name={'listRelatedStall'}
                  label={R.strings().news__add_edit__label__related_stalls}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder={
                      R.strings().news__add_edit__placeholder__related_stalls
                    }
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {stalls.map((item: IStalls) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {!isDraftChosen && (
              <Row justify="space-between">
                <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                  <Form.Item
                    name="IsNotify"
                    valuePropName="checked"
                    style={{
                      fontWeight: 600,
                      marginBottom: '20px',
                    }}
                  >
                    <Checkbox>
                      {R.strings().news__add_edit__label__send_notification}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                  <Form.Item
                    name="isBanner"
                    valuePropName="checked"
                    style={{
                      fontWeight: 600,
                      marginBottom: '20px',
                    }}
                  >
                    <Checkbox>Đặt làm Banner</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Row justify="space-between">
              {typeNew !== 5 && (
                <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                  <Form.Item
                    name="date"
                    label="Thời gian"
                    labelCol={style.layoutModal.labelCol}
                  >
                    <DatePicker.RangePicker
                      placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                      style={{ width: '100%' }}
                      format={'DD/MM/YYYY'}
                      onChange={(dates: any, dateString: any) => {
                        setStartDate(
                          dateString[0].split('/').reverse().join('-')
                        )
                        setEndDate(dateString[1].split('/').reverse().join('-'))
                      }}
                    />
                  </Form.Item>
                </Col>
              )}

              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  name="ListGiftNews"
                  label="Danh sách voucher"
                  labelCol={style.layoutModal.labelCol}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder={'Chọn voucher'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {vouchers.map((item: any) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  name="index"
                  label="Thứ tự hiển thị"
                  labelCol={style.layoutModal.labelCol}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Vui lòng nhập thứ tự hiển thị!',
                  //   },
                  // ]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Nhập thứ tự hiển thị"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault()
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              {typeNew !== 5 && (
                <Col span={10}>
                  <Checkbox
                    checked={isHighlightNews}
                    onChange={(e: any) => setIsHighlightNews(e.target.checked)}
                  >
                    Tin tức nổi bật
                  </Checkbox>
                </Col>
              )}
            </Row>
            <br />
            <Row>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <UploadComponent
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label={R.strings().news__add_edit__label__image}
                  name={'urlImage'}
                  limit={1}
                  form={form}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn ảnh tin tức',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Editor value={description} onChange={onEditorContentChanged} />
              </Col>
            </Row>
            <Row justify="end" style={{ marginTop: 70 }}>
              <Col>
                <Form.Item>
                  <Button
                    style={{ marginRight: '20px' }}
                    danger
                    onClick={() => {
                      window.history.back()
                    }}
                    // children={R.strings().btn__cancel}
                    children={'Huỷ'}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    children={R.strings().btn__save}
                  />
                </Form.Item>
              </Col>
            </Row>
          </FormStyled>
        </FormLayoutStyled>
      </ContentScreen>
    </ContainScreenStyled>
  )
}

export default AddAndEditNews

const FormLayoutStyled = styled.div`
  width: 100%;
  padding: 20px 15px;
  border: ${style.border};
`
