import './style.styl';
import React, {
    FC, FormEvent, useContext, useEffect, useState
} from 'react';

import { FormContext } from '@/components/form/Form';
import { FormItemContext } from '@/components/form/Item';

import { Props } from './types';

const Input: FC<Props> = ({
    defaultValue = '',
    type = 'text', placeholder = '请输入', maxLength = 20,
    disabled = false,
    input, change, errText = ''
}) => {
    const { isReset } = useContext(FormContext);
    const { value, setValue } = useContext(FormItemContext);

    // 输入框的值
    const [inputValue, setInputValue] = useState(value || defaultValue);
    // input input事件触发
    const inputHandle = (e: FormEvent) => {
        const v = (e.target as HTMLInputElement).value;
        setInputValue(v);
        input?.(v);
    };
    const setVal = (v: string) => {
        setValue(v);
        change?.(v);
    };
    useEffect(() => {
        // 重置input的值
        if (isReset) setInputValue('');
    }, [isReset]);
    useEffect(() => {
        // 初始化input的值
        if (value || defaultValue) setValue(value || defaultValue);
    }, []);

    let timer: number;
    // input change事件触发
    const changeHandle = (e: FormEvent) => {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            setVal((e.target as HTMLInputElement).value);
        }, 300);
    };
    return (
        <span className={['d-input', `d-input-${disabled ? 'disabled' : 'normal'}`].join(' ')}>
            <input
                className="d-input-el"
                value={inputValue}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                onInput={inputHandle}
                onChange={changeHandle}
            />
            {errText && <span className="d-input-err">{errText}</span>}
        </span>
    );
};

export default Input;
