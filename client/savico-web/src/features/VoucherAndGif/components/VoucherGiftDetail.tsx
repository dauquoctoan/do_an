import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, message, PageHeader, Row, Typography, Upload } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ButtonAction, ButtonAdd } from 'commons/button'
import FilterHeader from 'commons/filter'
import Table from 'commons/table'
import UploadComponent from 'commons/UploadComponent'
import Configs from 'configs'
import {
  BUTTON_TYPE,
  GIFT_CODE_STATUS,
  GIFT_CODE_STATUS_TEXT,
} from 'configs/constance'
import { IPagination } from 'interface'
import { PATH } from 'navigation/Router/config'
import { useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {
  IFormatedListGiftCode,
  IListGiftCodePayload,
  IVoucherAndGiftDetail,
} from '../interface'
import {
  deleteGiftCode,
  getImportPattern,
  getListGiftCode,
  postExcelFile,
  VoucherAndGiftDetail,
} from '../VoucherAndGiftAPI'
import AddEditGiftCode from './AddEditGiftCode'
import VoucherGiftInfo from './VoucherGiftInfo'
const { Text } = Typography

const WapperContent = styled.div<any>`
  background-color: white;
  margin: 10px;
  padding: ${(props) => (props.padding ? '10px' : null)};
`

interface IProps {
  location: any
}

function VoucherGiftDetail(props: IProps) {
  const locations = props.location?.state
  const history = useHistory()
  const [voucherDetail, setvoucherDetail] = useState<IVoucherAndGiftDetail>()
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const [listGiftCode, setlistGiftCode] = useState<IFormatedListGiftCode[]>([])
  const [change, setChange] = useState<number>(1)
  const [dataModal, setdataModal] = useState<
    IFormatedListGiftCode | undefined
  >()
  // const [paging, setPaging] = useState<IPagination>({
  //   limit: Configs._limit,
  //   page: Configs._default_page,
  //   totalItemCount: 0,
  // })
  // const [params, setparams] = useState<IListGiftCodePayload>({
  //   limit: Configs._limit,
  //   page: Configs._default_page,
  //   GiftID: locations.data?.id,
  //   searchKey: undefined,
  //   status: undefined,
  // })
  // const [isShowModal, setisShowModal] = useState<boolean>(false)
  // const columns: ColumnsType<any> = [
  //   {
  //     title: 'STT',
  //     dataIndex: 'index',
  //     render: (value: number, record: any, index: number) => (
  //       <td id={record.id}>{(paging.page - 1) * paging.limit + index + 1}</td>
  //     ),
  //   },
  //   {
  //     title: 'Mã voucher',
  //     dataIndex: 'code',
  //     render: (code) => {
  //       return <Text>{Configs.toString(code)}</Text>
  //     },
  //   },
  //   {
  //     title: 'Trạng thái',
  //     dataIndex: 'status',
  //     render: (status) => {
  //       switch (status) {
  //         case GIFT_CODE_STATUS.CHANGED:
  //           return <Text>Đã đổi</Text>
  //         case GIFT_CODE_STATUS.UNCHANGE:
  //           return <Text>Chưa đổi</Text>
  //         case GIFT_CODE_STATUS.USED:
  //           return <Text>Đã sử dụng</Text>
  //         default:
  //           return '---'
  //       }
  //     },
  //   },
  //   {
  //     title: 'QR',
  //     dataIndex: 'code',
  //     align: 'center',
  //     render: (code) => {
  //       return (
  //         code && (
  //           <QRCode
  //             title="GeeksForGeeks"
  //             value={code}
  //             bgColor={'#FFFFFF'}
  //             fgColor={'#000000'}
  //             size={50}
  //           />
  //         )
  //       )
  //     },
  //   },
  //   {
  //     title: 'Thao tác',
  //     dataIndex: '',
  //     render: (record) => {
  //       if (record.status === GIFT_CODE_STATUS.UNCHANGE) {
  //         return (
  //           <ButtonAction
  //             buttonEdit={{
  //               tooltipTitle: 'Chỉnh sửa',
  //               tooltipPlacement: 'topLeft',
  //             }}
  //             buttonDelete={{
  //               tooltipTitle: 'Xoá',
  //               tooltipPlacement: 'topLeft',
  //             }}
  //             onClick={(title: string) => {
  //               switch (title) {
  //                 case BUTTON_TYPE.EDIT:
  //                   return handleEdit(record)
  //                 case BUTTON_TYPE.DELETE:
  //                   return handleDelete(record)
  //               }
  //             }}
  //           />
  //         )
  //       } else return
  //     },
  //   },
  // ]

  // const handleEdit = (record: IFormatedListGiftCode) => {
  //   setdataModal(record)
  //   setisShowModal(true)
  // }

  // const handleDelete = async (record: IFormatedListGiftCode) => {
  //   try {
  //     const res = await deleteGiftCode(record.id)
  //     if (res.message == 'Thành công') {
  //       getDataCode()
  //       message.success('Xoá mã thành công')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // // Download excel file
  // const onImportPattern = async () => {
  //   try {
  //     const res = await getImportPattern()
  //     if (res.status) {
  //       setIsExporting(true)
  //       window.open(res?.data)
  //     } else {
  //       message.error('Đã có lỗi xảy ra, xin vui lòng thử lại!')
  //     }
  //   } catch (error) {
  //     console.log('Error: ', error)
  //   } finally {
  //     setIsExporting(false)
  //   }
  // }

  // const getDataCode = async () => {
  //   try {
  //     const res = await getListGiftCode(params)
  //     if (res.data.data) {
  //       const dataGiftCode = res.data.data?.map((item, index) => ({
  //         ...item,
  //         key: index,
  //         index: index + 1,
  //       }))
  //       if (res?.data?.page && res?.data?.totalItemCount) {
  //         setPaging({
  //           ...paging,
  //           page: res?.data?.page,
  //           totalItemCount: res?.data?.totalItemCount,
  //         })
  //       }
  //       setlistGiftCode(dataGiftCode)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const getData = async () => {
  //   try {
  //     const res = await VoucherAndGiftDetail(locations.data?.id)
  //     if (res.data) {
  //       setvoucherDetail(res.data)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  // useEffect(() => {
  //   getDataCode()
  // }, [params])

  return (
    <>
      {/* <WapperContent>
        <PageHeader
          title={
            locations?.data?.type == 1
              ? 'Chi tiết quà tặng'
              : 'Chi tiết voucher'
          }
          onBack={() => {
            history.push({
              pathname: PATH.VOUCHER,
              state: {
                data: props.location,
              },
            })
          }}
        />
      </WapperContent>
      <WapperContent padding>
        <VoucherGiftInfo data={voucherDetail} listGiftCode={listGiftCode} />
      </WapperContent>
      {change && (
        <WapperContent padding>
          <Row style={{ alignItems: 'center', width: '100%' }}>
            <Col span={18}>
              <FilterHeader
                search={{ placeholder: 'Mã voucher' }}
                select={[
                  {
                    placeholder: 'Trạng thái',
                    data: GIFT_CODE_STATUS_TEXT,
                    key: 'status',
                  },
                ]}
                button={{
                  title: 'Thêm mã voucher',
                  type: 'add',
                  onClick: () => {
                    setdataModal(undefined)
                    setisShowModal(true)
                  },
                  width: 170,
                }}
                onChangeFilter={(value: any) => {
                  setparams({
                    ...params,
                    page: 1,
                    searchKey: value.searchKey,
                    status: value.status,
                  })
                }}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <Row
                style={{
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'end',
                }}
              >
                <UploadComponent
                  isUploadServerWhenUploading
                  accept=".xlsx, .xls"
                  uploadType="single"
                  maxLength={1}
                  title={'Import'}
                  getDataCode={getDataCode}
                  giftID={locations.data?.id}
                  onSuccessUpload={(data: any) => {}}
                  setChange={setChange}
                />
                <ButtonAdd
                  icon={<DownloadOutlined />}
                  text={'Mẫu Import'}
                  onClick={onImportPattern}
                />
              </Row>
            </Col>
          </Row>
          <Table
            border={true}
            columns={columns}
            data={listGiftCode}
            onChangePram={(page: number) => {
              setPaging({ ...paging, page })
              setparams({ ...params, page })
            }}
            pagination={paging}
          />
        </WapperContent>
      )}
      <AddEditGiftCode
        getData={() => getDataCode()}
        giftId={locations?.data.id}
        data={dataModal}
        showModal={isShowModal}
        cancel={() => setisShowModal(false)}
      /> */}
    </>
  )
}

export default VoucherGiftDetail
