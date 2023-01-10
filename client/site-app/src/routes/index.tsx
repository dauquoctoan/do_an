import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTER } from "../configs/router";
import { IRoute } from "../configs/routerInterface";
import Layout from "./layoutPrivate";

const renderRouter = (routes: IRoute[]) => {
    return routes.map((e, i) => {
        if (!e.path) {
            return <Route key={i} index element={e.element} />;
        } else {
            return <Route key={i} path={e.path} element={e.element} />;
        }
    });
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/learn" element={<Layout />}>
                    {renderRouter(ROUTER.privateRouters)}
                </Route>
                <Route path="/">{renderRouter(ROUTER.publicRouters)}</Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
