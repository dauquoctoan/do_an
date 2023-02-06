import "./App.css";
import Router from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInfo, setlistCourse } from "./store/features/info/infoSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const info = localStorage.getItem("info");
        const lostOrder = localStorage.getItem("listOrder");
        if (info) {
            dispatch(setInfo(JSON?.parse(info || "")));
            dispatch(setlistCourse(JSON?.parse(lostOrder || "")))
        }
    }, []);
    return <Router />;
}

export default App;
