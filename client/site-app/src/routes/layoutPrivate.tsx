import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { SHomeContent } from "../globalStyled";
import Menus from "./Menus";

const Layout = () => {
    return (
        <SHome>
            <div className="header">
                <SHomeContent>
                    <div className="wrapper-header">
                        <h1 className="logo">gogo</h1>
                        <div className="menu">
                            <div className="item">language</div>
                            <div className="item">language</div>
                            <div className="item info"></div>
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
                        <div className="menu_right">
                            <div className="notify_1">
                                <div className="head">
                                    <div className="left">
                                        Giải đấu Thạch Anh Tím
                                    </div>
                                    <a href="#" className="right">
                                        Xem giải đấu
                                    </a>
                                </div>
                                <div className="body">
                                    <div className="left">
                                        <img
                                            src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/7082c58e0bdbfbf9aec94191b704f549.svg"
                                            alt="logo"
                                        ></img>
                                    </div>
                                    <div className="right">
                                        Hoàn thành một bài học để tham gia bảng
                                        xếp hạng tuần này và thi đua với những
                                        người học khác
                                    </div>
                                </div>
                            </div>
                            <div className="notify_2">
                                <div className="head">
                                    <div className="left">
                                        Giải đấu Thạch Anh Tím
                                    </div>
                                    <a href="#" className="right">
                                        Xem giải đấu
                                    </a>
                                </div>
                                <div className="body">
                                    <div className="left">
                                        <img
                                            src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/7082c58e0bdbfbf9aec94191b704f549.svg"
                                            alt="logo"
                                        ></img>
                                    </div>
                                    <div className="right">
                                        Hoàn thành một bài học để tham gia bảng
                                        xếp hạng tuần này và thi đua với những
                                        người học khác
                                    </div>
                                </div>
                            </div>
                        </div>
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
        background-color: skyblue;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1;
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
                }
                .info {
                    width: 40px;
                    height: 40px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-image: url(https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg);
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
                width: 224px;
                height: 248px;
                position: sticky;
                top: 70px;
                padding: 10px 0px;
                .item {
                    height: 44px;
                    width: auto;
                    border-radius: 12px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    padding: 0px 4px;
                    cursor: pointer;
                    img {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                    }
                }
                .active {
                    background-color: #ddf4ff;
                    border: 2px solid #84d8ff;
                }
                .item:hover {
                    background-color: #f7f7f7;
                }
            }
            .menu_right {
                width: 350px;
                height: 500px;
                max-height: calc(100vh - 70px);
                position: sticky;
                top: 70px;
                padding: 10px 0px;
                .notify_1 {
                    margin-bottom: 10px;
                    background: #fff;
                    border: 2px solid #e5e5e5;
                    border-radius: 16px;
                    padding: 10px;
                    .head {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 5px;
                        .left {
                            color: #4b4b4b;
                            margin-bottom: 0;
                            font-size: 24px;
                            line-height: 26px;
                            margin: 0 0 25px;
                            font-weight: 700;
                        }
                        .right {
                            background: none;
                            border: none;
                            color: #1cb0f6;
                        }
                    }
                    .body {
                        display: flex;
                        justify-content: space-between;
                        .left {
                            img {
                                height: 50px;
                                width: 50px;
                                object-fit: contain;
                            }
                        }
                        .right {
                            font-size: 17px;
                            font-weight: 500;
                            line-height: 25px;
                        }
                    }
                }
                .notify_2 {
                    margin-bottom: 10px;
                    background: #fff;
                    border: 2px solid #e5e5e5;
                    border-radius: 16px;
                    padding: 10px;
                    .head {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 5px;
                        .left {
                            color: #4b4b4b;
                            margin-bottom: 0;
                            font-size: 24px;
                            line-height: 26px;
                            margin: 0 0 25px;
                            font-weight: 700;
                        }
                        .right {
                            background: none;
                            border: none;
                            color: #1cb0f6;
                        }
                    }
                    .body {
                        display: flex;
                        justify-content: space-between;
                        .left {
                            img {
                                height: 50px;
                                width: 50px;
                                object-fit: contain;
                            }
                        }
                        .right {
                            font-size: 17px;
                            font-weight: 500;
                            line-height: 25px;
                        }
                    }
                }
            }
            .content {
                flex: 1;
                height: 200vh;
                padding: 5px 10px;
            }
        }
    }
`;
