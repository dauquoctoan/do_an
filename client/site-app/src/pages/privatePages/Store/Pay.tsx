import React, { useEffect, useRef } from "react";
import { Button, Modal, Box } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import { COLOR } from "../../../constant";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";
import { RootState } from "../../../store";
import { openPay } from "../../../store/features/info/infoSlice";

const initialOptions = {
    "client-id": "AS_i2uLiydoHtBf9_XQYryvKyPzs7m9drLSg3in2B7wu_0nR4JJNUINhEseXFn-fwFsx7Xnw5G7lVz-Q",
    currency: "USD",
    intent: "capture",
};
const Pay = (props: any) => {
    const state = useSelector((state: RootState) => {
        return state.info.openPay
    })
    const dispatch = useDispatch()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            hideBackdrop
            closeAfterTransition
            onClose={() => { dispatch(openPay()) }}
            open={state}
        >
            <SBox>
                <PayPalScriptProvider options={initialOptions}>
                    <Checkout total={props.total} />
                </PayPalScriptProvider>
            </SBox>
        </Modal>
    );
};

export default Pay;

const SBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    border: 2px solid ${COLOR.primary.light};
    box-shadow: 24;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
`;
