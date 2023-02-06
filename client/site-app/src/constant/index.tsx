import { createTheme } from "@mui/material/styles";
import diamon from "../public/img/diamon.svg";
import logo from "../public/img/logo.svg";
import fireworks from "../public/img/fireworks.svg";
import correct from "../public/audio/correct.mp3";
import success from "../public/audio/success.mp3";


export const audio = {
    correct: correct,
    success: success,
    logo: logo,
};

export const images = {
    diamon: diamon,
    logo: logo,
    firework: fireworks,
};

export const COLOR = {
    primary: {
        light: "#f47425",
        main: "#f47425",
        dark: "#f05123",
        contrastText: "#fff",
    },
    secondary: {
        light: "#ff7961",
        main: "#f47425",
        dark: "#f05123",
        contrastText: "#000",
    },
    colors: {
        primary_color: "#f05123",
        black_color: "#000",
        white_color: "#fff",
        gray_color: "#666",
        text_color: "#333",
        plum_color: "#b80257",
        fb_color: "#4080ff",
        mail_color: "#f47425",
        invalid_color: "#0e0e0e",
        desc_color: "#0000008a",
        first_color: "#1dbfaf",
        second_color: "#1dbfaf",
        button_color: "#1dbfaf",
        success_color: "#2e7d32",
        error_color: "#d32f2f",
        border_color: "#e8ebed",
        bg_colo_button: "#f6f6f6",
        bg_colo_button_hover: "#ededed",
    },
};
interface IConst {
    [key: string]: string;
}

export const TYPE_LESSON: IConst = {
    1: "Chọn một trong 4 đáp án, có hình ảnh",
    2: "Chọn một trong 4 đáp án",
    3: "Nối các cặp câu",
    4: "Sắp xếp các từ thành câu",
};

export const type_key: {
    choose_one_of_4_image: string;
    choose_one_of_4: string;
    choose_a_pair: string;
    sort: string;
} = {
    choose_one_of_4_image: "1",
    choose_one_of_4: "2",
    choose_a_pair: "3",
    sort: "4",
};
