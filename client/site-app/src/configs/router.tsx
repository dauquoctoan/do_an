import PrivateHome from "../pages/privatePages/home";
import PublicHome from "../pages/publicPages/home";
import NoPage from "../pages/noPage";
import Login from "../pages/publicPages/auth/login";
import { IRouter } from "./routerInterface";
import Register from "../pages/publicPages/auth/register";
import LearnMain from "../pages/publicPages/learn";
import Topic from "../pages/privatePages/Topic";
import Top from "../pages/privatePages/Top";
import Event from "../pages/privatePages/Event";
import Store from "../pages/privatePages/Store";
import SurveySheet from "../pages/publicPages/SurveySheet";
import Challenge from "../pages/privatePages/Challenge";
import Info from "../pages/privatePages/info";

export const ROUTER: IRouter = {
    privateRouters: [
        {
            element: <Info />,
        },
        {
            path: "challenge",
            element: <Challenge />,
        },
        {
            path: "topic",
            element: <Topic />,
        },
        {
            path: "top",
            element: <Top />,
        },
        {
            path: "store",
            element: <Store />,
        },
        {
            path: "event",
            element: <Event />,
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
            path: "/survey-sheet",
            element: <SurveySheet />,
        },
        {
            path: "*",
            element: <NoPage />,
        },
    ],
};
