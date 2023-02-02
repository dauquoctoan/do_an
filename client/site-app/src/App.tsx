import "./App.css";
import Router from "./routes";
// import ReactAudioPlayer from "react-audio-player";
import { audio } from "./constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInfo } from "./store/features/info/infoSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const info = localStorage.getItem("info");
        dispatch(setInfo(JSON.parse(info || "")));
    }, []);
    return <Router />;
    // return <div>sdfsdf<ReactAudioPlayer  src={audio.correct}/></div>
}

export default App;
