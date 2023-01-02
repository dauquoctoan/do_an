import React from "react";
import styled from "styled-components";
import { COLOR } from "../../constant";
import { SContent } from "../../globalStyled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Popover, Button, Typography } from "@mui/material";

const Home = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
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
                        <div className="item-lef">APP</div>
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
            <div className="body">
                <div className="intro"></div>
                <div className="methods"></div>
            </div>
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
        background-color: ${COLOR.home.bg};
        position: fixed;
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
    .body {
        height: 150vh;
    }
`;
