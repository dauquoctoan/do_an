import React from "react";
import styled from "styled-components";
import { type_key } from "../../../constant";
import Card from "./card";
import CardNoImage from "./CardNoImage";
import ChoseAPair from "./ChoseAPair";
import Sort from "./Sort";

interface IProps {
    type: string;
}

function renderCourse(type: string) {
    switch (type) {
        case type_key.choose_a_pair:
            return <ChoseAPair />;
        case type_key.sort:
            return <Sort />;
        case type_key.choose_one_of_4_image:
            return <Card />;
        case type_key.choose_one_of_4:
            return <CardNoImage />;
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
