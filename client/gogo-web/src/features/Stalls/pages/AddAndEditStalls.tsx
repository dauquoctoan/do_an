import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import styled from 'styled-components'
import ContentScreen from '../../../commons/contentScreen'
import PageHeader from '../../../commons/pageHeader'
import Configs from '../../../configs'
import { ContainScreenStyled, FormStyled } from '../../../global-styled'
import message from '../../../commons/message'
import { useEffect, useRef, useState } from 'react'
import SunEditorComponent from '../../../commons/editor'
import R from '../../../utils/R'
import history from '../../../utils/history'
import { PATH } from '../../../navigation/Router/config'
import { FLOOR, KEY_TYPE_NEW } from '../../../configs/constance'
import { ICategory, IFormAddEditStalls } from '../interface'
import { INews } from '../../Lesson/interface'
import { getNews } from '../../Lesson/api'
import style from '../../../configs/style'
import UploadComponent from '../../../commons/uploads'
import {
  createTypeStalls,
  detailTypeStalls,
  getDataTypeStalls,
  updateStall,
} from '../api'
import EditorComponent from 'commons/customEditor'
import Editor, { EditorContentChanged } from 'commons/quillEditor'

const AddAndEditStalls = () => {
  const id = Configs.getSearchParams().get('id')
  const userInfo = Configs.getUserInfo()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [isAllSpace, setIsAllSpace] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const defaultImage: any = useRef(null)
  const [category, setCategory] = useState<ICategory[]>([])
  const [news, setNews] = useState<INews[]>([])

  useEffect(() => {
    if (id) {
      getDetailStalls()
    }
    getTypeStalls()
    getListNew()
  }, [])

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html)
  }

  const getDetailStalls = async () => {
    setLoading(true)
    try {
      const res = await detailTypeStalls({ ID: id })
      if (res) {
        const data: IFormAddEditStalls = {
          // listPromotionID: res.data.listPromotion,
          listPromotion: res?.data?.listPromotion?.map((item: any) => item.id),
          code: res?.data?.code,
          name: res?.data?.name,
          floor: res?.data?.floor,
          phone: res?.data?.phone,
          linkWeb: res?.data?.linkWeb,
          linkFB: res?.data?.linkFB,
          logo: Configs.getDefaultFileList(res?.data?.logo),
          description: res?.data?.description,
          categoryID: res?.data?.categoryID,
          index: res?.data?.index || 10,
        }
        setDescription(res?.data?.description)
        form.setFieldsValue(data)
        console.log(
          '🚀 ~ file: AddAndEditStalls.tsx ~ line 67 ~ getDetailStalls ~ data',
          data
        )
      }
    } catch (error) {
      console.log('Lỗi truy vẫn chi tiết gian hàng!', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeStalls = async () => {
    try {
      setLoading(true)
      const res: any = await getDataTypeStalls()
      if (res) {
        setCategory(res?.data?.data)
      }
    } catch (error) {
      console.log('error: Lỗi truy vẫn loại gian hàng', error)
    } finally {
      setLoading(false)
    }
  }

  const getListNew = async () => {
    try {
      setLoading(true)
      const res: any = await getNews({
        page: 1,
        limit: 1000,
        // type: KEY_TYPE_NEW.promotion,
      })
      if (res) {
        setNews(res?.data?.data)
        console.log('NEWS: ', res?.data)
      }
    } catch (error) {
      console.log('error: Lỗi truy vẫn loại gian hàng', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = async (value: any) => {
    const data: IFormAddEditStalls = {
      listPromotionID: value.listPromotion,
      description: description,
      floor: value.floor,
      linkFB: value.linkFB,
      linkWeb: value.linkWeb,
      logo: Configs.getPathFileListInForm(value.logo),
      name: value.name,
      phone: value.phone,
      categoryID: value.categoryID,
      index: value.index,
    }
    if (isAllSpace || description === '') {
      // message({
      //   type: 'error',
      //   content: 'Vui lòng nhập mô tả',
      // })
    } else {
      try {
        const res = id
          ? await updateStall({ ...data, id: Number(id) })
          : await createTypeStalls(data)
        if (res) {
          // message({
          //   content: id
          //     ? 'Sửa gian hàng thành công'
          //     : 'Thêm mới gian hàng thành công',
          //   type: 'success',
          // })
          history.push(PATH.STALLS_LIST)
        }
      } catch (error) {}
    }
  }

  const layoutCol = {
    lg: { span: 10 },
    sm: { span: 24 },
    xs: { span: 24 },
  }

  const layoutModal = {
    wrapperCol: { span: 14 },
    labelCol: { span: 10 },
  }

  return (
    <ContainScreenStyled>
      <PageHeader
        onBack={() => {
          window.history.back()
        }}
        title={
          id
            ? R.strings().stalls__page_header__edit
            : R.strings().stalls__page_header__add
        }
        fixed={true}
      />
      <ContentScreen loading={loading}>
        <FormLayoutStyled>
          <FormStyled onFinish={handleFinish} form={form}>
            <Row justify="space-between">
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                {id && (
                  <Form.Item
                    wrapperCol={layoutModal.wrapperCol}
                    labelCol={layoutModal.labelCol}
                    label={R.strings().stalls__add_edit__title__code}
                    name={'code'}
                  >
                    <Input disabled={true} />
                  </Form.Item>
                )}
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__name}
                  name={'name'}
                  rules={[
                    {
                      required: true,
                      message: R.strings().stalls__add_edit__warning__name,
                    },
                    {
                      message: 'Tên gian hàng có độ dài từ 8 đến 65 ký tự!',
                      min: 1,
                      max: 65,
                    },
                    // {
                    //   message: 'Tên gian hàng không đúng định dạng!',
                    //   validator(_, value) {
                    //     if (!(value.indexOf(' ') >= 0)) {
                    //       return Promise.resolve()
                    //     }
                    //     return Promise.reject()
                    //   },
                    // },
                  ]}
                >
                  <Input
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__name
                    }
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__industry}
                  name={'categoryID'}
                  rules={[
                    {
                      required: true,
                      message: R.strings().stalls__add_edit__warning__industry,
                    },
                  ]}
                >
                  <Select
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__industry
                    }
                    allowClear={true}
                  >
                    {category?.length > 0 &&
                      category?.map((e: ICategory) => {
                        return (
                          <Select.Option value={e.id}>{e.name}</Select.Option>
                        )
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={'Sự kiện khuyễn mãi'}
                  name={'listPromotion'}
                >
                  <Select
                    mode="multiple"
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__promotion_event
                    }
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    showSearch
                  >
                    {news.length > 0 &&
                      news.map((item: INews) => {
                        return (
                          <Select.Option value={Number(item.id)}>
                            {item.title}
                          </Select.Option>
                        )
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="index"
                  label="Thứ tự hiển thị"
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
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
                <UploadComponent
                  wrapperCol={style.layoutModal.wrapperCol}
                  labelCol={style.layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__image}
                  name={'logo'}
                  limit={1}
                  form={form}
                  rules={[
                    {
                      required: true,
                      message: R.strings().stalls__add_edit__warning__image_reg,
                    },
                  ]}
                />
              </Col>
              <Col lg={layoutCol.lg} sm={layoutCol.sm} xs={layoutCol.xs}>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__position}
                  name={'floor'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn vị trí cửa hàng!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__position
                    }
                  >
                    {Object.keys(FLOOR).map((key: string) => {
                      return (
                        <Select.Option value={Number(key)}>
                          {FLOOR[key]}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                <div style={{ fontWeight: 600, textDecoration: 'underline' }}>
                  {R.strings().stalls__add_edit__title__group_contact}
                </div>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__Facebook}
                  name={'linkFB'}
                  rules={[
                    {
                      message: 'Link Facebook không đúng định dạng!',
                      validator(_, value) {
                        if (!value || !(value.indexOf(' ') >= 0)) {
                          return Promise.resolve()
                        }
                        return Promise.reject()
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__Facebook
                    }
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__website}
                  name={'linkWeb'}
                >
                  <Input
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__website
                    }
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={layoutModal.wrapperCol}
                  labelCol={layoutModal.labelCol}
                  label={R.strings().stalls__add_edit__title__hotline}
                  name={'phone'}
                  rules={[
                    {
                      message: 'Hotline chỉ có thể chứa chữ số!',
                      validator(_, value) {
                        if (/^[0-9]+$/.test(value) || !value) {
                          return Promise.resolve()
                        }
                        return Promise.reject()
                      },
                    },

                    {
                      message: 'Hotline có độ dài từ 8 đến 13 ký tự!',
                      min: 8,
                      max: 13,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      R.strings().stalls__add_edit__placeholder__hotline
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                {/* <EditorComponent
                  defaultValue={id ? description : ''}
                  logData={(value) => {
                    setDescription(value)
                  }}
                  editorStyle={{
                    border: '1px solid #ACB0B0',
                    borderRadius: '5px',
                    overflow: 'hidden scroll',
                    padding: '0 16px',
                  }}
                  height={350}
                  setIsAllSpace={setIsAllSpace}
                /> */}
                <Editor value={description} onChange={onEditorContentChanged} />
              </Col>
            </Row>
            <Row justify="end" style={{ marginTop: 70 }}>
              <Col>
                <Form.Item>
                  <Button
                    style={{ marginRight: '20px' }}
                    danger
                    // type="primary"
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

export default AddAndEditStalls
const FormLayoutStyled = styled.div`
  width: 100%;
  padding: 20px 15px;
  border: ${style.border};
`
