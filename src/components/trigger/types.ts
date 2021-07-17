import {
    JSXElementConstructor, MouseEvent, ReactElement, ReactNode
} from 'react';

export interface Props {
    width?: number
    title?: string
    placeholder?: string
    triangle?: boolean
    disabled?: boolean
    show?: boolean
    border?: boolean
    clearIcon?: boolean
    click?: (e: MouseEvent) => void
    clear?: (e: MouseEvent) => void
    children?: ReactElement<any, string | JSXElementConstructor<any>> | ReactNode | string | number | null | undefined
}
