import { PATH_ADMIN } from './PathName'
import Account from 'features/Account'
import Category from 'features/Category'
import Customer from 'features/Customer'
import CustomerDetail from 'features/Customer/pages/CustomerDetail'
import Staff from 'features/Staff'
import AddEditStaff from 'features/Staff/components/AddEditStaff'
import GiftExchange from 'features/GiftExchange'
import Home from 'features/Homes'
import News from 'features/News'
import Events from 'features/event'
import AddEditEvent from 'features/event/components/AddEditEvents'
import AddAndEditNews from 'features/News/pages/AddAndEditNews'
import Stalls from 'features/Stalls'
import AddAndEditStalls from 'features/Stalls/pages/AddAndEditStalls'
import VoucherAndGif from 'features/VoucherAndGif'
import AddUpdateVoucherAndGif from 'features/VoucherAndGif/pages/AddUpdateVoucherAndGif'
// import VoucherGiftDetail from 'features/VoucherAndGif/components/VoucherGiftDetail'
import JoinEvent from 'features/report/JoinEventReport/index'
import DetailCustomerEvent from 'features/report/JoinEventReport/components/CountCustomerDetail'
import UsageFrequency from 'features/report/UsageFrequency'
import R from 'utils/R'
import { IRouter } from './interface'
import StallsStatistic from 'features/report/StallsInfomation/components/StallsStatistic'
import CustomerReport from 'features/report/CustomerInfomation/components/CustomerReport'
import EventDetail from 'features/event/components/EventDetail'
import Webview from 'features/Webview'
import ExchangeGiftList from 'features/report/ExchangeGiftList'
import DetailExchangeGift from 'features/report/ExchangeGiftList/DetailExchangeGift'
import SettingPage from 'features/Settings/page'
import SurveySheet from 'features/SurveySheet/SurveySheet'
import AddEditNewIQuestion from 'features/SurveySheet/components/AddEditNewIQuestion'
import SurveyReport from 'features/report/Survey/SurveyReport'
import CategoryReportPage from 'features/report/CategoryInfomation/CategoryReportPage'

export const PATH = {
  TOPIC: '/topic',
  LESSON: '/lesson',
  LESSON_ADD_UPDATE: '/lesson/add-update',
  //old
  HOME: '/',
  PRODUCT: '/product',
  ACCOUNT: '/account',
  CUSTOMER: '/customer',
  CUSTOMER_DETAIL: '/customer/detail',
  STALLS_LIST: '/stalls',
  CATEGORY: '/category',
  STALLS_ADD_UPDATE: '/stalls/add-update',
  EVENT_LIST: '/event',
  STAFF: '/staff',
  ADD_EDIT_STAFF: '/staff/add-edit',
  GIFT_AND_VOUCHER: '/sub1',
  GIFT: '/gift',
  VOUCHER: '/voucher',
  ADD_UPDATE_VOUCHER: '/voucher/add-update',
  VOUCHER_DETAIL: '/voucher/detail',
  STATISTICAL: '/sub2',
  ONLINE_FREQUENCY: '/online_frequency',
  COUNT_CUSTOMER_EVENT: '/count_customer_event',
  DETAIL_COUNT_CUSTOMER_EVENT: '/detail_customer_event',
  SURVEY_SHEET: '/survey_sheet',
  CONTACT: '/contact',
  SETTING: '/setting',
  STALL_REPORT: '/stall_report',
  CATEGORY_REPORT: '/category_report',
  CUTOMER_REPORT: '/customer_report',
  WEBVIEW: '/webview',
  WEBVIEW_DETAIL: '/webview/:id',
  EXCHANGE_GIFT_LIST: '/exchange_gift_list',
  DETAIL_EXCHANGE_GIFT: '/detail_exchange_gift',
  ADD_EDIT_QUESTION: '/add_edit_question',
  SURVEY_REPORT: '/survey_report',
}

const {
  MenuAccount,
  MenuCustomer,
  MenuHome,
  MenuStalls,
  MenuEvent,
  MenuContact,
  MenuGift,
  MenuNews,
  MenuSetting,
  MenuStaff,
  MenuStatistical,
  MenuCategory,
} = R.icons

const ROUTERS: Array<IRouter> = [
  {
    path: PATH.HOME,
    component: Home,
    title: R.strings().menu__home,
  },
  {
    path: PATH.TOPIC,
    component: Account,
    title: 'Chủ đề',
  },
  {
    path: PATH.ADD_EDIT_QUESTION,
    component: AddEditNewIQuestion,
    title: R.strings().menu__home,
  },

  {
    path: PATH.CUSTOMER_DETAIL + '/:id',
    component: CustomerDetail,
    title: R.strings().menu__customer,
  },

  {
    path: PATH.ACCOUNT,
    component: Account,
    title: R.strings().menu__account,
  },
  {
    path: PATH.STALLS_LIST,
    component: Stalls,
    title: R.strings().menu__stalls_list,
  },
  {
    path: PATH.CATEGORY,
    component: Category,
    title: R.strings().menu__stalls_list,
  },
  {
    path: PATH.STALLS_ADD_UPDATE,
    component: AddAndEditStalls,
    title: R.strings().menu__stalls_list,
  },
  // {
  //   path: PATH.EVENT_LIST,
  //   component: Staff,
  //   title: R.strings().menu__event_list,
  // },
  {
    path: PATH.STAFF,
    component: Staff,
    title: R.strings().menu__staff,
  },
  {
    path: PATH.ADD_EDIT_STAFF,
    component: AddEditStaff,
    title: R.strings().menu__staff,
  },
  {
    path: PATH.LESSON,
    component: News,
    title: 'Bài học',
  },
  {
    path: PATH.LESSON_ADD_UPDATE,
    component: AddAndEditNews,
    title: 'Thêm bài học',
  },
  {
    path: PATH_ADMIN.EVENT,
    component: Events,
    title: '',
  },
  {
    path: PATH_ADMIN.EVENT_ADD_UPDATE,
    component: AddEditEvent,
    title: '',
  },
  {
    path: PATH_ADMIN.EVENT_DETAIL + '/:id',
    component: EventDetail,
    title: '',
  },
  {
    path: PATH.GIFT,
    component: GiftExchange,
    title: R.strings().menu__gift,
  },
  {
    path: PATH.VOUCHER,
    component: VoucherAndGif,
    title: R.strings().menu__voucher,
  },
  {
    path: PATH.ADD_UPDATE_VOUCHER,
    component: AddUpdateVoucherAndGif,
    title: R.strings().menu__voucher,
  },
  {
    path: PATH.ONLINE_FREQUENCY,
    component: UsageFrequency,
    title: R.strings().menu__online_frequency,
  },
  {
    path: PATH.COUNT_CUSTOMER_EVENT,
    component: JoinEvent,
    title: R.strings().menu__count_customer_event,
  },
  {
    path: PATH.DETAIL_COUNT_CUSTOMER_EVENT + '/:id',
    component: DetailCustomerEvent,
    title: '',
  },
  {
    path: PATH.SURVEY_SHEET,
    component: SurveySheet,
    title: R.strings().menu__survey_sheet,
  },
  {
    path: PATH.STALL_REPORT,
    component: StallsStatistic,
    title: R.strings().menu__survey_sheet,
  },
  {
    path: PATH.CUTOMER_REPORT,
    component: CustomerReport,
    title: '',
  },
  {
    path: PATH.CONTACT,
    component: Staff,
    title: R.strings().menu__contact,
  },
  {
    path: PATH.SETTING,
    component: SettingPage,
    title: R.strings().menu__setting,
  },
  // {
  //   path: PATH.WEBVIEW,
  //   component: Webview,
  //   title: 'R.strings().menu__setting',
  // },
  {
    path: PATH.EXCHANGE_GIFT_LIST,
    component: ExchangeGiftList,
    title: 'ExchangeGiftList',
  },
  {
    path: PATH.DETAIL_EXCHANGE_GIFT,
    component: DetailExchangeGift,
    title: 'DetailExchangeGift',
  },
  {
    path: PATH.SURVEY_REPORT,
    component: SurveyReport,
    title: 'SurveyReport',
  },
  {
    path: PATH.CATEGORY_REPORT,
    component: CategoryReportPage,
    title: 'CategoryReport',
  },
]

const MENUS = [
  {
    label: R.strings().menu__home,
    key: PATH.HOME,
    icon: <MenuHome />,
  },
  {
    label: 'Chủ đề',
    key: PATH.TOPIC,
    icon: <MenuStalls />,
  },
  {
    label: R.strings().menu__category,
    key: PATH.CATEGORY,
    icon: <MenuCategory />,
  },

  {
    label: 'Bài học',
    key: PATH.LESSON,
    icon: <MenuNews />,
  },
  {
    label: R.strings().menu__event,
    key: PATH_ADMIN.EVENT,
    icon: <MenuNews />,
  },
  {
    label: R.strings().menu__customer,
    key: PATH.CUSTOMER,
    icon: <MenuCustomer />,
  },
  {
    label: R.strings().menu__staff,
    key: PATH.STAFF,
    icon: <MenuStaff />,
  },
  {
    label: R.strings().menu__gift_and_voucher,
    key: PATH.GIFT_AND_VOUCHER,
    icon: <MenuGift />,
    children: [
      {
        label: R.strings().menu__gift,
        key: PATH.GIFT,
      },
      {
        label: R.strings().menu__voucher,
        key: PATH.VOUCHER,
      },
    ],
  },
  {
    label: R.strings().menu__statistical,
    key: PATH.STATISTICAL,
    icon: <MenuStatistical />,
    children: [
      {
        label: 'Thông tin ngành hàng',
        key: PATH.CATEGORY_REPORT,
      },
      {
        label: R.strings().menu__stalls_infomation,
        key: PATH.STALL_REPORT,
      },
      {
        label: R.strings().menu__customer_infomation,
        key: PATH.CUTOMER_REPORT,
      },
      {
        label: 'Số lượt đổi quà',
        key: PATH.EXCHANGE_GIFT_LIST,
      },
      {
        label: 'Phiếu khảo sát',
        key: PATH.SURVEY_REPORT,
      },
    ],
  },
  {
    label: R.strings().menu__survey_sheet,
    key: PATH.SURVEY_SHEET,
    icon: <MenuEvent />,
  },
  // {
  //   label: R.strings().menu__contact,
  //   key: PATH.CONTACT,
  //   icon: <MenuContact />,
  // },
  {
    label: R.strings().menu__setting,
    key: PATH.SETTING,
    icon: <MenuSetting />,
  },
  {
    label: R.strings().menu__account,
    key: PATH.ACCOUNT,
    icon: <MenuAccount />,
  },
]

const ROUTER_CONFIG = {
  ROUTERS,
  PATH: PATH,
  MENUS,
}

export default ROUTER_CONFIG
