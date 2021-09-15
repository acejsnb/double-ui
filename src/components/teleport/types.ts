import { ReactNode } from 'react';

export interface Props {
    isMounted: boolean
    setShow?: (show: boolean) => void
    children?: ReactNode
}
