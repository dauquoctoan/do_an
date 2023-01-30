import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
    SortableContainer,
    SortableElement,
    SortableContainerProps,
    SortableElementProps,
    SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import { RootState } from "store/store";
import { useDispatch } from "react-redux";
// import { setSortAnswers } from "store/lesson/lessonSlice";
import Tag from "antd/lib/tag";
import { COLOR } from "../../../../constant";
import { RootState } from "../../../../store";
import { setChose } from "../../../../store/features/learn/learnSlice";

interface ISortableHandleElement {
    children: React.ReactNode;
    className?: string;
}

interface ISortableItem extends SortableElementProps {
    children: React.ReactNode;
    className?: string;
}

interface ISortableContainer extends SortableContainerProps {
    children: React.ReactNode;
    className?: string;
}

const DndTrigger: React.ComponentClass<ISortableHandleElement, any> =
    SortableHandle(
        ({
            children,
            className,
        }: {
            children: React.ReactNode;
            className: string;
        }) => <div className={className || ""}>{children}</div>
    );

const DndItem: React.ComponentClass<ISortableItem, any> = SortableElement(
    ({
        children,
        className,
    }: {
        children: React.ReactNode;
        className: string;
    }) => <div className={className || ""}>{children}</div>
);

const DndList: React.ComponentClass<ISortableContainer, any> =
    SortableContainer(
        ({
            children,
            className,
        }: {
            children: React.ReactNode;
            className: string;
        }) => {
            return <div className={className || ""}>{children}</div>;
        }
    );
const DnD = () => {
    const dispatch = useDispatch();
    const mainLearn = useSelector((state: RootState) => {
        return state.mainLearn;
    });
    function getData() {
        if (!mainLearn.chose) {
            return mainLearn.data[mainLearn.index - 1].options;
        } else {
            return mainLearn.chose;
        }
    }
    const onSortEnd = ({
        oldIndex,
        newIndex,
    }: {
        oldIndex: number;
        newIndex: number;
    }): void => {
        dispatch(setChose(arrayMoveImmutable(getData(), oldIndex, newIndex)));
    };
    return (
        <IDND>
            <DndList
                lockAxis="xy"
                axis="xy"
                onSortEnd={onSortEnd}
                // useDragHandle
                className="itemsContainer"
            >
                {getData().map((value: any, index: number) => (
                    <DndItem key={`item-${index}`} index={index}>
                        <div className="item"> {value}</div>
                    </DndItem>
                ))}
            </DndList>
        </IDND>
    );
};

export default DnD;
const IDND = styled.div`
    width: 100%;
    height: auto;
    .itemsContainer {
        flex-wrap: wrap;
        display: flex;
        .item {
            padding: 15px 20px;
            border: 1px solid ${COLOR.colors.border_color};
            margin-left: 5px;
            border-radius: 4px;
            background-color: ${COLOR.colors.bg_colo_button};
            cursor: pointer;
            margin-bottom: 10px;
        }
        .item:hover {
            background-color: ${COLOR.colors.bg_colo_button_hover};
        }
    }
`;
