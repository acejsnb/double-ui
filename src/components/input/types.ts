export interface Props {
    defaultValue?: string
    type?: string
    placeholder?: string
    errText?: string
    maxLength?: number
    width?: number
    disabled?: boolean
    input?: (str: string) => void
    change?: (str: string) => void

    isReset?: boolean
    value?: string
    setValue?: (str: string) => void
}
