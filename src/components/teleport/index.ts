import { ReactNode } from 'react';

export interface Props {
    isMounted: boolean
    setShow?: (show: boolean) => void
    children?: ReactNode
}

declare function Teleport(props: Props): JSX.Element | null

export default Teleport;
