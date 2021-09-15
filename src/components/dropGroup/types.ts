import { ReactNode } from 'react';

export interface Item {
    id: string
    name?: string
}

export interface IItem extends Item{
    disabled?: boolean
    children?: Item[]
}

export interface Types {
    value?: string | number
    data: IItem[]
    maxCount?: number
    maxWidth?: number
    change(item: { pid?: string; id: string; name?: string }): void
}

export interface Props extends Types {
    triangle?: boolean
    trigger?: string
    disabled?: boolean
    underline?: boolean
    children?: ReactNode
}

export interface OptionProps extends Types {
    left: number
    top: number
    position: boolean
    underline?: boolean
}
