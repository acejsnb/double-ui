import { ReactElement, ReactNode } from 'react';

export interface TipProps {
    type?: 'info' | 'error' | 'warn'
    title?: string
}
export interface Props extends TipProps {
    show: boolean
    esc?: boolean
    shade?: boolean
    confirmBtnLoading?: boolean
    header?: boolean | ReactElement
    footer?: boolean | ReactElement
    title?: string
    mode?: 'default' | 'small' | 'middle' | 'large' | 'tip'
    close?: () => void
    confirm?: () => void
    children?: ReactNode
}

declare function Modal(props: Props): JSX.Element

export default Modal;
