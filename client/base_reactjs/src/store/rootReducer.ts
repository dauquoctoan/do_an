import AuthReducer from './auth/AuthenSlice'
import CountReducer from './count/countSlice'
const rootReducer = {
  authReducer: AuthReducer,
  countReducer: CountReducer,
}

export default rootReducer
