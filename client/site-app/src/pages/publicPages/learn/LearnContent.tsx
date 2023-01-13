import React from "react";
import styled from "styled-components";
import Card from "./card";

interface IProps {
    type: string;
}

function renderCourse(type: string) {
    switch (type) {
        case "card":
            return <Card />;
        case "sort":
            return <Card />;
        default:
            return <></>;
    }
}
const LearnContent = ({ type }: IProps) => {
    return <SContent>{renderCourse(type)}</SContent>;
};

export default LearnContent;

const SContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`;
