import { Checkbox, Form, Input } from 'antd'
import { login } from './api'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import configs from '../../configs'
import history from '../../utils/history'
import R from '../../utils/R'
import { IFormLogin } from './interface'
import { ButtonStyled } from '../../commons/buttons'
import { useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { getUserInfoAction } from '../../store/auth/AuthenSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const { LoginUser, LoginPassword, LoginLoading } = R.icons
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: IFormLogin) => {
    const user: IFormLogin = {
      user_name: values.user_name,
      password: values.password,
    }
    try {
      setLoading(true)
      const res = await login(user)
      if (res) {
        Cookies.set(configs._sessionId, res.data.token)
        dispatch(getUserInfoAction())
        history.replace('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <LoginStyled>
      <FormStyled>
        <Form
          size="middle"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="user_name"
            rules={[
              { required: true, message: R.strings().warning_login_user },
            ]}
          >
            <Input
              prefix={<LoginUser />}
              placeholder={R.strings().placeholder_login_user}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: R.strings().warning_login_password },
            ]}
          >
            <Input.Password
              autoComplete="on"
              prefix={<LoginPassword />}
              type="password"
              placeholder={R.strings().placeholder_login_password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{R.strings().title_saveInfoLogin}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <ButtonStyled
              icon={
                loading ? <LoginLoading style={{ marginRight: '5px' }} /> : null
              }
              type="primary"
              htmlType="submit"
            >
              {R.strings().btn_login}
            </ButtonStyled>
          </Form.Item>
        </Form>
      </FormStyled>
    </LoginStyled>
  )
}
const LoginStyled = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: #e2d0d0;
`
const FormStyled = styled.div`
  background-color: white;
  padding: 60px 20px;
  width: 400px;
  margin: auto;
  border-radius: 2px;
  box-shadow: blue;
`

export default Login
