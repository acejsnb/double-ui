export interface Item {
    id: string
    name: string
    disabled?: boolean
    icon?: boolean
}

export interface OptionProps {
    data: Item[]
    value?: string | number
    openSearch?: boolean
    placeholder?: string
    alignRight?: boolean
    translateX?: string | number
    maxCount?: number
    change: (item: Item) => void
}

export interface IProps extends OptionProps {
    border?: boolean
    arrow?: boolean
    triangle?: boolean
    title?: string
    trigger?: string
    disabled?: boolean
    width?: number
}
