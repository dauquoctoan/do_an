import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Grid from "@mui/material/Grid";

const Store = () => {
    return (
        <SStore>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 4, md: 12 }}
            >
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={2} md={4} key={index}>
                        <Card sx={{ maxWidth: "auto" }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image="https://fullstack.edu.vn/static/media/experienceOnboarding.70f0f8079522a9718859.png"
                                title="img"
                            />
                            <CardContent>
                                {/* <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography> */}
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Mua thêm gói để trải nghiệm đầy đủ các tính
                                    năng
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </SStore>
    );
};

export default Store;

const SStore = styled.div`
    width: 100%;
    height: auto;
    margin-top: 20px;
`;
