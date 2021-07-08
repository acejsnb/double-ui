import './style.styl';
import React, {
    FC, useState, useRef, MouseEvent, useEffect
} from 'react';
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
    const openDrop = (e: MouseEvent) => {
        e.stopPropagation();
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
            <div className={['d-drop', 'd-drop-light', show && 'd-drop-show', disabled && 'd-drop-disabled'].join(' ')}>
                <section className="d-drop-title" ref={triggerRef} onClick={openDrop}>
                    <article className="d-drop-title-content" onMouseEnter={(e) => { TextEllipsis(e, ['ARTICLE']); }}>{children}</article>
                    {triangle && (
                        <article
                            className={['d-drop-triangle', !show && 'd-drop-triangle-rotate'].join(' ')}
                        >
                            <Triangle />
                        </article>
                    )}
                </section>
                {show && <section className="d-drop-shade" />}
            </div>
            <CSSTransition in={show} timeout={120} classNames={`d-transition-${position ? 'down' : 'up'}`}>
                <Teleport isMounted={isMounted} setShow={setShow}>
                    <div
                        ref={dropRef}
                        className={[
                            'd-drop-content',
                            'd-drop-content-light',
                            arrow && (position ? 'd-drop-content-top-arrow' : 'd-drop-content-bottom-arrow')
                        ].join(' ')}
                        style={{
                            left: `${left}px`,
                            top: `${top}px`,
                            maxWidth: `${maxWidth}px`
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

export default Dropdown;
