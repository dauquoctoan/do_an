class Configs {
  public static _sessionId: string = 'session_id'

  public static _baseUrl: string = process.env.REACT_APP_API_URL as string

  public static _limit: number = 12
  public static _offsetTopAffix: number = 42

  public static _pathUploadImage: string = `${this._baseUrl}/media/uploadMedia/1`
  public static _pathUploadVideo: string = `${this._baseUrl}/media/uploadMedia/2`

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
    pass: /^[a-zA-Z0-9!@#$%^&*]*$/,
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
    nameUnicode50:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9-]{0,50}$/,
    nameUnicode200:
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9-\s\S]{0,200}$/,
    price: /^[0-9]+$/,
    emailNumber: /^[0-9]*@[a-z]*\.[a-z]{0,3}$/,
  }

  public static getIndexTable(_page: number, _index: number, _limit?: number) {
    let limit: number = _limit ? _limit : this._limit
    return _page * limit - limit + (_index + 1)
  }

  public static replaceWhiteSpace(_value: string): string {
    return _value.replace(/\s/g, '')
  }

  public static parserFormatNumber(_value: string): number | null {
    if (!_value) {
      return null
    }
    _value = _value.replace(/,/g, '')
    return Number(_value)
  }
}

export default Configs
