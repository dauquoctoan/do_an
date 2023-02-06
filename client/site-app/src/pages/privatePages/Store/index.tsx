import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import ApiClient from "../../../services";
import { formatNumber } from "../../../utils/formartNumber";
import Button from "@mui/material/Button";
import Pay from "./Pay";
import { useDispatch } from "react-redux";
import { openPay, setOrder } from "../../../store/features/info/infoSlice";


const Store = () => {
    const [store, setStore] = React.useState<any>([])
    const [open, setOpen] = React.useState(false)
    async function getData() {
        const res = await ApiClient.get('/site/courses')
        setStore(res.data)
    }
    const [total, setTotal] = React.useState<any>(0)

    React.useEffect(() => {
        getData()
    }, [])
    const dispatch = useDispatch()
    return (
        <SStore>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 4, md: 12 }}
            >
                {store.length > 0 && store?.map((_: any, index: any) => (
                    <Grid item xs={2} sm={2} md={4} key={index}>
                        <Card sx={{ maxWidth: "auto" }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={_.picture}
                                title="img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {_.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >{_.desc}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => {
                                    setTotal(_?.price)
                                    dispatch(setOrder(_))
                                    dispatch(openPay())
                                }}>Mua gói</Button>
                                <Button size="small">{formatNumber(_?.price)} USD</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pay total={total} open={open} />
        </SStore>
    );
};

export default Store;

const SStore = styled.div`
    width: 100%;
    height: auto;
    margin-top: 20px;
`;
