import React from "react";
import styled from "styled-components";
import Sort from "./Sort";

interface IProps {
    type: string;
}

function renderCourse(type: string) {
    switch (type) {
        case "card":
            return <Sort />;
        case "sort":
            return <Sort />;
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
    padding: 100px 10px 10px 10px;
`;
