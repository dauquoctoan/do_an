import { Checkbox, Form, Input } from 'antd'
import { login } from './api'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import configs from '../../configs'
import history from '../../utils/history'
import R from '../../utils/R'
import { IFormLogin } from './interface'
import { ButtonStyled } from '../../commons/button'
import { useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { getUserInfoAction } from '../../store/auth/AuthenSlice'
import Configs from '../../configs'

const Login = () => {
  const { LoginUser, LoginPassword, LoginLoading } = R.icons
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: IFormLogin) => {
    const user: IFormLogin = {
      phone: values.phone,
      password: values.password,
    }
    try {
      setLoading(true)
      const res = await login(user)
      if (res) {
        Cookies.set(configs._sessionId, res.data.token)
        // local.set(configs._sessionId, res.data.token)
        localStorage.setItem(Configs._userInfo, JSON.stringify(res?.data))

        // dispatch(getUserInfoAction())
        history.replace('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <LoginStyled>
      <FormStyled>
        <InfoStyled>
          <img className="logo" src={R.logos.logoLogIn} />
        </InfoStyled>
        <Form
          size="middle"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: R.strings().login__warning__user },
            ]}
          >
            <Input
              prefix={<LoginUser />}
              placeholder={R.strings().login__placeholder__user}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: R.strings().login__warning__password },
            ]}
          >
            <Input.Password
              autoComplete="on"
              prefix={<LoginPassword />}
              type="password"
              placeholder={R.strings().login__placeholder__password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{R.strings().login__save_info_login}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item
            className="wrapper-button"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <ButtonStyled
              icon={
                loading ? <LoginLoading style={{ marginRight: '5px' }} /> : null
              }
              type="primary"
              htmlType="submit"
            >
              {R.strings().btn__login}
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
  .wrapper-button {
    margin-bottom: 10px;
  }
`
const InfoStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  .logo {
    margin: auto;
  }
  margin-bottom: 20px;
`
export default Login
