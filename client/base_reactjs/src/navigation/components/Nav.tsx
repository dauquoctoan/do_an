import ROUTER_CONFIG from '../Router/config'
import { IRouter } from '../Router/interface'
import PrivateRoute from '../Router/PrivateRouter'

export default function Nav() {
  return (
    <>
      {ROUTER_CONFIG.ROUTERS.map((val: IRouter) => {
        return (
          <PrivateRoute
            key={val.path}
            path={`${val.path}`}
            component={val.component}
            exact
          />
        )
      })}
    </>
  )
}
