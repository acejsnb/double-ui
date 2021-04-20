import React, {
    useRef, useState, useEffect
} from 'react';

import ClearSvg from '@/assets/iconSvg/clear2.svg';
import TextEllipsis from '@/utils/TextEllipsis';
import FindTarget from '@/utils/FindTarget';
import Transition from '../../transition/Transition';
import { Item, OptionProps as Props } from '../Types';

const DOption = (props: Props) => {
    const {
        show, setShow, left, top, position,
        data, value, arrow, openSearch, placeholder, change,
        maxWidth = 180, maxCount = 5
    } = props;
    const contentRef = useRef(null);
    const [inputVal, setInputVal] = useState('');
    const [scrollTop, setScrollTop] = useState(0);
    const [optionData, setOptionData] = useState(JSON.parse(JSON.stringify(data)));
    useEffect(() => {
        setOptionData(JSON.parse(JSON.stringify(data)));
    }, [data]);

    // 搜索数据
    const searchHandle = (str: string) => {
        const cloneData = JSON.parse(JSON.stringify(data));
        if (str) {
            setOptionData(cloneData.filter((d: Item) => {
                if (!d.disabled && d.name.includes(str)) return d;
                return null;
            }));
        } else {
            setOptionData(cloneData);
        }
    };
    let timer: any;
    // input输入回调
    const inputHandle = (e: any): void => {
        const { target: { value: inputValue } } = e;
        setInputVal(inputValue);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            searchHandle(inputValue);
        }, 300);
    };
    // 清除搜索的输入
    const clearInput = () => {
        setInputVal('');
        setOptionData(JSON.parse(JSON.stringify(data)));
    };
    useEffect(() => {
        if (!show) setTimeout(() => { clearInput(); }, 300);
    }, [show]);
    // 滚动回调
    const scrollTopHandle = (e: any) => { setScrollTop(e.target.scrollTop); };
    // 点击每项
    const optionClick = (e: any) => {
        e.stopPropagation();
        const { dataset: { id, disabled } } = FindTarget(e.target, ['SECTION']);
        if (disabled && disabled === 'true') return;
        change(optionData.find((d: Item) => d.id === id));
        setTimeout(() => { setOptionData(JSON.parse(JSON.stringify(data))); }, 300);
    };
    // hover每项
    const optionHover = (e: any) => {
        e.stopPropagation();
        if (e.target.tagName === 'DIV') return;
        TextEllipsis(e, ['SECTION']);
    };

    return (
        <Transition show={show} setShow={setShow} classHidden="d-drop-hidden" classPrefix={`d-transition-${position ? 'down' : 'up'}`}>
            <div
                ref={contentRef}
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
                onWheel={(e) => { e.stopPropagation(); }}
            >
                <>
                    {
                        openSearch && (
                            <span className={['d-drop-search', scrollTop > 12 && 'd-drop-search-shadow'].join(' ')}>
                                <input
                                    className="d-drop-input"
                                    type="text"
                                    placeholder={placeholder}
                                    value={inputVal}
                                    onInput={inputHandle}
                                />
                                {inputVal && <i className="d-drop-clear" onClick={clearInput}><ClearSvg /></i>}
                            </span>
                        )
                    }
                </>
                <div
                    className="d-drop-option"
                    onScroll={scrollTopHandle}
                    style={{ maxHeight: `${maxCount * 38}px` }}
                    onClick={optionClick}
                    onMouseOver={optionHover}
                >
                    {
                        optionData.map((item: Item) => (
                            <section
                                key={item.id}
                                className={
                                    [
                                        'd-drop-option-item', value === item.id && 'd-drop-option-selected', item.disabled && 'd-drop-option-disable'
                                    ].join(' ')
                                }
                                data-disabled={item.disabled}
                                data-id={item.id}
                            >
                                {item.icon && <i className="d-drop-option-svg" />}
                                <span>{item.name}</span>
                            </section>
                        ))
                    }
                </div>
            </div>
        </Transition>
    );
};

DOption.defaultProps = {
    show: false,
    setShow: () => {},
    left: 0,
    top: 0,
    position: true,
    data: [],
    value: '',
    trigger: 'hover', // 通过点击或hover打开下拉列表
    openSearch: false,
    placeholder: '请搜索',
    alignRight: false, // 居右对齐
    arrow: false, // 显示右上角箭头
    translateX: 0, // X轴偏移量
    maxCount: 5, // 下拉列表容纳最大条数
    maxWidth: 180,
    change: () => { }
};

export default DOption;
