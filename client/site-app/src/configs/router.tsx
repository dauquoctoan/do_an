import PrivateHome from "../pages/privatePages/home";
import PublicHome from "../pages/publicPages/home";
import NoPage from "../pages/noPage";
import Login from "../pages/publicPages/login";
import { IRouter } from "./routerInterface";

export const ROUTER: IRouter = {
    privateRouters: [
        {
            element: <PrivateHome />,
        },
        {
            path: "blogs",
            element: <PrivateHome />,
        },
        {
            path: "*",
            element: <NoPage />,
        },
    ],
    publicRouters: [
        {
            element: <PublicHome />,
        },
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "*",
            element: <NoPage />,
        },
    ],
};
