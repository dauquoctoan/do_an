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

const Topic = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = React.useState<any[]>([]);
    async function getData() {
        const res = await getTopics({});
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
    }, []);

    return (
        <STopic>
            <div className="container">
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
                                                            primary={part.title}
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
        </STopic>
    );
};

export default Topic;

const STopic = styled.div`
    width: 100%;
    height: auto;
    .container {
        padding: 20px 0px;
    }
    .item:hover {
        background-color: ${COLOR.colors.bg_colo_button_hover};
    }
`;
