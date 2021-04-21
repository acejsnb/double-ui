export interface Item {
    id: string
    name: string
    disabled?: boolean
    icon?: boolean
}

export interface Types {
    data: Item[]
    value?: string | number
    openSearch?: boolean
    placeholder?: string
    alignRight?: boolean
    arrow?: boolean
    translateX?: string | number
    maxCount?: number
    maxWidth?: number
    change: (item: Item) => void
}

export interface IProps extends Types {
    triangle?: boolean
    trigger?: string
    disabled?: boolean
}

export interface OptionProps extends Types {
    show: boolean
    left: number
    top: number
    position: boolean
    setShow: (show: boolean) => void
}
