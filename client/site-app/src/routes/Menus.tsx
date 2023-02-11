import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonPinIcon from "@mui/icons-material/PersonPin";

const Menus = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState<number>(0);
    const menus = [
        {
            name: "Thông tin cá nhân",
            path: "/",
            image: <PersonPinIcon className="icon" />,
        },
        {
            name: "Thử thách",
            path: "/challenge",
            image: <HourglassDisabledIcon className="icon" />,
        },
        {
            name: "Chủ đề",
            path: "/topic",
            image: <MenuBookIcon className="icon"></MenuBookIcon>,
        },
        {
            name: "Bảng xếp hạng",
            path: "/top",
            image: <EmojiEventsIcon className="icon"></EmojiEventsIcon>,
        },
        {
            name: "Cửa hàng",
            path: "/store",
            image: <StoreOutlinedIcon className="icon"></StoreOutlinedIcon>,
        },
        {
            name: "Sự kiện",
            path: "/event",
            image: <DateRangeIcon className="icon" />,
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
                            navigate("/learn" + item.path);
                        }}
                        className={i === index ? "item active" : "item"}
                    >
                        {item.image}
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Menus;
