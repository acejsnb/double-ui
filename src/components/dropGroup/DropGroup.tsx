import './style.styl';
import React, {
    FC, memo, useRef, useState
} from 'react';
import { CSSTransition } from 'react-transition-group';

import Trigger from '../trigger/Trigger';
import Teleport from '../teleport/Teleport';
import ResetPosition from './depend/ResetPosition';
import { Props } from './index';
import DGroup from './depend/DGroup';

interface ClickItem {
    pid?: string
    id: string
    name: string | undefined
}

const DropGroup: FC<Props> = ({
    value,
    data,
    disabled,
    triangle = true,
    underline = false,
    maxWidth = 120,
    change = () => {},
    children
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);
    // 是否创建了下拉弹窗
    const [isMounted, setIsMounted] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState(true);
    const openDrop = () => {
        if (disabled) return;
        if (show) {
            setShow(false);
            return;
        }
        const { X, Y, P } = ResetPosition({
            maxWidth, data, tag: triggerRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        if (!isMounted) setIsMounted(true);
        setShow(true);
    };
    const itemClick = (item: ClickItem): void => {
        setShow(false);
        change(item);
    };

    return (
        <>
            <Trigger border={false} triangle={triangle} disabled={disabled} show={show} ref={triggerRef} click={openDrop}>{children}</Trigger>
            <CSSTransition in={show} timeout={120} classNames={`d-transition-${position ? 'down' : 'up'}`}>
                <Teleport isMounted={isMounted} setShow={setShow}>
                    <DGroup
                        ref={dropRef}
                        {...{
                            left,
                            top,
                            position,
                            value,
                            data,
                            underline,
                            maxWidth,
                            change: itemClick
                        }}
                    />
                </Teleport>
            </CSSTransition>
        </>
    );
};

export default memo(DropGroup);

