export interface IRouter {
    privateRouters: IRoute[];
    publicRouters: IRoute[];
}
export interface IRoute {
    path?: string;
    element: React.ReactElement;
}
