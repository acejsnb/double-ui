import { JSXElementConstructor, ReactElement } from 'react';

export interface Params {
    [key: string]: string
}
type Fn = () => void;

export interface Props {
    name?: string
    layout?: string
    reset?: Fn
    cancel?: Fn
    submit?: (params: Params) => void
}

export interface IFormContext {
    setParam(name: string, value: string, checked: boolean): void
    cancel(): void
    reset(): void
    submit(): void
    checkName: string
    isReset: boolean
}

export interface ParamItemValue {
    key: string
    value: string
    checked: boolean
}
export interface ParamItem {
    [key: string]: ParamItemValue
}

interface Rules {
    message: string
    [key: string]: any
}

export interface ItemProps {
    label?: string
    name?: string
    message?: string
    className?: string
    rules?: Rules[]
    formValues?: (name: string, value: string) => void
}
export interface IForm<T> {
    Item: T
}

export interface ItemContext {
    message?: string
    value?: string
    setValue: (v: string) => void
}

export type TChild = ReactElement<any, string | JSXElementConstructor<any>>;
