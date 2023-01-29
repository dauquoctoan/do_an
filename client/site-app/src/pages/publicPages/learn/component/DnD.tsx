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
    // const answers: any = useSelector((state: RootState) => {
    //     return state.lessonReducer.content.answers;
    // });

    const [answers, setState] = useState<any[]>([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 1",
        "Item 5",
    ]);

    const onSortEnd = ({
        oldIndex,
        newIndex,
    }: {
        oldIndex: number;
        newIndex: number;
    }): void => {
        answers &&
            // dispatch();
            // setSortAnswers(arrayMoveImmutable(answers, oldIndex, newIndex))
            setState(arrayMoveImmutable(answers, oldIndex, newIndex));
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
                {answers &&
                    answers.map((value: any, index: number) => (
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
