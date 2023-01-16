import { Button, Popconfirm, Tooltip } from 'antd'
import { BiInfoCircle } from 'react-icons/bi'
import styled from 'styled-components'
import style from '../../configs/style'
import { COLOR } from '../../configs/theme'
import R from '../../utils/R'
import { IPropButtonAction } from './interface'

export const ButtonStyled = styled(Button)`
  :hover {
    transform: scale(1.02);
  }
  margin-left: 14px;
  /* background-color: ${style.colorText.primaryColor}; */
`

export const ButtonAdd = (props: {
  text: string
  onClick: any
  icon?: any
}) => {
  return (
    <ButtonStyled icon={props.icon} onClick={props.onClick}>
      {props.text}
    </ButtonStyled>
  )
}

export const ButtonAction = ({
  onClick,
  buttonDelete,
  buttonEdit,
  buttonDetail,
  confirm,
  isGift,
}: IPropButtonAction) => {
  const { Edit, Delete } = R.icons
  return (
    <WrapperButtonStyled>
      {buttonDetail && buttonDetail.tooltipTitle && (
        <Tooltip
          className="tooltip-detail"
          title={buttonDetail.tooltipTitle}
          color={buttonDetail.tooltipColor}
          placement={buttonDetail.tooltipPlacement}
        >
          <button
            onClick={() => onClick && onClick('detail')}
            disabled={buttonDetail.tooltipDisable}
            className="button"
          >
            <BiInfoCircle />
          </button>
        </Tooltip>
      )}
      {buttonEdit && (
        <Tooltip
          className="tooltip-edit"
          title={buttonEdit.tooltipTitle}
          color={buttonEdit.tooltipColor}
          placement={buttonEdit.tooltipPlacement}
        >
          <button
            onClick={() => onClick && onClick('edit')}
            disabled={buttonEdit.tooltipDisable}
            className="button"
          >
            <Edit className="icon" />
          </button>
        </Tooltip>
      )}
      {buttonDelete && (
        <Tooltip
          className="tooltip-delete"
          title={buttonDelete.tooltipTitle}
          color={buttonDelete.tooltipColor}
          placement={buttonDelete.tooltipPlacement}
        >
          <Popconfirm
            disabled={confirm ? false : true}
            placement="leftTop"
            title={confirm?.title}
            onConfirm={confirm?.handleConfirm}
            okText="Xóa"
            cancelText="Hủy"
          >
            <button
              onClick={() => onClick && onClick('delete')}
              disabled={buttonDelete.tooltipDisable}
              className="button"
            >
              <Delete className="icon" />
            </button>
          </Popconfirm>
        </Tooltip>
      )}
    </WrapperButtonStyled>
  )
}

const WrapperButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: ${style.font.large.size};
  }
  .button {
    border: none;
    border-radius: 50%;
    background-color: transparent;
    padding: 3px 4px;
    cursor: pointer;
  }
  .button:disabled,
  button[disabled] {
    border: none;
    background-color: transparent;
    color: none;
    width: auto;
    padding: 0px;
    color: ${style.colorText.primaryColor};
  }
  .tooltip-delete:hover {
    color: ${COLOR.errorColor};
  }
  .tooltip-edit:hover {
    color: ${COLOR.primaryColor};
  }
`
