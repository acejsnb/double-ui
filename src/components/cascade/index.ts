import { ReactNode } from 'react';

export interface Item {
    id: string
    name: string
    [key: string]: any
    parentId?: string
    disabled?: boolean
    subhead?: string
    children?: Item[]
}

export interface LProps {
    id: string | undefined
    data: Item[]
    tier?: string
}

export interface Props {
    data: Item[]
    value?: string
    title?: string
    placeholder?: string
    width?: number
    maxCount?: number
    border?: boolean
    disabled?: boolean
    triangle?: boolean
    reverse?: boolean
    change?: (id: string, pid: string, item: Item | undefined) => void
    children?: ReactNode
}
export interface CProps {
    selectedId: string
    data: Item[]
    itemClick: (id: string, pid: string, item: Item | undefined) => void
    reverse?: boolean
}

declare function Cascade(props: Props): JSX.Element

export default Cascade;
