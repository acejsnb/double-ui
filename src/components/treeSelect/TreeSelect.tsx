import './style.styl';
import React, {
    useRef, useState, MouseEvent, useEffect, memo, useCallback
} from 'react';
import { CSSTransition } from 'react-transition-group';

import Trigger from '../trigger/Trigger';
import Tree from '../tree/Tree';
import Teleport from '../teleport/Teleport';
import ResetPosition from './ResetPosition';

import { Props, TileItem, IMultiple } from './index';

function TreeSelect({
    data, value = '', name = '', multiple = false,
    omit = false, sameParams = false,
    sortByTree = false, disabled = false,
    change, openNode
}: Props) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);
    const [selectId, setSelectId] = useState('');
    const [text, setText] = useState('');

    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState(true);

    const openDrop = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        const { X, Y, P } = ResetPosition({
            data, tag: triggerRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        if (!isMounted) setIsMounted(true);
        setShow(true);
    }, [triggerRef, isMounted]);
    const itemClick = useCallback((item: TileItem | IMultiple) => {
        // if (multiple) {
        // } else {
        // }
        setSelectId((item as TileItem).id);
        setText((item as TileItem).name);
        setShow(false);
        change(item);
    }, []);
    useEffect(() => {
        setSelectId(value as string);
    }, [value]);
    useEffect(() => {
        setText(name as string);
    }, [name]);

    return (
        <>
            <Trigger border={false} show={show} ref={triggerRef} click={openDrop}>{text}</Trigger>
            <CSSTransition in={show} timeout={120} classNames={`d-transition-${position ? 'down' : 'up'}`}>
                <Teleport isMounted={isMounted} setShow={setShow}>
                    <div
                        ref={dropRef}
                        className="d-tree-select-container"
                        style={{
                            left: `${left}px`,
                            top: `${top}px`
                        }}
                    >
                        <Tree
                            {...{
                                value: selectId,
                                data,
                                multiple,
                                omit,
                                sameParams,
                                sortByTree,
                                change: itemClick,
                                openNode
                            }}
                        />
                    </div>
                </Teleport>
            </CSSTransition>
        </>
    );
}

export default memo(TreeSelect);
