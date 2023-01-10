import {
  AiOutlineUser,
  AiOutlineLoading3Quarters,
  AiFillCheckCircle,
  AiFillWarning,
  AiFillInfoCircle,
} from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { VscError } from 'react-icons/vsc'

const ICONS = {
  LoginUser: AiOutlineUser,
  LoginPassword: RiLockPasswordLine,
  LoginLoading: AiOutlineLoading3Quarters,
  MessageSuccess: AiFillCheckCircle,
  MessageError: VscError,
  MessageWarning: AiFillWarning,
  MessageInfo: AiFillInfoCircle,
}

export default ICONS
