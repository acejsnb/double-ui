import { ReactNode } from 'react';

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
    reverse?: boolean
    translateX?: string | number
    maxCount?: number
    change: (item: Item) => void
}

export interface Props extends OptionProps {
    border?: boolean
    arrow?: boolean
    triangle?: boolean
    title?: string
    trigger?: string
    className?: string
    disabled?: boolean
    width?: number
    children?: ReactNode
}

declare function Select(props: Props): JSX.Element

export default Select;
