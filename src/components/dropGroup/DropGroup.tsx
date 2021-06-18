import './style.styl';
import React, { FC, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Triangle from '@/assets/iconSvg/triangle.svg';
import TextEllipsis from '@/utils/TextEllipsis';
import ResetPosition from './depend/ResetPosition';
import { IProps as Props } from './types';

import Teleport from '../teleport/Teleport';
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
            <div
                ref={triggerRef}
                className={['d-drop', 'd-drop-light', show && 'd-drop-show', disabled && 'd-drop-disabled'].join(' ')}
                onClick={openDrop}
            >
                <section className="d-drop-title">
                    <article className="d-drop-title-content" onMouseEnter={(e) => { TextEllipsis(e, ['ARTICLE']); }}>{children}</article>
                    {triangle && (
                        <article
                            className={['d-drop-triangle', !show && 'd-drop-triangle-rotate'].join(' ')}
                        >
                            <Triangle />
                        </article>
                    )}
                </section>
            </div>
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

export default DropGroup;

