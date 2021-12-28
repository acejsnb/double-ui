import { ReactNode } from 'react';
import { Props as InputProps } from '../input';

export interface SubmitParams {
    [key: string]: string
}
type Fn = () => void;

export interface Props {
    name?: string
    layout?: 'vertical' | 'horizontal'
    reset?: Fn
    submit?: (params: any) => void
    children?: ReactNode
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
    message: string
    check?: 'required' | 'phone' | 'email' | 'password' | 'passwordBetter' | 'passwordBest'
    validate?: (value: string, confirmValue?: string) => boolean
}

export interface ItemProps {
    label?: string
    name?: string
    confirm?: string
    className?: string
    rules?: Rule[]
    getFieldValue?: (key: string) => string | void
    children?: ReactNode
}

// ItemContext
export interface IItemContext {
    name?: string | undefined
    change(v: string): void
}

declare function FormInstance(props: Props): JSX.Element
type TypeForm = typeof FormInstance

interface FormInterface extends TypeForm {
    Item(props: ItemProps): JSX.Element
    Input(props: InputProps): JSX.Element
}

declare const Form: FormInterface;
export default Form;
