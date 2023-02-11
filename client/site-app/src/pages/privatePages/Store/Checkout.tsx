import React, { useState } from "react";
import "./Checkout.css";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ApiClient from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { message } from "antd";
import { openPay, setlistCourse } from "../../../store/features/info/infoSlice";

const Checkout = (props: any) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const state = useSelector((state: RootState) => {
        return state;
    });
    const dispatcher = useDispatch();
    const onCurrencyChange = ({ target: { value } }: any) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    };

    const onCreateOrder = (data: any, actions: any) => {
        if (props.total > 0) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: props.total,
                        },
                    },
                ],
            });
        }
    };
    async function order() {
        const rest: any = await ApiClient.put("/site/user-order", {
            _id: state.info.id,
            listCourse: [{ ...state.info.order }],
        });
        localStorage.setItem("listOrder", JSON.stringify(rest.data.listCourse));
        dispatcher(setlistCourse(rest.data.listCourse));
        message.success("Mua khóa học thành công");
        dispatcher(openPay(true));
    }
    const onApproveOrder = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            return order();
        });
    };

    return (
        <div className="checkout">
            {isPending ? (
                <p>LOADING...</p>
            ) : (
                <>
                    {/* <select value={currency} onChange={onCurrencyChange}>
                        <option value="USD">💵 USD</option>
                        <option value="EUR">💶 Euro</option>
                    </select> */}
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) =>
                            onCreateOrder(data, actions)
                        }
                        onApprove={(data, actions) =>
                            onApproveOrder(data, actions)
                        }
                    />
                </>
            )}
        </div>
    );
};

export default Checkout;
