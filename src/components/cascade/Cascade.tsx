import './style.styl';
import React, {
    FC, MouseEvent, useRef, useState, memo
} from 'react';
import { CSSTransition } from 'react-transition-group';
import Trigger from '@/components/trigger/Trigger';
import Teleport from '@/components/teleport/Teleport';
import { Item, Props } from './index';
import CDrop from './depend/CDrop';
import ResetPosition from './depend/ResetPosition';


const Cascade: FC<Props> = ({
    value = '',
    data = [],
    title = '',
    placeholder = '请选择',
    width = 120,
    border = true,
    disabled = false,
    triangle = true,
    reverse = false,
    maxCount = 5,
    change,
    children
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);
    // 是否已经挂载
    const [isMounted, setIsMounted] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState(true);
    // 选中的数据
    const [selectedName, setSelectedName] = useState('');
    const [selectedId, setSelectedId] = useState('');

    // 打开下拉列表弹窗
    const openDrop = (e: MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        const { X, Y, P } = ResetPosition({
            width, maxCount, data, reverse, tag: triggerRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        if (!isMounted) setIsMounted(true);
        setShow(true);
    };
    // 清除
    const clear = (e: MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        setSelectedName('');
        setSelectedId('');
    };

    // 点击每项
    const itemClick = (id: string, pid: string, item: Item | undefined) => {
        if (disabled) return;
        setShow(false);
        const { name = '' } = item as Item;
        setSelectedId(id);
        setSelectedName(name);
        change?.(id, pid, item);
    };

    return (
        <>
            <Trigger border={border} title={title} placeholder={placeholder} width={width} triangle={triangle} disabled={disabled} show={show} ref={triggerRef} click={openDrop} clear={clear}>{children || selectedName}</Trigger>
            <CSSTransition in={show} timeout={120} classNames={`d-transition-${position ? 'down' : 'up'}`}>
                <Teleport isMounted={isMounted} setShow={setShow}>
                    <div
                        className="d-cascade-container"
                        ref={dropRef}
                        style={{
                            [reverse ? 'right' : 'left']: `${left}px`,
                            top: `${top}px`
                        }}
                    >
                        <CDrop reverse={reverse} selectedId={selectedId} data={data} itemClick={itemClick} />
                    </div>
                </Teleport>
            </CSSTransition>
        </>
    );
};

export default memo(Cascade);
