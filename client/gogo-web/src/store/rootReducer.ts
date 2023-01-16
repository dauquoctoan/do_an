import AuthReducer from './auth/AuthenSlice'
import CountReducer from './count/countSlice'
import lessonReducer from './lesson/lessonSlice'

const rootReducer = {
  authReducer: AuthReducer,
  countReducer: CountReducer,
  lessonReducer: lessonReducer,
}

export default rootReducer
