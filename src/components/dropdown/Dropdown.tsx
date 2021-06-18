import './style.styl';
import React, { FC, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import Triangle from '@/assets/iconSvg/triangle.svg';
import TextEllipsis from '@/utils/TextEllipsis';

import Teleport from '@/components/teleport/Teleport';
import { IProps as Props, Item } from './types';

import DOption from './depend/DOption';
import ResetPosition from './depend/ResetPosition';

const Dropdown: FC<Props> = ({
    value = '',
    data = [],
    disabled = false,
    triangle = true,
    children,
    change = () => {},
    maxWidth = 120,
    openSearch = false,
    placeholder = '请搜索',
    alignRight = false,
    arrow = false,
    translateX = 0,
    maxCount = 5
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
    const openDrop = () => {
        if (disabled) return;
        const { X, Y, P } = ResetPosition({
            maxWidth, maxCount, alignRight, data, tag: triggerRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        if (!isMounted) setIsMounted(true);
        setShow(true);
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
                    <DOption
                        ref={dropRef}
                        {...{
                            left,
                            top,
                            position,
                            value,
                            data,
                            openSearch,
                            placeholder,
                            alignRight,
                            arrow,
                            translateX,
                            maxWidth,
                            maxCount,
                            change: itemClick
                        }}
                    />
                </Teleport>
            </CSSTransition>
        </>
    );
};

export default Dropdown;
