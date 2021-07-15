type Fn = () => void;

export type Props = {
    type?: string
    size?: string
    handleType?: string
    disabled?: boolean
    loading?: boolean
    width?: number
    click?: Fn
}
