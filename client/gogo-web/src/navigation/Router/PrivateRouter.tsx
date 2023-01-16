import Cookie from 'js-cookie'
import { Redirect, Route } from 'react-router-dom'
import configs from '../../configs'

interface PrivateRouteProps {
  path: string
  component: any
  exact?: boolean
}

export default function PrivateRoute({
  path,
  component,
  exact,
}: PrivateRouteProps) {
  // const cookie = Cookie.get(configs._sessionId)
  const Component = component
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        // cookie ? <Component {...props} /> : <Redirect to={'/login'} />
        <Component {...props} />
      )}
    />
  )
}
