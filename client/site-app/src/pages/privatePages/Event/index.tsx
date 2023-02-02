import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApiClient from "../../../services";

const Event = () => {
    const [event, setEvent] = React.useState<any>([]);
    async function getData() {
        const res = await ApiClient.get("/site/news-event");
        if (res) {
            setEvent(res.data);
        }
    }
    React.useEffect(() => {
        getData();
    }, []);
    return (
        <SEvent>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 4, md: 8 }}
            >
                {event.length > 0 &&
                    event.map((_: any, index: any) => (
                        <Grid item xs={2} sm={2} md={4} key={index}>
                            <Card sx={{ maxWidth: "auto" }}>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image={_.picture}
                                    title="img"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {_.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {_.title}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">
                                        <a href={_.link}>Xem</a>
                                    </Button>
                                    {/* <Button size="small">Learn More</Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </SEvent>
    );
};

export default Event;

const SEvent = styled.div`
    width: 100%;
    height: auto;
    margin-top: 20px;
`;
