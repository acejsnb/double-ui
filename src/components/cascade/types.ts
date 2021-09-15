import { ReactNode } from 'react';

export interface Item {
    parentId?: string
    id: string
    name: string
    disabled?: boolean
    subhead?: string
    [key: string]: any
    children?: Item[]
}

export interface LProps {
    id: string | undefined
    tier?: string
    data: Item[]
}

export interface Props {
    value?: string
    title?: string
    placeholder?: string
    width?: number
    maxCount?: number
    border?: boolean
    disabled?: boolean
    triangle?: boolean
    reverse?: boolean
    data: Item[]
    change?: (id: string, pid: string, item: Item | undefined) => void
    children?: ReactNode
}
export interface CProps {
    reverse?: boolean
    selectedId: string
    data: Item[]
    itemClick: (id: string, pid: string, item: Item | undefined) => void
}
