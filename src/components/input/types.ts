export interface Props {
    defaultValue?: string
    type?: string
    placeholder?: string
    message?: string
    maxLength?: number
    width?: number
    disabled?: boolean
    input?: (str: string) => void

    isReset?: boolean
    setValue?: (val: string) => void
}
