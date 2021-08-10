export interface Props {
    defaultValue?: string
    type?: string
    placeholder?: string
    message?: string
    name?: string
    maxLength?: number
    width?: number
    disabled?: boolean
    isReset?: boolean
    change?: (str: string) => void
}
