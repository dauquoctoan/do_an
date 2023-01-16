import moment from 'moment'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { IPagination } from '../interface'
import { v4 as uuidv4 } from 'uuid'
import { IFile } from '../commons/uploads/interface'

class Configs {
  public static _sessionId: string = 'session_id'
  public static _userInfo: string = 'user_info'

  public static _themeMenu: string = 'theme_menu'

  public static _postNewStatus = {
    post: {
      key: 1,
      value: 'Đăng bài',
    },
    draft: {
      key: 2,
      value: 'Nháp',
    },
  }

  public static _nameUpload: {
    IMAGE: 'images'
    VIDEO: 'video'
  }

  public static _sizeUpload: {
    IMAGE: 10
    VIDEO: 10
  }
  public static _duration: {
    MIN: 10
    MAX: 600
  }

  public static _api_status = {
    RE_LOGIN: 403,
    NOT_FOUND: 404,
  }

  public static _baseUrl: string = process.env.REACT_APP_API_URL as string

  public static _limit: number = 10
  public static _default_page: number = 1

  public static _offsetTopAffix: number = 42

  public static _pathUploadImage: string = `${this._baseUrl}/Upload/UploadImage`
  public static _pathUploadVideo: string = `${this._baseUrl}/media/uploadMedia/2`

  public static _formatDate: string = 'DD/MM/YYYY'

  public static _media = {
    type: {
      IMAGE: 1,
      VIDEO: 2,
    },
    default: {
      MAX_SIZE: 1, //MB
      MAX_COUNT: 5,
    },

    path: {
      IMAGE: 'https://dev.ndsapi.winds.vn/api/v1/file/upload-single/1',
      FILE: 'https://dev.ndsapi.winds.vn/api/v1/file/upload-single/1',
      VIDEO: 'https://dev.ndsapi.winds.vn/api/v1/file/upload-single/1',
    },

    typeUpload: {
      IMAGE: ():
        | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg'
        | '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' =>
        '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg',
      FILE: ():
        | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg'
        | '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' =>
        '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ALL: ():
        | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg'
        | '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        | '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' =>
        '.png,.jpg,.jpeg,.psd,.gif,.eps,.tiff,.svg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  }

  public static _reg = {
    pass: /^[a-zA-Z0-9!@#$%^&*]{6,15}$/,
    phone: /^((09|03|07|08|05|1)+([0-9]{6,9}))$/,
    number: /^[0-9]+$/,
    name: /^[\S][\s\S]{0,50}$/,
    username:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9]{0,50}$/,
    code: /^[a-zA-Z0-9]*$/,
    nameUnicode:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9-]*$/,
    nameUnicode150:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9-]{0,150}$/,
    nameUnicode65:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9-]{0,50}$/,
    nameUnicode200:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9-\s\S]{0,200}$/,
    price: /^[0-9]+$/,
    emailNumber: /^[-9]*@[a-z]*\.[a-z]{0,3}$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }

  public static replaceWhiteSpace(_value: string): string {
    return _value.replace(/\s/g, '')
  }

  public static toString(_value: string | number | undefined): string {
    if (_value) {
      return String(_value)
    }
    if (_value === 0) {
      return String(0)
    } else {
      return '---'
    }
  }

  public static parserFormatNumber(_value: string): number | null {
    if (!_value) {
      return null
    }
    _value = _value.replace(/,/g, '')
    return Number(_value)
  }

  public static getSearchParams() {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  }

  public static getIndexTable({
    data,
    pagination = { page: 1, limit: this._limit, totalItemCount: 0 },
  }: {
    data: any[]
    pagination?: IPagination
  }) {
    const newData =
      data.length > 0 &&
      data.map((item: any, index: number) => {
        return {
          ...item,
          stt: index + pagination.limit * (pagination.page - 1) + 1,
        }
      })
    return newData
  }

  public static getPathName() {
    return window.location.pathname
  }
  public static onBack() {
    return window.history.back()
  }

  public static formatDate(date: string | null) {
    if (date) {
      return moment(date).format(this._formatDate)
    } else {
      return ''
    }
  }

  public static getUserInfo() {
    const userInfo: any = localStorage.getItem(this._userInfo)
    return JSON.parse(userInfo)
  }

  public static getDefaultFileList(file: string | string[]): IFile[] {
    if (typeof file === 'string') {
      const fileList: IFile[] = [
        {
          uid: uuidv4(),
          lastModifiedDate: String(Date.now()),
          name: `file${uuidv4()}`,
          status: 'done',
          url: file,
          response: { data: [file] },
          lastModified: Date.now(),
        },
      ]
      return fileList
    } else {
      const fileList: IFile[] = file?.map((file: string) => {
        return {
          uid: uuidv4(),
          lastModifiedDate: String(Date.now()),
          name: `file${uuidv4()}`,
          status: 'done',
          url: file,
          response: { data: [file] },
          lastModified: Date.now(),
        }
      })
      return fileList
    }
  }

  public static getPathFileListInForm(
    file: IFile[],
    type: 'single' | 'multiple' = 'single'
  ) {
    if (type === 'single' && file.length > 0) {
      const data = file.map((item: IFile) => {
        return item.response?.data[0]
      })
      return data[0]
    }
    if (type === 'multiple' && file.length > 0) {
      const data = file.map((item: IFile) => {
        return item.response?.data[0]
      })
      return data
    } else {
      return ''
    }
  }
}

export default Configs
