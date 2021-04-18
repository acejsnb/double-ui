import './style.styl';
import React, { useState, useRef, useEffect, createElement } from 'react';
import { createPortal, unmountComponentAtNode, render } from 'react-dom';

import { IProps as Props, OptionProps, Item } from './Props';

import Triangle from '@/assets/iconSvg/triangle.svg';

import DOption from './depend/DOption';

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
    useEffect(() => {
        return () => {
            unmountComponentAtNode(ele);
            document.body.removeChild(ele);
        }
    }, []);
    return createPortal(<DOption {...props} />, ele);
};

const Dropdown = (props: Props) => {
    const dropRef = useRef(null);
    const {
        value, data, disabled, triangle, children, change,
        minWidth, maxWidth, openSearch, placeholder, alignRight, arrow,
        translateX, maxCount
    } = props;
    // 是否创建了下拉弹窗
    const [hasDrop, setHasDrop] = useState(false);
    // 下拉弹窗显示
    const [show, setShow] = useState(false);

    const dropEnter = () => { };
    const dropLeave = () => { };
    const dropClick = () => {
        if (!hasDrop) setHasDrop(true);
        setShow(true);
    };
    const itemClick = (item: Item): void => {
        setShow(false);
        change(item);
    };

    return (
        <div className={['d-drop', 'd-drop-light', show && 'd-drop-show', disabled && 'd-drop-disabled'].join(' ')}
            ref={dropRef}
            onMouseEnter={dropEnter}
            onMouseLeave={dropLeave}
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
            {hasDrop && <DropOption
                data={data}
                value={value}
                minWidth={minWidth}
                maxWidth={maxWidth}
                openSearch={openSearch}
                placeholder={placeholder}
                alignRight={alignRight}
                arrow={arrow}
                translateX={translateX}
                maxCount={maxCount}
                show={show}
                change={itemClick}
            />}
        </div>
    )
};

Dropdown.defaultProps = {
    data: [], // 数据列表
    value: '', // 绑定的v-model值
    minWidth: '', // 最小宽度
    maxWidth: '',
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
