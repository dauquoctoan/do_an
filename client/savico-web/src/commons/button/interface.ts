export interface IPropButton {}

export interface ITooltip {
  activeTooltip?: boolean
  tooltipTitle?: string
  tooltipColor?: string
  tooltipDisable?: boolean
  tooltipPlacement?:
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftBottom'
    | 'leftTop'
    | 'right'
    | 'rightBottom'
    | 'rightTop'
    | 'topLeft'
    | 'topRight'
}
export interface IPropButtonAction {
  buttonEdit?: ITooltip
  buttonDelete?: ITooltip
  buttonDetail?: ITooltip
  popConfirm?: string
  isGift?: boolean
  onClick?: (e: 'delete' | 'edit' | 'detail') => void
  confirm?: {
    title: string
    handleConfirm: () => void
  }
}
