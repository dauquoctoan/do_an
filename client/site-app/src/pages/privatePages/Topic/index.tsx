import styled from "styled-components";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getParts, getTopics } from "../../api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../../../constant";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { FaChild } from "react-icons/fa";
import GirlIcon from "@mui/icons-material/Girl";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BoyIcon from "@mui/icons-material/Boy";

const Topic = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = React.useState<any[]>([]);
    const [ageGroup, setAgeGroup] = React.useState<string>("");

    async function getData() {
        const res = await getTopics({ ageGroup: ageGroup });
        setTopic(res.data);
    }

    const [loading, setLoading] = React.useState<string>("");

    async function getPartBuyIdTopic(id: string) {
        const res = await getParts({ topic: id });
        const newData = topic.map((item) => {
            if (item._id === id) {
                return { ...item, parts: res.data };
            }
            return item;
        });
        setTopic(newData);
        setLoading("");
    }

    React.useEffect(() => {
        getData();
    }, [ageGroup]);

    return (
        <STopic>
            <div className="container">
                <div className="age-group">
                    <div
                        className="item"
                        onClick={() => {
                            setAgeGroup("1");
                        }}
                    >
                        <div
                            className={
                                ageGroup === "1" ? "active logo" : "logo"
                            }
                            style={{ background: "#fefbbe" }}
                        >
                            <ChildCareIcon
                                style={{ color: "#e49902" }}
                                className="icon"
                            />
                        </div>
                        <div className="title">2 đến 3 tuổi</div>
                    </div>
                    <div
                        className="item"
                        onClick={() => {
                            setAgeGroup("2");
                        }}
                    >
                        <div
                            className={
                                ageGroup === "2" ? "active logo" : "logo"
                            }
                            style={{ background: "#ffefe4" }}
                        >
                            <GirlIcon
                                style={{ color: "#c8585f" }}
                                className="icon"
                            />
                        </div>
                        <div className="title">4 đến 5 tuổi</div>
                    </div>
                    <div
                        className="item"
                        onClick={() => {
                            setAgeGroup("3");
                        }}
                    >
                        <div
                            className={
                                ageGroup === "3" ? "active logo" : "logo"
                            }
                            style={{ background: "#e2fff8" }}
                        >
                            <BoyIcon
                                style={{ color: "#68b3c1" }}
                                className="icon"
                            />
                        </div>
                        <div className="title">6 đến 8 tuổi</div>
                    </div>
                    <div
                        className="item"
                        onClick={() => {
                            setAgeGroup("4");
                        }}
                    >
                        <div
                            className={
                                ageGroup === "4" ? "active logo" : "logo"
                            }
                            style={{ background: "#e2efff" }}
                        >
                            <FaChild
                                style={{ color: "#657cb8" }}
                                className="icon"
                            />
                        </div>
                        <div className="title">8 đến 10 tuổi</div>
                    </div>
                </div>
                <div className="topic">
                    {topic &&
                        topic.map((topic: any, index: number) => {
                            return (
                                <Accordion
                                    style={{ marginBottom: 15 }}
                                    onClick={() => {
                                        if (!topic.parts) {
                                            getPartBuyIdTopic(topic._id);
                                            setLoading(topic._id);
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id={topic._id}
                                    >
                                        <Typography>{topic.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {loading === topic._id && (
                                            <Box sx={{ width: "100%" }}>
                                                <LinearProgress color="inherit" />
                                            </Box>
                                        )}
                                        {topic.parts &&
                                            topic.parts.map((part: any) => {
                                                return (
                                                    <List
                                                        className="item"
                                                        sx={{
                                                            width: "100%",
                                                            cursor: "pointer",
                                                            bgcolor:
                                                                "background.paper",
                                                            border: `1px solid ${COLOR.colors.border_color}`,
                                                            background:
                                                                COLOR.colors
                                                                    .bg_colo_button,
                                                            borderRadius: 3,
                                                            marginBottom: 1,
                                                        }}
                                                    >
                                                        <ListItem
                                                            onClick={() => {
                                                                navigate(
                                                                    "/lesson?part=" +
                                                                    part._id
                                                                );
                                                            }}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src={
                                                                        part.picture
                                                                    }
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                    part.title
                                                                }
                                                            // secondary="Jan 9, 2014"
                                                            />
                                                        </ListItem>
                                                    </List>
                                                );
                                            })}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                </div>
            </div>
        </STopic>
    );
};

export default Topic;

const STopic = styled.div`
    width: 100%;
    height: auto;
    .container {
        padding: 20px 0px;
        .age-group {
            display: flex;
            justify-content: space-around;
            .item {
                width: 143px;
                height: 207px;
                cursor: pointer;
                .logo {
                    width: 100%;
                    height: 140px;
                    border-radius: 12px;
                    transition: all ease 0.5s;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .icon {
                        width: 90%;
                        height: 80%;
                    }
                }
                .logo:hover {
                    box-shadow: 2px 8px 12px rgb(0 0 0 / 13%);
                    transform: translateY(-16px);
                }
                .active {
                    box-shadow: 2px 8px 12px rgb(0 0 0 / 13%);
                    transform: translateY(-16px);
                }
                .title {
                    text-align: center;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 20px;
                    margin: 16px 0 0;
                    color: rgba(0, 0, 0, 0.67);
                }
                    /* transform: translateY(-16px); */
            }
        }
        .topic {
            .item:hover {
                background-color: ${COLOR.colors.bg_colo_button_hover};
                box-shadow: 2px 8px 12px rgb(0 0 0 / 13%);
            }
        }
    }
`;
