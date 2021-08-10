type Fn = () => void;

export type Props = {
    type?: string
    size?: string
    htmlType?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    width?: number
    click?: Fn

    cancel?: Fn
    reset?: Fn
    submit?: Fn
}
