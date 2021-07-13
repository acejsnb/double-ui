import './style.styl';
import React, {
    FC, useState, useRef, MouseEvent
} from 'react';
import { CSSTransition } from 'react-transition-group';

import Trigger from '@/components/trigger/Trigger';
import Teleport from '@/components/teleport/Teleport';
import { IProps as Props, Item } from './types';

import DOption from './depend/DOption';
import ResetPosition from './depend/ResetPosition';

const Select: FC<Props> = ({
    value = '',
    data = [],
    title = '',
    width = 120,
    border = true,
    disabled = false,
    triangle = true,
    children,
    change = () => {},
    openSearch = false,
    placeholder = '请搜索',
    alignRight = false,
    arrow = false,
    translateX = 0,
    maxCount = 5,
    className
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState(true);

    const itemClick = (item: Item): void => {
        setShow(false);
        change(item);
    };
    const openDrop = (e: MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        const { X, Y, P } = ResetPosition({
            width, maxCount, alignRight, data, tag: triggerRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        if (!isMounted) setIsMounted(true);
        setShow(true);
    };
    // 清除选中
    const clear = (e: MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        change({ id: '', name: '' });
    };

    return (
        <>
            <Trigger border={border} title={title} width={width} triangle={triangle} disabled={disabled} show={show} ref={triggerRef} click={openDrop} clear={clear}>{children}</Trigger>
            <CSSTransition in={show} timeout={120} classNames={`d-transition-${position ? 'down' : 'up'}`}>
                <Teleport isMounted={isMounted} setShow={setShow}>
                    <div
                        ref={dropRef}
                        className={[
                            'd-drop-content',
                            'd-drop-content-light',
                            arrow && (position ? 'd-drop-content-top-arrow' : 'd-drop-content-bottom-arrow'),
                            className
                        ].join(' ')}
                        style={{
                            left: `${left}px`,
                            top: `${top}px`,
                            width: `${width}px`
                        }}
                    >
                        <DOption
                            {...{
                                value,
                                data,
                                openSearch,
                                placeholder,
                                alignRight,
                                translateX,
                                maxCount,
                                change: itemClick
                            }}
                        />
                    </div>
                </Teleport>
            </CSSTransition>
        </>
    );
};

export default Select;
