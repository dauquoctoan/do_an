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

// import React, { useState, useEffect } from 'react'
// import { useTransition, animated } from '@react-spring/web'
// import shuffle from 'lodash.shuffle'
// import data from './data'

// import styles from './styles.module.css'

// function List() {
//   const [rows, set] = useState(data)
//   useEffect(() => {
//     const t = setInterval(() => set(shuffle), 2000)
//     return () => clearInterval(t)
//   }, [])

//   let height = 0
//   const transitions = useTransition(
//     rows.map(data => ({ ...data, y: (height += data.height) - data.height })),
//     {
//       key: (item: any) => item.name,
//       from: { height: 0, opacity: 0 },
//       leave: { height: 0, opacity: 0 },
//       enter: ({ y, height }) => ({ y, height, opacity: 1 }),
//       update: ({ y, height }) => ({ y, height }),
//     }
//   )

//   return (
//     <div className={styles.list} style={{ height }}>
//       {transitions((style, item, t, index) => (
//         <animated.div className={styles.card} style={{ zIndex: data.length - index, ...style }}>
//           <div className={styles.cell}>
//             <div className={styles.details} style={{ backgroundImage: item.css }} />
//           </div>
//         </animated.div>
//       ))}
//     </div>
//   )
// }

// export default function App() {
//   return <List />
// }

// export default [
//     {
//       name: 'Rare Wind',
//       description: '#a8edea → #fed6e3',
//       css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
//       height: 150,
//     },
//     {
//       name: 'Saint Petersburg',
//       description: '#f5f7fa → #c3cfe2',
//       css: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
//       height: 150,
//     },
//     {
//       name: 'Deep Blue',
//       description: '#e0c3fc → #8ec5fc',
//       css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
//       height: 200,
//     },
//     {
//       name: 'Ripe Malinka',
//       description: '#f093fb → #f5576c',
//       css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//       height: 140,
//     },
//     {
//       name: 'Near Moon',
//       description: '#5ee7df → #b490ca',
//       css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
//       height: 200,
//     },
//     {
//       name: 'Wild Apple',
//       description: '#d299c2 → #fef9d7',
//       css: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
//       height: 150,
//     },
//     {
//       name: 'Ladoga Bottom',
//       description: '#ebc0fd → #d9ded8',
//       css: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
//       height: 160,
//     },
//     {
//       name: 'Sunny Morning',
//       description: '#f6d365 → #fda085',
//       css: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
//       height: 140,
//     },
//     {
//       name: 'Lemon Gate',
//       description: '#96fbc4 → #f9f586',
//       css: 'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
//       height: 200,
//     },
//   ]
