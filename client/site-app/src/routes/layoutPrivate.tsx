import styled from "@emotion/styled";
import { Avatar, Button } from "@mui/material";
import { Popover } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ModalJoiGame from "../commons/ModalJoiGame";
import { COLOR, images } from "../constant";
import { SHomeContent } from "../globalStyled";
import { RootState } from "../store";
import { reSetInfo } from "../store/features/info/infoSlice";
import { history } from "../utils/history";
import Menus from "./Menus";

const Layout = () => {
    const state = useSelector((e: RootState) => {
        return e.info;
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    const dispatch = useDispatch();
    return (
        <SHome>
            <ModalJoiGame />
            <div className="header">
                <SHomeContent>
                    <div className="wrapper-header">
                        <h1 className="logo">
                            <img src={images.logo} alt="logo" width={100} />
                        </h1>
                        <div className="menu">
                            <div className="item poin">
                                <img
                                    src={images.diamon}
                                    alt="img"
                                    width={30}
                                    style={{ marginRight: 10 }}
                                />
                                <p>
                                    {state.point ||
                                        localStorage.getItem("point")}
                                </p>
                            </div>
                            {state.name && (
                                <div
                                    className="item"
                                    style={{ fontWeight: 600, fontSize: 20 }}
                                >
                                    {state.name}
                                </div>
                            )}
                            {state.name && (
                                <Popover
                                    content={
                                        <SlistOrder>
                                            {state?.listCourse.length > 0 &&
                                                state?.listCourse.map((e) => {
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                const link = `/learn/topic`;
                                                                history.push(
                                                                    link
                                                                );
                                                            }}
                                                            style={{
                                                                cursor: "pointer",
                                                                marginTop: 10,
                                                            }}
                                                        >
                                                            {e.title}
                                                        </div>
                                                    );
                                                })}
                                        </SlistOrder>
                                    }
                                    title={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>Khoá học đã mua</div>
                                            <div
                                                onClick={() => {
                                                    localStorage.setItem(
                                                        "token",
                                                        ""
                                                    );
                                                    localStorage.setItem(
                                                        "info",
                                                        ""
                                                    );
                                                    localStorage.setItem(
                                                        "point",
                                                        ""
                                                    );
                                                    dispatch(reSetInfo());
                                                    navigate("/login");
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Đăng xuất
                                            </div>
                                        </div>
                                    }
                                    trigger="click"
                                    open={open}
                                    onOpenChange={handleOpenChange}
                                >
                                    <div className="item info">
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={state?.picture}
                                        />
                                    </div>
                                </Popover>
                            )}
                            {!state.name && (
                                <Button
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                    className="item"
                                    variant="contained"
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </div>
                    </div>
                </SHomeContent>
            </div>
            <div className="body">
                <SHomeContent>
                    <div className="wrapper-conent">
                        <Menus />
                        <div className="content">
                            <Outlet />
                        </div>
                        <div className="menu_right"></div>
                    </div>
                </SHomeContent>
            </div>
        </SHome>
    );
};

export default Layout;

const SlistOrder = styled.div`
    width: 300px;
`;

const SHome = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: auto;
    position: relative;
    .header {
        height: 70px;
        width: 100%;
        background-color: #fff;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1;
        border-bottom: 1px solid ${COLOR.colors.border_color};
        .wrapper-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
            width: auto;
            .logo {
                margin: 0px;
            }
            .menu {
                display: flex;
                width: auto;
                .item {
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    p {
                        margin-bottom: 0px;
                    }
                }
                .info {
                    width: 40px;
                    height: 40px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
        }
    }
    .body {
        height: auto;
        width: 100%;
        .wrapper-conent {
            display: flex;
            .menu_left {
                width: 20%;
                height: 248px;
                position: sticky;
                top: 70px;
                padding: 10px 0px;
                .item {
                    height: 50px;
                    width: auto;
                    border-radius: 12px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    padding: 0px 4px;
                    cursor: pointer;

                    .icon {
                        width: 40px;
                        height: 40px;
                        margin-right: 40px;
                        color: ${COLOR.colors.black_color};
                    }
                }
                .active {
                    background-color: ${COLOR.colors.bg_colo_button};
                    box-shadow: 2px 8px 12px rgb(0 0 0 / 13%);
                    transform: translateY(-5px);
                    /* border: 2px solid ${COLOR.colors.primary_color}; */
                }
                .item:hover {
                    background-color: ${COLOR.colors.bg_colo_button_hover};
                }
            }
            .content {
                flex: 1;
                min-height: 100vh;
                margin-top: 70px;
                padding: 5px 10px;
            }
        }
    }
`;
