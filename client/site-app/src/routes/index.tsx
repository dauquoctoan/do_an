import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ModalJoiGame from "../commons/ModalJoiGame";
import { ROUTER } from "../configs/router";
import { IRoute } from "../configs/routerInterface";
import Layout from "./layoutPrivate";
import useSelection from "antd/lib/table/hooks/useSelection";
import { history } from "../utils/history";
import { useLayoutEffect, useState } from "react";

const renderRouter = (routes: IRoute[]) => {
    return routes.map((e, i) => {
        if (!e.path) {
            return <Route key={i} index element={e.element} />;
        } else {
            return <Route key={i} path={e.path} element={e.element} />;
        }
    });
};

const CustomRouter = ({ history, ...props }: any) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

const Routing = () => {
    return (
        // <BrowserRouter>
        <CustomRouter history={history}>
            <Routes>
                <Route path="/learn" element={<Layout />}>
                    {renderRouter(ROUTER.privateRouters)}
                </Route>
                <Route path="/">{renderRouter(ROUTER.publicRouters)}</Route>
            </Routes>
        </CustomRouter>
        // </BrowserRouter>
    );
};

export default Routing;
