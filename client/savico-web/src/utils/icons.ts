import {
  AiOutlineUser,
  AiOutlineLoading3Quarters,
  AiFillCheckCircle,
  AiFillWarning,
  AiFillInfoCircle,
  AiOutlineDelete,
} from 'react-icons/ai'
import { MdSwitchAccount, MdOutlineEvent } from 'react-icons/md'
import {
  RiLockPasswordLine,
  RiEditLine,
  RiCustomerService2Fill,
  RiUserSettingsLine,
  RiUser3Line,
} from 'react-icons/ri'
import { VscError, VscThreeBars, VscSettingsGear } from 'react-icons/vsc'
import { BiHome, BiMenu } from 'react-icons/bi'
import { GrInstall } from 'react-icons/gr'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsPersonCircle, BsGift, BsCardChecklist } from 'react-icons/bs'
import { FaRegNewspaper } from 'react-icons/fa'
import { AiOutlinePhone } from 'react-icons/ai'
import { CgMenuGridR } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'
import { GiCardboardBox } from 'react-icons/gi'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { VscChecklist } from 'react-icons/vsc'

const ICONS = {
  Edit: RiEditLine,
  Delete: AiOutlineDelete,
  LoginUser: AiOutlineUser,
  LoginPassword: RiLockPasswordLine,
  LoginLoading: AiOutlineLoading3Quarters,
  MessageSuccess: AiFillCheckCircle,
  MessageError: VscError,
  MessageWarning: AiFillWarning,
  MessageInfo: AiFillInfoCircle,
  HeaderNotification: IoMdNotificationsOutline,
  HeaderMenu: RiUser3Line,
  HeaderLogout: IoIosLogOut,
  HeaderUserInfo: RiUserSettingsLine,
  // MenuCollapse: VscThreeBars,
  MenuHome: BiHome,
  MenuAccount: BsPersonCircle,
  MenuCustomer: RiCustomerService2Fill,
  MenuEvent: MdOutlineEvent,
  MenuStalls: GiCardboardBox,
  MenuStaff: MdSwitchAccount,
  MenuNews: FaRegNewspaper,
  MenuGift: BsGift,
  MenuCategory: VscChecklist,
  MenuStatistical: BsCardChecklist,
  MenuContact: AiOutlinePhone,
  MenuSetting: VscSettingsGear,
  MenuCollapse: BiMenu,
  TableInfo: MdOutlineRemoveRedEye,
}

export default ICONS
