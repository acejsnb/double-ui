import './style.styl';
import React, {
    FC, useRef, useState
} from 'react';

import Triangle from '@/assets/iconSvg/triangle.svg';
import TextEllipsis from '@/utils/TextEllipsis';
import ResetPosition from './depend/ResetPosition';
import { IProps as Props } from './Types';

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
    maxWidth = 180,
    change,
    children
}) => {
    const dropRef = useRef(null);
    // 是否创建了下拉弹窗
    const [hasDrop, setHasDrop] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState(true);
    const openDrop = () => {
        if (disabled) return;
        if (!hasDrop) setHasDrop(true);
        const { X, Y, P } = ResetPosition({
            maxWidth, data, tag: dropRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        setShow(true);
    };
    const itemClick = (item: ClickItem): void => {
        setShow(false);
        change(item);
    };

    return (
        <div
            ref={dropRef}
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
            {hasDrop && (
                <Teleport
                    Component={DGroup}
                    show={show}
                    left={left}
                    top={top}
                    position={position}
                    setShow={setShow}
                    change={itemClick}
                    value={value}
                    data={data}
                />
            )}
        </div>
    );
};

export default DropGroup;

