import { ReactElement } from 'react';

export interface Props {
    show: boolean
    setShow: (show: boolean) => void
    timeout: number
    classPrefix: string
    children: ReactElement
}
