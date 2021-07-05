import { MouseEvent } from 'react';

export interface Props {
    width?: number
    title?: string
    placeholder?: string
    text?: string
    disabled?: boolean
    show?: boolean
    border?: boolean
    triggerClick(e: MouseEvent): void
}
