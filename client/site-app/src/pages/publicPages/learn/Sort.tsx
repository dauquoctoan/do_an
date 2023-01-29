import React from "react";
import styled from "styled-components";
import { COLOR } from "../../../constant";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setChose } from "../../../store/features/learn/learnSlice";
import DnD from "./component/DnD";

const Sort = () => {
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => state.mainLearn);

    return (
        <SSort>
            <div className="wrapper">
                <div className="wrapper-item">
                    <DnD />
                </div>
            </div>
        </SSort>
    );
};

export default Sort;

const SSort = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
        .wrapper-item {
            height: auto;
            display: flex;
            margin-bottom: 50px;
        }
    }
`;
