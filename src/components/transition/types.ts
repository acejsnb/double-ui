import { ReactElement } from 'react';

export interface Props {
    show: boolean
    setShow: (show: boolean) => void
    classHidden: string
    classPrefix: string
    children: ReactElement
}
