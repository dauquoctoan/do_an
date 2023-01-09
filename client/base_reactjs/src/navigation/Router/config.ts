import Home from '../../features/Home'
import Product from '../../features/Product'
import { IRouter } from './interface'

const PATH = {
  Home: '/',
  Product: '/product',
}

const ROUTERS: Array<IRouter> = [
  {
    path: PATH.Home,
    component: Home,
  },
  {
    path: PATH.Product,
    component: Product,
  },
]

const ROUTER_CONFIG = {
  ROUTERS,
  PATH,
}

export default ROUTER_CONFIG
