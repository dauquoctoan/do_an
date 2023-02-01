import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { COLOR, images } from "../constant";
import { SHomeContent } from "../globalStyled";
import Menus from "./Menus";

const Layout = () => {
    const info: any = JSON.parse(localStorage.getItem("info") || "");

    return (
        <SHome>
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
                                <p>10000</p>
                            </div>
                            {info.name && (
                                <div className="item">{info.name}</div>
                            )}

                            <div
                                className="item info"
                                style={{
                                    backgroundImage: `url(${
                                        info?.picture
                                            ? info?.picture
                                            : "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg"
                                    })`,
                                }}
                            ></div>
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
        /* border-bottom: 1px solid ${COLOR.colors.border_color}; */
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
