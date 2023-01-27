import moment from 'moment'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { IPagination } from '../interface'
import { v4 as uuidv4 } from 'uuid'
import { IFile } from '../commons/uploads/interface'

class Configs {
  public static _sessionId: string = 'session_id'
  public static _token: string = 'token'
  public static _userInfo: string = 'user_info'
  public static _default_image: string =
    'data:image/jpeg;base64,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'
  public static _pathUpload: string = process.env
    .REACT_APP_API_URL_UPLOAD as string
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

  public static _baseUrl: string = process.env.REACT_APP_BASE_URL as string

  public static _limit: number = 10
  public static _default_page: number = 1

  public static _offsetTopAffix: number = 42

  public static _pathUploadImage: string = `${this._pathUpload}/image`
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

  public static renderText(_value: string | number | undefined | null): string {
    if (_value) {
      return String(_value)
    }
    if (_value === 0 || _value === '') {
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
    pagination = { page: 1, limit: this._limit, total: 0 },
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
