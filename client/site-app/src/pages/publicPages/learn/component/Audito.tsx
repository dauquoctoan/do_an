import React, { useState, useEffect } from "react";
import useAudio from "./useAudio";

const Player = ({ url }: any) => {
    const [playing, toggle] = useAudio(url);
    return (
        <div>
            <button
            // onClick={() => {
            //     toggle(!playing);
            // }}
            >
                {playing ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default Player;
