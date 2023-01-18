interface IConst {
  [key: string]: string
}
interface IDefine {
  [key: string]: number
}

export const POST_NEW_STATUS_DEFINE: IDefine = {
  DRAFT: 1,
  POST: 2,
}

export const LEVEL: IConst = {
  1: 'Dễ',
  2: 'Trung bình',
  3: 'Khó',
  4: 'Cực khó',
}

export const TYPE_ACCOUNT: IConst = {
  1: 'Quản trị viên',
  2: 'Nhân viên',
}

export const STATUS: IConst = {
  1: 'Đang hoạt động',
  0: 'Ngừng hoạt động',
}

export const CUSTOMER_ORIGIN: any = {
  1: 'Sử dụng App',
  2: 'PG tạo',
}

export const FLOOR: IConst = {
  1: 'Tầng 1',
  2: 'Tầng 2',
  3: 'Tầng 3',
  4: 'Tầng hầm',
  5: 'Toà B',
}

// export const KEY_NEWS_CATE: {
//   event: number
//   extent: number
//   event: number
// } = {
//   event: 1,
//   extent: 2,
//   event: 4
// }

export const KEY_TYPE_NEW: {
  promotion: number
  event: number
  recruit: number
  utilities: number
} = {
  promotion: 1,
  event: 4,
  recruit: 3,
  utilities: 5,
}

// export const NEWS_CATEGORY: IConst = {
//   [KEY_TYPE_NEW.promotion]: 'Chương trình khuyến mại',
//   [KEY_TYPE_NEW.event]: 'Sự kiện',
//   [KEY_TYPE_NEW.recruit]: 'Tuyển dụng',
// }

export const TYPE_LESSON: IConst = {
  1: 'Chọn một trong 4 đáp án có hình ảnh',
  2: 'Chọn một trong 4 đáp án không có hình ảnh',
  3: 'Nối các cặp câu',
  4: 'Sắp xếp các từ thành câu có nghĩa',
}

export const GIFT_TYPE: IConst = {
  1: 'Quà Tặng',
  2: 'Voucher',
}

export const GIFT_VOUCHER_TYPE = {
  GIFT: 1,
  VOUCHER: 2,
}

export const IS_ACTIVE = {
  ACTIVE: 1,
  INACTIVE: 0,
}

export const STAFF_STATUS_TEXT = {
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Ngừng hoạt động',
}

export const GIFT_CODE_STATUS_TEXT = {
  0: 'Chưa đổi',
  1: 'Đã đổi',
  2: 'Đã sử dụng',
}

export const GIFT_CODE_STATUS = {
  UNCHANGE: 0,
  CHANGED: 1,
  USED: 2,
}

export const BUTTON_TYPE = {
  EDIT: 'edit',
  DELETE: 'delete',
  DETAIL: 'detail',
}

export const GENDER = {
  MALE: 0,
  FEMALE: 1,
}

export const CHANEL = {
  FACEBOOK: 1,
  WEBSITE: 2,
  BANNER: 3,
  AUDIO: 4,
  STALL: 5,
  ORTHER: 6,
}

export const PHONE_REGEX =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

///new
export const type: any = {
  1: 'Chọn một trong 4 đáp án',
  2: 'Sắp xếp từ thành câu có nghĩa',
  3: 'Chọn các cặp đáp án',
}
