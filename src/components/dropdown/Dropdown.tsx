import './style.styl';
import React, { FC, useState, useRef } from 'react';

import Triangle from '@/assets/iconSvg/triangle.svg';
import TextEllipsis from '@/utils/TextEllipsis';

import Teleport from '../teleport/Teleport';
import { IProps as Props, Item } from './Types';

import DOption from './depend/DOption';

import ResetPosition from './depend/ResetPosition';

const Dropdown: FC<Props> = ({
    value = '',
    data = [],
    disabled = false,
    triangle = true,
    children,
    change = () => {},
    maxWidth = 180,
    openSearch = false,
    placeholder = '请搜索',
    alignRight = false,
    arrow = false,
    translateX = 0,
    maxCount = 5
}) => {
    const dropRef = useRef<HTMLDivElement>(null);
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
            maxWidth, maxCount, alignRight, data, tag: dropRef
        });
        setLeft(X);
        setTop(Y);
        setPosition(P);
        setShow(true);
    };
    const itemClick = (item: Item): void => {
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
                    Component={DOption}
                    left={left}
                    top={top}
                    position={position}
                    value={value}
                    data={data}
                    openSearch={openSearch}
                    placeholder={placeholder}
                    alignRight={alignRight}
                    arrow={arrow}
                    translateX={translateX}
                    maxWidth={maxWidth}
                    maxCount={maxCount}
                    show={show}
                    setShow={setShow}
                    change={itemClick}
                />
            )}
        </div>
    );
};

/* Dropdown.defaultProps = {
    data: [], // 数据列表
    value: '', // 选中的项
    maxWidth: 180, // 最大宽度
    triangle: true, // 是否显示右边三角形
    trigger: 'hover', // 通过点击或hover打开下拉列表
    openSearch: false,
    placeholder: '请搜索',
    alignRight: false, // 居右对齐
    arrow: false, // 显示右上角箭头
    translateX: 0, // X轴偏移量
    disabled: false, // 是否禁用
    maxCount: 5, // 下拉列表容纳最大条数
    change: () => {},
    children: ''
}; */

export default Dropdown;
