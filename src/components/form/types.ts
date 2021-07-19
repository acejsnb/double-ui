import { JSXElementConstructor, ReactElement } from 'react';

export interface Params {
    [key: string]: any
}
type Fn = () => void;

export interface Props {
    layout?: string
    reset?: Fn
    cancel?: Fn
    confirm?: (params: Params) => void
}

export interface IFormContext {
    setParam(name: string, value: string, checked: boolean): void
    cancel(): void
    reset(): void
    confirm(): void
    checkName: string
    isReset: boolean
}

export interface ParamItem {
    key: string
    value: string
    checked: boolean
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
    value?: string
    setValue: (v: string) => void
}

export type TChild = ReactElement<any, string | JSXElementConstructor<any>>;
