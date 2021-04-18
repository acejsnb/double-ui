import React, { MouseEvent, useRef, useState, useEffect, useLayoutEffect } from 'react';
// import { CSSTransition } from 'react-transition-group';

import { Item, OptionProps as Props } from '../Props';

import ClearSvg from '@/assets/iconSvg/clear2.svg';
import TextEllipsis from '../../../utils/TextEllipsis';

const DOption = (porps: Props) => {
    console.log(porps)
    const {
        show, left, top,
        data, value, arrow, minWidth, maxWidth, openSearch, placeholder, change
    } = porps;
    const [inputVal, setInputVal] = useState('');
    const [scrollTop, setScrollTop] = useState(0);
    const [optionData, setOptionData] = useState(JSON.parse(JSON.stringify(data)));
    // 下拉弹窗显示状态
    const [visible, setVisible] = useState(false);
    // 动画执行方向
    const [position, setPosition] = useState(false);
    const [height, setHeight] = useState(0);
    const [transition, setTransition] = useState('d-transition-down-enter');


    useEffect(() => {
        if (show) {
            setVisible(show);
            setTimeout(() => {
                setTransition('d-transition-down-enter d-transition-down-enter-active');
                setTimeout(() => { setTransition('d-transition-down-leave'); }, 300);
            }, 1000 / 60);
        } else {
            setTransition('d-transition-down-leave d-transition-down-leave-active');
            setTimeout(() => {
                setVisible(show);
                setTransition('d-transition-down-enter');
            }, 300);
        }
    }, [show]);

    const wheel = () => { };
    const dropClose = () => { };
    const dropEnter = () => { };
    const dropLeave = () => { };
    const inputHandle = () => { };
    const inputDown = () => { };
    const clearInput = () => { };
    const scrollTopHandle = () => { };
    const itemClick = (e: MouseEvent, item: Item) => {
        e.stopPropagation();
        if (item.disabled) return;
        change(item);
    };

    return (
        <div
            className={[
                'd-drop-content',
                'd-drop-content-light',
                arrow && (position ? 'd-drop-content-top-arrow' : 'd-drop-content-bottom-arrow'),
                !visible && 'd-drop-hidden',
                transition
            ].join(' ')}
            style={{
                left: `${left}px`,
                top: `${top}px`,
                minWidth: `${minWidth}px`,
                maxWidth: `${maxWidth}px`
            }}
            // tabIndex={-1}
            onWheel={wheel}
            onBlur={dropClose}
            onMouseEnter={dropEnter}
            onMouseLeave={dropLeave}
        >
            <>
                {
                    openSearch && (
                        <span className={['d-drop-search', scrollTop > 12 && 'd-drop-search-shadow'].join(' ')}>
                            <input className="d-drop-input"
                                type="text"
                                placeholder={placeholder}
                                value={inputVal}
                                onInput={inputHandle}
                                onMouseDown={inputDown}
                            />
                            {inputVal && <i className="d-drop-clear" onClick={clearInput}><ClearSvg /></i>}
                        </span>
                    )
                }
            </>
            <div className="d-drop-option" onClick={scrollTopHandle}>
                {
                    optionData.map((item: Item) => (
                        <section key={item.id}
                            className={
                                [
                                    'd-drop-option-item', value === item.id && 'd-drop-option-selected', item.disabled && 'd-drop-option-disable'
                                ].join(' ')
                            }
                            onClick={(e): void => { itemClick(e, item) }}
                            onMouseEnter={TextEllipsis}
                        >
                            {item.icon && <i className="d-drop-option-svg" />}
                            <span>{item.name}</span>
                        </section>
                    ))
                }
            </div>
        </div>
    );
};

DOption.defaultProps = {
    show: false,
    left: 0,
    top: 96,
    data: [],
    value: '',
    minWidth: '', // 最小宽度
    maxWidth: '',
    trigger: 'hover', // 通过点击或hover打开下拉列表
    openSearch: false,
    placeholder: '请搜索',
    alignRight: false, // 居右对齐
    arrow: false, // 显示右上角箭头
    translateX: 0, // X轴偏移量
    maxCount: 5, // 下拉列表容纳最大条数
    change: () => { }
};

export default DOption;
