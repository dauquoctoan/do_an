import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { history } from "../utils/history";

const Menus = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState<number>(0);
    const menus = [
        {
            name: "Học",
            path: "/learn",
            image: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg",
        },
        {
            name: "Giải trí",
            path: "/learn?id=10",
            image: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg",
        },
        {
            name: "Bảng xếp hạng",
            path: "/learn",
            image: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg",
        },
        {
            name: "Cửa hàng",
            path: "/learn",
            image: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg",
        },
    ];

    return (
        <div className="menu_left">
            {menus.map((item, i) => {
                return (
                    <div
                        key={i}
                        onClick={() => {
                            setIndex(i);
                            navigate(item.path);
                        }}
                        className={i === index ? "item active" : "item"}
                    >
                        <img src={item.image} alt="logo" />
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Menus;
