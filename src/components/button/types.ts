type Fn = () => void;

export type Props = {
    type?: 'default' | 'blue' | 'green' | 'orange' | 'red' | 'word'
    size?: string
    htmlType?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    width?: number
    click?: Fn
}
