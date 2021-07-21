export interface Props {
    show: boolean
    esc?: boolean
    shade?: boolean
    footer?: boolean
    title?: string
    mode?: string
    close?: () => void
    confirm?: () => void
}
