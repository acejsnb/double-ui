export interface Item {
    id: string
    name: string
    disabled?: boolean
    icon?: boolean
}

export interface Props {
    data: Item[]
    value?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    openSearch?: boolean
    placeholder?: string
    alignRight?: boolean
    arrow?: boolean
    translateX?: string | number
    maxCount?: string | number
    change: (item: Item) => void
}

export interface IProps extends Props {
    triangle?: boolean
    trigger?: string
    disabled?: boolean
    children?: any
}

export interface OptionProps extends Props {
    show: boolean
    left: number
    top: number
}
