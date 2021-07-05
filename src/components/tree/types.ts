export interface ITag {
    name: string
    width?: number
}
export interface Item {
    id: string
    name: string
    open?: boolean
    defaultDisabled?: boolean
    showCheckbox?: boolean
    disabled?: boolean
    tag?: ITag
    sameId?: string
    children?: Item[]
}

export interface TileItem {
    id: string
    name: string
    parentId: string
    index: string
    checked: string
    sameId?: string
    paddingLeft: number
    defaultDisabled: boolean
    disabled: boolean
    lastNode: boolean
    omit: boolean
    open: boolean
    show: boolean
    showCheckbox: boolean
    omitStatus?: boolean
    tag: ITag
}

export interface IMultiple {
    item: TileItem
    checkedIds: string[]
    checkedData: TileItem[]
}

export interface Props {
    value?: string | string[]
    data: Item[]
    multiple?: boolean
    allCheckboxShow?: boolean
    lastStage?: boolean
    omit?: boolean
    notNull?: boolean
    includeParent?: boolean
    childDisable?: boolean
    jointParent?: boolean
    linkage?: boolean
    sameParams?: boolean | undefined
    sortByTree?: boolean
    change: (item: TileItem | IMultiple, status?: boolean) => void
    openNode?: (item: TileItem) => void
}

export interface StringAny {
    [key: string]: any
}
