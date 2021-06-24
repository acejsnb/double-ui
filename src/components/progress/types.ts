export interface Props {
    play: boolean
    running: boolean
    time?: number
    color?: string
    end?: () => void
}
