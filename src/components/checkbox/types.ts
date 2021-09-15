import { ReactNode } from 'react';

export interface Props {
    checked?: string
    disabled?: boolean
    stopPropagation?: boolean
    change?: (status: string, other: any) => void
    [key: string]: any
    children?: ReactNode
}
