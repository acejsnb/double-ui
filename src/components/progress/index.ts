export interface Props {
    play: boolean
    running: boolean
    time?: number
    color?: string
    end?: () => void
}

declare function Progress(props: Props): JSX.Element

export default Progress;
