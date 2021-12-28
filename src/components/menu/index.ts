import { Dispatch, ReactElement, ReactNode } from 'react';

export interface IItem {
    id: string
    name: string
    icon?: ReactElement | string
    url?: string
    children?: IItem[]
}
export type Params = {
    [key: string]: any
}
export interface Props {
    selectedIds: string[]
    openIds: string[]
    collapsed?: boolean
    click?: (params: any) => void
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

declare function MenuInstance(props: Props): JSX.Element
type TypeMenu = typeof MenuInstance
interface MenuInterface extends TypeMenu {
    SubMenu(props: SubMenuProps): JSX.Element
    Item(props: ItemProps): JSX.Element
}
declare const Menu: MenuInterface;

export default Menu;
