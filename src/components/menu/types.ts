import { Dispatch, ReactElement, ReactNode } from 'react';

export interface Item {
    id: string
    name: string
    icon?: ReactElement | string
    url?: string
    children?: Item[]
}
export type Params = {
    [key: string]: any
}
export interface Props {
    selectedIds: string[]
    openIds: string[]
    collapsed?: boolean
    click?: (params: Params) => void
    children?: ReactNode
}
export interface SubMenuProps {
    id: string
    menuId: string
    name: string
    icon?: ReactElement
    layout?: 'position' | 'tile'
    params?: Params
    // data?: Item[]
    children?: ReactNode
}
export interface ItemTitleProps {
    id: string
    menuId: string
    name: string
    hasChildNode: boolean
    mouseHandle(status: boolean): void
    icon?: ReactElement
    layout?: 'position' | 'tile'
    params?: Params
}

export interface ItemProps {
    id: string
    menuId: string
    params?: Params
    children?: ReactNode
}

type Action = {
    type: string
    payload: string | any
}
type State = {
    selectedIds: string[]
    openIds: string[]
    collapsed?: boolean
    click?: (params: Params) => void
}
export interface ContextProps {
    state: State
    dispatch: Dispatch<Action>
}
export type Reducer = (state: State, action: Action) => State
