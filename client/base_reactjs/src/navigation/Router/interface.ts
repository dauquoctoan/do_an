export interface IRouter {
  path: string
  component: React.FC | any
  exact?: boolean
}
