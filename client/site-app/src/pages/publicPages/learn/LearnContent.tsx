import React from "react";
import styled from "styled-components";
import Card from "./card";
import { IDataItem } from "./interface";

interface IProps {
    handleSelect: (status: boolean) => void;
    data: IDataItem;
}

function renderCourse(data: IDataItem, handleSelect: (status: any) => void) {
    switch (data.type) {
        case "card":
            return <Card handleSelect={handleSelect} data={data} />;
        case "sort":
            return <Card handleSelect={handleSelect} data={data} />;
        default:
            return <></>;
    }
}
const LearnContent = ({ data, handleSelect }: IProps) => {
    return <SContent>{renderCourse(data, handleSelect)}</SContent>;
};

export default LearnContent;

const SContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`;
