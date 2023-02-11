import React from "react";
import styled from "styled-components";
import Chat from "../chat";

const Challenge = () => {
    return (
        <SChallenge>
            <Chat />
        </SChallenge>
    );
};

export default Challenge;

const SChallenge = styled.div`
    width: 100%;
    height: 100%;
`;
