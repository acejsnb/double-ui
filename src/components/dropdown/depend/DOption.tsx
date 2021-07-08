import React, {
    FC, FormEvent, MouseEvent, UIEvent, useState, useEffect
} from 'react';

import ClearSvg from '@/assets/iconSvg/clear2.svg';
import TextEllipsis from '@/utils/TextEllipsis';
import FindTarget from '@/utils/FindTarget';
import { Item, OptionProps as Props } from '../types';

const DOption: FC<Props> = ({
    data, value, openSearch, placeholder, change,
    maxCount = 5
}) => {
    const [inputVal, setInputVal] = useState<string>('');
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [optionData, setOptionData] = useState<Item[]>(data);
    useEffect(() => {
        setOptionData(data);
    }, [data]);

    // 搜索数据
    const searchHandle = (str: string): void => {
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
    let timer: number;
    // input输入回调
    const inputHandle = (e: FormEvent): void => {
        const inputValue = (e.target as HTMLInputElement).value;
        setInputVal(inputValue);
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            searchHandle(inputValue);
        }, 300);
    };
    // 清除搜索的输入
    const clearInput = () => {
        setInputVal('');
        setOptionData(data);
    };
    // 滚动回调
    const scrollTopHandle = (e: UIEvent): void => {
        setScrollTop((e.target as HTMLElement).scrollTop);
    };
    // 点击每项
    const optionClick = (e: MouseEvent): void => {
        e.stopPropagation();
        const { dataset: { id, disabled } } = FindTarget(e.target, ['SECTION']);
        if (disabled && disabled === 'true') return;
        change(optionData.find((d) => d.id === id) || {} as Item);
    };
    // hover每项
    const optionHover = (e: MouseEvent): void => {
        e.stopPropagation();
        if ((e.target as HTMLElement).tagName === 'DIV') return;
        TextEllipsis(e, ['SECTION']);
    };

    return (
        <>
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
        </>
    );
};

export default DOption;
