type Fn = () => void;

export type Props = {
    type?: string
    size?: string
    htmlType?: 'button' | 'submit' | 'reset' | undefined
    disabled?: boolean
    loading?: boolean
    width?: number
    click?: Fn
}
