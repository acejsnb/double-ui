export interface Props {
    show: boolean
    esc?: boolean
    shade?: boolean
    title?: string
    mode?: string
    close(): void
    confirm(): void
}
