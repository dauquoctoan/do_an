import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
  SortableContainer,
  SortableElement,
  SortableContainerProps,
  SortableElementProps,
  SortableHandle,
} from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { useDispatch } from 'react-redux'
import { setSortAnswers } from 'store/lesson/lessonSlice'
import Tag from 'antd/lib/tag'

interface ISortableHandleElement {
  children: React.ReactNode
  className?: string
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode
  className?: string
}

interface ISortableContainer extends SortableContainerProps {
  children: React.ReactNode
  className?: string
}

const DndTrigger: React.ComponentClass<ISortableHandleElement, any> =
  SortableHandle(
    ({
      children,
      className,
    }: {
      children: React.ReactNode
      className: string
    }) => <div className={className || ''}>{children}</div>
  )

const DndItem: React.ComponentClass<ISortableItem, any> = SortableElement(
  ({
    children,
    className,
  }: {
    children: React.ReactNode
    className: string
  }) => <div className={className || ''}>{children}</div>
)

const DndList: React.ComponentClass<ISortableContainer, any> =
  SortableContainer(
    ({
      children,
      className,
    }: {
      children: React.ReactNode
      className: string
    }) => {
      return <div className={className || ''}>{children}</div>
    }
  )
const DnD = (props: any) => {
  const dispatch = useDispatch()
  const answers: any = useSelector((state: RootState) => {
    return state.lessonReducer.content.answers
  })

  // const [state, setState] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }): void => {
    answers &&
      dispatch(setSortAnswers(arrayMoveImmutable(answers, oldIndex, newIndex)))
  }
  return (
    <IDND>
      <DndList
        lockAxis="xy"
        axis="xy"
        onSortEnd={onSortEnd}
        useDragHandle
        className="itemsContainer"
      >
        {answers &&
          answers.map((value: any, index: number) => (
            <DndItem key={`item-${index}`} index={index} className="item">
              <Tag className="tag-item" color="success">
                <DndTrigger>{value}</DndTrigger>
              </Tag>
              <span
                onClick={() => {
                  const newAnswer = [...answers]
                  if (index > -1) {
                    newAnswer.splice(index, 1)
                  }
                  dispatch(setSortAnswers(newAnswer))
                }}
                className="close"
              >
                x
              </span>
            </DndItem>
          ))}
      </DndList>
    </IDND>
  )
}

export default DnD
const IDND = styled.div`
  width: 100%;
  height: auto;
  .itemsContainer {
    flex-wrap: wrap;
    display: flex;
    .item {
      margin-top: 10px;
      margin-left: 10px;
      justify-content: center;
      align-items: center;
      display: flex;
      .tag-item {
        cursor: pointer;
        display: flex;
      }
      .close:hover {
        color: red;
      }
      .close {
        display: none;
        margin-left: 3px;
        color: black;
        cursor: pointer;
      }
    }
    .item:hover .close {
      display: block;
    }
  }
`
