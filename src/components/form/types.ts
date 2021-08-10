export interface SubmitParams {
    [key: string]: string
}
type Fn = () => void;

export interface Props {
    name?: string
    layout?: 'vertical' | 'horizontal'
    reset?: Fn
    submit?: (params: { [key: string]: string }) => void
}

export interface CheckList {
    [key: string]: boolean
}

export interface IFormContext {
    params: SubmitParams
    openCheck: boolean
    isReset: boolean
    setCheckList(key: string, v: boolean): void
    setParam(name: string, v: string): void
}

export interface Rule {
    check?: 'required' | 'phone' | 'email' | 'password' | 'passwordBetter' | 'passwordBest'
    validate?: (value: string, confirmValue: string) => boolean
    message: string
}

export interface ItemProps {
    label?: string
    name?: string
    confirm?: string
    className?: string
    rules?: Rule[]
    getFieldValue?: (key: string) => string | void
}

// ItemContext
export interface IItemContext {
    name?: string | undefined
    change(v: string): void
}
