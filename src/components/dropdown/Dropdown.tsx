import './style.styl';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal, unmountComponentAtNode } from 'react-dom';

import Triangle from '@/assets/iconSvg/triangle.svg';
import { IProps as Props, OptionProps, Item } from './Types';

import DOption from './depend/DOption';

import ResetPosition from './depend/ResetPosition';

let ele: HTMLDivElement;
const DropOption = (props: OptionProps) => {
    if (!ele) {
        ele = document.createElement('div');
        ele.style.position = 'absolute';
        ele.style.left = '0';
        ele.style.top = '0';
        ele.style.width = '100%';
        document.body.appendChild(ele);
    }
    useEffect(() => () => {
        unmountComponentAtNode(ele);
        document.body.removeChild(ele);
    }, []);
    return createPortal(<DOption {...props} />, ele);
};

const Dropdown = (props: Props) => {
    const dropRef = useRef(null);
    const {
        value, data, disabled, triangle, children, change,
        maxWidth = 180, openSearch, placeholder, alignRight = false, arrow,
        translateX, maxCount = 5
    } = props;
    // 是否创建了下拉弹窗
    const [hasDrop, setHasDrop] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState(true);

    const dropClick = () => {
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
            className={['d-drop', 'd-drop-light', show && 'd-drop-show', disabled && 'd-drop-disabled'].join(' ')}
            ref={dropRef}
            onClick={dropClick}
        >
            <section className="d-drop-title">
                <article className="d-drop-title-content">{children}</article>
                {triangle && (
                    <article
                        className={['d-drop-triangle', !show && 'd-drop-triangle-rotate'].join(' ')}
                    >
                        <Triangle />
                    </article>
                )}
            </section>
            {hasDrop && (
                <DropOption
                    left={left}
                    top={top}
                    position={position}
                    data={data}
                    value={value}
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

Dropdown.defaultProps = {
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
    change: () => { },
    children: ''
};

export default Dropdown;
