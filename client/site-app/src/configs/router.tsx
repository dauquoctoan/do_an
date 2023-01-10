import PrivateHome from "../pages/privatePages/home";
import PublicHome from "../pages/publicPages/home";
import NoPage from "../pages/noPage";
import Login from "../pages/publicPages/auth/login";
import { IRouter } from "./routerInterface";
import Register from "../pages/publicPages/auth/register";
import LearnMain from "../pages/publicPages/learn";

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
            path: "register",
            element: <Register />,
        },
        {
            path: "lesson",
            element: <LearnMain />,
        },
        {
            path: "*",
            element: <NoPage />,
        },
    ],
};
