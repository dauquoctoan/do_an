import React from "react";
import styled from "styled-components";
import { COLOR, images } from "../../../constant";
import { SContent } from "../../../globalStyled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Popover, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Chart from "../../privatePages/chat";
import SurveySheet from "../SurveySheet";

const Home = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <SHome className="pl-home">
            <div className="header">
                <SContent>
                    <div className="wrapper-header">
                        <div className="item-lef">
                            <img src={images.logo} style={{width: '60px', height: '60px'}}/>
                        </div>
                        <Button
                            variant="text"
                            aria-describedby={id}
                            onClick={handleClick}
                            className="item-right"
                        >
                            <p className="item-right-text">language</p>
                            <KeyboardArrowDownIcon
                                fontSize="large"
                                className="item-right-text"
                            />
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Typography className="nationality" sx={{ p: 2 }}>
                                English
                            </Typography>
                            <Typography className="nationality" sx={{ p: 2 }}>
                                Viet Nam
                            </Typography>
                        </Popover>
                    </div>
                </SContent>
            </div>
            {/* <div className="intro-wrap">
                <SContent>
                    <div className="intro">
                        <div className="intro--left"></div>
                        <div className="intro--right">
                            <h1>Học tập và giải trí cùng GOGO!</h1>
                            <div className="action">
                                <Button size="large" variant="contained">
                                    Bắt đầu
                                </Button>
                                <Button
                                    size="large"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                    variant="outlined"
                                >
                                    Tôi đã có tài khoản
                                </Button>
                            </div>
                        </div>
                    </div>
                </SContent>
            </div>
            <div className="body">
                <SContent>
                    <div className="methods">
                        <div className="methods-left">
                            <div className="logo"></div>
                        </div>
                        <div className="methods-right">
                            <h2>
                                Tạo môi trường tốt cho trẻ nhỏ phát triển tư duy
                            </h2>
                            <p>
                                Học tập và giải trí với GOGO, rất thú vị! Với
                                các câu hỏi bài tập ngắn gọn nhanh chóng giúp
                                phát triển tự duy cho trẻ nhỏ, bạn sẽ kiếm được
                                điểm và mở khóa các cấp độ mới đồng thời đạt
                                được các kỹ năng giao tiếp trong thế giới thực.
                            </p>
                        </div>
                    </div>
                </SContent>
                <SContent>
                    <div className="reason">
                        <div className="head">
                            <h2>Tại sao bạn sẽ thích học với GOGO</h2>
                        </div>
                        <div className="content">
                            <div className="content-left">
                                <div className="top">
                                    <img
                                        src="https://d35aaqx5ub95lt.cloudfront.net/images/331a32943ff73be28537dfc7469d5639.svg"
                                        alt="logo"
                                        className="logo"
                                    ></img>
                                    <div>
                                        <div className="title">Nguyên nhân</div>
                                        <div className="content">
                                            Chúng tôi giúp bạn dễ dàng hình
                                            thành thói quen học tập với các tính
                                            năng giống như trò chơi, các thử
                                            thách thú vị và lời nhắc từ linh vật
                                            thân thiện của chúng tôi, cú Duo.
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <img
                                        src="https://d35aaqx5ub95lt.cloudfront.net/images/331a32943ff73be28537dfc7469d5639.svg"
                                        alt="logo"
                                        className="logo"
                                    ></img>
                                    <div>
                                        <div className="title">Nguyên nhân</div>
                                        <div className="content">
                                            Chúng tôi giúp bạn dễ dàng hình
                                            thành thói quen học tập với các tính
                                            năng giống như trò chơi, các thử
                                            thách thú vị và lời nhắc từ linh vật
                                            thân thiện của chúng tôi, cú Duo.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-center">
                                <div className="logo"></div>
                            </div>
                            <div className="content-right">
                                <div className="top">
                                    <img
                                        src="https://d35aaqx5ub95lt.cloudfront.net/images/331a32943ff73be28537dfc7469d5639.svg"
                                        alt="logo"
                                        className="logo"
                                    ></img>
                                    <div>
                                        <div className="title">Nguyên nhân</div>
                                        <div className="content">
                                            Chúng tôi giúp bạn dễ dàng hình
                                            thành thói quen học tập với các tính
                                            năng giống như trò chơi, các thử
                                            thách thú vị và lời nhắc từ linh vật
                                            thân thiện của chúng tôi, cú Duo.
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <img
                                        src="https://d35aaqx5ub95lt.cloudfront.net/images/331a32943ff73be28537dfc7469d5639.svg"
                                        alt="logo"
                                        className="logo"
                                    ></img>
                                    <div>
                                        <div className="title">Nguyên nhân</div>
                                        <div className="content">
                                            Chúng tôi giúp bạn dễ dàng hình
                                            thành thói quen học tập với các tính
                                            năng giống như trò chơi, các thử
                                            thách thú vị và lời nhắc từ linh vật
                                            thân thiện của chúng tôi, cú Duo.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SContent>
                <SContent>
                    <div className="entertainment">
                        <div className="entertainment-left">
                            <h2 className="title">
                                Giải trí với các trò chơi, cấu đố
                            </h2>
                            <div className="content">
                                GOGO giúp bạn có thể giải trí cùng bạn bè qua
                                những trò chơi, câu đó giúp tăng tư duy cho trẻ.
                            </div>
                        </div>
                        <div className="entertainment-right">
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/791b23bc8994589efad21ce964d99161.svg"
                                alt="logo"
                            ></img>
                        </div>
                    </div>
                </SContent>
            </div> */}
            <SurveySheet />
        </SHome>
    );
};

export default Home;

const SHome = styled.div`
    width: 100%;
    color: ${COLOR.primary.contrastText};
    height: auto;
    .header {
        height: 70px;
        width: 100%;
        background-color: ${COLOR.primary.main};
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 10;
        .wrapper-header {
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 17px;
            font-weight: 500;
            .item-right {
                display: flex;
                align-items: center;
                height: 100%;
                width: 110px;
                .item-right-text {
                    font-size: 17px;
                    font-weight: 500;
                    color: white;
                    cursor: pointer;
                }
            }
        }
    }
    .intro-wrap {
        /* background-color: ${COLOR.primary.light}; */
        .intro {
            height: 100vh;
            width: 100%;
            display: flex;
            align-items: center;
            .intro--left {
                flex: 1;
                height: 340px;
                background-image: url(https://d35aaqx5ub95lt.cloudfront.net/images/331a32943ff73be28537dfc7469d5639.svg);
                background-repeat: no-repeat;
            }
            .intro--right {
                flex: 1;
                height: auto;
                .action {
                    width: 70%;
                    display: flex;
                    height: auto;
                    justify-content: space-between;
                    margin: auto;
                    margin-top: 100px;
                }
            }
        }
    }
    .body {
        color: black;
        .methods {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .methods-left {
                flex: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                .logo {
                    width: 200px;
                    height: 200px;
                    background-image: url(https://d35aaqx5ub95lt.cloudfront.net/images/776364e6419216ffd84ddf8d8815711b.svg);
                    background-repeat: no-repeat;
                }
            }
            .methods-right {
                flex: 3;
                p {
                    line-height: 25px;
                    color: #777;
                    font-size: 15px;
                    line-height: 1.7;
                }
            }
        }
        .reason {
            .head {
                width: 100%;
                height: auto;
                text-align: center;
            }
            width: 100%;
            .head {
                margin-bottom: 40px;
            }
            .content {
                width: 100%;
                height: auto;
                display: flex;
                .content-left {
                    flex: 1;
                }
                .content-center {
                    width: 200px;
                    height: 200px;
                }
                .content-right {
                    flex: 1;
                }
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 4px;
                }
                .top {
                    display: flex;
                    margin-bottom: 30px;
                }
                .bottom {
                    display: flex;
                }
                .title {
                    margin-bottom: 10px;
                    margin-top: 10px;
                    font-weight: 700;
                    font-size: 19px;
                }
                .content {
                    color: #777;
                    font-size: 14px;
                    line-height: 1.7;
                }
            }
        }
        .entertainment {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            .entertainment-left {
                flex: 1;
                .title {
                }
                .content {
                    color: #777;
                    font-size: 14px;
                    line-height: 1.7;
                }
            }
            .entertainment-right {
            }
        }
    }
`;
