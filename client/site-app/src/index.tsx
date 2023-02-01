import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import GlobalStyle from "./globalStyled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COLOR } from "./constant";
import { Provider } from "react-redux";
import store from "./store";
import "moment/locale/vi";
import "antd/dist/antd.variable.min.css";
import { Styles } from "./pages/publicPages/SurveySheet/styles/styles";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const theme = createTheme({
    palette: COLOR,
});

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
            <GlobalStyle />
            <Styles />
            <ToastContainer />
        </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
